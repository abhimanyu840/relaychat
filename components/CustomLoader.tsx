'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CustomLoaderProps {
    size?: 'sm' | 'md' | 'lg'
    color?: string
    className?: React.HTMLAttributes<HTMLDivElement>['className']
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ size = 'md', color = 'currentColor', className }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16'
    }

    const circleVariants = {
        hidden: { opacity: 0, rotate: 0 },
        visible: (index: number) => ({
            opacity: 1,
            rotate: 360,
            transition: {
                opacity: { duration: 0.2, ease: "easeInOut" },
                rotate: { duration: 1.5, ease: "linear", repeat: Infinity, delay: index * 0.15 }
            }
        })
    }

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {[0, 1, 2].map((index) => (
                <motion.span
                    key={index}
                    className={`absolute inset-0 ${sizeClasses[size]}`}
                    custom={index}
                    variants={circleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        border: `calc(${size === 'sm' ? '2px' : '3px'}) solid ${color}`,
                        borderRadius: '50%',
                        borderTopColor: 'transparent',
                    }}
                />
            ))}
        </div>
    )
}

export default CustomLoader