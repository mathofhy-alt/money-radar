"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calculator, PiggyBank, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinanceDashboard() {
    const [activeTab, setActiveTab] = useState<"loan" | "savings">("loan");

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900">🧮 금융 계산기</h1>
                <p className="text-slate-500 mt-2">복잡한 이자 계산, 대신 해드립니다.</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg bg-slate-100 p-1">
                    <button
                        onClick={() => setActiveTab("loan")}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md transition-all",
                            activeTab === "loan"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        <Briefcase size={16} /> 대출 이자 계산기
                    </button>
                    <button
                        onClick={() => setActiveTab("savings")}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md transition-all",
                            activeTab === "savings"
                                ? "bg-white text-emerald-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        )}
                    >
                        <PiggyBank size={16} /> 적금 만기 계산기
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
                {activeTab === "loan" ? <LoanCalculator /> : <SavingsCalculator />}
            </div>
        </div>
    );
}

function LoanCalculator() {
    const [amount, setAmount] = useState(10000000);
    const [rate, setRate] = useState(3.5);
    const [months, setMonths] = useState(12);

    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInterest = (monthlyPayment * months) - amount;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">대출 금액 (원)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연 이자율 (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">대출 기간 (개월)</label>
                    <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <div className="mt-2 flex gap-2">
                        {[12, 24, 36, 60].map(m => (
                            <button key={m} onClick={() => setMonths(m)} className="px-3 py-1 text-xs rounded bg-slate-100 hover:bg-slate-200 font-medium text-slate-600">
                                {m}개월
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center">
                <h3 className="text-slate-500 font-medium mb-1">매월 갚아야 할 돈</h3>
                <p className="text-3xl font-extrabold text-blue-600 mb-6">
                    {Math.floor(monthlyPayment).toLocaleString()}원
                </p>

                <div className="space-y-3 pt-6 border-t border-slate-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">원금 총액</span>
                        <span className="font-bold text-slate-800">{amount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">총 이자액</span>
                        <span className="font-bold text-red-500">+{Math.floor(totalInterest).toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                        <span className="text-slate-800">총 상환금액</span>
                        <span className="text-blue-900">{Math.floor(monthlyPayment * months).toLocaleString()}원</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SavingsCalculator() {
    const [amount, setAmount] = useState(1000000);
    const [rate, setRate] = useState(4.0);
    const [months, setMonths] = useState(12);

    // Simple interest calculation for demo
    const totalInterest = amount * (rate / 100) * (months / 12);
    const tax = totalInterest * 0.154; // 15.4% tax
    const finalAmount = amount + totalInterest - tax;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">예치 금액 (원)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연 이자율 (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">적립 기간 (개월)</label>
                    <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 flex flex-col justify-center">
                <h3 className="text-slate-500 font-medium mb-1">만기 수령액 (세후)</h3>
                <p className="text-3xl font-extrabold text-emerald-600 mb-6">
                    {Math.floor(finalAmount).toLocaleString()}원
                </p>

                <div className="space-y-3 pt-6 border-t border-emerald-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">원금</span>
                        <span className="font-bold text-slate-800">{amount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">세전 이자</span>
                        <span className="font-bold text-slate-800">+{Math.floor(totalInterest).toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">이자 과세 (15.4%)</span>
                        <span className="font-bold text-red-500">-{Math.floor(tax).toLocaleString()}원</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
