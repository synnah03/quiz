import { Head, usePage, router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { useState, useEffect, useMemo, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Take() {
  const route = useRoute();
  const { quiz, attemptId } = usePage().props;
  // quiz: { id, title, duration_minutes, questions: [{ id, question_text, type, options: [{ id, option_text }] }] }
  // Note: is_correct must NOT be sent to this page by the controller.

  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    quiz.duration_minutes ? quiz.duration_minutes * 60 : null
  );

  // Guards against submit() firing more than once (e.g. effect re-running,
  // or the user clicking "Submit quiz" at the same instant the timer expires).
  const hasSubmittedRef = useRef(false);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;

  const submit = (currentAnswers = answers) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setSubmitError(false);
    setProcessing(true);

    const payload = Object.entries(currentAnswers).map(
      ([questionId, optionIds]) => ({
        question_id: Number(questionId),
        option_ids: Array.isArray(optionIds) ? optionIds : [optionIds],
      })
    );

    // Send the payload directly as router.post's data argument instead of
    // going through useForm's setData + post — setData is an async state
    // update, so a post() called right after it would still see the old
    // (empty) form data. router.post() takes the data explicitly, so
    // there's no timing gap and no chance of submitting stale/empty answers.
    router.post(
      route("quiz.submit", quiz.id),
      { attempt_id: attemptId, answers: payload },
      {
        onError: () => {
          // Let the student retry instead of being stuck on a frozen screen forever
          hasSubmittedRef.current = false;
          setSubmitError(true);
          setProcessing(false);
        },
      }
    );
  };

  // Countdown timer — runs across the whole quiz, not per-question.
  // Reads `answers` fresh on every tick via the effect dependency, so
  // whatever is selected at the moment time runs out gets submitted.
  useEffect(() => {
    if (secondsLeft === null || hasSubmittedRef.current) return;

    if (secondsLeft <= 0) {
      setTimeExpired(true);
      submit(answers);
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, answers]);

  const timeDisplay = useMemo(() => {
    if (secondsLeft === null) return null;
    const m = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const s = (secondsLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  const selectSingle = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const toggleMultiple = (questionId, optionId) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: next };
    });
  };

  const goNext = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const goPrevious = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  };

  const jumpTo = (index) => setCurrentIndex(index);

  const isCurrentAnswered =
    currentQuestion.type === "single"
      ? answers[currentQuestion.id] !== undefined
      : (answers[currentQuestion.id] || []).length > 0;

  // Clicking "Submit quiz" only opens a confirmation dialog — it does NOT
  // submit by itself. This keeps answering the last question and actually
  // submitting the whole quiz as two clearly separate, deliberate actions.
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmitConfirm(true);
  };

  const confirmSubmit = () => {
    setShowSubmitConfirm(false);
    submit(answers);
  };

  // Warn before refresh/close/back-navigation while the quiz is still in progress.
  // Browsers ignore custom text and show their own generic message — that's expected,
  // setting returnValue is just what triggers the native confirmation dialog at all.
  useEffect(() => {
    if (timeExpired || hasSubmittedRef.current) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [timeExpired]);

  // Trap the browser's back button. There's no way to truly cancel a popstate
  // event — the history entry has already changed by the time we're notified —
  // so the trick is to immediately push a fresh entry right back on top,
  // landing the user right back where they started instead of leaving.
  useEffect(() => {
    if (timeExpired || hasSubmittedRef.current) return;

    // Seed an extra history entry so the first "back" press has somewhere to land
    // before our handler re-traps it.
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (timeExpired || hasSubmittedRef.current) return;
      window.history.pushState(null, "", window.location.href);
      setShowLeaveWarning(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [timeExpired]);

  // Block in-app Inertia navigation (nav bar links, logo, etc.) while the quiz
  // is active — beforeunload/popstate only cover browser-level navigation, not
  // client-side route changes Inertia handles internally.
  useEffect(() => {
    const removeListener = router.on("before", (event) => {
      if (timeExpired || hasSubmittedRef.current) return;

      event.preventDefault();
      setShowLeaveWarning(true);
    });

    return () => removeListener();
  }, [timeExpired]);

  // Prevent Enter key from submitting the form early while stepping through
  // radio/checkbox options — only the explicit "Submit quiz" button should submit.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLast) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <Head title={quiz.title} />
      <AuthenticatedLayout>
        <div className="flex justify-center flex-wrap py-8">
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="w-full max-w-3xl bg-gray-200 p-8 rounded-md text-slate-900 space-y-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-2xl font-bold">{quiz.title}</h1>
                <p className="text-sm text-slate-600">
                  Question {currentIndex + 1} of {totalQuestions} ·{" "}
                  {answeredCount} answered
                </p>
              </div>
              <div className="flex items-center gap-3">
                {timeDisplay && (
                  <div
                    className={`text-lg font-mono px-4 py-2 rounded-md ${
                      secondsLeft < 60
                        ? "bg-red-100 text-red-700"
                        : "bg-white text-slate-900"
                    }`}
                  >
                    {timeDisplay}
                  </div>
                )}
              </div>
            </div>

            {showLeaveWarning && !timeExpired && (
              <div className="bg-amber-100 border border-amber-300 text-amber-800 rounded-md px-4 py-3 flex justify-between items-center">
                <span className="font-medium">
                  You can't leave this page until you submit the quiz.
                </span>
                <button
                  type="button"
                  onClick={() => setShowLeaveWarning(false)}
                  className="text-amber-800 hover:text-amber-950 font-bold px-2"
                >
                  ✕
                </button>
              </div>
            )}

            {timeExpired && !submitError && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded-md px-4 py-3 text-center font-medium">
                Time's up — submitting your answers now...
              </div>
            )}

            {submitError && (
              <div className="bg-red-100 border border-red-300 text-red-700 rounded-md px-4 py-3 text-center">
                <p className="font-medium mb-2">
                  Something went wrong submitting your quiz.
                </p>
                <button
                  type="button"
                  onClick={() => submit(answers)}
                  className="bg-red-600 text-white rounded-md px-4 py-1.5 text-sm font-medium hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Progress dots */}
            <div className="flex flex-wrap gap-2">
              {quiz.questions.map((q, index) => {
                const answered =
                  q.type === "single"
                    ? answers[q.id] !== undefined
                    : (answers[q.id] || []).length > 0;

                return (
                  <button
                    key={q.id}
                    type="button"
                    disabled={timeExpired}
                    onClick={() => jumpTo(index)}
                    className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center border-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      index === currentIndex
                        ? "border-slate-900 bg-slate-900 text-white"
                        : answered
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-slate-300 bg-white text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Current question */}
            <div className="bg-white rounded-md p-6">
              <p className="font-medium mb-4">
                {currentQuestion.question_text}
                {currentQuestion.type === "multiple" && (
                  <span className="text-xs text-slate-500 font-normal ml-2">
                    (select all that apply)
                  </span>
                )}
              </p>

              <div className="space-y-2">
                {currentQuestion.options.map((option) => {
                  const isChecked =
                    currentQuestion.type === "single"
                      ? answers[currentQuestion.id] === option.id
                      : (answers[currentQuestion.id] || []).includes(
                          option.id
                        );

                  return (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 border rounded-md px-4 py-2 transition-colors ${
                        timeExpired
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      } ${
                        isChecked
                          ? "border-slate-900 bg-slate-50"
                          : "hover:border-slate-400"
                      }`}
                    >
                      <input
                        type={
                          currentQuestion.type === "single"
                            ? "radio"
                            : "checkbox"
                        }
                        name={`question-${currentQuestion.id}`}
                        checked={isChecked}
                        disabled={timeExpired}
                        onChange={() =>
                          currentQuestion.type === "single"
                            ? selectSingle(currentQuestion.id, option.id)
                            : toggleMultiple(currentQuestion.id, option.id)
                        }
                      />
                      {option.option_text}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={goPrevious}
                disabled={isFirst || timeExpired}
                className="border rounded-md px-5 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-900"
              >
                ← Previous
              </button>

              {isLast ? (
                <button
                  type="submit"
                  disabled={processing || timeExpired}
                  className="bg-slate-900 text-white rounded-md px-6 py-2 font-medium disabled:opacity-50"
                >
                  {processing ? "Submitting..." : "Submit quiz"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={timeExpired}
                  className="bg-slate-900 text-white rounded-md px-6 py-2 font-medium disabled:opacity-50"
                >
                  Next →
                </button>
              )}
            </div>

            {isLast && !isCurrentAnswered && !timeExpired && (
              <p className="text-sm text-amber-600 text-center">
                You haven't answered this question yet — you can still submit.
              </p>
            )}
          </form>
        </div>

        {/* Final submission confirmation — a deliberate, separate step from
            answering the last question, so a click never doubles as both
            "select an answer" and "submit the whole quiz". */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-md p-6 max-w-sm w-full space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Submit quiz?
              </h2>
              <p className="text-sm text-slate-600">
                You've answered {answeredCount} of {totalQuestions} questions.
                Once submitted, you won't be able to change your answers.
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirm(false)}
                  className="border rounded-md px-4 py-2 text-sm hover:border-slate-900"
                >
                  Go back
                </button>
                <button
                  type="button"
                  onClick={confirmSubmit}
                  disabled={processing}
                  className="bg-slate-900 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {processing ? "Submitting..." : "Yes, submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </AuthenticatedLayout>
    </div>
  );
}