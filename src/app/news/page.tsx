import Link from "next/link";
import { fetchLatestPolicies } from "@/lib/data-service";
import { generateBlogPost } from "@/lib/ai-writer";
import { Clock, Eye, ChevronRight } from "lucide-react";
import PopularPostsWidget from "@/components/home/PopularPostsWidget";

export const revalidate = 3600; // Re-generate page every hour (Automation)

export default async function NewsPage() {
    const policies = await fetchLatestPolicies();
    const posts = policies.map(generateBlogPost);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">🔔 실시간 정책 뉴스</h1>
                    <p className="text-slate-500 mt-2">AI가 매일 새로운 지원금 정보를 수집하여 알려드립니다.</p>
                </div>
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-medium self-start md:self-auto">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    실시간 업데이트 중
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 grid md:grid-cols-2 gap-6 h-fit">
                    {posts.map((post) => (
                        <article key={post.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        {post.category === "youth" ? "청년" :
                                            post.category === "worker" ? "직장인" :
                                                post.category === "business" ? "사업자" : "금융"}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock size={12} /> {post.date}
                                    </span>
                                </div>

                                <Link href={`/news/${post.id}`} className="block">
                                    <h2 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Eye size={12} /> {Math.floor(Math.random() * 1000) + 100}회 조회
                                    </span>
                                    <Link href={`/news/${post.id}`} className="text-sm font-bold text-slate-700 flex items-center gap-1 group-hover:text-blue-600">
                                        읽기 <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-80 hidden lg:block space-y-6">
                    <PopularPostsWidget />
                    {/* Sidebar Ad Placeholder */}
                    <div className="w-full h-64 bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <span className="text-xs font-bold">SPONSORED</span>
                        <span className="text-xs">사이드바 광고</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}
