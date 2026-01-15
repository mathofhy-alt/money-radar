"use client";
import Link from "next/link";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, GraduationCap, Briefcase, Coins, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "youth" | "worker" | "business" | "low_income";

const CATEGORIES = [
    { id: "youth", label: "청년/대학생", icon: GraduationCap, color: "bg-blue-500" },
    { id: "worker", label: "직장인", icon: Briefcase, color: "bg-emerald-500" },
    { id: "business", label: "소상공인", icon: Building2, color: "bg-purple-500" },
    { id: "low_income", label: "저소득/취약", icon: Coins, color: "bg-orange-500" },
] as const;

// This will be replaced by Real API later
// Mapped to data-service MOCK_POLICIES IDs where possible, or generic
const DEMO_BENEFITS = {
    youth: [
        { id: "p-2025-002", title: "청년도약계좌", amount: "최대 5,000만원", desc: "5년 만기 시 정부기여금 + 비과세 혜택" },
        { id: "p-2025-001", title: "청년월세지원", amount: "월 20만원", desc: "최대 12개월간 월세 현금 지원" },
        { id: "p-2025-001", title: "K-패스(교통비)", amount: "환급형", desc: "대중교통비 최대 53% 환급" },
    ],
    worker: [
        { id: "p-2025-001", title: "근로장려금", amount: "최대 330만원", desc: "소득/재산 요건 충족 시 현금 지급" },
        { id: "p-2025-004", title: "내일배움카드", amount: "최대 500만원", desc: "직무능력 향상 교육비 지원" },
    ],
    business: [
        { id: "p-2025-004", title: "소상공인 정책자금", amount: "저금리 대출", desc: "연 2%대 금리로 운영자금 대출" },
        { id: "p-2025-004", title: "전기요금 특별지원", amount: "최대 20만원", desc: "영세 소상공인 전기요금 감면" },
    ],
    low_income: [
        { id: "p-2025-003", title: "긴급복지 생계지원", amount: "월 183만원", desc: "위기 상황 발생 시 생계비 지원" },
        { id: "p-2025-003", title: "문화누리카드", amount: "연 13만원", desc: "문화예술/여행/체육 활동비 지원" },
    ]
};

export default function BenefitFinder() {
    const [selected, setSelected] = useState<Category | null>(null);
    const [benefits, setBenefits] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch benefits when category changes
    const handleCategoryClick = async (catId: Category) => {
        if (selected === catId) return; // Prevent double fetch
        setSelected(catId);
        setLoading(true);

        try {
            const res = await fetch(`/api/posts?category=${catId}&limit=3`);
            if (res.ok) {
                const data = await res.json();
                setBenefits(data);
            } else {
                setBenefits(DEMO_BENEFITS[catId] || []);
            }
        } catch (error) {
            console.error("Failed to fetch benefits", error);
            setBenefits(DEMO_BENEFITS[catId] || []);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">🔍 내 맞춤 지원금 조회</h2>
                <p className="text-gray-500 mt-2">현재 나의 상황을 선택해보세요</p>
            </div>

            {/* Category Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={cn(
                            "flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                            selected === cat.id
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
                        )}
                    >
                        <div className={cn("p-3 rounded-full text-white mb-3", cat.color)}>
                            <cat.icon size={24} />
                        </div>
                        <span className="font-semibold text-gray-700">{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Results Area */}
            <AnimatePresence mode="wait">
                {selected ? (
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                <span className="text-primary">{CATEGORIES.find(c => c.id === selected)?.label}</span> 추천 지원금
                            </h3>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500">실시간 업데이트</span>
                        </div>

                        {loading ? (
                            <div className="py-12 text-center text-gray-400">
                                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full mb-2"></div>
                                <p>최신 지원금을 조회하고 있습니다...</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {benefits.map((benefit, idx) => (
                                    <Link href={`/post/${benefit.id}`} key={idx} className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/50 hover:bg-slate-50 transition-colors cursor-pointer bg-white">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                                                    {benefit.title}
                                                </span>
                                                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap">신청중</span>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-1">{benefit.desc || benefit.summary || benefit.support}</p>
                                        </div>
                                        <div className="text-right min-w-[80px]">
                                            <div className="text-lg font-bold text-indigo-600">
                                                {benefit.amount || benefit.support ? (benefit.amount || "지원금") : "자세히보기"}
                                            </div>
                                            <div className="flex items-center justify-end text-xs text-gray-400 mt-1 group-hover:text-primary">
                                                바로가기 <ChevronRight size={14} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {benefits.length === 0 && (
                                    <div className="py-8 text-center text-gray-400 bg-slate-50 rounded-xl">
                                        아직 등록된 공고가 없습니다.
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-400">위에서 카테고리를 선택하면<br />숨은 지원금이 나타납니다</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
