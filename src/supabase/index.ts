import { createClient } from "@supabase/supabase-js";

export function createSupabaseApp() {
    const SUPABASE_URL = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_SUPABASE_URL : process.env.SUPABASE_URL
    const SUPABSE_KEY = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_SUPABASE_KEY : process.env.SUPABASE_KEY

    if (!SUPABASE_URL || !SUPABSE_KEY) {
        console.error("Missing SUPABASE_URL or SUPABSE_KEY")
        return null
    }

    return createClient(SUPABASE_URL, SUPABSE_KEY)
}

const supabase = createSupabaseApp()
export default supabase

export * from './util';
