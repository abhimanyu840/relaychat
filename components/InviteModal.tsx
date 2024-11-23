"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle, Copy, RefreshCw } from "lucide-react"
import { toast } from 'sonner'
import { useNewJoinCode } from '@/hooks/une-new-join-code';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import useConfirm from '@/hooks/useConfirm';
import EnhancedTooltip from './EnhancedTooltip';

interface InviteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    name: string
    joinCode: string
}

const InviteModal: React.FC<InviteModalProps> = ({ open, setOpen, name, joinCode }) => {
    const [copied, setCopied] = useState(false)
    const workspaceId = useWorkspaceId()
    const { mutate, isPending } = useNewJoinCode();

    const { confirm: { confirm, ConfirmDialog } } = useConfirm({
        confirm: {
            title: "Are you sure?",
            message: "This will deactivate your current join code. Are you sure you want to proceed?"
        }
    })

    const inviteLink = `${window.location.origin}/join/${workspaceId}`

    const handleNewCode = async () => {
        const confirmed = await confirm()
        if (confirmed) {
            await mutate({ workspaceId }, {
                onSuccess: (id) => {
                    toast.success("New join code generated!")
                },
                onError: (error) => {
                    toast.error("Failed to generate new join code")
                }
            })
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            toast.success("Copied to clipboard!")
            setTimeout(() => setCopied(false), 2000)
        }).catch((err) => {
            console.error('Failed to copy: ', err)
            toast.error("Failed to copy")
        })
    }

    return (
        <>
            <ConfirmDialog />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Invite to {name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-6 py-6">
                        <div className="text-center w-full">
                            <Label className="text-xl font-semibold text-muted-foreground">Join Code</Label>
                            <div className="mt-2 text-4xl font-bold tracking-wider bg-accent p-6 rounded-lg uppercase flex items-center justify-between">
                                <span>{joinCode}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleNewCode}
                                    disabled={isPending}
                                    className="ml-2 hover:bg-accent-foreground/10"
                                >
                                    <EnhancedTooltip label="Generate new join code" side="bottom" align="center">
                                        <RefreshCw className={`h-5 w-5 ${isPending ? 'animate-spin' : ''}`} />
                                    </EnhancedTooltip>
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full space-y-4">
                            <Button
                                className="w-full py-6 text-lg"
                                onClick={() => copyToClipboard(inviteLink)}
                            >
                                {copied ? <CheckCircle className='h-5 w-5 mr-2' /> : <Copy className="h-5 w-5 mr-2" />}
                                {copied ? "Copied!" : "Copy Invite Link"}
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full py-6 text-lg"
                                onClick={() => copyToClipboard(joinCode)}
                            >
                                {copied ? <CheckCircle className='h-5 w-5 mr-2' /> : <Copy className="h-5 w-5 mr-2" />}
                                Copy Join Code
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InviteModal