export default function RolesCreate({ permissions }) {
    console.log(permissions);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Role</h2>
      
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
  );
}
