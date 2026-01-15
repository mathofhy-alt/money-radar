import BenefitFinder from "@/components/home/BenefitFinder";
import NewsletterCta from "@/components/home/NewsletterCta";
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/db";

// Force dynamic rendering to fetch fresh data on every request
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch real posts from Supabase
  let posts: any[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (data) posts = data;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50/50 to-white py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-blue-600 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            오늘 {posts.length > 0 ? posts.length : "1,240"}개의 지원금이 업데이트 되었습니다
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            내 통장에 꽂히는 <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">숨은 정부지원금</span>을 찾아드려요
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            매년 사라지는 미수령 환급금만 3조원.<br />
            복잡한 조건 없이 클릭 3번으로 내가 받을 혜택을 조회하세요.
          </p>

          <BenefitFinder />
        </div>
      </section>

      {/* Latest Posts Section (New!) */}
      {posts.length > 0 && (
        <section className="w-full py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">최신 지원금 소식</h2>
              <p className="text-slate-500">지금 바로 신청 가능한 따끈따끈한 정책들입니다.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`} className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`h-40 ${post.bg_color || "bg-blue-600"} flex items-center justify-center p-6 text-white`}>
                    <span className="text-5xl opacity-80">💰</span>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-3">
                      {post.category || "청년 지원"}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-slate-400">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>조회 {post.views}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "실시간 금융 데이터",
                desc: "은행 금리, 코인 시세 등 돈이 되는 정보를 실시간으로 업데이트합니다.",
                href: "/finance"
              },
              {
                icon: Zap,
                title: "AI 맞춤 추천",
                desc: "복잡한 공고문을 AI가 분석하여 나에게 딱 맞는 혜택만 골라줍니다.",
                href: "/news"
              },
              {
                icon: ShieldCheck,
                title: "안전한 조회",
                desc: "개인정보 입력 없이 오직 조건 선택만으로 간편하게 조회하세요.",
                href: "/benefit"
              }
            ].map((feature, idx) => (
              <Link key={idx} href={feature.href} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 block">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </div>
  );
}
