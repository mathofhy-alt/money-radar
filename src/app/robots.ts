import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://money-radar.vercel.app"; // Demo URL

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
