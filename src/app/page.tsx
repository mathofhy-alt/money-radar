import BenefitFinder from "@/components/home/BenefitFinder";
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
            오늘 1,240개의 지원금이 업데이트 되었습니다
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

      {/* CTA Section */}
      <section className="w-full py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">아직도 못 받은 지원금이 있나요?</h2>
          <p className="text-slate-400 mb-8">매일 아침, 놓치기 쉬운 혜택 알림을 무료로 받아보세요.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition-colors flex items-center justify-center gap-2">
              무료 구독하기 <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
