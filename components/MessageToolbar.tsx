import React from 'react'
import { Button } from './ui/button'
import { MessageSquareTextIcon, Pencil, Smile, Trash } from 'lucide-react'
import EnhancedTooltip from './EnhancedTooltip'
import EmojiPopover from './EmojiPopover'

const MessageToolbar = ({
    isAuthor,
    isPending,
    handleEdit,
    handleThread,
    handleDelete,
    handleReaction,
    hideThreadButton
}: {
    isAuthor: boolean,
    isPending: boolean,
    handleEdit: () => void,
    handleThread: () => void,
    handleDelete: () => void,
    handleReaction: (value: string) => void,
    hideThreadButton?: boolean
}) => {
    return (
        <div className='absolute right-5 invisible group-hover:visible border rounded-md border-neutral-200 dark:border-neutral-800 p-0.5 bg-neutral-200 dark:bg-neutral-900'>

            <EmojiPopover hint='Add Reaction' onEmojiSelect={(emoji) => { handleReaction(emoji.native) }}>
                <Button variant={'ghost'} size={'sm'} disabled={isPending} >
                    <Smile className='size-4' />
                </Button>
            </EmojiPopover>

            {!hideThreadButton && (
                <EnhancedTooltip label='Reply in Thread'>
                    <Button variant={'ghost'} size={'sm'} disabled={isPending} >
                        <MessageSquareTextIcon className='size-4' />
                    </Button>
                </EnhancedTooltip>
            )}

            {isAuthor && (
                <EnhancedTooltip label='Edit Message'>
                    <Button variant={'ghost'} size={'sm'} disabled={isPending} onClick={handleEdit} >
                        <Pencil className='size-4' />
                    </Button>
                </EnhancedTooltip>
            )}

            {isAuthor && (
                <EnhancedTooltip label='Delete Message'>
                    <Button variant={'ghost'} size={'sm'} disabled={isPending} onClick={handleDelete} >
                        <Trash className='size-4' />
                    </Button>
                </EnhancedTooltip>
            )}
        </div>
    )
}

export default MessageToolbar
