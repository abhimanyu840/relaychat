"use client";

import React, { useState } from 'react'
import { useCreateChannelModal } from '@/hooks/use-create-channel-modal';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { useCreateChannel } from '@/hooks/use-create-channel';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateChannel } from '@/hooks/use-create-channel';
import { useWorkspaceId } from '@/hooks/use-workspace-id';

const CreateChannelModal = () => {
    const [open, setOpen] = useCreateChannelModal();
    const [channelName, setChannelName] = useState('');
    const router = useRouter();
    const { mutate, isPending } = useCreateChannel();
    const workspaceId = useWorkspaceId()

    // const { mutate, isPending, isError } = useCreateChannel();

    const handleClose = () => {
        setOpen(false);
        setChannelName('');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setChannelName(value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(
            { name: channelName, workspaceId }, {
            onSuccess: (id) => {
                toast.success("Channel Created!")
                router.push(`/workspace/${workspaceId}/channel/${id}`)
                handleClose();
            },
            onError: () => {
                toast.error("Failed to create the channel")
            }
        }
        )

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a Channel</DialogTitle>
                    <DialogDescription>
                        Enter a name for your new channel.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="channel-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="channel-name"
                                value={channelName}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="e.g. plan-budget"
                                minLength={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChannelModal