"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useChannelId } from "@/hooks/use-channel-id";
import { useCreateMessage } from "@/hooks/use-create-message";
import { useGenerateUploadUrl } from "@/hooks/use-generate-upload-url";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

type CreateMessageValues = {
    channelId: Id<"channels">,
    workspaceId: Id<"workspaces">,
    body: string,
    image: Id<"_storage"> | undefined
}

export default function ChatInput({ placeholder }: { placeholder: string }) {
    const [editorKey, setEditorKey] = useState(0);
    const editorRef = useRef<Quill | null>(null);
    const [isPending, setIsPending] = useState(false);

    const workspaceId = useWorkspaceId();
    const channelId = useChannelId();
    const { mutate: generateUploadUrl } = useGenerateUploadUrl();
    const { mutate: createMessage } = useCreateMessage();

    const handleSubmit = async ({ body, image }: { image?: File | null; body: string; }) => {
        try {
            setIsPending(true);
            editorRef.current?.enable(false);
            const values: CreateMessageValues = {
                channelId,
                workspaceId,
                body,
                image: undefined
            };

            if (image) {
                const url = await generateUploadUrl({}, { throwError: true });
                if (!url) throw new Error("Failed to generate upload url");
                const result = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": image.type },
                    body: image,
                });

                if (!result.ok) throw new Error("Failed to upload image");

                const { storageId } = await result.json();
                values.image = storageId;
            }

            createMessage(values, { throwError: true });

            setEditorKey(prevKey => prevKey + 1);
        } catch (error) {
            toast.error("Failed to send message");
            setIsPending(false);
            editorRef.current?.enable(true);
            console.error(error);
        } finally {
            setIsPending(false);
            editorRef.current?.enable(true);
        }
    }

    return (
        <div className="px-5 w-full">
            <Editor
                key={editorKey}
                placeholder={placeholder}
                onSubmit={handleSubmit}
                disabled={isPending}
                innerRef={editorRef}
            />
        </div>
    );
}