"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Frown, Home, RefreshCcw } from 'lucide-react'

const ChannelNotFound = () => {
    const router = useRouter()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    }

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    const circleVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
            },
        },
    }

    return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
            {/* Colorful background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-30"></div>

            {/* Glassy overlay */}
            <div className="absolute inset-0 backdrop-blur-xl backdrop-filter"></div>

            {/* Animated shapes */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </motion.div>

            <motion.div
                className="relative z-10 text-center text-white bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="absolute inset-0 -z-10"
                    variants={pulseVariants}
                    animate="pulse"
                >
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="2"
                            fill="none"
                            variants={circleVariants}
                        />
                    </svg>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-8">
                    <Frown className="w-24 h-24 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Oops! Channel Not Found</h1>
                    <p className="text-xl">We couldn't locate the Channel you're looking for.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                    <p className="text-lg">Don't worry, here are some things you can try:</p>
                    <ul className="list-disc list-inside text-left inline-block">
                        <li>Check the channel URL and try again</li>
                        <li>Make sure you have the correct permissions</li>
                        <li>Contact your channel administrator</li>
                    </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 space-x-4">
                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm"
                    >
                        <Home className="mr-2 h-4 w-4" /> Go Home
                    </Button>
                    <Button
                        onClick={() => router.refresh()}
                        variant="outline"
                        className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm"
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ChannelNotFound;