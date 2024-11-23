"use client";
import { useCurrentUser } from '@/hooks/get-current-user';
import React from 'react'
import { Button } from './ui/button';
import UserButton from './UserButton';
import { LogInIcon, Home, Activity, MessageSquare, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import WorkspaceSwitcher from './WorkspaceSwitcher';

const Sidebar = () => {
    const { data: user, isLoading } = useCurrentUser();

    return (
        <aside className='w-20 h-[calc(100vh-62px)] bg-background/80 backdrop-blur-md border-r border-border flex flex-col py-2 px-2'>
            <div className='flex flex-col items-center h-[80vh] space-y-4'>
                <WorkspaceSwitcher />
                <Link href="/home">
                    <Button variant="ghost" size="icon" className="w-12 h-12">
                        <Home className="h-6 w-6" />
                    </Button>
                </Link>
                <Link href="/activity">
                    <Button variant="ghost" size="icon" className="w-12 h-12">
                        <Activity className="h-6 w-6" />
                    </Button>
                </Link>
                <Link href="/dms">
                    <Button variant="ghost" size="icon" className="w-12 h-12">
                        <MessageSquare className="h-6 w-6" />
                    </Button>
                </Link>
                <Button variant="ghost" size="icon" className="w-12 h-12">
                    <MoreHorizontal className="h-6 w-6" />
                </Button>
            </div>
            <div className='flex items-center flex-col gap-2 mt-auto'>
                <ThemeToggle />
                {user ? (
                    <UserButton user={{ name: user?.name!, image: user?.image, email: user?.email }} isLoading={isLoading} />
                ) : (
                    <Link href={'/login'}>
                        <Button variant={'outline'} className="w-full">
                            <LogInIcon className="mr-2 h-4 w-4" /> Sign In
                        </Button>
                    </Link>
                )}
            </div>
        </aside>
    )
}

export default Sidebar