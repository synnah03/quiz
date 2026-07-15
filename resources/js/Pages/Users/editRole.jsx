import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function UserEdit({ user, role }) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name || "",
        role: user.roles?.[0] ?? "",
    });
    const [roleErrors, setRoleError] = useState(true)

    function submit(e) {
        e.preventDefault();
        if(!data.role){
            setRoleError("Please select one role")
            return;
        }
        put(route("user.role.update", user.id));
    }

    return (
        <div>
            <Head title="Edit User" />

            <div className="flex justify-center">
                <div className="max-w-lg p-6 border rounded-sm mt-8">
                    <h2 className="text-2xl mb-4">Edit Role</h2>

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
                                disabled
                                className="w-full rounded-sm py-2 px-2 text-gray-200"
                            />
                            {errors.name && (
                                <p className="text-red-500 mt-2">{errors.name}</p>
                            )}
                        </label>

                        {/* Password */}
                        <label htmlFor="role" className="mb-2">
                            Please Select Role from below:
                            <select
                                className="w-full rounded-sm py-2 px-2 border text-black"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                >
                                <option value="" disabled>Select a role</option>
                                {role.map((r) => (
                                    <option key={r.id} value={r.name}>
                                    {r.name}
                                    </option>
                                ))}
                            </select>
                            {roleErrors && (
                                <p className="text-red-500 mt-2">{roleErrors}</p>
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
                            {processing ? "Updating..." : "Update Role"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
