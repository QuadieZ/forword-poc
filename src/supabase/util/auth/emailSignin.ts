import supabase from "@/supabase"

export type EmailSigninPayload = {
    email: string
    password: string
}

export async function emailSignin(payload: EmailSigninPayload) {
    const { email, password } = payload

    if (!supabase) {
        throw new Error("Supabase client is not available")
    }

    const res = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (res.error || !res) {
        throw new Error("Failed to sign in")
    }

    return res.data
}