"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Provider as JotaiProvider } from "jotai";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (<>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <ConvexClientProvider>
                <JotaiProvider>
                    {children}
                </JotaiProvider>
            </ConvexClientProvider>
        </ThemeProvider>
    </>)
}