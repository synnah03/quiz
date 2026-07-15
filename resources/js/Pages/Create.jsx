import Layout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react"

export default function Create (){
    const { data, setData, post, errors, processing} = useForm({
        body: "",
    });

    const { component } = usePage();    
    
    function submit(e){
        e.preventDefault();
        post('/posts')
    }
    
    console.log(errors);
    
    return(
        <>
        <Layout>
            <div className="flex justify-center">
                <Head title={component} />                
                <form className="max-w-5xl w-full p-4 flex flex-col" onSubmit={submit}>
                    <textarea rows={10} className={`rounded-md text-black ${errors.body && 'ring-5 ring-red-500'}`}
                    value={data.body}
                    onChange={(e)=>setData("body",e.target.value)}></textarea>

                    {errors.body && <p className="text-red-500 mt-2">{errors.body}</p>}
                    <button className={`mt-4 rounded-sm py-2 ${processing ? 'bg-gray-500' : 'bg-blue-500'}`} disabled={processing}>Create Post</button>
                </form>
            </div>
            </Layout>
        </>
    )
}