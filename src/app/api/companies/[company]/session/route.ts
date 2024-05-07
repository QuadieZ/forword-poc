import supabase from "@/supabase"
import { NextResponse } from "next/server"
import { v4 as uuid } from 'uuid'
export async function GET(_, {
    params
}: {
    params: { company: string }
}) {
    const { company } = params
    const { data: activeSessions, error: error } = await supabase!
        .from('sessions')
        .select('*')
}

export async function POST(request: Request, {
    params
}: {
    params: { company: string }
}) {
    // create a new session
    const body = await request.json()
    const { company } = params

    const sessionId = uuid()
    const blogId = uuid()

    const { error: errorBlog } = await supabase!
        .from('blog')
        .insert({
            blog_id: blogId,
            organization_id: company,
            blog_name: body.blogName,
            blog_description: body.description,
            publish: false,
            is_recommended: false,
            blog_likes_count: 0,
            user_id: body.uid,
        })

    const { error } = await supabase!
        .from('session')
        .insert({
            session_id: `${company}:${sessionId}`,
            organization_id: company,
            blog_id: blogId,
            owner_id: body.uid,
        })



    if (error || errorBlog) {
        console.error(error, errorBlog)
        return NextResponse.json({ error: 'Error creating blog' }, { status: 500 })
    }

    return NextResponse.json({ sessionId, status: 200 })
}