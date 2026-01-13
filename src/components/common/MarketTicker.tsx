"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for financial ticker
const TICKER_ITEMS = [
    { label: "KOSPI", value: "2,654.32", change: "+0.85%", type: "up" },
    { label: "USD/KRW", value: "1,335.50", change: "-0.20%", type: "down" },
    { label: "BTC/KRW", value: "98,540,000", change: "+1.24%", type: "up" },
    { label: "Gold", value: "95,400", change: "+0.05%", type: "up" },
    { label: "KOSDAQ", value: "864.07", change: "-0.15%", type: "down" },
    { label: "NASDAQ", value: "16,274.94", change: "+1.51%", type: "up" },
    { label: "Euro/KRW", value: "1,452.30", change: "0.00%", type: "flat" },
];

export default function MarketTicker() {
    return (
        <div className="w-full bg-slate-900 border-b border-slate-800 overflow-hidden py-2 relative z-50">
            <div className="flex w-max animate-ticker">
                {/* Double the list to create seamless infinite scroll */}
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
                    <Link href="/finance" key={idx} className="flex items-center gap-3 px-6 border-r border-slate-800 text-sm whitespace-nowrap hover:bg-slate-800 transition-colors cursor-pointer block h-full">
                        <span className="font-bold text-slate-400">{item.label}</span>
                        <span className="font-medium text-white">{item.value}</span>
                        <span className={cn(
                            "flex items-center text-xs font-bold",
                            item.type === "up" ? "text-red-400" :
                                item.type === "down" ? "text-blue-400" : "text-slate-500"
                        )}>
                            {item.type === "up" && <TrendingUp size={12} className="mr-1" />}
                            {item.type === "down" && <TrendingDown size={12} className="mr-1" />}
                            {item.type === "flat" && <Minus size={12} className="mr-1" />}
                            {item.change}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
