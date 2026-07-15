import Layout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react"
import { useRoute } from "ziggy-js";

export default function Show({ post }) {
    const route = useRoute();
    const { delete:destroy } = useForm();
    const { component } = usePage();
    console.log(usePage());

    function submit(e){
        e.preventDefault();
        destroy(route('posts.destroy', post));
    }

    return(
        <div className="mx-auto">
            <Layout>
            <Head title={component} />
            <div
                key={post.id}
                className="border rounded-md p-4 shadow-sm bg-white"
            >
                <p className="text-gray-700 mb-4 italic">Posted on: <sapn className="text-gray-500 text-sm mb-4 italic">{new Date(post.created_at).toString()}</sapn></p>
                <p className="text-gray-700 mb-2">{post.body}</p>
                <div className="mt-8 flex justify-end gap-4" >                    
                    <Link href={route('posts.edit', post)} className="px-4 py-2 bg-green-500 rounded-md text-white">Edit</Link>
                    <form onSubmit={submit} className="">
                        <button className="px-4 py-2 bg-red-500 rounded-md text-white">
                            Delete
                        </button>
                    </form>
                </div>
            </div>
            </Layout>
        </div>
    )
}