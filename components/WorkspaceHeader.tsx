"use client";
import React, { useState } from 'react'
import { Doc } from '@/convex/_generated/dataModel'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ListFilter, Edit, UserPlus, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import EnhancedTooltip from './EnhancedTooltip'
import PreferencesModal from './PreferencesModal'
import InviteModal from './InviteModal';

const WorkspaceHeader = ({ workspace, isAdmin }: { workspace: Doc<'workspaces'>; isAdmin: boolean }) => {
    const [preferencesOpen, setPreferencesOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const handleInvite = () => {
        setIsInviteModalOpen(true)
    }

    return (
        <>
            <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={workspace.name} />
            <InviteModal open={isInviteModalOpen} setOpen={setIsInviteModalOpen} name={workspace.name} joinCode={workspace.joinCode} />
            <div className="flex items-center justify-between p-4 border-b bg-neutral-300 dark:bg-neutral-950">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2 min-w-0 max-w-full">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback>{workspace.name[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold truncate flex-1 text-left">{workspace.name}</span>
                            <ChevronDown className="h-4 w-4 flex-shrink-0" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback>{workspace.name[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="truncate">{workspace.name}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer" onClick={handleInvite} >
                            <UserPlus className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">Invite people to {workspace.name}</span>
                        </DropdownMenuItem>
                        {isAdmin && (
                            <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer" onClick={() => setPreferencesOpen(true)}>
                                <Settings className="h-4 w-4 flex-shrink-0" />
                                <span>Preferences</span>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center space-x-2 ml-2">
                    <EnhancedTooltip label="Filter Conversations" side="bottom" align="center">
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <ListFilter className="h-5 w-5" />
                        </Button>
                    </EnhancedTooltip>
                    <EnhancedTooltip label="New Messages" side="bottom" align="center">
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <Edit className="h-5 w-5" />
                        </Button>
                    </EnhancedTooltip>
                </div>
            </div>
        </>
    )
}

export default WorkspaceHeader