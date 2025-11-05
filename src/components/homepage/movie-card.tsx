"use client"

import { useState, useRef } from "react"
import { Play, Heart, Info } from "lucide-react"
import type { Film } from "@/types/filmType"

interface MovieCardProps {
    item: Film
    badgeColor?: string
    showProgress?: boolean
}

export default function MovieCard({ item, badgeColor = "bg-blue-600", showProgress = false }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const cardContainerRef = useRef<HTMLDivElement>(null)
    const getGenreText = (genre: any): string => {
        if (typeof genre === "string") return genre
        return genre?.valueVi || genre?.valueEn || ""
    }

    return (
        <div
            ref={cardContainerRef}
            className="relative flex-shrink-0 cursor-pointer group rounded-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`relative overflow-visible rounded-lg bg-slate-800 transition-all duration-300 w-56 h-32 `}
            >
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden bg-slate-700 rounded-lg">
                    <img
                        src={item.posterUrl || "/placeholder.svg"}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-transform duration-300 rounded-lg`}
                    />
                    {item.badges && item.badges.length > 0 && (
                        <div className="absolute top-2 left-2 flex gap-1">
                            {item.badges.map((badge, idx) => (
                                <span key={idx} className={`${badge.color} text-white px-2 py-0.5 rounded text-xs font-bold`}>
                                    {badge.text}
                                </span>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <div className="mt-2 space-y-1">
                <h3 className="font-bold text-white text-sm line-clamp-2">{item.title}</h3>
                {item.originalTitle && <p className="text-xs text-gray-400 line-clamp-1">{item.originalTitle}</p>}
            </div>

            {isHovered && (
                <div
                    className={`absolute z-50 w-80 bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-700 pointer-events-auto animate-popup-in`}
                    style={{
                        top: 10,
                        left: "50%",
                        transform: "translateX(-50%) translateY(-50%)",
                    }}
                >
                    {/* Preview Image */}
                    <div className="relative w-full h-40 overflow-hidden bg-slate-800">
                        <img src={item.posterUrl || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-2">
                        {/* Title */}
                        <div>
                            <h2 className="text-base font-bold text-white">{item.title}</h2>
                            {item.originalTitle && <p className="text-xs text-gray-400">{item.originalTitle}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                                <Play className="w-4 h-4 fill-current" />
                                Xem ngay
                            </button>
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
                            </button>
                            <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                                <Info className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-1 text-xs text-gray-300">
                            {item.imdbRating && <span className="bg-slate-800 px-2 py-0.5 rounded">IMDb: {item.imdbRating}</span>}
                            {item.age && (
                                <span className="bg-slate-800 px-2 py-0.5 rounded">
                                    {typeof item.age === "string"
                                        ? item.age
                                        : (item.age as any)?.valueVi || (item.age as any)?.valueEn || ""}
                                </span>
                            )}
                            {item.year && <span className="bg-slate-800 px-2 py-0.5 rounded">{item.year}</span>}
                            {item.episodes && <span className="bg-slate-800 px-2 py-0.5 rounded">{item.episodes}</span>}
                        </div>

                        {/* Genres */}
                        {item.genres && item.genres.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {item.genres.map((genre, idx) => (
                                    <span key={idx} className="text-xs text-gray-400">
                                        {getGenreText(genre)}
                                        {idx < item.genres!.length - 1 && " •"}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
