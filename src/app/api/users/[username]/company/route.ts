import supabase from "@/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request, {
    params
}: { params: { username: string } }) {
    const { targetOrgIds } = await req.json();
    const { username } = params;

    console.log(username)
    if (targetOrgIds) {
        const { data, error } = await supabase!
            .from("organization")
            .select("*")
            .in("organization_id", targetOrgIds);

        return NextResponse.json({ status: 200, data })
    }
    return NextResponse.json({ status: 200 })
}
