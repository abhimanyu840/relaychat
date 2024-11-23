"use client";
import ChannelNotFound from '@/components/ChannelNotFound';
import LoadingPage from '@/components/LoadingPage';
import WorkspaceNotFound from '@/components/WorkspaceNotFound';
import { useCreateChannelModal } from '@/hooks/use-create-channel-modal';
import { useCurrentMember } from '@/hooks/use-current-member';
import { useGetChannels } from '@/hooks/use-get-channels';
import { useGetWorkspace } from '@/hooks/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'

const WorkspaceIdPage = ({ params }: { params: { workspaceId: string } }) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId });
    const [open, setOpen] = useCreateChannelModal();

    const channelId = useMemo(() => channels?.[0]?._id, [channels]);
    const isAdmin = useMemo(() => member?.role === 'admin', [member?.role]);

    useEffect(() => {
        if (workspaceLoading || channelsLoading || memberLoading || !member || !channels) return;

        if (channelId) {
            router.push(`/workspace/${workspaceId}/channel/${channelId}`);
        } else if (!open && isAdmin) {
            setOpen(true)
        }

    }, [
        workspaceLoading,
        channelsLoading,
        channels,
        workspace,
        open,
        setOpen,
        router,
        workspaceId,
        member,
        memberLoading,
        isAdmin,
    ])

    if (workspaceLoading || channelsLoading || memberLoading) return <LoadingPage />

    if (!workspace || !member) return (
        <>
            <WorkspaceNotFound />
        </>
    )

    return (
        <ChannelNotFound />
    )

}

export default WorkspaceIdPage
