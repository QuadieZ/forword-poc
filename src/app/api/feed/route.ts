import supabase from "@/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const uid = body.uid

    const { data: topPostsData, error: topPostsError } = await supabase!
        .from('blog')
        .select('blog_id, organization_id, blog_name, blog_image, blog_description')
        .order('blog_likes_count', { ascending: false })
        .limit(5)

    const { data: recommendedPostsData, error: recomendedPostsError } = await supabase!
        .from('blog')
        .select('blog_id, organization_id, blog_name, blog_image, blog_description')
        .limit(5)
        .eq('is_recommended', true)

    const { data: followingOrganizations, error: followingError } = await supabase!
        .from('organization')
        .select('organization_id')
        .order('followers_count', { ascending: false })
        .contains('followers_id', [uid])
        .limit(5)

    const followingPosts: any[] = []

    uid && followingOrganizations?.forEach(async (org) => {
        const { data, error } = await supabase!
            .from('blog')
            .select('blog_id, organization_id, blog_name, blog_image, blog_description')
            .eq('organization_id', org.organization_id)
            .order('created_at', { ascending: false })
            .limit(1)

        if (data) {
            followingPosts.push(data)
        }

        if (error) {
            console.error(error)
        }
    })

    if (topPostsError || recomendedPostsError || followingError) {
        console.log(topPostsError, recomendedPostsError, followingError)
        return NextResponse.json({ error: topPostsError || recomendedPostsError || followingError }, { status: 500 })
    }

    return NextResponse.json({
        data: {
            topPostsData, recommendedPostsData, followingPosts
        }, status: 200
    })
}