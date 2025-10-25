"use client";

import { useState } from "react";
import {
    Heart,
    Plus,
    Send,
    MessageSquare,
    X,
    Star,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PlayBar({ onTabChange }: { onTabChange?: (tab: "comments" | "ratings") => void }) {
    const [active, setActive] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const actions = [
        {
            id: "like",
            label: "Yêu thích",
            icon: Heart,
            onClick: () => setLiked(!liked),
        },
        {
            id: "add",
            label: "Thêm vào",
            icon: Plus,
            dropdown: true,
        },
        {
            id: "share",
            label: "Chia sẻ",
            icon: Send,
            onClick: () => setShowShare(true),
        },
        {
            id: "comment",
            label: "Bình luận",
            icon: MessageSquare,
            onClick: () => {
                const section = document.getElementById("comment-section");
                if (section) section.scrollIntoView({ behavior: "smooth" });
            },
        },
        {
            id: "rating",
            label: "Đánh giá",
            icon: Star,
            onClick: () => {
                if (onTabChange) onTabChange("ratings");
                const section = document.getElementById("rating-section");
                if (section) section.scrollIntoView({ behavior: "smooth" });
            },
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between w-full mt-2 md:px-8">
                <button
                    onClick={() => setActive("play")}
                    className="flex items-center gap-2 bg-gradient-to-b from-yellow-200 to-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:brightness-110 transition-all shadow-lg"
                >
                    <span className="inline-block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent"></span>
                    Xem Ngay
                </button>

                <div className="flex items-center gap-10 justify-center px-16">
                    {actions.map((action) => {
                        const Icon = action.icon;
                        const isLiked = action.id === "like" && liked;


                        if (action.dropdown) {
                            return (
                                <DropdownMenu key={action.id}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="flex flex-col items-center justify-center w-20 h-16 rounded-2xl text-gray-300 hover:text-yellow-400 hover:bg-zinc-800 transition-all"
                                        >
                                            <Icon size={22} />
                                            <span className="text-sm mt-1">{action.label}</span>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48 bg-zinc-900 border border-zinc-700 text-gray-200 shadow-lg rounded-xl">
                                        <DropdownMenuLabel className="flex justify-between text-sm text-gray-400">
                                            <span>Danh sách</span>
                                            <span>0/5</span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-zinc-700" />
                                        <DropdownMenuItem className="justify-center text-yellow-400 font-medium hover:text-black hover:bg-yellow-400 rounded-md cursor-pointer">
                                            + Thêm mới
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            );
                        }

                        return (
                            <button
                                key={action.id}
                                onClick={action.onClick}
                                className={`flex flex-col items-center justify-center w-20 h-16 rounded-2xl transition-all duration-300 ${isLiked
                                    ? "text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-400 hover:bg-zinc-800"
                                    }`}
                            >
                                <Icon
                                    size={22}
                                    fill={isLiked ? "currentColor" : "none"}
                                    strokeWidth={isLiked ? "0" : "2"}
                                    className={`transition-transform ${isLiked ? "scale-125" : "scale-100"
                                        }`}
                                />
                                <span className="text-sm mt-1">{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>


            {showShare && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 text-white rounded-xl shadow-lg p-6 w-[320px] relative text-center animate-fade-in-down">
                        <button
                            onClick={() => setShowShare(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Chia sẻ</h2>
                        <div className="flex justify-center gap-5">
                            <button className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-facebook-f text-white text-lg"></i>
                            </button>
                            <button className="bg-black hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-x-twitter text-white text-lg"></i>
                            </button>
                            <button className="bg-sky-500 hover:bg-sky-600 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-telegram text-white text-lg"></i>
                            </button>
                            <button className="bg-orange-600 hover:bg-orange-700 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-reddit-alien text-white text-lg"></i>
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-solid fa-share-nodes text-white text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
