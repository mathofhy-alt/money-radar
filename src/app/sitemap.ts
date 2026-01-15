import { MetadataRoute } from "next";
import { supabase } from "@/lib/db";
import { MOCK_POLICIES } from "@/lib/data-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://money-radar.vercel.app";

    let posts: any[] = [];

    // 1. Fetch ALL posts from DB for Sitemap
    if (supabase) {
        const { data } = await supabase.from("posts").select("id, created_at");
        if (data) posts = data;
    }

    // 2. Add Mock posts as well (since we display them)
    // Avoid duplicates if mock ID exists in DB
    const dbIds = new Set(posts.map(p => p.id));
    const mockPosts = MOCK_POLICIES.filter(p => !dbIds.has(p.id)).map(p => ({
        id: p.id,
        created_at: p.createdAt
    }));

    const allPosts = [...posts, ...mockPosts];

    const postUrls = allPosts.map((post) => ({
        url: `${baseUrl}/post/${post.id}`,
        lastModified: new Date(post.created_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/benefit`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/finance`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        ...postUrls,
    ];
}
