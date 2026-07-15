import { Head, Link, router, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
  const route = useRoute();
  const { flash, quizzes } = usePage().props;
  const { user } = usePage().props.auth;
  const [flashMsg, setFlashMsg] = useState(null);

  useEffect(() => {
    if (flash.success || flash.message) {
      setFlashMsg(flash);
      const timer = setTimeout(() => setFlashMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  console.log(user.roles);
  

  return (
    <div className="relative">
      <Head title="Quizzes" />
      <AuthenticatedLayout>
        {flashMsg && (
          <div
            className={`absolute top-6 right-6 border text-white rounded-md px-4 py-2 shadow-md transition-opacity duration-500 ${
              flashMsg.message ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {flashMsg.message || flashMsg.success}
          </div>
        )}

        <div className="flex justify-center flex-wrap py-8">
          <div className="w-full max-w-5xl bg-gray-200 p-8 rounded-md text-slate-900">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Quizzes</h1>
              <Link
                href={route("quiz.create")}
                className="bg-slate-900 text-white rounded-md px-4 py-2 hover:bg-slate-700"
              >
                + Create quiz
              </Link>
            </div>

            {quizzes.data.length === 0 ? (
              <p className="text-center text-slate-600 py-12">
                No quizzes yet. Create one to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {quizzes.data.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-md p-6 flex justify-between items-center shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-semibold">
                          {quiz.title}
                        </h2>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            quiz.is_published
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {quiz.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {quiz.questions_count ?? quiz.questions?.length ?? 0}{" "}
                        question
                        {(quiz.questions_count ?? quiz.questions?.length) === 1
                          ? ""
                          : "s"}
                        {quiz.duration_minutes
                          ? ` · ${quiz.duration_minutes} min`
                          : " · No time limit"}
                        {` · Pass mark ${quiz.pass_percentage}%`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {user.roles[0] === "student" && (
                        <Link
                          href={route("quiz.take", quiz.id)}
                          className="bg-green-600 text-white rounded-md px-4 py-2 text-sm hover:bg-green-700"
                        >
                          Start quiz
                        </Link>
                      )}

                      {user.roles[0] === "super-admin" && (
                        <>
                          <Link
                            href={route("quiz.edit", quiz.id)}
                            className="border rounded-md px-4 py-2 text-sm hover:border-slate-900"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("quiz.results", quiz.id)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Results
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm("Delete this quiz? This cannot be undone.")) {
                                router.delete(route("quiz.destroy", quiz.id));
                              }
                            }}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {quizzes.links && quizzes.links.length > 3 && (
              <div className="flex justify-center gap-1 mt-8">
                {quizzes.links.map((link, i) => (
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