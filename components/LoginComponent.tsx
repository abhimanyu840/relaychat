'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link'
import { useAuthActions } from "@convex-dev/auth/react";
// import { useToast } from '@/hooks/use-toast'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { TriangleAlertIcon } from 'lucide-react'

export default function LoginComponent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const { signIn } = useAuthActions();
    // const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        signIn("password", { email, password, flow: "signIn" }).then(res => {
            toast.success("You have successfully logged in")
            router.push("/");
        }).catch(err => {
            setError(err)
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500 opacity-20 blur-[100px] animate-pulse" />
            </div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-[350px] bg-background/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Welcome to RelayChat</CardTitle>
                        <CardDescription className="text-center">Login to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && <p className='text-sm rounded bg-red-200 dark:bg-red-200 text-red-500 p-2 text-center flex items-center'>
                            <TriangleAlertIcon className='mr-2 h-4 w-4' />
                            {error}
                        </p>}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                    Login
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <Button variant="outline" className="w-full" onClick={() => void signIn("github")}>
                                <FaGithub className="mr-2 h-4 w-4" /> GitHub
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => void signIn("google")}>
                                <FcGoogle className="mr-2 h-4 w-4" /> Google
                            </Button>
                        </div>
                        <p className='text-sm text-muted-foreground' >Don&apos;t have an account? <Link href="/signup" className="text-black dark:text-white">Sign up</Link></p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}