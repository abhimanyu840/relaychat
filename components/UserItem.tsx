import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import Link from 'next/link'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

const userItemVariants = cva(
    "flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-accent",
    {
        variants: {
            variant: {
                default: "text-foreground",
                active: "bg-accent text-accent-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface UserItemProps extends VariantProps<typeof userItemVariants> {
    id: string
    label: string
    image?: string
}

const UserItem: React.FC<UserItemProps> = ({ id, label = "Member", image, variant }) => {

    const workspaceId = useWorkspaceId();

    return (
        <Link href={`/workspace/${workspaceId}/members/${id}`}>
            <div className={cn(userItemVariants({ variant }))}>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={image} alt={label} />
                    <AvatarFallback>{label[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{label}</span>
            </div>
        </Link>
    )
}

export default UserItem