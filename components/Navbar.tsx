'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { MessageSquare, Menu, MessageCircleCode, LogInIcon } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import LogoutButton from './LogoutButton'
import UserButton from './UserButton'
import { useCurrentUser } from '@/hooks/get-current-user'

const Navbar = () => {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Chat', href: '/chat' },
        { name: 'About', href: '/about' },
    ]

    const { data: user, isLoading } = useCurrentUser();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center w-full h-16 px-4 md:px-6 bg-background/80 backdrop-blur-md border-b border-border'
        >
            <div className='flex flex-row items-center space-x-4'>
                <Link href="/" className="flex items-center space-x-2">
                    {/* <motion.img
                        src="/logo.png"
                        alt="RelayChat logo"
                        className='w-8 h-8'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    /> */}
                    <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <MessageCircleCode className='w-8 h-8' />
                    </motion.span>
                    <motion.p
                        className='text-2xl font-bold hidden sm:block'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        RelayChat
                    </motion.p>
                </Link>
            </div>

            <div className='hidden md:flex space-x-4'>
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={item.href}>
                            <Button variant="ghost">{item.name}</Button>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className='flex items-center space-x-4'>
                <ThemeToggle />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <Button variant="ghost" className="w-full justify-start">
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <Button size="sm" className="hidden md:flex">
                    <MessageSquare className="mr-2 h-4 w-4" /> Start Chat
                </Button>
                {user ? <UserButton user={{ name: user?.name!, image: user?.image, email: user?.email }} isLoading={isLoading} /> : <Link href={'/login'}> <Button variant={'outline'} className="w-full"><LogInIcon className="mr-2 h-4 w-4" /> Sign In</Button></Link>}
                {/* <LogoutButton /> */}
            </div>
        </motion.nav>
    )
}

export default Navbar