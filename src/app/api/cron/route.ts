import { type NextRequest, NextResponse } from "next/server";
import { generateAIContent } from "@/lib/openai-service";
import { savePostToDB } from "@/lib/db";

import { fetchLatestPolicies } from "@/lib/data-service";

// This endpoint triggers the automation manually or via Cron
export async function GET(request: NextRequest) {
  // 1. Check for Secret Key (Security)
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  console.log("🔄 Starting Automation Job...");

  // 2. Fetch Real Data
  const policies = await fetchLatestPolicies();
  if (!policies || policies.length === 0) {
    return NextResponse.json({ success: false, message: "No policies found" }, { status: 404 });
  }

  // Pick the first one for demonstration
  // TODO: Add logic to filter out already processed policies
  const targetPolicy = policies[0];
  console.log(`📝 Processing Policy: ${targetPolicy.title}`);

  const sourceText = `제목: ${targetPolicy.title}\n내용: ${targetPolicy.content || targetPolicy.summary}`;

  // 3. AI Processing
  const aiContent = await generateAIContent(sourceText);

  // 4. Save to DB
  const saved = await savePostToDB({
    id: targetPolicy.id, // Keep ID to update if exists
    title: targetPolicy.title,
    summary: targetPolicy.content?.substring(0, 200) || "",
    content: aiContent, // The AI written blog post
    category: targetPolicy.category,
    views: 0,
    date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    bg_color: "bg-indigo-600", // Default color
    created_at: new Date().toISOString(),
    source: "AI_GENERATED"
  });

  if (saved) {
    console.log("✅ Post saved to DB successfully!");
  } else {
    console.log("⚠️ DB Save skipped (Check Supabase credentials)");
  }

  return NextResponse.json({
    success: true,
    message: "Automation job executed successfully",
    policy_title: targetPolicy.title,
    generated_sample: aiContent?.substring(0, 100) + "..."
  });
}
