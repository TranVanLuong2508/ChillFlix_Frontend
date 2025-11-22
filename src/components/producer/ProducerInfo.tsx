"use client"
import { useState } from "react"
import { Heart, Send } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useProducerStore } from "@/stores/producerStore"

export default function ProducerInfo() {
    const [liked, setLiked] = useState(false)
    const { producer } = useProducerStore()

    if (!producer) {
        return <div className="text-center py-20">Không có thông tin nhà sản xuất.</div>
    }
    return (
        <div className="w-full max-w-[320px] mx-auto rounded-2xl p-5 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white text-center mb-4">{producer?.producerName || "Chưa rõ tên"}</h3>

            <div className="flex items-center justify-center gap-3 mb-6">
                <button
                    onClick={() => {
                        setLiked(!liked)
                    }}
                    className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full
                                bg-transparent border border-zinc-700 text-zinc-200 text-xs font-medium
                                hover:bg-zinc-800 hover:text-yellow-400 transition-all"
                >
                    <Heart size={14} className={liked ? "fill-yellow-400 text-yellow-400" : "fill-none"} />
                    <span className={liked ? "text-yellow-400" : ""}>Yêu thích</span>
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
        </div>
    )
}
