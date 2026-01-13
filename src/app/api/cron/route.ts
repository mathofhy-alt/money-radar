import { type NextRequest, NextResponse } from "next/server";
import { generateAIContent } from "@/lib/openai-service";
import { savePostToDB } from "@/lib/db";

// This endpoint triggers the automation manually or via Cron
export async function GET(request: NextRequest) {
    // 1. Check for Secret Key (Security)
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== \`Bearer \${process.env.CRON_SECRET}\`) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    console.log("🔄 Starting Automation Job...");

    // 2. Fetch Data (Mock for now, replace with real API call)
    // const rawData = await fetch('https://api.odcloud.kr/api/...');
    const mockRawPolicy = "2025년 청년 도약 계좌 신규 가입자 모집 공고...";

    // 3. AI Processing
    const aiContent = await generateAIContent(mockRawPolicy);

    // 4. Save to DB
    /* 
    await savePostToDB({
      title: "AI Generated Title",
      content: aiContent,
      created_at: new Date()
    });
    */

    return NextResponse.json({
        success: true,
        message: "Automation job executed successfully",
        generated_sample: aiContent?.substring(0, 100) + "..."
    });
}
