"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const LoadingPage: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[130px] opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[130px] opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-[130px] opacity-70 animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-[130px] opacity-70 animate-blob animation-delay-6000"></div>
            </motion.div>
            <div className="relative w-full h-full">
                {/* Glowing background circles */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-50"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-50"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-50"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />

                {/* Loading spinner and text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.h2
                        className="mt-4 text-2xl font-bold text-white"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        Loading...
                    </motion.h2>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage