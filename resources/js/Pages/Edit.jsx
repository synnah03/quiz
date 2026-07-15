import Layout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react"
import { useRoute } from "ziggy-js";

export default function Create ({ post }){
    const { data, setData, put, errors, processing} = useForm({
        body: post.body,
    });

    const { component } = usePage();
    const route = useRoute();
    
    function submit(e){
        e.preventDefault();
        put(route('posts.update', post));
    }
        
    return(
        <Layout>
            <div className="flex justify-center">
                <Head title={component} />                
                <form className="w-full p-4 flex flex-col" onSubmit={submit}>
                    <textarea rows={10} className={`rounded-sm text-black ${errors.body && 'ring-1 ring-red-500'}`}
                    value={data.body}
                    onChange={(e)=>setData("body",e.target.value)}></textarea>

                    {errors.body && <p className="text-red-500 mt-2">{errors.body}</p>}
                    <button className={`mt-4 rounded-sm py-2 ${processing ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={processing}>Update Post</button>
                </form>
            </div>
        </Layout>
    )
}