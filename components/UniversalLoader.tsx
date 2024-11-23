'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface UniversalLoaderProps {
    message?: string
}

const UniversalLoader: React.FC<UniversalLoaderProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Spotlight effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary opacity-20 blur-[100px] animate-pulse" />
            </div>

            {/* Dark mode spotlight */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500 opacity-10 blur-[100px] animate-pulse" />
            </div>

            <div className="relative z-10">
                <motion.div
                    className="relative"
                    animate={{
                        scale: [1, 1.01, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <Loader2 className="w-16 h-16 text-primary" />
                    </motion.div>
                </motion.div>
                <motion.p
                    className="mt-4 text-lg font-medium text-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {message}
                </motion.p>
            </div>
        </div>
    )
}

export default UniversalLoader