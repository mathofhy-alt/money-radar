import BenefitFinder from "@/components/home/BenefitFinder";
import { Search } from "lucide-react";

export default function BenefitPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                        <Search size={32} />
                    </div>
                    맞춤 지원금 조회
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    국가에서 제공하는 12,000여 개의 지원금 중<br className="md:hidden" /> 나에게 딱 맞는 혜택만 골라보세요.
                </p>
            </div>

            <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
                <BenefitFinder />
            </div>

            {/* Additional SEO Content / Guide */}
            <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                    <h3 className="font-bold text-lg mb-2">상황 선택</h3>
                    <p className="text-slate-500">현재 본인의 연령, 소득, 직업 상태를 선택합니다.</p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                    <h3 className="font-bold text-lg mb-2">자동 매칭</h3>
                    <p className="text-slate-500">AI 알고리즘이 12,000개 공공데이터 중 수급 가능한 항목을 찾습니다.</p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                    <h3 className="font-bold text-lg mb-2">즉시 신청</h3>
                    <p className="text-slate-500">조회된 지원금의 '신청하기' 버튼을 눌러 바로 접수하세요.</p>
                </div>
            </div>
        </div>
    );
}
