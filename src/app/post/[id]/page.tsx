import { supabase } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, Share2 } from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function PostDetail({ params }: { params: { id: string } }) {
    // Await params if Next.js version requires it (future proofing), or use directly
    const { id } = await params;

    if (!supabase) {
        return <div>DB Connection Error</div>;
    }

    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (!post) {
        notFound();
    }

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
                        <button className="text-slate-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50">
                            <Share2 size={20} />
                        </button>
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
        </article>
    );
}
