"use client";
import ChannelHeader from '@/components/ChannelHeader';
import ChannelNotFound from '@/components/ChannelNotFound';
import ChatInput from '@/components/ChatInput';
import LoadingPage from '@/components/LoadingPage';
import MessageList from '@/components/MessageList';
import { useChannelId } from '@/hooks/use-channel-id';
import { useGetChannel } from '@/hooks/use-get-channel';
import { useGetMessages } from '@/hooks/use-get-messages';
import React from 'react'

const ChannelId = () => {
    const channelId = useChannelId();

    const { results, status, loadMore } = useGetMessages({ channelId });
    const { data: channel, isLoading: channelLoading } = useGetChannel({ id: channelId });

    if (channelLoading || status === "LoadingFirstPage") return <LoadingPage />;

    if (!channel) return (
        <ChannelNotFound />
    )

    return (
        <div className="flex flex-col h-full">
            <ChannelHeader title={channel.name} />
            <MessageList
                channelName={channel.name}
                channelCreationTime={channel._creationTime}
                data={results}
                loadMore={loadMore}
                isLoadingMore={status === "LoadingMore"}
                canLoadMore={status === "CanLoadMore"}
            />
            <div className="p-4 border-t">
                <ChatInput placeholder={`Message # ${channel.name}`} />
            </div>
        </div>
    )
}

export default ChannelId