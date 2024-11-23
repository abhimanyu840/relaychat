import { query } from "./_generated/server";
import { auth } from "./auth";

export const current = query({
    args: {},
    handler: async (context) => {
        const userId = await auth.getUserId(context);
        if (userId === null) {
            return null;
        }

        return await context.db.get(userId);

    },
})