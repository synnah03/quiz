import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { route } from "ziggy-js";

export default function ImagesIndex() {

    const { images } = usePage().props;

    function destroyImage(id) {
        router.delete(route('image.destroy', id));
    }

    return (
        <AuthenticatedLayout>
        <div className="">
            <Head title="Images" />

            <div className="flex justify-end mb-8">
                <Link
                    href={route("image.uploadFile")}
                    className="border rounded-md px-4 py-2 font-bold hover:bg-gray-900 transition"
                    >
                    Upload New Images
                </Link>
            </div>

            <div className="w-full">
                {images.map(image => (
                    <div key={image.id} className="relative w-full mb-8">
                        <img
                            src={`/storage/${image.path}`}
                            alt={image.alt_text ?? ''}
                            className="rounded border w-full"
                        />
                        <button
                            onClick={() => destroyImage(image.id)}
                            className="absolute top-2 right-1 border hover:border-4 rounded-full border-red-600 px-3 py-1 text-red-600 text-2xl hover:font-bold"
                        >
                            X
                        </button> 
                </div>                   
                ))}
            </div>
        </div>
        </AuthenticatedLayout>
    );
}
