"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Heart, Info, Star } from "lucide-react"
import type { FilmDetailRes } from "@/types/filmType"
import { useFilmRouter } from "@/hooks/filmRouter"
import { ratingService } from "@/services/ratingService"

interface MovieCardProps {
  item: FilmDetailRes
  badgeColor?: string
  showProgress?: boolean
  isFavorite: boolean
  hanhleToggleFavorite: (filmId: string) => void
}

export default function MovieCard({
  item,
  badgeColor = "bg-blue-600",
  showProgress = false,
  isFavorite,
  hanhleToggleFavorite,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const [averageRating, setAverageRating] = useState<number>(0)
  const [isLoadingRating, setIsLoadingRating] = useState<boolean>(false)
  const { goFilmDetail } = useFilmRouter()

  useEffect(() => {
    if (!item.filmId) return

    const fetchMovieRating = async () => {
      setIsLoadingRating(true)
      try {
        const response = (await ratingService.getRatingsByFilm(item.filmId)) as any
        if (response?.EC === 1) {
          const result = response.result || response.data?.result
          setAverageRating(result?.averageRating || 0)
        }
      } catch (error) {
        console.error(`Error fetching rating for ${item.filmId}:`, error)
        setAverageRating(0)
      } finally {
        setIsLoadingRating(false)
      }
    }

    fetchMovieRating()
  }, [item.filmId])

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
      <div className="relative overflow-visible rounded-lg bg-slate-800 transition-all duration-300 w-90 h-48">
        {/* Image */}
        <div className="relative w-full h-full  bg-slate-700 rounded-lg">
          <img
            src={item.posterUrl || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 rounded-lg"
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

      <div className="mt-3 space-y-1">
        <h3 className="font-bold text-white text-base line-clamp-2">{item.title}</h3>
        {item.originalTitle && <p className="text-sm text-gray-400 line-clamp-1">{item.originalTitle}</p>}
      </div>

      {isHovered && (
        <div
          className={`absolute z-50 w-100 bg-[#191B24] rounded-lg overflow-hidden shadow-2xl border border-slate-700 pointer-events-auto animate-popup-in`}
          style={{
            top: 100,
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
              <div
                className="flex-1 rounded-lg flex "
                onClick={() => {
                  goFilmDetail(item.slug)
                }}
              >
                <button
                  className="flex-1 bg-gradient-to-r from-yellow-300 to-yellow-500
                            hover:from-yellow-400 hover:to-yellow-200 
                            hover:shadow-[0_0_20px_rgba(250,204,21,0.5)]
                            transition-all duration-300 ease-in-out cursor-pointer text-white font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Xem ngay
                </button>
              </div>
              <button
                onClick={() => {
                  hanhleToggleFavorite(item.filmId)
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() => {
                  goFilmDetail(item.slug)
                }} className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-1 text-xs text-gray-300">
              {averageRating > 0 && (
                <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.01)] backdrop-blur-sm px-2 py-1 rounded border border-[#f0d25c]">
                  <span className="text-white font-bold text-xs flex items-center gap-0.5">
                    {averageRating.toFixed(1)}
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                  </span>
                </div>
              )}
              {item.age && (
                <span className="bg-[rgba(255,255,255,0.01)] backdrop-blur-sm px-2 py-1 rounded border border-white text-white text-xs">
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
