import { Head, useForm, usePage } from "@inertiajs/react";

export default function UserCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { component } = usePage();

    function submit(e) {
        e.preventDefault();
        post("/users");
    }

    return (
        <>
            <div className="flex justify-center">
                <Head title="Create User" />
                <div className="max-w-lg p-6 border rounded-sm mt-8">
                    <h2 className="text-2xl mb-4">Register New User</h2>
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

                        {/* Email */}
                        <label htmlFor="email" className="mb-2">
                            Email
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="youremail@gmail.com"
                                required
                                className="w-full rounded-sm py-2 px-2 border text-black"
                            />
                            {errors.email && (
                                <p className="text-red-500 mt-2">{errors.email}</p>
                            )}
                        </label>

                        {/* Password */}
                        <label htmlFor="password" className="mb-2">
                            Password
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                required
                                className="w-full rounded-sm py-2 px-2 border text-black"
                            />
                            {errors.password && (
                                <p className="text-red-500 mt-2">{errors.password}</p>
                            )}
                        </label>

                        {/* Confirm Password */}
                        <label htmlFor="password_confirmation" className="mb-2">
                            Confirm Password
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData("password_confirmation", e.target.value)
                                }
                                required
                                className="w-full rounded-sm py-2 px-2 border text-black"
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-500 mt-2">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`mt-4 rounded-sm py-2 text-white ${
                                processing ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            disabled={processing}
                        >
                            {processing ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
