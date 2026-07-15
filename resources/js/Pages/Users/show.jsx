import { usePage } from "@inertiajs/react";

export default function UserShow ( user ){
    return(
        <div>
            <p className="text-3xl text-white mb-2">
                {user.user.name}
            </p>
            <p>
                {user.user.email}
            </p>
        </div>
    )
}