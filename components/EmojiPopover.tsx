"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";


export default function EmojiPopover({ children, hint = "Emoji", onEmojiSelect }: { children: React.ReactNode, hint?: string, onEmojiSelect: (emoji: any) => void }) {
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

    const onSelect = (emoji: any) => {
        onEmojiSelect(emoji);
        setPopoverOpen(false);

        setTimeout(() => {
            setTooltipOpen(false);
        }, 500)
    }

    return (
        <>
            <TooltipProvider>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen} >
                    <Tooltip
                        open={tooltipOpen}
                        onOpenChange={setTooltipOpen}
                        delayDuration={50}
                    >
                        <PopoverTrigger asChild>
                            <TooltipTrigger asChild>
                                {children}
                            </TooltipTrigger>
                        </PopoverTrigger>
                        <TooltipContent className="bg-primary text-primary-foreground px-3 py-1.5 text-sm rounded-md shadow-md">
                            <p>
                                {hint}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                    <PopoverContent className="p-0 w-full border-none shadow-none bg-transparent">
                        <Picker data={data} onEmojiSelect={onSelect} />
                    </PopoverContent>
                </Popover>
            </TooltipProvider>
        </>
    )

}