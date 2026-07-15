import { useForm } from "@inertiajs/react";

const UploadFile = () => {
    const { data, setData, post, processing, errors } = useForm({
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        post('/Images/saveImage');
    }

    return(
        <div>
            <h1>This is Upload Image</h1>

                <div className="flex justify-center">
                <form
                    onSubmit={submit}
                    className="mx-auto border w-full max-w-md p-4 flex flex-col"
                >
                    <label htmlFor="image" className="mb-6">
                        Upload Image
                    </label>

                    <input
                        type="file"
                        id="image"
                        className="mb-4 border rounded-sm"
                        onChange={e => setData('image', e.target.files[0])}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="py-1 border rounded-sm bg-green-800 hover:bg-green-600"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UploadFile;