require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

async function verify() {
    console.log("🔍 시스템 점검을 시작합니다...");

    // 1. Env Check
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const oaKey = process.env.OPENAI_API_KEY;
    const dataKey = process.env.PUBLIC_DATA_API_KEY;
    const adSenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

    if (!sbUrl || !sbKey) {
        console.error("❌ Supabase 설정이 누락되었습니다.");
        return;
    }
    if (!oaKey) {
        console.error("❌ OpenAI 키가 누락되었습니다.");
        return;
    }
    if (!dataKey) {
        console.error("❌ 공공데이터 API 키가 누락되었습니다.");
        return;
    }
    if (!adSenseId) {
        console.error("❌ 애드센스 ID가 누락되었습니다.");
        return;
    }
    console.log("✅ 환경 변수 확인 완료 (" + adSenseId + ")");

    // 2. Supabase Connection Check
    try {
        const supabase = createClient(sbUrl, sbKey);
        const { data, error } = await supabase.from('posts').select('count', { count: 'exact', head: true });

        if (error) throw error;
        console.log("✅ Supabase 데이터베이스 연결 성공!");
    } catch (e) {
        console.error("❌ Supabase 연결 실패:", e.message);
        return;
    }

    // 3. OpenAI Check
    try {
        const openai = new OpenAI({ apiKey: oaKey });
        // Minimal call
        await openai.models.list();
        console.log("✅ OpenAI API 연결 성공!");
    } catch (e) {
        console.error("❌ OpenAI 연결 실패:", e.message);
        return;
    }

    console.log("\n🎉 모든 시스템이 정상입니다! 이제 서버를 실행하면 자동으로 돈을 벌기 시작합니다.");
}

verify();
