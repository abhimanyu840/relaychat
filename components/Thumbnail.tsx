import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export const Thumbnail = ({ image }: { image: string | null | undefined }) => {
    if (!image) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>

                <div className="relative overflow-hidden rounded-md cursor-zoom-in max-w-80 ">
                    <img
                        src={image}
                        alt="Thumbnail"
                        className=" object-cover size-full"
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-2 p-4 max-w-[50rem]">
                <DialogHeader>
                    <DialogTitle>Image Preview</DialogTitle>
                    <DialogDescription>Click to close</DialogDescription>
                </DialogHeader>
                <img
                    src={image}
                    alt="Thumbnail"
                    className="object-cover w-full h-full"
                />
            </DialogContent>
        </Dialog>
    );
};