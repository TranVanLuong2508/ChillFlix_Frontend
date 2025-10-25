"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Heart, Info, ChevronLeft, ChevronRight } from "lucide-react"

interface HeroSlide {
    id: number
    title: string
    originalTitle: string
    description: string
    image: string
    thumbnail: string
    rating: number
    ageRating: string
    year: number
    duration: string
    genres: string[]
    episodes: Array<{ id: number; image: string; title: string }>
}

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: "TRĂM DẦM TỬ THẦN",
        originalTitle: "The Long Walk",
        description:
            "Dựa trên cuốn tiểu thuyết cùng tên của bác thầy kể chuyện Stephen King. Trăm Dầm Tử Thần xoay quanh một nhóm thiếu niên tham gia một cuộc thi thưởng niên mạng tên chuyện của X. Tại đây, họ sẽ phải duy trì một tốc độ nhất định, nếu không, họ sẽ bị loại khỏi cuộc chơi vĩnh viễn.",
        image: "/epic-action-movie-hero-banner.jpg",
        thumbnail: "/epic-action-movie-hero-banner.jpg",
        rating: 7.2,
        ageRating: "T18",
        year: 2025,
        duration: "1h 48m",
        genres: ["Chiếu Rạp", "Gay Cấn", "Kinh Dị", "Khoa Học", "Chuyên Thể", "Phiêu Lưu"],
        episodes: [
            { id: 1, image: "/episode1.jpg", title: "Tập 1" },
            { id: 2, image: "/episode2.jpg", title: "Tập 2" },
            { id: 3, image: "/episode3.jpg", title: "Tập 3" },
            { id: 4, image: "/episode4.jpg", title: "Tập 4" },
            { id: 5, image: "/episode5.jpg", title: "Tập 5" },
        ],
    },
    {
        id: 2,
        title: "SQUID GAME",
        originalTitle: "Squid Game",
        description:
            "Một trò chơi sinh tử kịch tính nơi những người chơi phải vượt qua các thử thách nguy hiểm để giành chiến thắng. Bộ phim này đã trở thành hiện tượng toàn cầu với những cảnh quay đầy căng thẳng.",
        image: "/squid-game-thriller-series.jpg",
        thumbnail: "/squid-game-thriller-series.jpg",
        rating: 8.9,
        ageRating: "T18",
        year: 2024,
        duration: "45m",
        genres: ["Chuyên Thể", "Kinh Dị", "Hành Động"],
        episodes: [
            { id: 1, image: "/squid1.jpg", title: "Tập 1" },
            { id: 2, image: "/squid2.jpg", title: "Tập 2" },
            { id: 3, image: "/squid3.jpg", title: "Tập 3" },
            { id: 4, image: "/squid4.jpg", title: "Tập 4" },
            { id: 5, image: "/squid5.jpg", title: "Tập 5" },
        ],
    },
    {
        id: 3,
        title: "THE CROWN",
        originalTitle: "The Crown",
        description:
            "Câu chuyện về cuộc đời của Nữ hoàng Elizabeth II và những sự kiện lịch sử quan trọng của Anh. Bộ phim này mang đến cái nhìn sâu sắc về các quyết định chính trị và cuộc sống cá nhân của hoàng gia.",
        image: "/the-crown-royal-drama-series.jpg",
        thumbnail: "/the-crown-royal-drama-series.jpg",
        rating: 8.6,
        ageRating: "T13",
        year: 2024,
        duration: "50m",
        genres: ["Chính Kịch", "Lịch Sử", "Tiểu Sử"],
        episodes: [
            { id: 1, image: "/crown1.jpg", title: "Tập 1" },
            { id: 2, image: "/crown2.jpg", title: "Tập 2" },
            { id: 3, image: "/crown3.jpg", title: "Tập 3" },
            { id: 4, image: "/crown4.jpg", title: "Tập 4" },
            { id: 5, image: "/crown5.jpg", title: "Tập 5" },
        ],
    },
    {
        id: 4,
        title: "STRANGER THINGS",
        originalTitle: "Stranger Things",
        description:
            "Khi một cậu bé mất tích bí ẩn, bạn bè của cậu phát hiện ra những bí mật lạ lùng, các thí nghiệm khoa học bí mật và một cô gái kỳ lạ. Một câu chuyện về tình bạn, bí ẩn và những lực lượng siêu nhiên.",
        image: "/stranger-things-inspired-poster.png",
        thumbnail: "/stranger-things-inspired-poster.png",
        rating: 8.7,
        ageRating: "T13",
        year: 2023,
        duration: "50m",
        genres: ["Khoa Học Viễn Tưởng", "Kinh Dị", "Chuyên Thể"],
        episodes: [
            { id: 1, image: "/st1.jpg", title: "Tập 1" },
            { id: 2, image: "/st2.jpg", title: "Tập 2" },
            { id: 3, image: "/st3.jpg", title: "Tập 3" },
            { id: 4, image: "/st4.jpg", title: "Tập 4" },
            { id: 5, image: "/st5.jpg", title: "Tập 5" },
        ],
    },
]

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!autoPlay) return
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [autoPlay])

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
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const slide = heroSlides[currentSlide]

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
            {heroSlides.map((s, index) => (
                <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${s.image})`,
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
                            <div className="flex items-center gap-1 bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700">
                                <span className="text-amber-400 font-bold text-xs">IMDb</span>
                                <span className="text-white font-bold text-xs">{slide.rating}</span>
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700 text-white font-semibold text-xs">
                                {slide.ageRating}
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700 text-white font-semibold text-xs">
                                {slide.year}
                            </div>
                            <div className="bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-700 text-white font-semibold text-xs">
                                {slide.duration}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {slide.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="px-2 py-1 bg-slate-800/60 backdrop-blur-sm text-white text-xs font-medium rounded border border-slate-700 hover:border-slate-600 transition-colors"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed pt-1 line-clamp-2 select-none">
                            {slide.description}
                        </p>

                        <div className="flex items-center gap-2 pt-3">
                            <button className="flex items-center justify-center w-15 h-15 rounded-full bg-gradient-to-b 
                                            from-amber-300 
                                            to-amber-500 
                                            shadow-[0_4px_12px_rgba(255,180,50,0.35)]
                                            hover:from-amber-400 
                                            hover:to-amber-600 
                                            hover:shadow-[0_6px_18px_rgba(255,180,50,0.45)] transition-all
                             duration-300 ease-out mr-4">
                                <Play className="w-7 h-7 fill-current" />
                                {/* <span>Xem Ngay</span> */}
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
                {heroSlides.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative flex-shrink-0 w-10 h-14 md:w-12 md:h-16 rounded-lg overflow-hidden transition-all duration-300 border-2 ${index === currentSlide
                            ? "border-amber-400 ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-105"
                            : "border-white/40 hover:border-white/70 opacity-75 hover:opacity-100"
                            }`}
                    >
                        <img
                            src={slide.thumbnail || "/placeholder.svg"}
                            alt={slide.title}
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
