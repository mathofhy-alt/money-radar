import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import MarketTicker from "@/components/common/MarketTicker";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Radar | 숨은 정부지원금 찾기 & 금융 포털",
  description: "내가 받을 수 있는 정부 지원금을 3초만에 조회하세요. 실시간 금융 정보와 계산기까지 한번에.",
  keywords: ["정부지원금", "청년수당", "소상공인대출", "금융계산기", "이자계산기"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased selection:bg-primary/10 selection:text-primary")}>
        <MarketTicker />
        <Navbar />
        <main className="flex min-h-[calc(100vh-6rem)] flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
