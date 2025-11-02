"use client";
import { useState } from "react";
import { Heart, Send } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { formatDate } from "@/lib/dateFomat";
import { DirectorData } from "@/types/directorData";

interface DirectorProps {
    director: DirectorData;
}

export default function DirectorInfo({ director }: DirectorProps) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="w-full max-w-[320px] mx-auto rounded-2xl p-5 flex flex-col items-center">
            <div className="w-44 h-44 rounded-2xl overflow-hidden mb-4 shadow-md">
                <img
                    src={director?.avatarUrl || "/images/small.jpg"}
                    alt={director?.directorName || "Đạo diễn"}
                    className="w-full h-full object-cover"
                />
            </div>

            <h3 className="text-xl font-semibold text-white text-center mb-4">
                {director?.directorName || "Chưa rõ tên"}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-6">
                <button
                    onClick={() => setLiked(!liked)}
                    className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full
           bg-transparent border border-zinc-700 text-zinc-200 text-xs font-medium
           hover:bg-zinc-800 hover:text-yellow-400 transition-all"
                >
                    <Heart size={14} className={liked ? "fill-yellow-400 text-yellow-400" : "fill-none"} />
                    <span>Yêu thích</span>
                </button>

                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full
               bg-transparent border border-zinc-700 text-zinc-200 text-xs font-medium
               hover:bg-zinc-800 hover:text-yellow-400 transition-all"
                        >
                            <Send size={14} />
                            <span>Chia sẻ</span>
                        </button>
                    </PopoverTrigger>

                    <PopoverContent
                        align="center"
                        side="bottom"
                        sideOffset={10}
                        className="w-auto bg-[#191B24] text-white rounded-2xl border border-zinc-700 p-4
             shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center"
                    >
                        <h2 className="text-center text-base font-semibold mb-3">Chia sẻ</h2>
                        <div className="flex justify-center gap-2">
                            <button className="bg-blue-600 hover:bg-blue-700 rounded-full w-9 h-9 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-facebook-f text-white text-sm" />
                            </button>
                            <button className="bg-black hover:bg-gray-800 rounded-full w-9 h-9 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-x-twitter text-white text-sm" />
                            </button>
                            <button className="bg-sky-500 hover:bg-sky-600 rounded-full w-9 h-9 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-telegram text-white text-sm" />
                            </button>
                            <button className="bg-orange-600 hover:bg-orange-700 rounded-full w-9 h-9 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-brands fa-reddit-alien text-white text-sm" />
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 rounded-full w-9 h-9 flex items-center justify-center transition-transform hover:scale-110">
                                <i className="fa-solid fa-share-nodes text-white text-sm" />
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="w-full flex flex-col gap-3">
                <div className="text-left">
                    <h3 className="text-base font-semibold text-white mb-1">Giới thiệu:</h3>
                    <p className="text-sm text-gray-400 leading-relaxed text-justify">
                        {director?.story || "Chưa rõ"}
                    </p>
                </div>

                <div className="w-full flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white">Giới tính:</h4>
                        <span className="text-gray-300 hover:text-yellow-400 transition">
                            {director?.genderCodeRL?.valueVi || "Chưa rõ"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white">Ngày sinh:</h4>
                        <span className="text-gray-300 hover:text-yellow-400 transition">
                            {formatDate(director?.birthDate)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
