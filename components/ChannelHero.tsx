import React from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Hash } from 'lucide-react'

const ChannelHero = ({ name, creationTime }: { name: string, creationTime: number }) => {
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            className='mx-5 mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg shadow-lg'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className='flex items-center mb-4'
                variants={itemVariants}
            >
                <Hash className="w-6 h-6 mr-2 text-primary" />
                <h2 className='text-2xl font-bold text-primary'>
                    {name}
                </h2>
            </motion.div>

            <motion.p
                className='text-sm text-muted-foreground mb-2'
                variants={itemVariants}
            >
                Channel created on {format(creationTime, 'MMMM do, yyyy')}
            </motion.p>

            <motion.p
                className='text-sm text-foreground'
                variants={itemVariants}
            >
                Welcome to the beginning of the <strong className="text-primary">{name}</strong> channel.
                Share ideas, collaborate, and keep conversations organized in this space.
            </motion.p>

            {/* <motion.div
                className="mt-4 flex space-x-2"
                variants={itemVariants}
            >
                <motion.button
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Pin Channel
                </motion.button>
                <motion.button
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Invite Members
                </motion.button>
            </motion.div> */}
        </motion.div>
    )
}

export default ChannelHero