import { type NextRequest, NextResponse } from "next/server";
import { generateAIContent } from "@/lib/openai-service";
import { savePostToDB, supabase } from "@/lib/db";
import { fetchLatestPolicies } from "@/lib/data-service";

// This endpoint triggers the automation manually or via Cron
export async function GET(request: NextRequest) {
  console.log("🔄 Starting Automation Job...");

  // 1. Fetch Real Data
  const policies = await fetchLatestPolicies();
  if (!policies || policies.length === 0) {
    return NextResponse.json({ success: false, message: "No policies found" }, { status: 404 });
  }

  // Pick the first one (In real prod, use cursor or status to find un-processed one)
  const targetPolicy = policies[0];

  // 2. Fetch Previous Posts for Internal Linking
  let relatedLinks: { title: string; url: string }[] = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://money-radar.vercel.app";

  if (supabase) {
    // Fetch latest 10 posts to pick from
    const { data: oldPosts } = await supabase
      .from("posts")
      .select("id, title")
      .order("created_at", { ascending: false })
      .limit(10);

    if (oldPosts && oldPosts.length > 0) {
      // Shuffle and pick 3
      const shuffled = oldPosts.sort(() => 0.5 - Math.random());
      relatedLinks = shuffled.slice(0, 3).map(p => ({
        title: p.title,
        url: `${baseUrl}/post/${p.id}`
      }));
    }
  }

  console.log(`📝 Processing Policy: ${targetPolicy.title}`);
  console.log(`🔗 Injecting ${relatedLinks.length} internal links`);

  const sourceText = `제목: ${targetPolicy.title}\n내용: ${targetPolicy.content || targetPolicy.summary}`;

  // 3. AI Processing (Review with Links)
  const aiContent = await generateAIContent(sourceText, relatedLinks);

  // 4. Save to DB
  const saved = await savePostToDB({
    id: targetPolicy.id,
    title: targetPolicy.title,
    summary: targetPolicy.content?.substring(0, 200) || "",
    content: aiContent,
    category: targetPolicy.category,
    views: 0,
    date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    bg_color: "bg-indigo-600",
    created_at: new Date().toISOString(),
    source: "AI_GENERATED"
  });

  if (saved) {
    console.log("✅ Post saved to DB successfully!");
  } else {
    console.log("⚠️ DB Save skipped");
  }

  return NextResponse.json({
    success: true,
    message: "Automation job executed successfully",
    policy_title: targetPolicy.title,
    internal_links_count: relatedLinks.length
  });
}
