import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
// This will throw error if keys are missing in env, which is fine for now
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create client only if keys allow
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function savePostToDB(post: any) {
    if (!supabase) {
        console.warn("⚠️ DB not connected. Skipping save.");
        return false;
    }

    const { data, error } = await supabase
        .from("posts")
        .upsert(post, { onConflict: "id" })
        .select();

    if (error) {
        console.error("❌ DB Insert Error:", error);
        return false;
    }
    return true;
}
