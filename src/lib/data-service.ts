import { format } from "date-fns";
import { ko } from "date-fns/locale";

export interface Policy {
    id: string;
    title: string;
    category: "youth" | "worker" | "business" | "low_income";
    views: number;
    date: string;
    bg_color: string;
    createdAt: string;
    source: "API" | "MOCK";
    summary?: string;
    target?: string;
    support?: string;
    content?: string;
}

export const MOCK_POLICIES: Policy[] = [
    {
        id: "p-2025-001",
        title: "2025년 기후동행카드 신청방법 및 혜택 총정리",
        category: "worker",
        views: 12500,
        date: "2025.01.14",
        bg_color: "bg-green-600",
        createdAt: new Date().toISOString(),
        source: "MOCK",
        summary: "월 6만원대로 서울시 대중교통 무제한 이용. 따릉이 포함 여부에 따라 62,000원/65,000원 선택 가능.",
        target: "서울시 생활권자",
        support: "대중교통 무제한 이용"
    },
    {
        id: "p-2025-002",
        title: "청년도약계좌 3년 유지 시 비과세 혜택 적용 (개정안)",
        category: "youth",
        views: 8900,
        date: "2025.01.14",
        bg_color: "bg-blue-600",
        createdAt: new Date().toISOString(),
        source: "MOCK",
        summary: "기존 5년 만기가 부담스러웠던 청년들을 위해 3년만 유지해도 비과세 혜택을 그대로 지원합니다.",
        target: "만 19~34세 청년",
        support: "최대 6% 금리 + 비과세"
    },
    {
        id: "p-2025-003",
        title: "신생아 특례대출 금리 1%대 최저 수준 인하",
        category: "low_income",
        views: 15400,
        date: "2025.01.14",
        bg_color: "bg-orange-600",
        createdAt: new Date().toISOString(),
        source: "MOCK",
        summary: "출산 가구의 주거 안정을 위해 소득 요건을 대폭 완화하고 금리를 파격적으로 낮췄습니다.",
        target: "2년 내 출산 가구",
        support: "최저 1.6% 금리 대출"
    },
    {
        id: "p-2025-004",
        title: "소상공인 전기요금 특별지원 (최대 20만원)",
        category: "business",
        views: 7200,
        date: "2025.01.14",
        bg_color: "bg-purple-600",
        createdAt: new Date().toISOString(),
        source: "MOCK",
        summary: "영세 소상공인의 부담 완화를 위해 전기요금을 한시적으로 지원합니다. 매출액 기준 확인 필수.",
        target: "연매출 3천만원 이하",
        support: "전기요금 20만원"
    }
];

// Parser for Youth Center API (XML)
async function fetchFromRealAPI(): Promise<Policy[]> {
    const apiKey = process.env.PUBLIC_DATA_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    // Endpoint: Online Youth Center (Chungn Yeon)
    const apiEndpoint = "https://www.youthcenter.go.kr/opi/youthPlcyList.do";
    const url = `${apiEndpoint}?openApiVlak=${apiKey}&display=12&pageIndex=1&srchPolyBizSecd=003002001`;

    // Add 1 hour cache
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Fetch Error: ${res.status}`);

    const xml = await res.text();

    // Robust Regex for XML Parsing
    const items = xml.match(/<youthPolicy>[\s\S]*?<\/youthPolicy>/g) || [];

    return items.map((item, idx) => {
        const title = extractTag(item, "polyBizSjnm") || "제목 없음";
        const id = extractTag(item, "bizId") || `api-${idx}`;
        const desc = extractTag(item, "polyItcnCn") || "";

        // Clean CDATA and HTML tags
        const cleanDesc = desc
            .replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1") // Extract CDATA content
            .replace(/<[^>]*>/g, " ") // Remove HTML tags
            .replace(/\s+/g, " ") // Collapse whitespace
            .trim();

        const cleanTitle = title.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");

        return {
            id,
            title: cleanTitle,
            category: "youth",
            views: Math.floor(Math.random() * 3000) + 500,
            date: format(new Date(), "yyyy.MM.dd", { locale: ko }),
            bg_color: "bg-indigo-600",
            createdAt: new Date().toISOString(),
            source: "API",
            summary: cleanDesc.substring(0, 150) + "...",
            content: cleanDesc // Full content for AI
        };
    });
}

function extractTag(xml: string, tag: string) {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, "s");
    const match = xml.match(regex);
    if (!match) {
        // Try CDATA format
        const cdataRegex = new RegExp(`<${tag}><!\\[CDATA\\[(.*?)\\]\\]><\\/${tag}>`, "s");
        const cdataMatch = xml.match(cdataRegex);
        return cdataMatch ? cdataMatch[1] : null;
    }
    return match[1];
}

export async function fetchLatestPolicies(): Promise<Policy[]> {
    // 1. Try Real API
    try {
        // Only attempt if key looks valid (not mockup)
        if (process.env.PUBLIC_DATA_API_KEY && process.env.PUBLIC_DATA_API_KEY.length > 10) {
            const real = await fetchFromRealAPI();
            if (real.length > 0) return real;
        }
    } catch (err) {
        console.warn("⚠️ Real Data Fetch Failed (Using Mock):", err);
    }

    // 2. Fallback to Mock
    return MOCK_POLICIES;
}

export async function fetchRelatedPolicies(currentId: string): Promise<Policy[]> {
    const all = await fetchLatestPolicies();
    return all.filter(p => p.id !== currentId).slice(0, 3);
}
