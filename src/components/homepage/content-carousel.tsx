"use client"

import * as React from "react"
import type { FilmDetailRes } from "@/types/filmType"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import MovieCard from "./movie-card"
import type { filmInUserPage } from "@/types/user.type"
import { useAppRouter } from "@/hooks/useAppRouter"

interface ContentCarouselProps {
  title: string
  viewAllLink?: string
  items: FilmDetailRes[]
  userFavoriteList: filmInUserPage[]
  hanhleToggleFavorite: (filmId: string) => void
  country?: string // Added country prop
}

export default function ContentCarousel({
  title,
  viewAllLink = "#",
  items,
  userFavoriteList,
  hanhleToggleFavorite,
  country = "korea",
}: ContentCarouselProps) {
  const { goCountry } = useAppRouter()
  const [api, setApi] = React.useState<CarouselApi>()

  const getCountrySlug = (country: string) => {
    const countryMap: { [key: string]: string } = {
      korea: "korea",
      china: "china",
      usa: "usa",
    }
    return countryMap[country] || "korea"
  }

  const handleViewAll = () => {
    goCountry(getCountrySlug(country))
  }
  return (
    <section className="py-6 px-4 md:px-8 bg-[#191B24]">
      <div className="w-full max-w-7xl mx-auto">
        <div>
          <div className="flex items-center justify-between ">
            <h4
              className={`text-2xl md:text-3xl font-bold  leading-snug text-transparent bg-clip-text ${title === "Phim Hàn Quốc mới"
                ? "bg-[linear-gradient(235deg,_#c2a3e3,_#ffffff,_#c2a3e3)] "
                : "bg-clip-text bg-[linear-gradient(90deg,_#f5b75c,_#ffffff)]"
                } }`}
            >
              {title}
            </h4>
            <button
              onClick={handleViewAll}
              className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors font-semibold text-sm gap-1 cursor-pointer"
            >
              Xem toàn bộ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative flex items-center gap-6">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="-ml-20 pt-16 pb-4 px-16">
              {items.map((item) => {
                //luong add
                let isFavorite = false;
                const index = userFavoriteList.findIndex(
                  (f) => f.filmId === item.filmId
                );
                if (index !== -1) {
                  isFavorite = true;
                }

                return (
                  <CarouselItem key={item.filmId} className="basis-1/3 pl-8">
                    <MovieCard
                      item={item}
                      isFavorite={isFavorite}
                      hanhleToggleFavorite={hanhleToggleFavorite}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-slate-100 border-0 text-slate-900 shadow-lg" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-slate-100 border-0 text-slate-900 shadow-lg" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
