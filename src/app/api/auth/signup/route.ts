import supabase, { emailSignup } from "@/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const { data, error: checkUserError } = await supabase!
        .from('user_info')
        .select('email')
        .eq('email', body.email)

    if (data && data.length > 0 && !checkUserError) {
        console.log('exits')
        return NextResponse.json({ error: 'Email already exists' }, { status: 404 })
    }

    await emailSignup({ email: body.email, password: body.password })
        .then(async res => {
            const uid = res?.user?.id
            if (!uid) {
                return NextResponse.json({ error: 'Failed to sign up' }, { status: 500 })
            }
            const { error: firstError } = await supabase!
                .from('user_account')
                .upsert(
                    {
                        user_id: uid,
                        register_date: new Date().toISOString(),
                    }
                )

            const { error } = await supabase!
                .from('user_info')
                .insert(
                    {
                        user_id: uid,
                        email: body.email,
                        name: body.name,
                        username: body.username,
                        role_id: 'r000'
                    }
                )

            console.log(error, firstError)
            if (error || firstError) {
                return NextResponse.json({ error: 'Failed to create account, Please try again' }, { status: 500 })
            }

        })
        .catch(err => {
            return NextResponse.json({ error: err.message }, { status: 500 })
        })
    return NextResponse.json({ message: 'Account created' }, { status: 200 })
}