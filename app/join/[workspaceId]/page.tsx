"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import LoadingPage from "@/components/LoadingPage";
import { useGetWorkspaceInfo } from "@/hooks/use-get-workspace-info";
import { useJoin } from "@/hooks/use-join";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JoinPage() {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useJoin();
    const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
    const [joinCode, setJoinCode] = useState(['', '', '', '', '', '']);

    const isMember = useMemo(() => data?.isMember, [data?.isMember]);

    useEffect(() => {
        if (isMember) router.push(`/workspace/${workspaceId}`);
    }, [isMember, router, workspaceId]);


    useEffect(() => {
        // Autofocus the first input on component mount
        const firstInput = document.getElementById('join-code-0');
        if (firstInput) {
            firstInput.focus();
        }
    }, []);

    const handleComplete = () => {
        const code = joinCode.join('');
        mutate({ workspaceId, joinCode: code }, {
            onSuccess: (id) => {
                router.replace(`/workspace/${id}`);
                toast.success("Joined workspace!");
            },
            onError: (error) => {
                toast.error("Failed to join workspace");
            }
        });
    };

    const handleInputChange = (index: number, value: string) => {
        const newJoinCode = [...joinCode];
        newJoinCode[index] = value;
        setJoinCode(newJoinCode);

        // Move to next input if value is entered
        if (value && index < 5) {
            const nextInput = document.getElementById(`join-code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !joinCode[index] && index > 0) {
            const prevInput = document.getElementById(`join-code-${index - 1}`);
            prevInput?.focus();
        }
    };

    if (isLoading) return <LoadingPage />;

    if (!data) return <div>Workspace not found</div>;

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
                <div className="absolute top-3/4 right-1/4 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000"></div>
                <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-violet-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-6000"></div>
            </motion.div>

            {/* Content */}
            <div className="z-10 p-8 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center">Join {data.name}</h1>
                <div className="flex justify-center space-x-2 mb-6">
                    {joinCode.map((digit, index) => (
                        <Input
                            key={index}
                            id={`join-code-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-2xl"
                        />
                    ))}
                </div>
                <div className="flex justify-center space-x-4">
                    <Button onClick={() => router.push('/')} variant="outline">
                        Back to Home
                    </Button>
                    <Button onClick={handleComplete} disabled={isPending || joinCode.some(digit => !digit)}>
                        {isPending ? 'Joining...' : 'Join Workspace'}
                    </Button>
                </div>
            </div>
        </div>
    );
}