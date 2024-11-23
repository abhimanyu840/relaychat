'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageSquare, Zap, RefreshCw } from 'lucide-react'

export default function NotFound() {
    const [showMessage, setShowMessage] = useState(false)
    const controls = useAnimation()
    const [isHovering, setIsHovering] = useState(false)
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [])

    useEffect(() => {
        controls.start({
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }
        })
    }, [controls])

    useEffect(() => {
        const timer = setTimeout(() => setShowMessage(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    const bubbleVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        hover: { scale: 1.1, transition: { duration: 0.3 } }
    }

    const messageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    }

    return (
        hydrated && <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Spotlight effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary opacity-10 blur-[100px] animate-pulse bg-blue-700" />
            </div>

            <div className="text-center z-10">
                <motion.div
                    className="flex justify-center mb-8"
                    initial="initial"
                    animate="animate"
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-16 h-16 mx-2 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                            variants={bubbleVariants}
                            whileHover="hover"
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <MessageSquare className="w-8 h-8 text-primary-foreground" />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.h1
                    className="text-6xl font-bold mb-4 text-primary"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    4
                    <motion.span animate={controls} className="inline-block">0</motion.span>
                    4
                </motion.h1>

                <motion.p
                    className="text-2xl mb-8 text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    Oops! This chat room is lost in cyberspace.
                </motion.p>

                {showMessage && (
                    <motion.div
                        className="bg-card p-6 rounded-lg shadow-lg mb-8 max-w-md mx-auto"
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.9 }}
                    >
                        <p className="text-card-foreground text-lg">
                            <Zap className="inline-block mr-2 text-yellow-500" />
                            It seems you&apos;ve stumbled upon a glitch in the RelayChat matrix.
                            Don&apos;t worry, even our most talkative chatbots sometimes get tongue-tied!
                        </p>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="space-x-4"
                >
                    <Link href="/">
                        <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            Back to Home
                            <motion.span
                                className="ml-2"
                                animate={{ rotate: isHovering ? 360 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <RefreshCw className="w-4 h-4" />
                            </motion.span>
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="border-primary text-primary hover:bg-primary/10"
                    >
                        Retry Connection
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}