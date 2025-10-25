"use client";

import { useState } from "react";
import { Heart, Plus, Send, MessageSquare, X } from "lucide-react";

export default function PlayBar() {
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
            onClick: () => { },
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
                const commentSection = document.getElementById("comment-section");
                if (commentSection) {
                    commentSection.scrollIntoView({ behavior: "smooth" });
                }
            }
        },
    ];

    return (
        <>

            <div className="flex items-center justify-between w-full mt-2 px-4 md:px-1">
                <button
                    onClick={() => setActive("play")}
                    className="flex items-center gap-2 bg-gradient-to-b from-yellow-200 to-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:brightness-110 transition-all shadow-lg"
                >
                    <span className="inline-block w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent"></span>
                    Xem Ngay
                </button>

                <div className="flex items-center gap-10">
                    {actions.map((action) => {
                        const Icon = action.icon;

                        const isLiked = action.id === "like" && liked;
                        const isActive = action.id === "like" ? isLiked : active === action.id;

                        return (
                            <button
                                key={action.id}
                                onClick={() => {
                                    if (action.onClick) action.onClick();

                                    if (action.id === "like") {

                                    } else {
                                        setActive(action.id);
                                        setTimeout(() => setActive(null), 300);
                                    }
                                }}
                                className={`flex flex-col items-center justify-center w-20 h-16 rounded-2xl transition-all duration-300 ${isActive
                                    ? "text-yellow-400 border-yellow-400 bg-zinc-800"
                                    : "text-gray-300 border-zinc-700 hover:text-yellow-400 hover:border-yellow-400 hover:bg-zinc-800"
                                    }`}


                            >

                                <Icon
                                    size={22}
                                    fill={isLiked ? "currentColor" : "none"}
                                    strokeWidth={isLiked ? "0" : "2"}
                                    className={`transition-transform duration-300 ${isActive ? "scale-125" : "scale-100"}`}
                                />
                                <span className="text-sm mt-1">{action.label}</span>
                            </button>
                        );
                    })}
                </div>

                <a
                    href="#"
                    className="flex items-center bg-blue-600 px-4 py-2 rounded-full gap-2 hover:brightness-110 transition"
                >
                    <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-blue-900 font-bold text-sm"></div>
                    <span className="font-bold text-white text-sm">Chưa có</span>
                    <span className="text-sm text-blue-100 underline cursor-pointer">
                        Đánh giá
                    </span>
                </a>
            </div>


            {showShare && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 text-white rounded-xl shadow-lg p-6 w-[320px] relative text-center animate-fade-in-down">
                        <button
                            onClick={() => {
                                setShowShare(false);
                                setActive(null);
                            }}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Chia sẻ</h2>

                        <div className="flex justify-center gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center">
                                <i className="fa-brands fa-facebook-f"></i>
                            </button>
                            <button className="bg-black hover:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center">
                                <i className="fa-brands fa-x-twitter"></i>
                            </button>
                            <button className="bg-sky-500 hover:bg-sky-600 rounded-full w-10 h-10 flex items-center justify-center">
                                <i className="fa-brands fa-telegram"></i>
                            </button>
                            <button className="bg-orange-600 hover:bg-orange-700 rounded-full w-10 h-10 flex items-center justify-center">
                                <i className="fa-brands fa-reddit-alien"></i>
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
                                <i className="fa-solid fa-share-nodes"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}