import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Workspace {
    id: Id<"workspaces">;
}

export const useGetWorkspace = ({ id }: Workspace) => {
    const data = useQuery(api.workspaces.getById, { id });

    const isLoading = data === undefined;

    return { data, isLoading, };

};