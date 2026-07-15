import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Results() {
  const route = useRoute();
  const { quiz, attempts } = usePage().props;

  const passRate =
    attempts.data.length > 0
      ? Math.round(
          (attempts.data.filter((a) => a.passed).length /
            attempts.data.length) *
            100
        )
      : 0;

  return (
    <div className="relative">
      <Head title={`Results — ${quiz.title}`} />
      <AuthenticatedLayout>
        <div className="flex justify-center flex-wrap py-8">
          <div className="w-full max-w-5xl bg-gray-200 p-8 rounded-md text-slate-900">
            <div className="mb-8">
              <Link
                href={route("quiz.index")}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back to quizzes
              </Link>
              <h1 className="text-3xl font-bold mt-2">{quiz.title}</h1>
              <p className="text-slate-600">
                {attempts.total ?? attempts.data.length} attempt
                {(attempts.total ?? attempts.data.length) === 1 ? "" : "s"}
                {" · "}
                {passRate}% pass rate (this page)
              </p>
            </div>

            {attempts.data.length === 0 ? (
              <p className="text-center text-slate-600 py-12">
                No one has completed this quiz yet.
              </p>
            ) : (
              <div className="bg-white rounded-md overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-sm text-slate-600">
                    <tr>
                      <th className="px-6 py-3">Student</th>
                      <th className="px-6 py-3">Score</th>
                      <th className="px-6 py-3">Percentage</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Completed</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {attempts.data.map((attempt) => (
                      <tr key={attempt.id}>
                        <td className="px-6 py-3">{attempt.user?.name ?? "—"}</td>
                        <td className="px-6 py-3">{attempt.score}</td>
                        <td className="px-6 py-3">
                          {attempt.score_percentage}%
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              attempt.passed
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {attempt.passed ? "Passed" : "Failed"}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-600">
                          {attempt.completed_at
                            ? new Date(attempt.completed_at).toLocaleString()
                            : "—"}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <Link
                            href={route("quiz.results.attempt", attempt.id)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View breakdown
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {attempts.links && attempts.links.length > 3 && (
              <div className="flex justify-center gap-1 mt-8">
                {attempts.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url || ""}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      link.active
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    } ${!link.url ? "opacity-40 pointer-events-none" : ""}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </AuthenticatedLayout>
    </div>
  );
}