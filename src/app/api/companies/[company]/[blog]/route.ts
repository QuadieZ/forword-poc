import supabase from "@/supabase";
import { NextResponse } from "next/server";

export async function GET(_, {
    params
}: {
    params: { blog: string }
}) {
    const { blog } = params

    const { data, error } = await supabase!
        .from('blog')
        .select('*')
        .eq('blog_id', blog)

    const { data: orgData, error: orgError } = await supabase!
        .from('organization')
        .select('organization_name, description')
        .eq('organization_id', data?.[0].organization_id)
        .limit(1)

    if (error || orgError) {
        console.error(error)
        return NextResponse.json({ error: 'Error getting blog' }, { status: 500 })
    }

    return NextResponse.json({ blogData: data, companyData: orgData }, { status: 200 })
}