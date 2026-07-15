import { useForm } from "@inertiajs/react";

export default function EditPassword({ user }) {
  const { data, setData, put, processing, errors } = useForm({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  function submit(e) {
    e.preventDefault();
    put(route("user.password.update", user.id));
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 border rounded-md">
      <h2 className="text-xl mb-4">Change Password</h2>

      <label className="block mb-2">
        Current Password
        <input
          type="password"
          value={data.current_password}
          onChange={(e) => setData("current_password", e.target.value)}
          className="w-full border p-2 rounded text-black"
        />
        {errors.current_password && (
          <p className="text-red-500 text-sm">{errors.current_password}</p>
        )}
      </label>

      <label className="block mb-2">
        New Password
        <input
          type="password"
          value={data.new_password}
          onChange={(e) => setData("new_password", e.target.value)}
          className="w-full border p-2 rounded text-black"
        />
        {errors.new_password && (
          <p className="text-red-500 text-sm">{errors.new_password}</p>
        )}
      </label>

      <label className="block mb-2">
        Confirm New Password
        <input
          type="password"
          value={data.new_password_confirmation}
          onChange={(e) =>
            setData("new_password_confirmation", e.target.value)
          }
          className="w-full border p-2 rounded text-black"
        />
      </label>

      <button
        type="submit"
        disabled={processing}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {processing ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
