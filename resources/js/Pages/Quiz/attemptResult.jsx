import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AttemptResult() {
  const route = useRoute();
  const { attempt } = usePage().props;
  const { user } = usePage().props.auth;

  const answersByQuestion = attempt.answers.reduce((acc, answer) => {
    const qid = answer.question_id;
    if (!acc[qid]) {
      acc[qid] = { question: answer.question, selectedOptionIds: [] };
    }
    acc[qid].selectedOptionIds.push(answer.option_id);
    return acc;
  }, {});

  const questions = Object.values(answersByQuestion).sort(
    (a, b) => (a.question.order ?? 0) - (b.question.order ?? 0)
  );

  // Opens the browser print dialog. Users can "Save as PDF" from there —
  // no extra PDF library needed. The .print-sheet block below (hidden on
  // screen) is what actually renders; the interactive breakdown UI hides
  // itself via print:hidden.
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative">
      <Head title={`Result — ${attempt.quiz.title}`} />
      {/* Print isolation: AuthenticatedLayout renders a top nav bar we don't
          control from here, and print:hidden on our own markup can't reach
          it. So instead we hide the ENTIRE page on print and re-reveal only
          the .print-sheet block below — this works no matter what the
          layout's nav markup looks like. */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-sheet,
          .print-sheet * {
            visibility: visible;
          }
          .print-sheet {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
      `}</style>
      <AuthenticatedLayout>
        {/* ============ ON-SCREEN INTERACTIVE BREAKDOWN (hidden when printing) ============ */}
        <div className="flex justify-center flex-wrap py-8 print:hidden">
          <div className="w-full max-w-4xl bg-gray-200 p-8 rounded-md text-slate-900 space-y-6">
            <div className="flex justify-between items-center">
              {user.role === "student" ? (
                <Link
                  href={route("quiz.index")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Back to results
                </Link>
              ) : (
                <Link
                  href={route("quiz.results", attempt.quiz.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Back to results
                </Link>
              )}

              <button
                type="button"
                onClick={handlePrint}
                className="text-sm border border-slate-400 rounded-md px-3 py-1.5 text-slate-700 bg-white hover:border-slate-900 hover:text-slate-900"
                title="Print this breakdown or save as a PDF"
              >
                🖨️ Print / Save PDF
              </button>
            </div>

            {/* Summary card */}
            <div className="bg-white rounded-md p-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{attempt.quiz.title}</h1>
                <p className="text-sm text-slate-600">
                  Completed{" "}
                  {attempt.completed_at
                    ? new Date(attempt.completed_at).toLocaleString()
                    : "—"}
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`text-3xl font-bold ${
                    attempt.passed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {attempt.score_percentage}%
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    attempt.passed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {attempt.passed ? "Passed" : "Failed"}
                </span>
              </div>
            </div>

            {/* Per-question breakdown */}
            <div className="space-y-4">
              {questions.map(({ question, selectedOptionIds }, index) => {
                const questionCorrect = question.options
                  .filter((o) => o.is_correct)
                  .every((o) => selectedOptionIds.includes(o.id)) &&
                  selectedOptionIds.every(
                    (id) =>
                      question.options.find((o) => o.id === id)?.is_correct
                  );

                return (
                  <div key={question.id} className="bg-white rounded-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <p className="font-medium">
                        {index + 1}. {question.question_text}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ml-4 ${
                          questionCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {questionCorrect
                          ? `+${question.points} pt${question.points === 1 ? "" : "s"}`
                          : "0 pts"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option) => {
                        const wasSelected = selectedOptionIds.includes(
                          option.id
                        );
                        const isCorrectOption = option.is_correct;

                        let style = "border-slate-200";
                        let icon = null;

                        if (isCorrectOption && wasSelected) {
                          style = "border-green-500 bg-green-50";
                          icon = "✓";
                        } else if (isCorrectOption && !wasSelected) {
                          style = "border-green-500 bg-green-50";
                          icon = "✓";
                        } else if (!isCorrectOption && wasSelected) {
                          style = "border-red-500 bg-red-50";
                          icon = "✗";
                        }

                        return (
                          <div
                            key={option.id}
                            className={`flex items-center justify-between border rounded-md px-4 py-2 ${style}`}
                          >
                            <span className="flex items-center gap-2">
                              {wasSelected && (
                                <span className="text-xs text-slate-500">
                                  (your answer)
                                </span>
                              )}
                              {option.option_text}
                            </span>
                            {icon && (
                              <span
                                className={
                                  isCorrectOption
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {icon}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============ PRINT-ONLY PAPER LAYOUT ============ */}
        {/* Hidden on screen, shown only when printing / exporting to PDF.
            Plain black-and-white breakdown, paginated naturally by the
            browser's print engine. */}
        <div className="print-sheet hidden print:block text-black">
          <div className="mb-6 border-b-2 border-black pb-3 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{attempt.quiz.title}</h1>
              <p className="text-sm mt-1">
                Completed{" "}
                {attempt.completed_at
                  ? new Date(attempt.completed_at).toLocaleString()
                  : "—"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {attempt.score_percentage}%
              </div>
              <p className="text-sm">
                {attempt.passed ? "Passed" : "Failed"}
              </p>
            </div>
          </div>

          <ol className="space-y-4 list-decimal list-inside">
            {questions.map(({ question, selectedOptionIds }) => {
              const questionCorrect = question.options
                .filter((o) => o.is_correct)
                .every((o) => selectedOptionIds.includes(o.id)) &&
                selectedOptionIds.every(
                  (id) =>
                    question.options.find((o) => o.id === id)?.is_correct
                );

              return (
                <li key={question.id} className="break-inside-avoid">
                  <span className="font-medium">
                    {question.question_text}
                  </span>{" "}
                  <span className="text-sm">
                    ({questionCorrect
                      ? `+${question.points} pt${question.points === 1 ? "" : "s"}`
                      : "0 pts"})
                  </span>

                  <div className="mt-2 ml-6 space-y-1">
                    {question.options.map((option) => {
                      const wasSelected = selectedOptionIds.includes(
                        option.id
                      );
                      const isCorrectOption = option.is_correct;

                      let marker = "☐";
                      if (isCorrectOption) marker = "☑";

                      return (
                        <div key={option.id} className="flex items-center gap-2">
                          <span>{marker}</span>
                          <span>
                            {option.option_text}
                            {wasSelected && " (your answer)"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </AuthenticatedLayout>
    </div>
  );
}