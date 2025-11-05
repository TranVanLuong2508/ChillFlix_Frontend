"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./movie-card"
import type { Film } from "@/types/filmType"

interface ContentCarouselProps {
    title: string
    items: Film[]
    badgeColor?: string
}

export default function ContentCarousel({ title, items, badgeColor = "bg-blue-600" }: ContentCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            })
            setTimeout(checkScroll, 300)
        }
    }

    return (
        <section className="px-4 md:px-8 py-8">
            <div className="max-w-full mx-auto">
                <div className="flex gap-8">
                    {/* Left Section - Title and Link */}
                    <div className="flex-shrink-0 w-40">
                        <h2 className="text-lg md:text-xl font-bold text-white mb-4 leading-tight">{title}</h2>
                        <a href="#" className="text-sm text-amber-500 hover:text-amber-400 transition-colors font-semibold">
                            Xem toàn bộ &gt;
                        </a>
                    </div>

                    {/* Right Section - Carousel */}
                    <div className="flex-1 min-w-0">
                        <div className="relative group ">
                            {/* Left Arrow */}
                            {canScrollLeft && (
                                <button
                                    onClick={() => scroll("left")}
                                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            )}

                            <div
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                                className="flex gap-4 scrollbar-hide scroll-smooth pr-4"
                            >
                                {items.map((item) => (
                                    <MovieCard key={item.filmId} item={item} badgeColor={badgeColor} showProgress={!!item.progress} />
                                ))}
                            </div>

                            {/* Right Arrow */}
                            {canScrollRight && (
                                <button
                                    onClick={() => scroll("right")}
                                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
