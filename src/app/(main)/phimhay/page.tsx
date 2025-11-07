"use client"

import { useEffect, useState } from "react"
import HeroCarousel from "@/components/homepage/hero-carousel"
import ContentCarousel from "@/components/homepage/content-carousel"
import type { Film } from "@/types/filmType"
import filmServices from "@/services/filmService"

const getPosterUrl = (film: any): string => {
  if (film.posterUrl) return film.posterUrl // fallback for old format
  if (film.filmImages && Array.isArray(film.filmImages)) {
    const posterImage = film.filmImages.find((img: any) => img.type === "poster")
    if (posterImage) return posterImage.url
    // fallback to first image if poster not found
    if (film.filmImages.length > 0) return film.filmImages[0].url
  }
  return "/placeholder.svg"
}

export default function Home() {
  const [koreanItems, setKoreanItems] = useState<Film[]>([])
  const [chineseItems, setChineseItems] = useState<Film[]>([])
  const [usukItems, setUsukItems] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true)
        const response = await filmServices.getAll()
        const films = response.data?.result || []
        const transformedFilms = films.map(
          (film: any) =>
            ({
              filmId: film.filmId,
              id: film.filmId,
              title: film.title,
              originalTitle: film.originalTitle,
              posterUrl: getPosterUrl(film),
              imdbRating: 7.5,
              age: film.age,
              year: film.year,
              genres:
                film.genres
                  ?.map((genre: any) =>
                    typeof genre === "string" ? genre : genre.valueEn || genre.valueVi || genre.keyMap || "",
                  )
                  .filter(Boolean) || [],
              badges: [
                { text: "PD.8", color: "bg-blue-600" },
                { text: "TM.4", color: "bg-green-600" },
              ],
              episodes: "Phần 1, Tập 12",
            }) as Film,
        )
        const itemsPerCategory = Math.ceil(transformedFilms.length / 3)
        setKoreanItems(transformedFilms.slice(0, itemsPerCategory))
        setChineseItems(transformedFilms.slice(itemsPerCategory, itemsPerCategory * 2))
        setUsukItems(transformedFilms.slice(itemsPerCategory * 2))

        setError(null)
      } catch (err) {
        setError("Không thể tải dữ liệu phim")
      } finally {
        setLoading(false)
      }
    }

    fetchFilms()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Đang tải dữ liệu...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeroCarousel />

      <main className="space-y-4 pb-12 bg-[#191B24] ">
        {koreanItems.length > 0 && <ContentCarousel title="Phim Hàn Quốc mới" items={koreanItems} />}
        {chineseItems.length > 0 && <ContentCarousel title="Phim Trung Quốc mới" items={chineseItems} />}
        {usukItems.length > 0 && <ContentCarousel title="Phim US-UK mới" items={usukItems} />}
      </main>
    </div>
  )
}
