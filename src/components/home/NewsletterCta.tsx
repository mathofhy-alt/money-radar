"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterCta() {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email) return alert("이메일을 입력해주세요!");
        alert(`'${email}' 님 구독이 완료되었습니다!\n매일 아침 꿀 정보를 보내드릴게요.`);
        setEmail("");
    };

    return (
        <section className="w-full py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">아직도 못 받은 지원금이 있나요?</h2>
                <p className="text-slate-400 mb-8">매일 아침, 놓치기 쉬운 혜택 알림을 무료로 받아보세요.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일 주소를 입력하세요"
                        className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={handleSubscribe} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition-colors flex items-center justify-center gap-2">
                        무료 구독하기 <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
