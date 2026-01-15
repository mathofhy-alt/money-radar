import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { MOCK_POLICIES } from "@/lib/data-service";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 3;

    // 1. Fetch from DB
    if (supabase) {
        let query = supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(limit);

        // If category provided, filter
        // Note: Our current categories might not perfectly match 'youth', 'worker' etc.
        // so we might need fuzzy search or ensure categorization is consistent.
        // For now, let's fetch recent posts.
        if (category) {
            query = query.eq("category", category);
        }

        const { data } = await query;

        if (data && data.length > 0) {
            return NextResponse.json(data);
        }
    }

    // 2. Fallback to Mock if DB empty for this category
    // Filter MOCK_POLICIES by category
    const mocks = MOCK_POLICIES.filter(p => !category || p.category === category).slice(0, limit);
    return NextResponse.json(mocks);
}
