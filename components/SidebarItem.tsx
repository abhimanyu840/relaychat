import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { Button } from './ui/button';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const sidebarItemVariants = cva(
    "w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "text-muted-foreground hover:text-primary hover:bg-primary/10",
                active: "text-primary bg-primary/10",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface SidebarItemProps extends VariantProps<typeof sidebarItemVariants> {
    label: string;
    id: string;
    icon: LucideIcon | IconType;
    href?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, id, icon: Icon, href, variant }) => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    const isActive = pathname === href || pathname === `/workspace/${workspaceId}/channel/${id}`;
    const itemHref = href || `/workspace/${workspaceId}/channel/${id}`;

    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                sidebarItemVariants({ variant: isActive ? "active" : variant }),
                "justify-start"
            )}
        >
            <Link href={itemHref}>
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
            </Link>
        </Button>
    )
}

export default SidebarItem