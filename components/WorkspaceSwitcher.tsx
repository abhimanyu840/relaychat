import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useGetWorkspaces } from '@/hooks/use-get-workspaces';
import { useGetWorkspace } from '@/hooks/use-get-workspace';
import { useCreateWorkspaceModal } from '@/hooks/use-create-workspace-modal';
import { Loader2Icon, Plus, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from './ui/avatar';

const WorkspaceSwitcher = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const workspaceId = useWorkspaceId();
    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const router = useRouter();

    const filteredWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceId);

    const handleCreateWorkspace = () => {
        console.log("Modal state (before opening):", open);
        setOpen(true);
        console.log("Modal state (after opening):", open); // This might still show false due to React state batching
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-16 h-16 rounded-sm p-0 overflow-hidden">
                    {workspaceLoading ? (
                        <Loader2Icon className='h-8 w-8 animate-spin' />
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <Avatar className="h-10 w-10 ">
                                <AvatarFallback>{workspace?.name[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {/* <ChevronDown className="h-4 w-4 mt-1" /> */}
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='right' align='start' className="w-56">
                <DropdownMenuItem className='flex items-center space-x-2 py-2' onClick={() => router.push(`/workspace/${workspace?._id}`)}>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{workspace?.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{workspace?.name}</span>
                        <span className="text-xs text-muted-foreground">Active workspace</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {filteredWorkspaces?.map((workspace) => (
                    <DropdownMenuItem key={workspace?._id} className='flex items-center space-x-2 py-2' onClick={() => router.push(`/workspace/${workspace?._id}`)}>
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>{workspace?.name[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium truncate">{workspace?.name}</span>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className='flex items-center space-x-2 py-2 cursor-pointer' onClick={handleCreateWorkspace}>
                    <div className='h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center'>
                        <Plus className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Create new workspace</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default WorkspaceSwitcher