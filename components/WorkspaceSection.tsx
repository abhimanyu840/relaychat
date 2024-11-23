import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Button } from './ui/button'
import EnhancedTooltip from './EnhancedTooltip'

interface WorkspaceSectionProps {
    children: React.ReactNode
    label: string
    hint?: string
    onNew?: () => void
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
    children,
    label,
    hint,
    onNew
}) => {
    const [isExpanded, setIsExpanded] = useState(true)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 hover:bg-transparent"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                    </Button>
                    <h3 className="text-sm font-semibold text-foreground ml-1">{label}</h3>
                </div>
                {/* TODO: show add icon only to admin */}
                {onNew && (
                    <EnhancedTooltip
                        label={hint || `Add new ${label.toLowerCase()}`}
                        side="top"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-sm hover:bg-accent"
                            onClick={onNew}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </EnhancedTooltip>
                )}
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default WorkspaceSection