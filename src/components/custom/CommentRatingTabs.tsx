"use client";

import Ratings from "./Ratings";
import Comments from "./Comment";

interface Action {
    activeTab: "comments" | "ratings";
    setActiveTab: (tab: "comments" | "ratings") => void;
}

export default function TabsSection({ activeTab, setActiveTab }: Action) {
    return (
        <div className="mt-10 bg-gradient-to-b from-[#1A1B23] to-[#111217] rounded-2xl border border-zinc-800/70 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.45)] text-white transition-all duration-300 ease-in-out">

            <div className="flex justify-center mb-6 border-b border-zinc-800/70 pb-3 gap-3">
                {[
                    { key: "comments", label: "Bình luận" },
                    { key: "ratings", label: "Đánh giá" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as "comments" | "ratings")}
                        className={`relative px-6 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-300 
                        ${activeTab === tab.key
                                ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                                : "bg-zinc-900/70 text-gray-400 hover:text-yellow-400 hover:bg-zinc-800/80"
                            }`}
                    >
                        {tab.label}

                    </button>
                ))}
            </div>

            <div className="bg-[#191B24] border border-zinc-800/70 rounded-xl p-5 shadow-[inset_0_0_25px_rgba(0,0,0,0.3)] transition-all duration-300">
                {activeTab === "comments" ? <Comments /> : <Ratings />}
            </div>
        </div>
    );
}
