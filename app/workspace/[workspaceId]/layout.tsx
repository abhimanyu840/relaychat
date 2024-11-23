import React from 'react';
import Sidebar from "@/components/Sidebar";
import ToolBar from "@/components/Toolbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import WorkspaceSidebar from "@/components/WorkspaceSidebar";

export default function WorkspaceIdLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            <ToolBar />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <ResizablePanelGroup
                    direction="horizontal"
                    className="flex-1"
                    autoSaveId="relaychat-workspace-layout"
                >
                    <ResizablePanel
                        defaultSize={20}
                        minSize={15}
                        maxSize={30}
                        className="bg-neutral-200 dark:bg-neutral-900"
                    >
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={80} minSize={30}>
                        <div className="h-full overflow-auto p-4">
                            {children}
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}