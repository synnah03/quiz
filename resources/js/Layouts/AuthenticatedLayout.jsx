// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link, usePage } from '@inertiajs/react';
// import { useState } from 'react';

// export default function AuthenticatedLayout({ header, children }) {
//     const user = usePage().props.auth.user;

//     const [showingNavigationDropdown, setShowingNavigationDropdown] =
//         useState(false);

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <nav className="border-b border-gray-100 bg-white">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="flex h-16 justify-between">
//                         <div className="flex">
//                             <div className="flex shrink-0 items-center">
//                                 <Link href="/">
//                                     <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
//                                 </Link>
//                             </div>

//                             <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
//                                 <NavLink
//                                     href={route('posts.index')}
//                                     active={route().current('posts.index')}
//                                 >
//                                     posts.index
//                                 </NavLink>
//                             </div>
//                         </div>

//                         <div className="hidden sm:ms-6 sm:flex sm:items-center">
//                             <div className="relative ms-3">
//                                 <Dropdown>
//                                     <Dropdown.Trigger>
//                                         <span className="inline-flex rounded-md">
//                                             <button
//                                                 type="button"
//                                                 className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
//                                             >
//                                                 {user.name}

//                                                 <svg
//                                                     className="-me-0.5 ms-2 h-4 w-4"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     viewBox="0 0 20 20"
//                                                     fill="currentColor"
//                                                 >
//                                                     <path
//                                                         fillRule="evenodd"
//                                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                                         clipRule="evenodd"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                         </span>
//                                     </Dropdown.Trigger>

//                                     <Dropdown.Content>
//                                         <Dropdown.Link
//                                             href={route('profile.edit')}
//                                         >
//                                             Profile
//                                         </Dropdown.Link>
//                                         <Dropdown.Link
//                                             href={route('logout')}
//                                             method="post"
//                                             as="button"
//                                         >
//                                             Log Out
//                                         </Dropdown.Link>
//                                     </Dropdown.Content>
//                                 </Dropdown>
//                             </div>
//                         </div>

//                         <div className="-me-2 flex items-center sm:hidden">
//                             <button
//                                 onClick={() =>
//                                     setShowingNavigationDropdown(
//                                         (previousState) => !previousState,
//                                     )
//                                 }
//                                 className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
//                             >
//                                 <svg
//                                     className="h-6 w-6"
//                                     stroke="currentColor"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         className={
//                                             !showingNavigationDropdown
//                                                 ? 'inline-flex'
//                                                 : 'hidden'
//                                         }
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                     <path
//                                         className={
//                                             showingNavigationDropdown
//                                                 ? 'inline-flex'
//                                                 : 'hidden'
//                                         }
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div
//                     className={
//                         (showingNavigationDropdown ? 'block' : 'hidden') +
//                         ' sm:hidden'
//                     }
//                 >
//                     <div className="space-y-1 pb-3 pt-2">
//                         <ResponsiveNavLink
//                             href={route('posts.index')}
//                             active={route().current('posts.index')}
//                         >
//                             posts.index
//                         </ResponsiveNavLink>
//                     </div>

//                     <div className="border-t border-gray-200 pb-1 pt-4">
//                         <div className="px-4">
//                             <div className="text-base font-medium text-gray-800">
//                                 {user.name}
//                             </div>
//                             <div className="text-sm font-medium text-gray-500">
//                                 {user.email}
//                             </div>
//                         </div>

//                         <div className="mt-3 space-y-1">
//                             <ResponsiveNavLink href={route('profile.edit')}>
//                                 Profile
//                             </ResponsiveNavLink>
//                             <ResponsiveNavLink
//                                 method="post"
//                                 href={route('logout')}
//                                 as="button"
//                             >
//                                 Log Out
//                             </ResponsiveNavLink>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {header && (
//                 <header className="bg-white shadow">
//                     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                         {header}
//                     </div>
//                 </header>
//             )}

//             <main>{children}</main>
//         </div>
//     );
// }

import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useRoute } from "ziggy-js";

export default function Layout({ children }) {
    const route = useRoute();
    const { props } = usePage();
    const [open, setOpen] = useState(false);

    const user = props.auth?.user;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-500">
            <header className="bg-gray-800">
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center py-4 px-4 md:px-12">
                    <div className="space-x-5">
                        <Link href={route('posts.index')} className="text-4xl text-red-700 font-semibold">
                            My App
                        </Link>
                    </div>

                    <nav className="flex gap-4 text-white">
                        <Link href="/posts" className="font-bold">Post</Link>
                        <Link href={route('quiz.index')} className="font-bold">Quiz</Link>
                        {/* <Link href={route('user.index')} className="font-bold">Users</Link> */}
                        {/* <Link href={route('role.index')} className="font-bold">Roles</Link> */}
                        {/* <Link href={route('image.index')} className="font-bold">Images</Link> */}
                        {user && (
                            <div className="relative">
                                {/* Trigger */}
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 font-bold focus:outline-none"
                                >
                                    {user.name}
                                    <svg
                                        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                {open && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                                        onMouseLeave={() => setOpen(false)}
                                    >
                                        <div className="px-4 py-3 border-b border-gray-700">
                                            <p className="text-sm font-medium text-white">{user.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                href={route("profile.edit")}
                                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                                            >
                                                Profile
                                            </Link>

                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                                            >
                                                Log Out
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            <main className="my-8 text-white">
                <div className="max-w-screen-2xl px-4 md:px-12 mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
