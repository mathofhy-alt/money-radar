import { Megaphone } from "lucide-react";

export default function AdPlaceholder({ label = "광고 영역", height = "h-24" }: { label?: string, height?: string }) {
    return (
        <div className={`w-full ${height} bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 my-8 transition-colors hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer`}>
            <div className="flex items-center gap-2 mb-1">
                <Megaphone size={16} className="text-slate-300 group-hover:text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-blue-400">Sponsored</span>
            </div>
            <p className="text-sm font-medium">{label}</p>
        </div>
    );
}
