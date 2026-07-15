import { router, Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function UserIndex({ user }) {
  const route = useRoute();
  const { flash, component } = usePage().props;
  const [flashMsg, setFlashMsg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (flash.success || flash.message) {
      setFlashMsg(flash);
      const timer = setTimeout(() => setFlashMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  // ✅ Delete handler
  const handleDelete = (id) => {
    router.delete(route("users.destroy", id), {
      onSuccess: () => {
        setDeleteId(null); // ✅ close modal after success
      },
    });
  };

  return (
    <AuthenticatedLayout>
    <div className="relative">
      <Head title={component} />

      {flashMsg && (
        <div
          className={`absolute top-6 border text-white rounded-md px-4 py-2 shadow-md transition-opacity duration-500 ${
            flashMsg.message ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {flashMsg.message || flashMsg.success}
        </div>
      )}

      <div className="flex justify-end mb-8">
        <Link
          href={route("user.create")}
          className="border rounded-md px-4 py-2 font-bold hover:bg-gray-900 transition"
        >
          Create User
        </Link>
      </div>

      <div className="border text-left">
        <table className="border-2 border-collapse w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((u, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.roles?.[0]?.name}</td>
                <td className="px-4 py-2 space-x-4 cursor-pointer cursor-pointer">
                  <span  onClick={() => setDeleteId(u)} className="text-red-500">Delete</span>
                  <Link href={route('user.edit', u.id)} className="text-blue-500">Edit username</Link>
                  <Link href={route('user.password.edit', u.id)} className="text-blue-500">Edit password</Link>
                  <Link href={route('user.role.edit', u.id)} className="text-blue-500">Edit Role</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {deleteId && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="max-w-md bg-white p-8 rounded-md">
            <p className="text-black mb-4">
              Are you sure you want to delete user ID <span>{deleteId.name}</span>?
            </p>
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-2 py-2 bg-green-600 rounded-sm cursor-pointer text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId.id)}
                className="px-2 py-2 bg-red-600 rounded-sm cursor-pointer text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AuthenticatedLayout>
  );
}
