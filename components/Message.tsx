"use client";
import { Doc, Id } from '@/convex/_generated/dataModel';
import React from 'react'
import dynamic from 'next/dynamic';
import EnhancedTooltip from './EnhancedTooltip';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Thumbnail } from './Thumbnail';
import MessageToolbar from './MessageToolbar';
import { useUpdateMessage } from '@/hooks/use-update-message';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRemoveMessage } from '@/hooks/use-remove-message';
import useConfirm from '@/hooks/useConfirm';
import { useToggleMessage } from '@/hooks/use-toggle-reaction';
import { Reactions } from './Reactions';

const Renderer = dynamic(() => import('./Renderer'), { ssr: false });
const Editor = dynamic(() => import('./Editor'), { ssr: false });

interface MessageProps {
    id: Id<"messages">;
    memberId: Id<"members">;
    authorImage?: string;
    authorName?: string;
    isAuthor: boolean;
    reactions: Array<Omit<Doc<"reactions">, "memberId"> & {
        count: number;
        memberIds: Id<"members">[];
    }>;
    body: Doc<"messages">["body"];
    image: string | null | undefined;
    createdAt: Doc<"messages">["_creationTime"];
    updatedAt: Doc<"messages">["updatedAt"];
    isEditing: boolean;
    setEditingId: (id: Id<"messages"> | null) => void;
    isCompact?: boolean;
    hideThreadButton?: boolean;
    threadCount?: number;
    threadImage?: string;
    threadTimestamp?: number;
}

const Message = ({
    id,
    memberId,
    authorImage,
    authorName = "Member",
    isAuthor,
    reactions,
    body,
    image,
    createdAt,
    updatedAt,
    isEditing,
    setEditingId,
    isCompact,
    hideThreadButton,
    threadCount,
    threadImage,
    threadTimestamp,
}: MessageProps) => {


    const { confirm: { confirm, ConfirmDialog } } = useConfirm({
        confirm: {
            title: "Delete message?",
            message: "You are about to delete this message. This action is irreversible."
        }
    })

    const { mutate: updateMessage, isPending: isUpdatingMessage } = useUpdateMessage();
    const { mutate: removeMessage, isPending: isRemovingMessage } = useRemoveMessage();
    const { mutate: toggleReaction, isPending: isTogglingReaction } = useToggleMessage();
    const isPending = isUpdatingMessage;

    const handleReaction = (value: string) => {
        toggleReaction({ messageId: id, value }, {
            // onSuccess: () => {
            //     toast.success("Reaction added");
            // },
            onError: (error) => {
                console.log(error);
                toast.error("Error adding reaction");
            },
        });
    }

    const handleUpdate = ({ body }: { body: string }) => {
        updateMessage({ id, body }, {
            onSuccess: () => {
                toast.success("Message updated");
                setEditingId(null);
            },
            onError: (error) => {
                console.log(error);
                toast.error("Error updating message");
            },
        });
    }

    const handleRemove = async () => {
        const ok = await confirm();
        if (!ok) return;
        removeMessage({ id }, {
            onSuccess: () => {
                toast.success("Message Deleted")
                //TODO: close thread if opened
            },
            onError: () => {
                toast.error("Error deleting message")
            }
        });
    }

    if (isCompact) {
        return (
            <>
                <ConfirmDialog />
                <div className={cn(
                    'flex gap-2 cursor-pointer rounded-md p-4 transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-800/80 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 group',
                    // TODO: Improve colors
                    isEditing && 'bg-[#f2c94c]/50 dark:bg-[#f2c94c]/80'
                )}>
                    <EnhancedTooltip label={format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}>
                        <button className='text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 '>
                            {format(new Date(createdAt), "MMM dd")}
                        </button>
                    </EnhancedTooltip>
                    {isEditing ? (
                        <div className='w-full h-full'>
                            <Editor
                                onSubmit={handleUpdate}
                                disabled={isPending}
                                defaultValue={JSON.parse(body)}
                                onCancel={() => setEditingId(null)}
                                variant='update'
                            />
                        </div>
                    ) : (
                        <div>
                            <Renderer value={body} />
                            <Thumbnail image={image} />
                            {updatedAt && (
                                <div className='text-xs text-neutral-500 text-muted-foreground dark:text-neutral-400 '>
                                    (Edited)
                                </div>
                            )}
                            <Reactions data={reactions} onChange={handleReaction} />
                        </div>
                    )}
                    {!isEditing && (
                        <MessageToolbar
                            isAuthor={isAuthor}
                            isPending={isPending}
                            handleEdit={() => setEditingId(id)}
                            handleThread={() => { }}
                            handleDelete={handleRemove}
                            handleReaction={handleReaction}
                            hideThreadButton={hideThreadButton}
                        />
                    )}
                </div>
            </>
        )
    }

    return (
        <>
            <ConfirmDialog />
            <div className={cn(
                'flex gap-2 cursor-pointer rounded-md p-4 transition-all duration-200 hover:shadow-lg dark:hover:shadow-neutral-800/80 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 group',
                // TODO: Improve colors
                isEditing && 'bg-[#f2c94c]/50 dark:bg-[#f2c94c]/80'
            )}>
                <div className="">
                    <button>
                        <Avatar>
                            <AvatarImage src={authorImage} alt={authorName} className='w-8 h-8 rounded-full' />
                            <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </button>
                </div>
                {isEditing ? (
                    <div className='w-full h-full'>
                        <Editor
                            onSubmit={handleUpdate}
                            disabled={isPending}
                            defaultValue={JSON.parse(body)}
                            onCancel={() => setEditingId(null)}
                            variant='update'
                        />
                    </div>
                ) : (
                    <div>
                        <div className="flex gap-2 mb-1.5">
                            <h3 className='font-bold text-lg '>
                                {authorName}
                            </h3>
                            <EnhancedTooltip label={format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}>
                                <button className='text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400 '>
                                    {format(new Date(createdAt), "h:mm a")}
                                </button>
                            </EnhancedTooltip>
                        </div>
                        <div className="">
                            <Renderer value={body} />
                            <Thumbnail image={image} />
                            {updatedAt && (
                                <div className='text-xs text-neutral-500 text-muted-foreground dark:text-neutral-400 '>
                                    (Edited)
                                </div>
                            )}
                            <Reactions data={reactions} onChange={handleReaction} />
                        </div>
                    </div>
                )}
                {!isEditing && (
                    <MessageToolbar
                        isAuthor={isAuthor}
                        isPending={isPending}
                        handleEdit={() => setEditingId(id)}
                        handleThread={() => { }}
                        handleDelete={handleRemove}
                        handleReaction={handleReaction}
                        hideThreadButton={hideThreadButton}
                    />
                )}
            </div>
        </>
    )
}

export default Message 