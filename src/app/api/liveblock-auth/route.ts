import supabase from "@/supabase";
import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

const liveblocks = new Liveblocks({
    secret: "sk_dev_bRvn0gULdGkEN922EoBkYFUyYPpXrMH9GdKlqalTTenIe-u4faTco8R5wsLrHplO",
});

export async function POST(request: Request) {
    const { userId, sessionId } = await request.json()

    if (!userId) {
        throw new Error("User ID is missing in the request.");
    }

    console.log("fetching", userId)
    if (userId) {
        console.log("id", userId)
        // Get the current user from your database
        const user = await supabase!
            .from("user_info")
            .select("user_id, name, organization_id")
            .eq("user_id", userId)
            .limit(1)

        console.log(user)

        // Start an auth session inside your endpoint
        const session = liveblocks.prepareSession(
            userId,
            {
                userInfo: {
                    name: user.data?.[0]?.name ?? "Anonymous Unicorn",
                }
            }
        );

        console.log("session", session)

        // Use a naming pattern to allow access to rooms with wildcards
        // Giving the user read access on their org, and write access on their group
        session.allow(`${user.data?.[0].organization_id}-*`, session.FULL_ACCESS);

        // Authorize the user and return the result
        return session.authorize().then(res => {
            console.log(res)
            return NextResponse.json(res.body, { status: 200 })
        }).catch(err => {
            console.log(err)
            return NextResponse.json(err, { status: 500 })
        });
    }

    return NextResponse.json({ status: 500 })
}