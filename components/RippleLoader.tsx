'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface RippleLoaderProps {
    size?: 'sm' | 'md' | 'lg'
    color?: string
}

const RippleLoader: React.FC<RippleLoaderProps> = ({ size = 'md', color = 'currentColor' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    }

    const rippleVariants = {
        start: {
            opacity: 0.7,
            scale: 0.1,
        },
        end: {
            opacity: 0,
            scale: 1,
        },
    }

    const transitionProps = {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
    }

    return (
        <div className={`relative ${sizeClasses[size]}`}>
            {[...Array(3)].map((_, index) => (
                <motion.span
                    key={index}
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: `2px solid ${color}`,
                    }}
                    initial="start"
                    animate="end"
                    variants={rippleVariants}
                    transition={{
                        ...transitionProps,
                        delay: index * 0.5,
                    }}
                />
            ))}
            <span
                className={`absolute inset-0 rounded-full ${sizeClasses[size]}`}
                style={{
                    backgroundColor: color,
                    opacity: 0.3,
                }}
            />
        </div>
    )
}

export default RippleLoader