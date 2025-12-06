"use client"

import { useEffect } from "react"
import HeroCarousel from "@/components/homepage/hero-carousel"
import ContentCarousel from "@/components/homepage/content-carousel"
import { userFavoriteStore } from "@/stores/favoriteStore"
import { userServices } from "@/services"
import { useFilmStore } from "@/stores/filmStore"
import { useRatingStore } from "@/stores/ratingStore"

const getPosterUrl = (film: any): string => {
  if (film.posterUrl) return film.posterUrl
  if (film.filmImages && Array.isArray(film.filmImages)) {
    const posterImage = film.filmImages.find((img: any) => img.type === "poster")
    if (posterImage) return posterImage.url
    if (film.filmImages.length > 0) return film.filmImages[0].url
  }
  return "/placeholder.svg"
}

export default function Home() {
  const {
    fetchKoreanFilms,
    fetchChineseFilms,
    fetchUSUKFilms,
    loadingCountry,
    koreanFilms,
    chineseFilms,
    usukFilms,
    getPartData,
  } = useFilmStore()

  const { fetchFavoriteList, favoriteList } = userFavoriteStore()
  const { fetchRatings, averageRating } = useRatingStore()

  const handleToggleFavorite = async (filmId: string) => {
    await userServices.toggleFavoriteFilm(filmId)
    fetchFavoriteList()
  }

  useEffect(() => {
    fetchKoreanFilms()
    fetchChineseFilms()
    fetchUSUKFilms()
    fetchFavoriteList()
  }, [])

  if (loadingCountry) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Đang tải dữ liệu...</div>
      </div>
    )
  }

  const transformFilmData = (films: any[]) => {
    return films.map((film: any) => ({
      filmId: film.filmId,
      id: film.filmId,
      title: film.title,
      originalTitle: film.originalTitle,
      posterUrl: getPosterUrl(film),
      imdbRating: film.ratingData?.averageRating || 0,
      partData: film.partData || [],
      age: film.age,
      year: film.year,
      slug: film.slug,
      country: film.country,
      genres:
        film.genres
          ?.map((genre: any) =>
            typeof genre === "string" ? genre : genre.valueVi || genre.valueEn || genre.keyMap || "",
          )
          .filter(Boolean) || [],
      badges: [
        { text: "PD.8", color: "bg-blue-600" },
        { text: "TM.4", color: "bg-green-600" },
      ],
      episodes: film.partData?.length > 0 ? `${film.partData.length} tập` : "Phần 1",
    }))
  }

  const transformedKoreanFilms = transformFilmData(koreanFilms)
  const transformedChineseFilms = transformFilmData(chineseFilms)
  const transformedUSUKFilms = transformFilmData(usukFilms)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <HeroCarousel />

      <main className="space-y-4 pb-12 bg-[#191B24] overflow-x-hidden ">
        {transformedKoreanFilms.length > 0 && (
          <ContentCarousel
            title="Phim Hàn Quốc mới"
            items={transformedKoreanFilms}
            userFavoriteList={favoriteList}
            hanhleToggleFavorite={handleToggleFavorite}
            country="korea"
          />
        )}
        {transformedChineseFilms.length > 0 && (
          <ContentCarousel
            title="Phim Trung Quốc mới"
            items={transformedChineseFilms}
            userFavoriteList={favoriteList}
            hanhleToggleFavorite={handleToggleFavorite}
            country="china"
          />
        )}
        {transformedUSUKFilms.length > 0 && (
          <ContentCarousel
            title="Phim US-UK mới"
            items={transformedUSUKFilms}
            userFavoriteList={favoriteList}
            hanhleToggleFavorite={handleToggleFavorite}
            country="usa"
          />
        )}
      </main>
    </div>
  )
}
