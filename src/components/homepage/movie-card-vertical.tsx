"use client"

import { useState } from "react"
import { Play, Heart, Info } from "lucide-react"
import type { FilmDetailRes } from "@/types/filmType"
import { useFilmRouter } from "@/hooks/filmRouter"

interface MovieCardVerticalProps {
    item: FilmDetailRes
    badgeColor?: string
    handleToggleFavorite: (filmId: string) => void
    isFavorite: boolean
}

export default function MovieCardVertical({ item, handleToggleFavorite, isFavorite }: MovieCardVerticalProps) {
    const [isHovered, setIsHovered] = useState(false)
    const { goFilmDetail } = useFilmRouter()

    const getGenreText = (genre: any): string => {
        if (typeof genre === "string") return genre
        return genre?.valueVi || genre?.valueEn || ""
    }

    return (
        <div
            className="flex flex-col cursor-pointer group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden rounded-lg bg-slate-700 w-full aspect-[2/3]">
                <img
                    src={item.posterUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Badges */}
                {item.badges && item.badges.length > 0 && (
                    <div className="absolute top-2 left-2 flex gap-1">
                        {item.badges.map((badge, idx) => (
                            <span key={idx} className={`${badge.color} text-white px-2 py-0.5 rounded text-xs font-bold`}>
                                {badge.text}
                            </span>
                        ))}
                    </div>
                )}

                {/* Hover Overlay */}
                {isHovered && (
                    <div className="absolute inset-0 bg-black/60 flex items-center  justify-center gap-2 transition-all duration-300">
                        <div
                            onClick={() => {
                                goFilmDetail(item.slug)
                            }}
                        >
                            <button className="bg-gradient-to-r from-yellow-300 to-yellow-500 cursor-pointer hover:from-yellow-400 hover:to-yellow-200 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
                                <Play className="w-4 h-4 fill-current" />
                            </button>
                        </div>
                        <button
                            onClick={() => handleToggleFavorite(item.filmId)}
                            className="bg-slate-700/80 hover:bg-slate-600 cursor-pointer text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                        >
                            <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                        <button
                            onClick={() => {
                                goFilmDetail(item.slug)
                            }}
                            className="bg-slate-700/80 hover:bg-slate-600 cursor-pointer text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                            <Info className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-3 space-y-1 flex-1"
                onClick={() => {
                    goFilmDetail(item.slug)
                }}
            >
                <h3 className="font-bold text-white text-sm line-clamp-2 hover:text-yellow-400">{item.title}</h3>
                {item.originalTitle && <p className="text-xs text-gray-400 line-clamp-1">{item.originalTitle}</p>}

                {/* Metadata */}
                <div className="flex flex-wrap gap-1 text-xs text-gray-400 pt-2">
                    {item.year && <span>{item.year}</span>}
                </div>
            </div>
        </div>
    )
}
