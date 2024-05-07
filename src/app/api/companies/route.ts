import supabase from "@/supabase";
import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { v4 as uuid } from "uuid";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

export async function GET() {
    // get all companies
    const { data, error } = await supabase!
        .from('organization')
        .select('organization_id, organization_name, description')

    if (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ data, status: 200 })
}

export async function POST(request: Request) {
    // create a new company

    const body = await request.json()

    const id = `org-${uuid()}`
    const { data, error: createOrganizationError } = await supabase!
        .from('organization')
        .insert([
            {
                organization_id: id,
                organization_name: body.organizationName,
                description: body.description,
                members_id: [body.currentUserId],
                followers_id: [],
                followers_count: 0,
                blogs_id: [],
            },
        ])
        .select()

    const { data: organizationData } = await supabase!
        .from('user_info')
        .select('organization_id')
        .eq('user_id', body.currentUserId)

    const existingId = organizationData![0].organization_id ?? []
    existingId.push(id)
    const { error } = await supabase!
        .from('user_info')
        .update({
            organization_id: existingId
        })
        .eq('user_id', body.currentUserId)

    console.log(error)
    if (createOrganizationError || error) {
        return NextResponse.json({ createOrganizationError }, { status: 500 })
    }

    const newMembers = [body.currentUserId]
    body.emails.forEach(async (email: string) => {
        const { data, error: checkUserError } = await supabase!
            .from('user_info')
            .select('user_id,organization_id')
            .eq('email', email)

        if (data && data.length > 0 && !checkUserError) {
            const existingId = data[0].organization_id ?? []
            existingId.push(id)
            await supabase!
                .from('user_info')
                .update({
                    organization_id: existingId
                })
                .eq('email', email)

            newMembers.push(data[0].user_id)

        } else {
            const uid = uuid()
            await supabase!.
                from('user_account')
                .insert(
                    {
                        user_id: `${uid}`,
                    }
                )
            await supabase!
                .from('user_info')
                .insert(
                    {
                        user_id: `${uid}`,
                        email,
                        organization_id: [id],
                        role_id: 'r000'
                    },
                )
            await resend.emails.send({
                from: 'Forword <team@pichy.dev>',
                to: email,
                subject: 'You have been invited to join Forword!',
                text: `You have been invited to join Forword! Click here to join: https://forword-poc.vercel.app/`, //TODO: Check if user is signed us
            })
        }
        await supabase!
            .from('organization')
            .update({
                members_id: newMembers,
            })
            .eq('organization_id', id)
    })

    return NextResponse.json({ data }, { status: 200 })

}