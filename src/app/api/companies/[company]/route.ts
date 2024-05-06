import supabase from "@/supabase";
import { NextResponse } from "next/server";
import { uuid } from 'uuidv4';

export async function GET() {
    // get all blogs of company from supabase
    // https://nextjs.org/docs/app/building-your-application/routing/route-handlers
    return
}

export async function POST(request: Request) {
    // create a new company

    console.log(request)

    const { data, error } = await supabase!
        .from('organization')
        .insert([
            {
                organization_id: `org-${uuid()}`,
                organization_name: 'Company 1',
                members_id: []
            },
        ])
        .select()

    if (error) {
        return NextResponse.json({ error }, { status: 500 })
    } else {
        return NextResponse.json({ data }, { status: 200 })
    }
}