"use client"

import React, { useState } from 'react'
import { ChevronDown, Edit, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useUpdateChannel } from '@/hooks/use-update-channel'
import { useChannelId } from '@/hooks/use-channel-id'
import { toast } from 'sonner'
import { useRemoveChannel } from '@/hooks/use-remove-channel'
import useConfirm from '@/hooks/useConfirm'
import { useRouter } from 'next/navigation'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useCurrentMember } from '@/hooks/use-current-member'

export default function ChannelHeader({ title }: { title: string }) {
    const channelId = useChannelId();
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { data: member } = useCurrentMember({ workspaceId });
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
    const [newChannelName, setNewChannelName] = useState(title)

    const { confirm: { confirm, ConfirmDialog } } = useConfirm({
        confirm: {
            title: "Delete this channel!",
            message: "You are about to delete this channel. This action is irreversible."
        }
    })

    const handleOpen = (value: boolean) => {
        if (member?.role !== "admin") return
        setIsRenameModalOpen(false)

    }

    const { mutate: updateChannel, isPending: isUpdatingChannel } = useUpdateChannel();
    const { mutate: removeChannel, isPending: isRemovingChannel } = useRemoveChannel();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setNewChannelName(value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateChannel({ id: channelId, name: newChannelName }, {
            onSuccess: () => {
                toast.success("Channel Updated")
                setIsRenameModalOpen(false)
            },
            onError: () => {
                toast.error("Error updating channel")
            }
        })
    }

    const handleDelete = async () => {
        const ok = await confirm();
        if (!ok) return;
        removeChannel({ id: channelId }, {
            onSuccess: () => {
                toast.success("Channel Deleted")
                router.push(`/workspace/${workspaceId}`);
            },
            onError: () => {
                toast.error("Error deleting channel")
            }
        });
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 border-b">
            <ConfirmDialog />
            <div className="flex items-center">
                <h2 className="text-lg font-semibold">
                    # {title}
                </h2>
                {member?.role === 'admin' && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setIsRenameModalOpen(true)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Rename Channel
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={handleDelete} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Channel
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            <Dialog open={isRenameModalOpen} onOpenChange={handleOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Rename Channel</DialogTitle>
                        <DialogDescription>
                            Enter a new name for the channel.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Input
                                    id="name"
                                    value={newChannelName}
                                    onChange={handleChange}
                                    className="col-span-4"
                                    disabled={isUpdatingChannel}
                                    placeholder="Enter new channel name"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" disabled={isUpdatingChannel} onClick={() => setIsRenameModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isUpdatingChannel}>
                                {isUpdatingChannel ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}