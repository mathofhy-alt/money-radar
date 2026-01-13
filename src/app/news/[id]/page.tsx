import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchLatestPolicies, fetchRelatedPolicies } from "@/lib/data-service";
import { generateBlogPost } from "@/lib/ai-writer";
import { ArrowLeft, Calendar, User, Share2, Printer, ChevronRight } from "lucide-react";
import { remark } from "remark";
import html from "remark-html";


interface PageProps {
    params: Promise<{ id: string }>;
}

async function markdownToHtml(markdown: string) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;

    // In real app, fetch single policy by ID. Since we mock, we fetch all and find one.
    const policies = await fetchLatestPolicies();
    // For demo: just pick a random one if ID doesn't match perfectly or find close match
    // In real implementation: `await fetchPolicy(id)`
    const match = policies.find(p => p.id === id) || policies[0];

    const post = generateBlogPost(match);

    return {
        title: `${post.title} - 머니레이더`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
        }
    };
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { id } = await params;
    const policies = await fetchLatestPolicies();
    const match = policies.find(p => p.id === id);

    if (!match) notFound();

    const post = generateBlogPost(match);
    const contentHtml = await markdownToHtml(post.content);
    const relatedPosts = await fetchRelatedPolicies(match.id);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link href="/news" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> 목록으로 돌아가기
                </Link>

                <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <header className="p-8 border-b border-slate-100">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                                2025 최신 정책
                            </span>
                            <span className="text-slate-400 text-xs">
                                {post.date}
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="hover:text-blue-600"><Share2 size={18} /></button>
                                <button className="hover:text-blue-600"><Printer size={18} /></button>
                            </div>
                        </div>
                    </header>

                    <div className="p-8 text-slate-800 leading-relaxed font-normal">


                        <div
                            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-blue-600 prose-li:marker:text-blue-500"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />


                    </div>
                </article>

                {/* Related Posts Section for increased Dwell Time */}
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        👀 이 지원금도 놓치지 마세요
                    </h3>
                    <div className="grid gap-4">
                        {relatedPosts.map((related) => (
                            <Link key={related.id} href={`/news/${related.id}`} className="group block bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">{related.title}</h4>
                                        <p className="text-sm text-slate-500 line-clamp-1">{related.summary}</p>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 mt-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
