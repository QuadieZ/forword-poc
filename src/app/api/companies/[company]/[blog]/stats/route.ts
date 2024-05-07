import { NextResponse } from "next/server";

export async function GET() {
    // get all users from supabase
    // https://nextjs.org/docs/app/building-your-application/routing/route-handlers
    return NextResponse.json({ message: 'Hello World' }, { status: 200 })
}