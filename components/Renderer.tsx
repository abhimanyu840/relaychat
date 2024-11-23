"use client";
import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import "@/app/editor.css";

const Renderer: React.FC<{ value: string }> = ({ value }) => {
    const [isEmpty, setIsEmpty] = useState(false);
    const rendererRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!rendererRef.current) return;
        const container = rendererRef.current;

        const quill = new Quill(document.createElement('div'), {
            theme: 'snow',
            readOnly: true,
        });

        try {
            const contents = JSON.parse(value);
            quill.setContents(contents);

            const isEmpty = quill.getText().trim().length === 0;
            setIsEmpty(isEmpty);

            container.innerHTML = quill.root.innerHTML;
        } catch (error) {
            console.error("Error parsing message content:", error);
            container.innerHTML = '<p class="text-destructive">Error rendering message</p>';
        }

        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [value])

    if (isEmpty) return null;

    return (
        <div ref={rendererRef} className="quill-content" />
    )
}

export default Renderer;