import { useState, useCallback, useMemo } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

interface UseConfirmOptions {
    title: string
    message: string
}

interface UseConfirmInstance {
    confirm: () => Promise<boolean>
    ConfirmDialog: React.FC
}

interface UseConfirmReturn {
    [key: string]: UseConfirmInstance
}

const useConfirm = (configs: Record<string, UseConfirmOptions>): UseConfirmReturn => {
    const [openStates, setOpenStates] = useState<Record<string, boolean>>({})
    const [resolvers, setResolvers] = useState<Record<string, (value: boolean) => void>>({})

    const createConfirmFunction = useCallback((key: string) => {
        return () => {
            setOpenStates(prev => ({ ...prev, [key]: true }))
            return new Promise<boolean>((resolve) => {
                setResolvers(prev => ({ ...prev, [key]: resolve }))
            })
        }
    }, [])

    const handleConfirm = useCallback((key: string) => {
        resolvers[key]?.(true)
        setOpenStates(prev => ({ ...prev, [key]: false }))
    }, [resolvers])

    const handleCancel = useCallback((key: string) => {
        resolvers[key]?.(false)
        setOpenStates(prev => ({ ...prev, [key]: false }))
    }, [resolvers])

    const result = useMemo(() => {
        return Object.entries(configs).reduce((acc, [key, config]) => {
            const ConfirmDialogComponent = () => (
                <ConfirmDialog
                    isOpen={openStates[key] || false}
                    title={config.title}
                    message={config.message}
                    onConfirm={() => handleConfirm(key)}
                    onCancel={() => handleCancel(key)}
                />
            )

            acc[key] = {
                confirm: createConfirmFunction(key),
                ConfirmDialog: ConfirmDialogComponent
            }

            return acc
        }, {} as UseConfirmReturn)
    }, [configs, openStates, createConfirmFunction, handleConfirm, handleCancel])

    return result
}

export default useConfirm