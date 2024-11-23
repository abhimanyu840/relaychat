import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EnhancedTooltipProps {
    label: string
    children: React.ReactNode
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
    delayDuration?: number
}

const EnhancedTooltip: React.FC<EnhancedTooltipProps> = ({
    label,
    children,
    side = "top",
    align = "center",
    delayDuration = 50,
}) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={delayDuration}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="bg-primary text-primary-foreground px-3 py-1.5 text-sm rounded-md shadow-md">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default EnhancedTooltip