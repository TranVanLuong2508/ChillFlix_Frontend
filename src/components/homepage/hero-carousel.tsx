"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Heart, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { filmService } from "@/services/filmService"

interface HeroSlide {
    filmId: string
    title: string
    originalTitle: string
    description: string
    posterUrl: string
    year: string
    ageRating: string
    genres: Array<{ valueVi: string }>
}

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(0)
    const [films, setFilms] = useState<HeroSlide[]>([])
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const res = await filmService.getHeroSlides()
                // Map API response to HeroSlide format
                const heroFilms = res.data.result.map((film: any) => ({
                    filmId: film.filmId,
                    title: film.title,
                    originalTitle: film.originalTitle,
                    description: film.description,
                    posterUrl: film.posterUrl,
                    year: film.year,
                    ageRating: film.age.valueVi,
                    genres: film.genres,
                }))
                setFilms(heroFilms)
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu phim:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchFilms()
    }, [])
    console.log(">>> check state film: ", films)

    useEffect(() => {
        if (!autoPlay || films.length === 0) return
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % films.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [autoPlay, films.length])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart(e.clientX)
        setAutoPlay(false)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return
        setIsDragging(false)
        const dragEnd = e.clientX
        const diff = dragStart - dragEnd

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide()
            } else {
                prevSlide()
            }
        }
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % films.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + films.length) % films.length)
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    if (loading || films.length === 0) {
        return (
            <section className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] bg-slate-950 flex items-center justify-center">
                <div className="text-white">Đang tải dữ liệu...</div>
            </section>
        )
    }

    const slide = films[currentSlide]

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden bg-slate-950 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Hero Slides */}
            {films.map((s, index) => (
                <div
                    key={s.filmId}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${s.posterUrl})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950" />
                    </div>
                </div>
            ))}

            {/* Content Container */}
            <div className="relative h-[500px] md:h-[550px] lg:h-[600px] flex items-center select-non">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="max-w-xl space-y-2 md:space-y-3">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                            {slide.title}
                        </h1>

                        {/* Original Title */}
                        <p className="text-sm md:text-base text-amber-400 font-semibold select-none">{slide.originalTitle}</p>

                        <div className="flex flex-wrap items-center gap-2 pt-1 select-none">
                            < div className=" flex items-center gap-1 bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700 " >
                                < span className=" text-amber-400 font-bold text-xs " > IMDb </ span >
                                < span className=" text-white font-bold text-xs " > 7.5 </ span >
                            </ div >
                            <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700 text-white font-semibold text-xs">
                                {slide.ageRating}
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700 text-white font-semibold text-xs">
                                {slide.year}
                            </div>
                            < div className=" bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700 text-white font-semibold text-xs " >
                                1h48
                            </ div >
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {slide.genres.map((genre) => (
                                <span
                                    key={genre.valueVi}
                                    className="px-2 py-1 bg-slate-800/60 backdrop-blur-sm text-white text-xs font-medium rounded border border-slate-700 hover:border-slate-600 transition-colors"
                                >
                                    {genre.valueVi}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed pt-1 line-clamp-2 select-none">
                            {slide.description}
                        </p>

                        <div className="flex items-center gap-2 pt-3">
                            <button
                                className="flex items-center justify-center w-15 h-15 rounded-full bg-gradient-to-b 
                                            from-amber-300 
                                            to-amber-500 
                                            shadow-[0_4px_12px_rgba(255,180,50,0.35)]
                                            hover:from-amber-400 
                                            hover:to-amber-600 
                                            hover:shadow-[0_6px_18px_rgba(255,180,50,0.45)] transition-all
                             duration-300 ease-out mr-4"
                            >
                                <Play className="w-7 h-7 fill-current" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300 backdrop-blur-sm">
                                <Heart className="w-4 h-4" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300 backdrop-blur-sm">
                                <Info className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                {films.map((film, index) => (
                    <button
                        key={film.filmId}
                        onClick={() => goToSlide(index)}
                        className={`relative flex-shrink-0 w-10 h-14 md:w-12 md:h-16 rounded-lg overflow-hidden transition-all duration-300 border-2 ${index === currentSlide
                            ? "border-amber-400 ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-105"
                            : "border-white/40 hover:border-white/70 opacity-75 hover:opacity-100"
                            }`}
                    >
                        <img
                            src={film.posterUrl || "/placeholder.svg"}
                            alt={film.title}
                            className="w-full h-full object-cover brightness-125 hover:brightness-150 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </button>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Hover group for arrow visibility */}
            <div className="group" />
        </section>
    )
}
