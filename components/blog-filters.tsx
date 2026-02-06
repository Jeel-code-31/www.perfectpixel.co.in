"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function BlogFilters({ currentSort }: { currentSort: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSort = (sortType: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sortType);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap items-center gap-6 mb-12 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
                
                {/* LATEST BUTTON: Shows newest issues first (e.g., Issue 05, 04, 03) */}
                <button
                    onClick={() => handleSort("latest")}
                    className={`group relative flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 active:scale-95 ${
                        currentSort === "latest"
                            ? "bg-white/10 border-[#AC9148] text-white"
                            : "border-white/5 text-gray-500 hover:border-white/20"
                    }`}
                >
                    <span className="relative flex h-2 w-2">
                        {currentSort === "latest" && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${currentSort === "latest" ? "bg-green-500" : "bg-gray-600"}`}></span>
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Latest Issues</span>
                </button>

                {/* OLDEST BUTTON: Shows oldest issues first (e.g., Issue 01, 02, 03) */}
                <button
                    onClick={() => handleSort("oldest")}
                    className={`group relative flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 active:scale-95 ${
                        currentSort === "oldest"
                            ? "bg-white/10 border-[#AC9148] text-white"
                            : "border-white/5 text-gray-500 hover:border-white/20"
                    }`}
                >
                    <span className="relative flex h-2 w-2">
                        {currentSort === "oldest" && (
                            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${currentSort === "oldest" ? "bg-amber-500" : "bg-gray-600"}`}></span>
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Classic Issues</span>
                </button>
            </div>

            <div className="hidden md:block h-4 w-[1px] bg-white/10" />

            <div className="text-[10px] text-[#AC9148] tracking-widest uppercase font-medium">
                {currentSort === 'latest' 
                    ? 'Welcome to the Latest Issues' 
                    : 'Classic Issues from the Archives'}
            </div>
        </div>
    );
}