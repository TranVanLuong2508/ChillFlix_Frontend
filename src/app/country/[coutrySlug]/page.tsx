"use client"

import { useEffect, useState } from "react"
import filmServices from "@/services/filmService"
import { allCodeServie, userServices } from "@/services"
import type { FilmDetailRes } from "@/types/filmType"
import type { AllCodeRow } from "@/types/allcode.type"
import MovieCardVertical from "@/components/homepage/movie-card-vertical"
import FilterPanel from "@/components/search/filter-panel"
import { userFavoriteStore } from "@/stores/favoriteStore"

interface CountryPageProps {
    params: Promise<{
        coutrySlug: string
    }>
}

const getPosterUrl = (film: any): string => {
    if (film.posterUrl) return film.posterUrl
    if (film.filmImages && Array.isArray(film.filmImages)) {
        const posterImage = film.filmImages.find((img: any) => img.type === "poster")
        if (posterImage) return posterImage.url
        if (film.filmImages.length > 0) return film.filmImages[0].url
    }
    return "/placeholder.svg"
}

export default function CountryPage({ params }: CountryPageProps) {
    const [countryName, setCountryName] = useState<string>("")
    const [countryDisplayName, setCountryDisplayName] = useState<string>("")
    const [apiCountryKey, setApiCountryKey] = useState<string>("")
    const [films, setFilms] = useState<FilmDetailRes[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { fetchFavoriteList, favoriteList } = userFavoriteStore()

    const handleToggleFavorite = async (filmId: string) => {
        await userServices.toggleFavoriteFilm(filmId)
        fetchFavoriteList()
    }

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params
            const country = resolvedParams.coutrySlug
            setCountryName(country)
        }
        unwrapParams()
    }, [params])

    useEffect(() => {
        const fetchCountryName = async () => {
            try {
                const res = await allCodeServie.getCountriesList()
                if (res && res.EC === 1) {
                    const countries = res.data?.COUNTRY || []

                    const country = countries.find(
                        (c: AllCodeRow) =>
                            c.valueEn?.toUpperCase() === countryName.toUpperCase() ||
                            c.keyMap?.toUpperCase() === countryName.toUpperCase(),
                    )

                    if (country) {
                        setCountryDisplayName(country.valueVi)
                        setApiCountryKey(country.valueEn || country.keyMap)
                    } else {
                        setCountryDisplayName(countryName)
                        setApiCountryKey(countryName)
                    }
                }
            } catch (err) {
                console.error("Error fetching country name:", err)
                setCountryDisplayName(countryName)
                setApiCountryKey(countryName)
            }
        }

        if (countryName) {
            fetchCountryName()
        }
    }, [countryName])

    useEffect(() => {
        const fetchFilmsByCountry = async () => {
            try {
                setLoading(true)
                const response = await filmServices.getByCountry(apiCountryKey, page)

                const filmList = response.data?.result || []
                const meta = response.data?.meta

                const transformedFilms = filmList.map(
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
                            slug: film.slug,
                            genres:
                                film.genres
                                    ?.map((genre: any) =>
                                        typeof genre === "string" ? genre : genre.valueVi || genre.valueEn || genre.keyMap || "",
                                    )
                                    .filter(Boolean) || [],
                            badges: [
                                { text: "PD", color: "bg-blue-600" },
                                { text: film.type?.valueVi || "Film", color: "bg-green-600" },
                            ],
                            episodes: "Phần 1",
                        }) as FilmDetailRes,
                )

                setFilms(transformedFilms)
                if (meta) {
                    setTotalPages(meta.totalPages || 1)
                }
                setError(null)
            } catch (err) {
                console.error("Error fetching films:", err)
                setError("Không thể tải dữ liệu phim")
            } finally {
                setLoading(false)
            }
        }

        if (apiCountryKey) {
            fetchFilmsByCountry()
        }
    }, [apiCountryKey, page])

    useEffect(() => {
        fetchFavoriteList()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <main className="pb-12 bg-[#191B24]">
                {/* Header Section */}
                <div className="px-4 py-8 ">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Phim {countryDisplayName}</h1>
                        <p className="text-gray-400">{films.length} phim | Cập nhật mới nhất</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="max-w-7xl mx-auto">
                    <FilterPanel></FilterPanel>
                </div>
                {/* Content Section */}
                <div className="px-4 py-8">
                    {loading ? (
                        <div className="flex items-center justify-center min-h-96">
                            <div className="text-white text-lg">Đang tải dữ liệu...</div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center min-h-96">
                            <div className="text-red-500 text-lg">{error}</div>
                        </div>
                    ) : films.length === 0 ? (
                        <div className="flex items-center justify-center min-h-96">
                            <div className="text-gray-400 text-lg">Không tìm thấy phim nào</div>
                        </div>
                    ) : (
                        <>
                            {/* Movie Grid */}
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {films.map((film) => {
                                        let isFavorite = false
                                        const index = favoriteList.findIndex((f) => f.filmId === film.filmId)
                                        if (index !== -1) {
                                            isFavorite = true
                                        }

                                        return (
                                            <div key={film.filmId} className="flex flex-col">
                                                <MovieCardVertical
                                                    item={film}
                                                    isFavorite={isFavorite}
                                                    handleToggleFavorite={handleToggleFavorite}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="max-w-7xl mx-auto mt-8 flex justify-center gap-2">
                                    <button
                                        onClick={() => setPage(Math.max(1, page - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 bg-[#2a3040] hover:bg-[#3a4050] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                                    >
                                        Trước
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">
                                            Trang {page} / {totalPages}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                                        disabled={page === totalPages}
                                        className="px-4 py-2 bg-[#2a3040] hover:bg-[#3a4050] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                                    >
                                        Sau
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
