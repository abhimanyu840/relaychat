"use client";
import { useCreateWorkspaceModal } from '@/hooks/use-create-workspace-modal';
import { useGetWorkspaces } from '@/hooks/use-get-workspaces';
import React, { useEffect, useMemo } from 'react'
import CreateWorkspaceModal from './CreateWorkspaceModal';
import { useRouter } from 'next/navigation';

const Workspace = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const { data, isLoading } = useGetWorkspaces();
    const router = useRouter();

    const workspaceId = useMemo(() => data?.[0]?._id, [data]);

    useEffect(() => {
        if (isLoading) return;

        if (workspaceId) {
            console.log("Redirect to workspace");
            router.replace(`/workspace/${workspaceId}`);
        } else if (!open) {
            setOpen(true);
        }
    }, [workspaceId, isLoading, open, setOpen]);

    return (
        <div>
            Workspace
            <CreateWorkspaceModal />
        </div>
    )
}

export default Workspace
