import { Head, useForm } from "@inertiajs/react";

export default function UserEdit({ user }) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        put(route("users.update", user.id));
    }

    return (
        <div>
            <Head title="Edit User" />

            <div className="flex justify-center">
                <div className="max-w-lg p-6 border rounded-sm mt-8">
                    <h2 className="text-2xl mb-4">Edit Username</h2>

                    <form className="flex flex-col" onSubmit={submit}>
                        {/* Username */}
                        <label htmlFor="name" className="mb-2">
                            Username
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Username"
                                required
                                className="w-full rounded-sm py-2 px-2 border text-black"
                            />
                            {errors.name && (
                                <p className="text-red-500 mt-2">{errors.name}</p>
                            )}
                        </label>

                        {/* Password */}
                        <label htmlFor="password" className="mb-2">
                            Enter your Current Password
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="w-full rounded-sm py-2 px-2 border text-black"
                            />
                            {errors.password && (
                                <p className="text-red-500 mt-2">{errors.password}</p>
                            )}
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`mt-4 rounded-sm py-2 text-white ${
                                processing
                                    ? "bg-gray-500"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update Username"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
