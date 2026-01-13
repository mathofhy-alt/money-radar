import Link from "next/link";
import { Trophy } from "lucide-react";
import { fetchLatestPolicies } from "@/lib/data-service";

export default async function PopularPostsWidget() {
    const policies = await fetchLatestPolicies();
    // Sort by views desc
    const popular = [...policies].sort((a, b) => b.views - a.views).slice(0, 5);

    return (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy size={18} className="text-yellow-500" />
                인기 급상승 🔥
            </h3>

            <div className="flex flex-col gap-3">
                {popular.map((post, idx) => (
                    <Link key={post.id} href={`/news/${post.id}`} className="group flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition-colors">
                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${idx === 0 ? "bg-red-500 text-white" :
                                idx === 1 ? "bg-red-400 text-white" :
                                    idx === 2 ? "bg-red-300 text-white" : "bg-slate-100 text-slate-500"
                            }`}>
                            {idx + 1}
                        </span>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                조회 {post.views.toLocaleString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
