"use client";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import "@/app/editor.css";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile, ImageIcon, Type, Send, SmileIcon, XIcon, SendHorizonal } from "lucide-react";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";
import EnhancedTooltip from "./EnhancedTooltip";
import EmojiPopover from "./EmojiPopover";
import Image from "next/image";

type EditorValue = {
    image?: File | null;
    body: string;
};

interface EditorProps {
    onSubmit: ({ image, body }: EditorValue) => void;
    onCancel?: () => void;
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?: boolean;
    innerRef?: MutableRefObject<Quill | null>;
    variant?: "create" | "update";
}

export default function Editor({ onSubmit, onCancel, placeholder = "Write a message...", defaultValue = [], disabled = false, innerRef, variant = 'create' }: EditorProps) {
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isToolbarVisible, setIsToolbarVisible] = useState(true);

    const quillRef = useRef<Quill | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const submitRef = useRef(onSubmit);
    const placeholderRef = useRef(placeholder);
    const defaultValueRef = useRef(defaultValue);
    const disabledRef = useRef(disabled);
    const imageElementRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    })

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const options: QuillOptions = {
            theme: "snow",
            placeholder: placeholderRef.current,
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['clean']
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: "Enter",
                            handler: () => {

                                const text = quill.getText();
                                const addImage = imageElementRef.current?.files?.[0] || null;
                                const isEmpty = !addImage && text.replace(/<(.|\n)*?>/g, '').trim().length === 0;
                                if (isEmpty) return;
                                const body = JSON.stringify(quill.getContents());
                                submitRef.current?.({
                                    body,
                                    image: addImage,
                                });
                            }
                        },
                        shift_enter: {
                            key: "Enter",
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(quill.getSelection()?.index || 0, "\n");
                                return;
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);
        quillRef.current = quill;
        quillRef.current.focus();

        if (innerRef) {
            innerRef.current = quill;
        }

        quill.setContents(defaultValueRef.current);
        setText(quill.getText());

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText());
        })

        return () => {
            quill.off(Quill.events.TEXT_CHANGE);
            if (container) {
                container.innerHTML = "";
            }
            if (quillRef.current) {
                quillRef.current = null;
            }
            if (innerRef) {
                innerRef.current = null;
            }
        };
    }, [innerRef]);

    const toggleToolbar = () => {
        setIsToolbarVisible((current) => !current);
        const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');
        if (toolbarElement) {
            toolbarElement.classList.toggle('hidden');
        }
    };

    const isEmpty = !image && text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

    const onEmojiSelect = (emoji: any) => {
        const quill = quillRef.current;

        quill?.insertText(quill.getSelection()?.index || 0, emoji.native);
    }

    return (
        <div className={cn("flex flex-col space-y-2", disabled && "opacity-50 cursor-not-allowed")}>
            <input
                type="file"
                accept="image/*"
                ref={imageElementRef}
                onChange={(event) => setImage(event.target.files![0])}
                className="hidden"
            />
            <div className="relay-editor">
                <div ref={containerRef} />
                {!!image && (
                    <div className="p-2">
                        <div className="relative size-[60px] flex items-center justify-center group/image">
                            <EnhancedTooltip label="Remove Image">
                                <button
                                    onClick={() => {
                                        setImage(null);
                                        imageElementRef.current!.value = "";
                                    }}
                                    className="hidden group-hover/image:flex rounded-full bg-black/70 dark:bg-neutral-200 dark:hover:bg-neutral-300 hover:bg-black/80 absolute -top-2.5 -right-2.5 p-1 text-white dark:text-black z-10"
                                >
                                    <XIcon className="size-3.5" />
                                </button>
                            </EnhancedTooltip>
                            <Image alt="uploaded" src={URL.createObjectURL(image)} fill className="rounded-xl overflow-hidden border object-cover" />
                        </div>

                    </div>
                )}
                <div className="relay-editor-toolbar">
                    <div className="flex items-center space-x-2">
                        <EnhancedTooltip label={isToolbarVisible ? "Hide formatting" : "Show formatting"}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleToolbar}
                                disabled={disabled}
                            >
                                <Type className="h-4 w-4" />
                            </Button>
                        </EnhancedTooltip>

                        <EmojiPopover onEmojiSelect={onEmojiSelect}>
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={disabled}
                            >
                                <Smile className="h-4 w-4" />
                            </Button>
                        </EmojiPopover>

                        <EnhancedTooltip label="Image">
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={disabled}
                                onClick={() => imageElementRef.current?.click()}
                            >
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                        </EnhancedTooltip>

                    </div>
                    {variant === 'update' && (
                        <div className="flex gap-2 mx-2 p-2 items-center">
                            <Button onClick={onCancel} disabled={disabled} variant="ghost" className="text-primary"> Cancel </Button>
                            <Button onClick={() => {
                                onSubmit({
                                    body: JSON.stringify(quillRef.current?.getContents()),
                                    image,
                                })
                            }} disabled={disabled || isEmpty} variant="default" className={cn(
                                "text-black bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 cursor-pointer",
                                isEmpty && "opacity-50 cursor-not-allowed"
                            )}> Save </Button>
                        </div>
                    )}
                    {variant === 'create' && (
                        <Button onClick={() => {
                            onSubmit({
                                body: JSON.stringify(quillRef.current?.getContents()),
                                image,
                            })
                        }} disabled={disabled || isEmpty} variant="ghost" className={cn(
                            "text-primary bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 cursor-pointer",
                            isEmpty && "opacity-50 cursor-not-allowed"
                        )}>
                            <SendHorizonal className="h-4 w-4 mx-2 text-black" />
                        </Button>
                    )}
                </div>
            </div>
            {
                variant === 'create' && (
                    <p className={cn(
                        "text-xs text-muted-foreground opacity-0 transition ",
                        !isEmpty && "opacity-100"
                    )}>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⇧</span>Shift
                        </kbd>
                        <span className="mx-2">+</span>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            Enter
                        </kbd> to add a new line
                    </p>
                )
            }
        </div>
    );
}