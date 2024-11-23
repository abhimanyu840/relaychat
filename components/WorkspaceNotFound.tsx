'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Frown, Home } from 'lucide-react'
import Link from 'next/link'

const WorkspaceNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 10, 0],
                        transition: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                    }}
                >
                    <Frown className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
                </motion.div>
                <motion.h1
                    className="text-4xl font-bold mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Workspace Not Found
                </motion.h1>
                <motion.p
                    className="text-xl text-muted-foreground mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Oops! It seems the workspace you're looking for doesn't exist.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Link href="/">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary opacity-10 blur-[100px] animate-pulse" />
            </motion.div>
        </div>
    )
}

export default WorkspaceNotFound