import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

export default function Layout({ children }) {
    const route = useRoute();
    
    return(
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-500">
            <header class="bg-gray-800">
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center mx-auto py-4 px-4 md:px-12">
                    <Link href="/" ><div className="text-4xl text-red-700 font-semibold rounded-md">My App</div></Link>
                    <nav class="flex justify-between items-center gap-4 text-white py-6">
                        <Link href="/" class="font-bold">
                            Home
                        </Link>
                        <Link href="/about" class="font-bold">
                            About
                        </Link>
                        <Link href="/posts" class="font-bold">
                            Posts
                        </Link>
                        <Link href={route('users.index')} className="font-bold">
                            Users
                        </Link>
                        <Link href={route('roles.index')} className="font-bold">
                            Roles
                        </Link>
                        <Link href={route('image.index')} className="font-bold">
                            Images
                        </Link>
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="my-8 text-white">
                <div className="max-w-screen-2xl px-4 md:px-12 mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}