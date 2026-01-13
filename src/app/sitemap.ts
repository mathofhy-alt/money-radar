import { MetadataRoute } from "next";
import { fetchLatestPolicies } from "@/lib/data-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://money-radar.vercel.app";
    const policies = await fetchLatestPolicies();

    const newsUrls = policies.map((policy) => ({
        url: `${baseUrl}/news/${policy.id}`,
        lastModified: new Date(policy.createdAt),
        changeFrequency: "daily" as const,
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
        ...newsUrls,
    ];
}
