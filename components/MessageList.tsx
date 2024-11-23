"use client";

import React, { useRef, useEffect, useState } from 'react'
import { GetMessagesReturnType } from '@/hooks/use-get-messages';
import { differenceInMinutes, format, isToday, isYesterday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Message from './Message';
import ChannelHero from './ChannelHero';
import { Id } from '@/convex/_generated/dataModel';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useCurrentMember } from '@/hooks/use-current-member';

const TIME_THRESHOLD = 5;

interface MessageListProps {
    memberName?: string;
    memberImage?: string;
    channelName?: string;
    channelCreationTime?: number;
    variant?: "channel" | "thread" | "conversation";
    data: GetMessagesReturnType | undefined;
    loadMore: () => void;
    isLoadingMore: boolean;
    canLoadMore: boolean;
}

const formatDateLabel = (dateStr: Date) => {
    const date = new Date(dateStr);
    if (isToday(date)) {
        return "Today";
    }
    if (isYesterday(date)) {
        return "Yesterday";
    }
    return format(date, "EEEE, MMMM d");
}

const MessageList: React.FC<MessageListProps> = ({
    memberName,
    memberImage,
    channelName,
    channelCreationTime,
    variant = "channel",
    data,
    loadMore,
    isLoadingMore,
    canLoadMore
}) => {
    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const workspaceId = useWorkspaceId();
    const { data: currentMember } = useCurrentMember({ workspaceId });

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'auto' });
        }
    }, []);

    useEffect(() => {
        if (bottomRef.current && containerRef.current) {
            const container = containerRef.current;
            const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 1;

            if (isScrolledToBottom) {
                bottomRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [data]);

    const groupedMessages = data?.reduce((groups, message) => {
        const date = new Date(message._creationTime);
        const dateKey = format(date, "yyyy-MM-dd");
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(message);
        return groups;
    }, {} as Record<string, typeof data>);

    const sortedDates = Object.keys(groupedMessages || {}).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return (
        <div ref={containerRef} className="flex flex-col h-full overflow-y-auto p-4 space-y-4">
            {canLoadMore && (
                <div className="flex justify-center">
                    <Button
                        onClick={loadMore}
                        disabled={isLoadingMore}
                        variant="outline"
                        size="sm"
                        className="mb-4"
                    >
                        {isLoadingMore ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More"
                        )}
                    </Button>
                </div>
            )}
            <AnimatePresence>
                {sortedDates.map((dateKey) => (
                    <motion.div
                        key={dateKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-center">
                            <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full shadow-sm">
                                {formatDateLabel(new Date(dateKey))}
                            </span>
                        </div>
                        {groupedMessages![dateKey].map((message, index) => {
                            const prevMessage = groupedMessages![dateKey][index - 1];
                            const isCompact = prevMessage && prevMessage.user?._id === message.user?._id && differenceInMinutes(new Date(message._creationTime), new Date(prevMessage._creationTime)) < TIME_THRESHOLD;
                            return (
                                <Message
                                    key={message._id}
                                    id={message._id}
                                    memberId={message.memberId}
                                    authorImage={message.user.image}
                                    authorName={message.user.name}
                                    isAuthor={message.memberId === currentMember?._id}
                                    reactions={message.reactions}
                                    body={message.body}
                                    image={message.image}
                                    updatedAt={message.updatedAt}
                                    createdAt={message._creationTime}
                                    isEditing={editingId === message._id}
                                    setEditingId={setEditingId}
                                    isCompact={isCompact}
                                    hideThreadButton={variant === "thread"}
                                    threadCount={message.threadCount}
                                    threadImage={message.threadImage}
                                    threadTimestamp={message.threadTimestamp}
                                />
                            )
                        })}
                    </motion.div>
                ))}
                <div ref={bottomRef} />
            </AnimatePresence>

            {/* Move it to the top */}
            {/* Channel Here */}
            {variant === "channel" && channelName && channelCreationTime && (
                <ChannelHero
                    name={channelName}
                    creationTime={channelCreationTime}
                />
            )}
        </div>
    );
}

export default MessageList;