import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-lg text-slate-800">Money Radar</h4>
                        <p className="text-sm text-slate-500 mt-1">대한민국 모든 지원금을 한눈에.</p>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="/news" className="hover:text-blue-600 transition-colors">지원금 소식</Link>
                        <Link href="/finance" className="hover:text-blue-600 transition-colors">금융 계산기</Link>
                        <Link href="/benefit" className="hover:text-blue-600 transition-colors">맞춤 조회</Link>
                    </div>
                    <div className="text-xs text-slate-400">
                        © 2025 Money Radar. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
