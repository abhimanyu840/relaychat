"use client";

import React, { useState } from 'react'
import { useCreateWorkspaceModal } from '@/hooks/use-create-workspace-modal';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateWorkspace } from '@/hooks/use-create-workspace';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const [workspaceName, setWorkspaceName] = useState('');
    const router = useRouter();

    const { mutate, data, isPending, error, isError, isSettled, isSuccess } = useCreateWorkspace();


    const handleClose = () => {
        setOpen(false);
        setWorkspaceName('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await mutate({
                name: workspaceName,
            }, {
                onSuccess(id) {
                    toast.success("Workspace Created");
                    router.push(`/workspace/${id}`);
                    handleClose();
                },
                onError: () => {
                    //Show toast error
                },
                onSettled() {
                    //Reset form
                }
            },)
            handleClose();
        } catch (error) {

        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Workspace</DialogTitle>
                    <DialogDescription>
                        Enter a name for your new workspace. Click create when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="workspace-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="workspace-name"
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                className="col-span-3"
                                placeholder="Workspace"
                                minLength={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkspaceModal