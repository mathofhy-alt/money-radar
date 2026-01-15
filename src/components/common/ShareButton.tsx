"use client";
import { Share2, Link as LinkIcon, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        // 1. Mobile Native Share (Kakao/Message)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: "이 지원금 정보 확인해보세요!",
                    url: window.location.href,
                });
                return;
            } catch (err) {
                console.log("Share canceled");
            }
        }

        // 2. Desktop Fallback (Copy Link)
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            alert("링크가 복사되었습니다! 카톡방에 붙여넣기 하세요.");
        } catch (err) {
            alert("URL 복사에 실패했습니다.");
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors p-2 px-4 rounded-full bg-slate-50 hover:bg-blue-50"
        >
            <Share2 size={20} />
            <span className="text-sm font-semibold">{copied ? "복사됨!" : "공유하기"}</span>
        </button>
    );
}
