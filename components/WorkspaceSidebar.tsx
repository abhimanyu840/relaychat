"use client";

import React from 'react'
import { motion } from "framer-motion";
import { useCurrentMember } from '@/hooks/use-current-member';
import { useGetWorkspace } from '@/hooks/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useGetChannels } from '@/hooks/use-get-channels';
import { useGetMembers } from '@/hooks/use-get-members';
import WorkspaceNotFound from './WorkspaceNotFound';
import { HashIcon, Loader2, MessageSquareText, SendHorizonal, UserPlus } from 'lucide-react';
import WorkspaceHeader from './WorkspaceHeader';
import SidebarItem from './SidebarItem';
import WorkspaceSection from './WorkspaceSection';
import UserItem from './UserItem';
import { useCreateChannelModal } from '@/hooks/use-create-channel-modal';
import { toast } from 'sonner';
import { useChannelId } from '@/hooks/use-channel-id';

const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const channelId = useChannelId();
    const [_open, setOpenChannel] = useCreateChannelModal();

    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId });
    const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId });

    if (workspaceLoading || memberLoading || channelsLoading || membersLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!workspace || !member) {
        return <WorkspaceNotFound />
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
            },
        },
    }

    const handleNewChannel = () => {
        // Implement new channel creation logic
        console.log("Create new channel");
        member.role === 'admin' ? setOpenChannel(true) : toast.error("You do not have permission to create a channel");
    }

    const handleInviteMember = () => {
        // Implement member invitation logic
        console.log("Invite new member");
    }

    return (
        <div className='flex flex-col h-full'>
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === 'admin'} />
            <div className="flex flex-col gap-2 p-4 overflow-y-auto">
                <WorkspaceSection label="Workspace">
                    <motion.div variants={itemVariants}>
                        <SidebarItem
                            label='Threads'
                            id='threads'
                            icon={MessageSquareText}
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <SidebarItem
                            label='Drafts & Sent'
                            id='drafts'
                            icon={SendHorizonal}
                        />
                    </motion.div>
                </WorkspaceSection>

                <WorkspaceSection
                    label="Channels"
                    hint="Create a new channel"
                    onNew={handleNewChannel}
                >
                    {channels?.map(item => (
                        <motion.div key={item._id} variants={itemVariants}>
                            <SidebarItem
                                label={item.name}
                                id={item._id}
                                icon={HashIcon}
                                variant={channelId === item._id ? 'active' : 'default'}
                            />
                        </motion.div>
                    ))}
                </WorkspaceSection>

                <WorkspaceSection
                    label="Direct Messages"
                    hint="Direct Messages"
                    onNew={handleInviteMember}
                >
                    {members?.map(item => (
                        <motion.div key={item._id} variants={itemVariants}>
                            <UserItem
                                id={item._id}
                                label={item.user.name!}
                                image={item.user.image}
                                variant={item._id === member._id ? 'active' : 'default'}
                            />
                        </motion.div>
                    ))}
                </WorkspaceSection>
            </div>
        </div>
    )
}

export default WorkspaceSidebar