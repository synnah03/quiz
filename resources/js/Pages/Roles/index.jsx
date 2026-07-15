import { useState } from "react";
import { Link, router } from "@inertiajs/react"; 
import { route } from "ziggy-js";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RolesIndex({ roles }) {
  const [selectedRole, setSelectedRole] = useState(null); 

  const handleDelete = (id) => {
    router.delete(route("roles.destroy", id), {
      onSuccess: () => {
        setSelectedRole(null); 
      },
    });
  };

  return (
    <AuthenticatedLayout>
    <div className="relative"> 
      <div className="border-2 max-w-md mx-auto">
        <div className="border-b w-full flex justify-between px-4 py-4">
          <h2 className="text-2xl font-semibold">Roles</h2>
          {/* <Link href={route('roles.create')} className="px-2 py-1 bg-green-600 rounded-md shadow-md text-white">
            Create Role
          </Link> */}
        </div>

        <div className="w-full text-left">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {/* <th className="px-4 py-2">Name</th> */}
                {/* <th className="px-4 py-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {roles.map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{r.name}</td>
                  {/* <td className="px-4 py-2 space-x-4 cursor-pointer">
                    <Link href={route("roles.edit", r.id)} className="text-blue-500">
                      Edit
                    </Link>
                    <span
                      onClick={() => setSelectedRole(r)} // ✅ store full role object
                      className="text-red-500"
                    >
                      Delete
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Delete Confirmation Modal */}
        {selectedRole && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="max-w-md bg-white p-8 rounded-md shadow-md">
              <p className="text-black mb-4">
                Are you sure you want to delete role <strong>{selectedRole.name}</strong>?
              </p>
              <div className="flex space-x-4 justify-end">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="px-4 py-2 bg-gray-500 rounded text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedRole.id)}
                  className="px-4 py-2 bg-red-600 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AuthenticatedLayout>
  );
}
