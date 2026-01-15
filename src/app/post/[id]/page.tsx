import { supabase } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Eye } from "lucide-react";

import { MOCK_POLICIES } from "@/lib/data-service";

// Force dynamic rendering
export const dynamic = "force-dynamic";

import ShareButton from "@/components/common/ShareButton";

// ... existing imports ...

export default async function PostDetail({ params }: { params: { id: string } }) {
    // ... existing post fetching logic ...
    const { id } = await params;

    let post = null;

    // 1. Try fetching from DB
    if (supabase) {
        const { data } = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();
        if (data) post = data;
    }

    // 2. Fallback to Mock Data (if DB missing or connection failed)
    if (!post) {
        const mock = MOCK_POLICIES.find(p => p.id === id);
        if (mock) {
            post = {
                ...mock,
                content: mock.content || mock.summary || "내용이 없습니다.", // Fallback content
                created_at: new Date().toISOString()
            };
        }
    }

    if (!post) {
        notFound();
    }

    // --- Related Posts Logic ---
    let relatedPosts: any[] = [];
    if (supabase) {
        const { data } = await supabase
            .from("posts")
            .select("id, title, category, date, views")
            .neq("id", id) // Exclude current post
            .eq("category", post.category) // Same category
            .limit(3);

        if (data) relatedPosts = data;
    }

    // Fallback Related (Mock) if DB empty
    if (relatedPosts.length === 0) {
        relatedPosts = MOCK_POLICIES.filter(p => p.id !== id && p.category === post.category).slice(0, 3);
    }
    // ---------------------------

    return (
        <article className="min-h-screen bg-white">
            {/* Header */}
            <div className={`relative w-full h-80 ${post.bg_color || 'bg-indigo-600'} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm text-sm font-semibold mb-4 border border-white/30">
                        {post.category || "정부 지원금"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={16} />
                            {post.views}회 조회
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-3xl -mt-20 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-20 animate-fade-in-up">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                            <ArrowLeft size={20} />
                            목록으로
                        </Link>
                        {/* Dynamic Share Button */}
                        <ShareButton title={post.title} />
                    </div>

                    {/* AI Generated Content */}
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-blue-600 hover:prose-a:text-blue-700">
                        {/* Simple markdown to HTML conversion for demo. In prod use 'react-markdown' or 'remark' */}
                        {post.content.split('\n').map((line: string, i: number) => {
                            if (line.startsWith('# ')) return <h1 key={i} className="text-3xl mt-8 mb-4">{line.replace('# ', '')}</h1>;
                            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl mt-8 mb-4">{line.replace('## ', '')}</h2>;
                            if (line.startsWith('### ')) return <h3 key={i} className="text-xl mt-6 mb-3">{line.replace('### ', '')}</h3>;
                            if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
                            if (line.trim() === '') return <br key={i} />;
                            return <p key={i}>{line}</p>;
                        })}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-sm mb-4">
                            이 정보는 정부 공공데이터를 기반으로 AI가 요약한 내용입니다.<br />
                            정확한 정보는 반드시 공식 홈페이지를 확인해주세요.
                        </p>
                        <a href="https://www.youthcenter.go.kr" target="_blank" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-200">
                            👉 공식 홈페이지 바로가기
                        </a>
                    </div>
                </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
                <section className="container mx-auto px-4 max-w-3xl mb-20">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">💰 함께 보면 좋은 지원금</h3>
                    <div className="grid gap-4">
                        {relatedPosts.map((rp, idx) => (
                            <Link href={`/post/${rp.id}`} key={idx} className="block group bg-white border border-slate-100 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                                            {rp.category || "추천"}
                                        </span>
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            {rp.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm mt-1">{rp.date} • 조회 {rp.views}</p>
                                    </div>
                                    <div className="text-slate-300 group-hover:text-blue-600 transition-colors">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
