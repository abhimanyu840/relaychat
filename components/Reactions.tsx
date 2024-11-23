import { Doc, Id } from "@/convex/_generated/dataModel";

interface ReactionsProps {
    data: Array<Omit<Doc<"reactions">, "memberId"> & {
        count: number;
        memberIds: Id<"members">[];
    }>;
    onChange: (value: string) => void;
};

export const Reactions = ({ data, onChange }: ReactionsProps) => {
    return (
        <div className="flex gap-2 items-center">
            {data.map(({ value, count, memberIds }) => (
                <button
                    key={value}
                    className="flex items-center gap-2 rounded-md p-2 text-sm text-neutral-500 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 hover:text-neutral-700 dark:hover:text-neutral-400"
                    onClick={() => onChange(value)}
                >
                    {value}
                    <span className="text-xs">{count}</span>
                </button>
            ))}
        </div>
    );
};