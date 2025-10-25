"use client";
import { useEffect, useState } from "react";
import Ratings from "./Ratings";
import Comments from "./Comment";

interface TabsSectionProps {
    externalTab?: "comments" | "ratings";
}

export default function TabsSection({ externalTab }: TabsSectionProps) {
    const [activeTab, setActiveTab] = useState<"comments" | "ratings">("comments");

    useEffect(() => {
        if (externalTab) setActiveTab(externalTab);
    }, [externalTab]);

    return (
        <div className="mt-10 bg-zinc-900 rounded-xl p-6 text-white">

            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setActiveTab("comments")}
                    className={`px-5 py-2 rounded-t-lg text-sm font-semibold transition-all ${activeTab === "comments"
                        ? "bg-yellow-400 text-black"
                        : "bg-zinc-800 text-gray-400 hover:text-yellow-400"
                        }`}
                >
                    Bình luận
                </button>
                <button
                    onClick={() => setActiveTab("ratings")}
                    className={`px-5 py-2 rounded-t-lg text-sm font-semibold transition-all ml-2 ${activeTab === "ratings"
                        ? "bg-yellow-400 text-black"
                        : "bg-zinc-800 text-gray-400 hover:text-yellow-400"
                        }`}
                >
                    Đánh giá
                </button>
            </div>


            <div className="bg-zinc-800 rounded-b-xl p-5" id="rating-section">
                {activeTab === "comments" ? <Comments /> : <Ratings />}
            </div>
        </div>
    );
}
