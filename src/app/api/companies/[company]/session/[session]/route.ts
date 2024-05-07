import supabase from "@/supabase"
import { NextResponse } from "next/server"

export async function GET(_, {
    params
}: {
    params: { session: string }
}) {
    const { session } = params

    const { data } = await supabase!
        .from('session')
        .select('blog_id')
        .eq('session_id', `${session}`)
        .limit(1)

    const { data: blogData } = await supabase!
        .from('blog')
        .select('blog_name, blog_description, blog_id')
        .eq('blog_id', data?.[0].blog_id)
        .limit(1)

    return NextResponse.json({ blogData }, { status: 200 })
}

export async function POST(request: Request, {
    params
}: {
    params: { company: string, session: string }
}) {
    const body = await request.json()
    const { blogName, blogId, content } = body

    const { data, error } = await supabase!
        .from('blog')
        .update({
            blog_name: blogName,
            blog_detail: content,
            blog_post_date: new Date().toISOString(),
            publish: true
        })
        .eq('blog_id', blogId)

    const { error: deleteSession } = await supabase!
        .from('session')
        .delete()
        .eq('session_id', params.session)

    const { data: companyBlogs } = await supabase!
        .from('organization')
        .select('blogs_id')
        .eq('organization_id', params.company)
        .limit(1)


    const { error: addToOrgError } = await supabase!
        .from('organization')
        .update({
            blogs_id: [...companyBlogs?.[0].blogs_id, blogId]
        })
        .eq('organization_id', params.company)

    console.log(data, error, deleteSession, addToOrgError)
    if (error || deleteSession || addToOrgError) {
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
}