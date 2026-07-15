import { Head, usePage } from "@inertiajs/react";

export default function About() {

    const { component } = usePage();        

    return (
        <>
        <Head title={component} />
        
        <div class="" >This is About page</div>
        </>
    )
}
