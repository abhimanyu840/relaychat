"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const { signOut } = useAuthActions();

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
    };

    return (
        <>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </>
    )
}