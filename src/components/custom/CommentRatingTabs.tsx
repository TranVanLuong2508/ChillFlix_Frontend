"use client";

import Ratings from "./Ratings";
import Comments from "./Comment";
import { useCommentStore } from "@/stores/comentStore";
import { useEffect } from "react";
import { eventBus } from "@/lib/eventBus";
import { flushSync } from "react-dom";



export default function CommentRatingTabs() {
    const { activeTab, setActiveTab } = useCommentStore();

    useEffect(() => {
        const handleSwitchTab = (tab: "comments" | "ratings") => {
            flushSync(() => { setActiveTab(tab) });
        };
        eventBus.on("switchTab", handleSwitchTab);
        return () => {
            eventBus.off("switchTab", handleSwitchTab);
        };
    }, []);

    return (

        <div className="mt-10 bg-gradient-to-b from-[#1A1B23] to-[#111217] rounded-2xl border border-zinc-800/70 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.45)] text-white transition-all duration-300 ease-in-out">

            <div className="flex justify-center mb-6 border-b border-zinc-800/70 pb-3 gap-3">
                <button
                    onClick={() => { setActiveTab("comments") }}
                    className={`relative px-6 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-300 
                    ${activeTab === "comments"
                            ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                            : "bg-zinc-900/70 text-gray-400 hover:text-yellow-400 hover:bg-zinc-800/80"
                        }`}
                >
                    Bình luận
                </button>
                <button
                    onClick={() => { setActiveTab("ratings") }}
                    className={`relative px-6 py-2.5 text-sm font-semibold rounded-t-xl transition-all duration-300 
                    ${activeTab === "ratings"
                            ? "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                            : "bg-zinc-900/70 text-gray-400 hover:text-yellow-400 hover:bg-zinc-800/80"
                        }`}>
                    Đánh giá
                </button>
            </div>

            <div className="bg-[#191B24] border border-zinc-800/70 rounded-xl p-5 shadow-[inset_0_0_25px_rgba(0,0,0,0.3)] transition-all duration-300">
                {activeTab === "comments" ? <Comments /> : <Ratings />}
            </div>
        </div>
    );
}
