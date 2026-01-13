import { type Policy } from "./data-service";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
}

// Simulates an AI rewriting raw policy data into a blog post
export function generateBlogPost(policy: Policy): BlogPost {
    const templates = [
        `안녕하세요! 머니레이더입니다. \n\n오늘 전해드릴 소식은 **${policy.title}**입니다. \n최근 경제가 어려워지면서 정부에서 다양한 지원책을 내놓고 있는데요, 그중에서도 가장 혜택이 좋은 정책을 가져왔습니다.`,
        `🚨 **긴급 공지** 🚨 \n\n지금 바로 신청해야 받을 수 있는 **${policy.title}** 정보입니다. \n예산이 소진되면 조기 마감될 수 있으니 서두르세요!`,
    ];

    const intro = templates[Math.floor(Math.random() * templates.length)];

    return {
        id: policy.id,
        title: policy.title,
        excerpt: policy.summary,
        date: new Date().toLocaleDateString("ko-KR"),
        author: "AI 에디터",
        category: policy.category,
        tags: ["지원금", "정부정책", "2025년", "복지혜택"],
        content: `
${intro}

## 💡 이 정책, 왜 중요할까요?
${policy.summary}

## 💰 지원 혜택
이번 정책의 핵심은 **${policy.amount}**을 지원받을 수 있다는 점입니다.
특히 ${policy.target} 분들이라면 100% 혜택을 누릴 수 있습니다.

## 📅 신청 기간 및 방법
- **신청 기간**: ${policy.deadline} 까지
- **신청 방법**: 온라인 '보조금24' 또는 관할 주민센터 방문

## 📝 3줄 요약
1. ${policy.target} 대상
2. ${policy.amount} 즉시 지원
3. ${policy.deadline}까지 신청 필수

더 자세한 사항은 아래 '공식 홈페이지' 링크를 통해 확인하시기 바랍니다.

---
*이 글은 공공데이터포털의 데이터를 바탕으로 AI가 자동으로 작성하였습니다.*
    `.trim()
    };
}
