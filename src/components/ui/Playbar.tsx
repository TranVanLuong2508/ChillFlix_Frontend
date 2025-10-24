"use client";

import { useState } from "react";
import { Heart, Plus, Send, MessageSquare } from "lucide-react";

export default function PlayBar() {
    const [active, setActive] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const actions = [
        {
            id: "like",
            label: "Yêu thích",
            icon: (
                <Heart
                    size={22}
                    className={`transition-transform duration-300 ${liked
                        ? "fill-yellow-500 text-yellow-500 scale-110"
                        : "text-gray-300 hover:text-yellow-400"
                        }`}
                />
            ),
            onClick: () => setLiked(!liked),
        },
        { id: "add", label: "Thêm vào", icon: <Plus size={20} /> },
        { id: "share", label: "Chia sẻ", icon: <Send size={20} /> },
        { id: "comment", label: "Bình luận", icon: <MessageSquare size={20} /> },
    ];

    return (
        <div className="flex items-center justify-between w-full mt-2 px-4 md:px-10">
            <button
                onClick={() => setActive("play")}
                className="flex items-center gap-2 bg-gradient-to-b from-yellow-200 to-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:brightness-110 transition-all shadow-lg"
            >
                <span className="inline-block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent"></span>
                Xem Ngay
            </button>

            <div className="flex items-center gap-10 text-gray-300">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={() => {
                            setActive(action.id);
                            if (action.onClick) action.onClick();
                        }}
                        className={`flex flex-col items-center transition ${active === action.id ? "text-yellow-400" : "hover:text-yellow-400"
                            }`}
                    >
                        {action.icon}
                        <span className="text-sm mt-1">{action.label}</span>
                    </button>
                ))}
            </div>


            <a href="#" className="flex items-center bg-blue-600 px-4 py-2 rounded-full gap-2 hover:brightness-110 transition">
                <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-blue-900 font-bold text-sm">
                </div>
                <span className="font-bold text-white text-sm">Chưa có</span>
                <span className="text-sm text-blue-100 underline cursor-pointer">
                    Đánh giá
                </span>
            </a>
        </div>
    );
}
