import Link from "next/link";
import { Search, Menu, Calculator, Banknote, User } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Banknote className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Money Radar</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center md:gap-6">
                    <Link href="/benefit" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        지원금 찾기
                    </Link>
                    <Link href="/finance" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        금융 계산기
                    </Link>
                    <Link href="/news" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        정책 뉴스
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        <Search className="h-5 w-5" />
                    </button>
                    <button className="md:hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
