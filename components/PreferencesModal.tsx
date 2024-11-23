import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Edit, Trash2 } from "lucide-react"
import { useUpdateWorkspace } from "@/hooks/use-update-workspace"
import { useRemoveWorkspace } from "@/hooks/use-remove-workspace"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import useConfirm from "@/hooks/useConfirm"

interface PreferencesModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialValue: string
    // workspaceName: string
    // onWorkspaceNameChange: (newName: string) => void
    // onDeleteWorkspace: () => void
}

export default function PreferencesModal({
    open,
    setOpen,
    initialValue,
    // workspaceName,
    // onWorkspaceNameChange,
    // onDeleteWorkspace
}: PreferencesModalProps) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
    const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();
    const { confirm: { confirm, ConfirmDialog } } = useConfirm({
        confirm: {
            title: "Are you sure?",
            message: "This action cannot be undone. Are you sure you want to proceed?"
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateWorkspace({ id: workspaceId, name: value }, {
            onSuccess: () => {
                toast.success("Workspace name updated");
                setEditOpen(false);
            },
            onError: () => {
                toast.error("Error updating workspace name");
            }
        })
    }


    const onDeleteWorkspace = async () => {
        const confirmed = await confirm();
        if (!confirmed) return;
        removeWorkspace({ id: workspaceId }, {
            onSuccess: () => {
                router.replace("/");
                toast.success("Workspace deleted");
            },
            onError: () => {
                toast.error("Error deleting workspace");
            }
        })
    }

    return (
        <>
            <ConfirmDialog />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{value}</DialogTitle>
                    </DialogHeader>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger asChild>
                            <div className="grid gap-4 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold text-lg">Workspace name</span>
                                        <span className="font-normal text-sm">{value}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button size="sm" variant="ghost">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit workspace name</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4" onSubmit={handleSubmit} >
                                <Input
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="w-full"
                                    disabled={isUpdatingWorkspace}
                                    required
                                    autoFocus
                                    placeholder="Workspace name"
                                />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button size="sm" className="w-full" variant={"destructive"}>Cancel</Button>
                                    </DialogClose>
                                </DialogFooter>
                                <Button type="submit" size="sm" className="w-full" disabled={isRemovingWorkspace}>Save</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <DialogFooter>
                        <Button
                            variant="destructive"
                            onClick={onDeleteWorkspace}
                            className="w-full"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Workspace
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}