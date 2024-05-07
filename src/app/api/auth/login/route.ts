import supabase from "@/supabase";

export async function POST(req: Request) {
    const body = await req.json();

    console.log("body", body)

    try {
        const { data: user, error } = await supabase!.from('user_info').select('*').eq('email', body.email)
        console.log(error)

        return new Response(JSON.stringify({ message: 'Login successful', user: user?.[0] }), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to login' }), { status: 500 });
    }
}