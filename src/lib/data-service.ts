export interface Policy {
    id: string;
    title: string;
    category: "youth" | "worker" | "business" | "low_income" | "finance";
    summary: string;
    content: string; // Used for AI generation context
    amount: string;
    target: string;
    deadline: string;
    createdAt: string;
    views: number;
}

const REAL_POLICIES: Policy[] = [
    {
        id: "p-2025-001",
        title: "2025년 기후동행카드 신청방법 및 혜택 총정리",
        category: "worker",
        summary: "월 6만원대로 서울시 대중교통 무제한 이용. 따릉이 포함 여부에 따라 62,000원/65,000원 선택 가능.",
        content: "기후동행카드는 기후변화 대응과 대중교통 활성화를 위한 서울시의 친환경 교통혁신 사업입니다...",
        amount: "교통비 월 3~5만원 절약",
        target: "서울시 대중교통 이용자",
        deadline: "상시 접수",
        createdAt: new Date().toISOString(),
        views: 1240
    },
    {
        id: "p-2025-002",
        title: "청년도약계좌 3년 유지 시 비과세 혜택 적용 (개정안)",
        category: "youth",
        summary: "기존 5년 만기가 부담스러웠던 청년들을 위해 3년만 유지해도 비과세 혜택을 그대로 지원합니다.",
        content: "청년들의 자산 형성을 돕는 정책금융상품 청년도약계좌의 요건이 완화되었습니다...",
        amount: "최대 5,000만원+@ 목돈",
        target: "만 19~34세 청년",
        deadline: "2025년 12월 31일",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        views: 3502
    },
    {
        id: "p-2025-003",
        title: "신생아 특례대출 금리 1%대 최저 수준 인하",
        category: "finance",
        summary: "출산 가구의 주거 안정을 위해 소득 요건을 대폭 완화하고 금리를 파격적으로 낮췄습니다.",
        content: "저출산 극복을 위한 특단의 조치로, 2023년 이후 출생아를 둔 가구라면...",
        amount: "최대 5억원 대출 (연 1.6%~)",
        target: "2년 내 출산/입양 무주택자",
        deadline: "예산 소진 시 조기마감",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        views: 8930
    },
    {
        id: "p-2025-004",
        title: "소상공인 전기요금 특별지원 (최대 20만원)",
        category: "business",
        summary: "영세 소상공인의 부담 완화를 위해 전기요금을 한시적으로 지원합니다. 매출액 기준 확인 필수.",
        content: "에너지 비용 상승으로 어려움을 겪는 소상공인을 위해...",
        amount: "전기료 최대 20만원 감면",
        target: "연매출 3천만원 이하 사업자",
        deadline: "2025년 6월 30일",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        views: 541
    },
    {
        id: "p-2025-005",
        title: "K-패스(K-Pass) 전국민 대중교통비 환급금 조회",
        category: "worker",
        summary: "알뜰교통카드의 불편함은 없애고 혜택은 늘렸다. 이동 거리 상관없이 횟수만 채우면 자동 환급!",
        content: "월 15회 이상 대중교통 이용 시 지출금액의 일정 비율(20~53%)을 다음 달에 돌려받습니다...",
        amount: "연 최대 21만원 환급",
        target: "전국민 (만 19세 이상)",
        deadline: "상시 가입",
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        views: 4102
    },
    {
        id: "p-2025-006",
        title: "국민취업지원제도 1유형 구직촉진수당 인상",
        category: "low_income",
        summary: "취업을 준비하는 저소득 구직자에게 월 50만원씩 6개월간 지원하며, 취업 성공 시 성공수당 추가 지급.",
        content: "취업지원 서비스를 성실히 이행할 경우 생계 안정을 위한 수당을 지급합니다...",
        amount: "최대 300만원 + 취업성공금",
        target: "취업준비생 및 구직자",
        deadline: "상시 신청",
        createdAt: new Date().toISOString(),
        views: 1105
    }
];

export async function fetchLatestPolicies(): Promise<Policy[]> {
    // Return the real curated list
    return REAL_POLICIES;
}

export async function fetchRelatedPolicies(currentId: string): Promise<Policy[]> {
    // Simple logic: return other policies excluding the current one
    // In a real app, match by category/tags
    return REAL_POLICIES.filter(p => p.id !== currentId).slice(0, 3);
}
