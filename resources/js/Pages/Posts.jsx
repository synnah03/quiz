import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Posts({ posts }) {
  const route = useRoute();
  const { flash, component } = usePage().props;
  const [flashMsg, setFlashMsg] = useState(null);

  // ✅ Flash message auto-hide logic
  useEffect(() => {
    if (flash.success || flash.message) {
      setFlashMsg(flash);

      const timer = setTimeout(() => setFlashMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <div className="relative">
      <Head title={component} />

      <AuthenticatedLayout>

      {/* ✅ Flash Message */}
      {flashMsg && (
        <div
          className={`absolute top-6 border text-white rounded-md px-4 py-2 shadow-md transition-opacity duration-500 ${
            flashMsg.message ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {flashMsg.message || flashMsg.success}
        </div>
      )}

      {/* ✅ Create Post Button */}
      <div className="flex justify-end mb-8">
        <Link
          href={route("posts.create")}
          className="border rounded-md px-4 py-2 font-bold hover:bg-gray-900 transition"
        >
          Create New Post
        </Link>
      </div>

      {/* ✅ Posts List */}
      <div className="space-y-8">
        {posts?.data?.length > 0 ? (
          posts.data.map((post) => (
            <div
              key={post.id}
              className="border rounded-md p-4 shadow-sm bg-white"
            >
              <p className="text-gray-500 text-sm mb-4 italic">
                {new Date(post.created_at).toLocaleString()}
              </p>
              <p className="text-gray-700 mb-2">{post.body}</p>
              <Link
                href={route("posts.show", post.id)} // ✅ fixed param
                className="text-blue-500 hover:text-blue-800 cursor-pointer"
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-center my-12 flex-wrap gap-2">
        {posts?.links?.map((link, i) => (
          <Link
            key={i}
            href={link.url || "#"}
            dangerouslySetInnerHTML={{ __html: link.label }}
            className={`px-3 py-1 mx-1 border rounded text-sm ${
              link.active
                ? "bg-blue-500"
                : "hover:text-gray-900 hover:bg-blue-100"
            } ${!link.url ? "opacity-50 pointer-events-none" : ""}`}
          />
        ))}
      </div>
      </AuthenticatedLayout>
    </div>
  );
}
