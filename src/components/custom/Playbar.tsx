"use client";

import { useState } from "react";
import { Heart, Plus, Send, MessageSquare, Star } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { EpisodeData } from "@/types/partData";

interface PlayBarProps {
    activeTab: "comments" | "ratings";
    setActiveTab: (tab: "comments" | "ratings") => void;
    episodes: EpisodeData[];
}

export default function PlayBar({ activeTab, setActiveTab, episodes }: PlayBarProps) {
    const [liked, setLiked] = useState(false);
    const router = useRouter();

    const handleChooseWatchNow = () => {
        if (!episodes?.length) return;
        const firstEp = episodes[0];
        router.push(`/play/${firstEp.id}`);
    };

    const actions = [
        { id: "like", label: "Yêu thích", icon: Heart, onClick: () => setLiked(!liked) },
        { id: "add", label: "Thêm vào", icon: Plus, popoverAdd: true },
        { id: "share", label: "Chia sẻ", icon: Send, popoverShare: true },
        {
            id: "comment",
            label: "Bình luận",
            icon: MessageSquare,
            onClick: () => {
                setActiveTab("comments");
                document.getElementById("comment-section")?.scrollIntoView({ behavior: "smooth" });
            },
        },
        {
            id: "rating",
            label: "Đánh giá",
            icon: Star,
            onClick: () => {
                setActiveTab("ratings");
                document.getElementById("rating-section")?.scrollIntoView({ behavior: "smooth" });
            },
        },
    ];

    return (
        <div className="flex items-center justify-between w-full mt-4 md:px-12">
            <button
                onClick={handleChooseWatchNow}
                className="flex items-center gap-2 px-8 py-3 font-semibold rounded-full 
        text-black bg-gradient-to-r from-yellow-300 to-yellow-500
        hover:from-yellow-400 hover:to-yellow-200 
        hover:shadow-[0_0_20px_rgba(250,204,21,0.5)]
        transition-all duration-300 ease-in-out cursor-pointer"
            >
                <span className="inline-block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent"></span>
                Xem Ngay
            </button>

            <div className="flex items-center gap-8 justify-center px-12">
                {actions.map((action) => {
                    const Icon = action.icon;
                    const isLiked = action.id === "like" && liked;

                    if (action.popoverShare) {
                        return (
                            <Popover key={action.id}>
                                <PopoverTrigger asChild>
                                    <button
                                        className="flex flex-col items-center justify-center w-20 h-16 rounded-2xl
                    bg-[#191B24] text-gray-400 transition-all duration-300 ease-in-out cursor-pointer
                    hover:text-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:bg-[#1F212A]"
                                    >
                                        <Icon size={24} strokeWidth={2} />
                                        <span className="text-sm mt-1">{action.label}</span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="center"
                                    side="bottom"
                                    sideOffset={10}
                                    className="w-auto bg-[#191B24] text-white rounded-2xl border border-zinc-700 shadow-[0_0_25px_rgba(0,0,0,0.5)] p-4
                  animate-in fade-in slide-in-from-top-2 flex flex-col items-center"
                                >
                                    <h2 className="text-base font-semibold mb-4">Chia sẻ</h2>
                                    <div className="flex justify-center gap-4">
                                        <button className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                            <i className="fa-brands fa-facebook-f text-white text-xl"></i>
                                        </button>
                                        <button className="bg-black hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                            <i className="fa-brands fa-x-twitter text-white text-xl"></i>
                                        </button>
                                        <button className="bg-sky-500 hover:bg-sky-600 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                            <i className="fa-brands fa-telegram text-white text-xl"></i>
                                        </button>
                                        <button className="bg-orange-600 hover:bg-orange-700 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                            <i className="fa-brands fa-reddit-alien text-white text-xl"></i>
                                        </button>
                                        <button className="bg-green-500 hover:bg-green-600 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                            <i className="fa-solid fa-share-nodes text-white text-xl"></i>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        );
                    }

                    if (action.popoverAdd) {
                        return (
                            <Popover key={action.id}>
                                <PopoverTrigger asChild>
                                    <button
                                        className="flex flex-col items-center justify-center w-20 h-16 rounded-2xl
                    bg-[#191B24] text-gray-400 transition-all duration-300 ease-in-out cursor-pointer
                    hover:text-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:bg-[#1F212A]"
                                    >
                                        <Icon size={24} strokeWidth={2} />
                                        <span className="text-sm mt-1">{action.label}</span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    side="bottom"
                                    align="center"
                                    sideOffset={10}
                                    className="w-52 bg-[#191B24] border border-zinc-800/70 text-gray-200 rounded-2xl p-2 
                  shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm
                  animate-in fade-in slide-in-from-bottom-2 duration-200 ease-out"
                                >
                                    <div className="flex justify-between text-xs uppercase tracking-wide text-gray-400 px-1">
                                        <span>Danh sách</span>
                                        <span className="text-gray-500 font-normal">0/5</span>
                                    </div>
                                    <div className="my-1 h-px bg-zinc-800/70" />
                                    <button
                                        className="w-full text-center py-2 font-medium rounded-md cursor-pointer
                    text-yellow-400 bg-transparent 
                    hover:bg-yellow-400 hover:text-black 
                    hover:shadow-[0_0_12px_rgba(250,204,21,0.45)]
                    transition-all duration-200 ease-in-out"
                                    >
                                        + Thêm mới
                                    </button>
                                </PopoverContent>
                            </Popover>
                        );
                    }

                    return (
                        <button
                            key={action.id}
                            onClick={action.onClick}
                            className={`flex flex-col items-center justify-center w-20 h-16 rounded-2xl
              transition-all duration-300 ease-in-out cursor-pointer bg-[#191B24]
              ${isLiked
                                    ? "text-yellow-400 hover:text-yellow-400 hover:bg-[#1F212A] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)]"
                                    : "text-gray-400 hover:text-yellow-400 hover:bg-[#1F212A] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)]"
                                }`}
                        >
                            <Icon size={24} strokeWidth={isLiked ? 0 : 2} fill={isLiked ? "#facc15" : "none"} />
                            <span className="text-sm mt-1">{action.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
