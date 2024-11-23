"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Info } from 'lucide-react'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useGetWorkspace } from '@/hooks/use-get-workspace'

const ToolBar: React.FC = () => {

    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkspace({ id: workspaceId });

    return (
        <div className="w-full bg-background border-b p-3 flex items-center justify-between">
            <div className="w-1/4" /> {/* Spacer */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                    <Input
                        type="text"
                        placeholder={`Search ${data?.name}`}
                        className="w-full pl-10 pr-4 py-2 rounded border-input focus:border-primary"
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-0 bottom-0 px-3 rounded-l hover:bg-transparent"
                        aria-label="Search"
                    >
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
            </div>
            <div className="w-1/4 flex justify-end">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-accent hover:text-accent-foreground"
                    aria-label="Information"
                >
                    <Info className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}

export default ToolBar