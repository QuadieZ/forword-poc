import supabase from "@/supabase"
import { NextResponse } from "next/server"

export async function GET(_, {
    params
}: { params: { company: string } }) {
    const { company } = params
    const { data: companyData, error: errorCompany } = await supabase!
        .from('organization')
        .select('organization_id, organization_name, description, blogs_id, followers_count, members_id')
        .eq('organization_id', company)

    const { data: blogData, error: errorBlog } = await supabase!
        .from('blog')
        .select('blog_id, blog_name, blog_image')
        .in('blog_id', companyData![0].blogs_id ?? [])

    const { data: memberData, error: errorMember } = await supabase!
        .from('user_info')
        .select('user_id, name')
        .in('user_id', companyData![0].members_id ?? [])

    const { data: activeSessions, error: sessionError } = await supabase!
        .from('session')
        .select('session_id,blog_id')
        .eq('organization_id', company)

    const { data: blogDataSession, error: blogDataSessionError } = await supabase!
        .from('blog')
        .select('blog_id, blog_name, blog_image')
        .eq('organization_id', company)
        .eq('publish', false)
    console.log(errorCompany, errorBlog, errorMember, sessionError, blogDataSessionError)

    if (errorCompany || errorBlog || errorMember || sessionError || blogDataSessionError) {

        return NextResponse.json({ error: 'Error querying from database' }, { status: 500 })
    }

    // get all blogs of company from supabase
    // https://nextjs.org/docs/app/building-your-application/routing/route-handlers
    return NextResponse.json({
        data: {
            activeSessions: activeSessions,
            blogDataSession: blogDataSession,
            members: memberData,
            blogs: blogData,
            company: companyData
        }, status: 200
    })
}

export async function POST(request: Request) {
    return NextResponse.json({ status: 200 })
}