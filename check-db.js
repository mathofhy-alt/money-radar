require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function check() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error("DB Error:", error);
    } else if (data && data.length > 0) {
        console.log("✅ 최신 글 확인됨!");
        console.log("제목:", data[0].title);
        console.log("생성시간:", data[0].created_at);
    } else {
        console.log("📭 아직 생성된 글이 없습니다.");
    }
}

check();
