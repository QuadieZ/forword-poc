import supabase from "@/supabase";

export type EmailSignupPayload = {
  email: string
  password: string
}

export async function emailSignup(payload: EmailSignupPayload) {
  const { email, password } = payload

  if (!supabase) {
    throw new Error("Supabase client is not available")
  }

  const res = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/login",
    }
  })

  if (res.error || !res) {
    throw new Error("Failed to sign up")
  }

  return res.data
}