import { Head, useForm } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const emptyOption = () => ({ option_text: "", is_correct: false });

const emptyQuestion = () => ({
  question_text: "",
  type: "single",
  points: 1,
  options: [emptyOption(), emptyOption()],
});

export default function Edit() {
  const route = useRoute();
  const { quiz } = usePage().props;

  const { data, setData, put, processing, errors } = useForm({
    title: quiz.title ?? "",
    description: quiz.description ?? "",
    duration_minutes: quiz.duration_minutes ?? "",
    pass_percentage: quiz.pass_percentage ?? 50,
    shuffle_questions: !!quiz.shuffle_questions,
    is_published: !!quiz.is_published,
    questions:
      quiz.questions && quiz.questions.length > 0
        ? quiz.questions.map((q) => ({
            id: q.id,
            question_text: q.question_text,
            type: q.type,
            points: q.points,
            options:
              q.options && q.options.length > 0
                ? q.options.map((o) => ({
                    id: o.id,
                    option_text: o.option_text,
                    is_correct: !!o.is_correct,
                  }))
                : [emptyOption(), emptyOption()],
          }))
        : [emptyQuestion()],
  });

  const updateQuestion = (qIndex, field, value) => {
    const questions = [...data.questions];
    questions[qIndex] = { ...questions[qIndex], [field]: value };
    setData("questions", questions);
  };

  const addQuestion = () => {
    setData("questions", [...data.questions, emptyQuestion()]);
  };

  const removeQuestion = (qIndex) => {
    setData("questions", data.questions.filter((_, i) => i !== qIndex));
  };

  const updateOption = (qIndex, oIndex, field, value) => {
    const questions = [...data.questions];
    const options = [...questions[qIndex].options];
    options[oIndex] = { ...options[oIndex], [field]: value };
    questions[qIndex] = { ...questions[qIndex], options };
    setData("questions", questions);
  };

  const toggleCorrect = (qIndex, oIndex) => {
    const questions = [...data.questions];
    const question = questions[qIndex];
    let options = [...question.options];

    if (question.type === "single") {
      options = options.map((opt, i) => ({
        ...opt,
        is_correct: i === oIndex,
      }));
    } else {
      options[oIndex] = {
        ...options[oIndex],
        is_correct: !options[oIndex].is_correct,
      };
    }

    questions[qIndex] = { ...question, options };
    setData("questions", questions);
  };

  const addOption = (qIndex) => {
    const questions = [...data.questions];
    questions[qIndex].options = [...questions[qIndex].options, emptyOption()];
    setData("questions", questions);
  };

  const removeOption = (qIndex, oIndex) => {
    const questions = [...data.questions];
    questions[qIndex].options = questions[qIndex].options.filter(
      (_, i) => i !== oIndex
    );
    setData("questions", questions);
  };

  const submit = (e) => {
    e.preventDefault();
    put(route("quiz.update", quiz.id));
  };

  return (
    <div className="relative">
      <Head title={`Edit — ${quiz.title}`} />
      <AuthenticatedLayout>
        <div className="flex justify-center flex-wrap py-8">
          <form
            onSubmit={submit}
            className="w-full max-w-4xl bg-gray-200 p-8 rounded-md text-slate-900 space-y-8"
          >
            <h1 className="text-3xl font-bold text-center">Edit Quiz</h1>

            <div className="bg-white rounded-md p-6 space-y-4">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={data.duration_minutes}
                    onChange={(e) =>
                      setData("duration_minutes", e.target.value)
                    }
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="No limit"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Pass percentage
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={data.pass_percentage}
                    onChange={(e) =>
                      setData("pass_percentage", e.target.value)
                    }
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.shuffle_questions}
                    onChange={(e) =>
                      setData("shuffle_questions", e.target.checked)
                    }
                  />
                  Shuffle questions
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.is_published}
                    onChange={(e) => setData("is_published", e.target.checked)}
                  />
                  Published
                </label>
              </div>
            </div>

            <div className="space-y-6">
              {data.questions.map((question, qIndex) => (
                <div
                  key={question.id ?? `new-${qIndex}`}
                  className="bg-white rounded-md p-6 space-y-4 border"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      Question {qIndex + 1}
                    </h3>
                    {data.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Remove question
                      </button>
                    )}
                  </div>

                  <textarea
                    value={question.question_text}
                    onChange={(e) =>
                      updateQuestion(qIndex, "question_text", e.target.value)
                    }
                    placeholder="Question text"
                    className="w-full border rounded-md px-3 py-2"
                    rows={2}
                  />
                  {errors[`questions.${qIndex}.question_text`] && (
                    <p className="text-red-600 text-sm">
                      {errors[`questions.${qIndex}.question_text`]}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Type
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) =>
                          updateQuestion(qIndex, "type", e.target.value)
                        }
                        className="w-full border rounded-md px-3 py-2"
                      >
                        <option value="single">Single answer</option>
                        <option value="multiple">Multiple answers</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Points
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={question.points}
                        onChange={(e) =>
                          updateQuestion(qIndex, "points", e.target.value)
                        }
                        className="w-full border rounded-md px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Options{" "}
                      <span className="text-slate-500 font-normal">
                        (mark the correct{" "}
                        {question.type === "single" ? "answer" : "answers"})
                      </span>
                    </label>

                    {question.options.map((option, oIndex) => (
                      <div
                        key={option.id ?? `new-${oIndex}`}
                        className="flex items-center gap-3"
                      >
                        <input
                          type={question.type === "single" ? "radio" : "checkbox"}
                          name={`correct-${qIndex}`}
                          checked={option.is_correct}
                          onChange={() => toggleCorrect(qIndex, oIndex)}
                        />
                        <input
                          type="text"
                          value={option.option_text}
                          onChange={(e) =>
                            updateOption(
                              qIndex,
                              oIndex,
                              "option_text",
                              e.target.value
                            )
                          }
                          placeholder={`Option ${oIndex + 1}`}
                          className="flex-1 border rounded-md px-3 py-2"
                        />
                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(qIndex, oIndex)}
                            className="text-red-600 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addOption(qIndex)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Add option
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addQuestion}
                className="w-full border-2 border-dashed rounded-md py-3 text-slate-600 hover:border-slate-900 hover:text-slate-900"
              >
                + Add question
              </button>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-slate-900 text-white rounded-md py-3 font-medium disabled:opacity-50"
            >
              {processing ? "Saving..." : "Update quiz"}
            </button>
          </form>
        </div>
      </AuthenticatedLayout>
    </div>
  );
}