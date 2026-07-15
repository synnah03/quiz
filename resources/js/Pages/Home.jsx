import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Home() {
  const { component, props: { user, posts } } = usePage();

  if (!posts) {
    return (
      <div className="text-center">
        <Head title={component} />
        <h1>Hello there {user.name}</h1>
        <p>No post available.</p>
      </div>
    );
  }

  return (
    <GuestLayout>
      <div className="mx-auto">
        <Head title={component} />
        <header className="items-center gap-2 py-10 lg:grid-cols-3">
            <nav className="flex justify-end items-center space-x-2">                
              <Link
                  href={route('login')}
                  className="rounded-md px-3 py-2 border text-nowrap hover:border-gray-900"
              >
                  Log in
              </Link>
              <Link
                  href={route('register')}
                  className="rounded-md px-3 py-2 border hover:border-gray-900"
              >
                  Register
              </Link>                    
            </nav>
        </header>
        <h1 className="text-2xl">
          Hello there, <span className="font-bold">{user?.name}</span>!!
        </h1>

        <br />

        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-md p-4 shadow-sm bg-white mb-4"
          >
            <p className="text-gray-700 mb-2">{post.body}</p>
          </div>
        ))}

        <Link
          href={route("posts.index")}
          className="text-blue-500 hover:text-blue-400 mt-4 cursor-pointer float-right"
        >
          View More
        </Link>
      </div>
      </GuestLayout>
  );
}
