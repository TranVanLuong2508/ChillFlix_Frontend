"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Play, Heart, Info, ChevronLeft, ChevronRight } from "lucide-react";
import filmService from "@/services/filmService";
import { userServices } from "@/services";
import type { FilmDetailRes } from "@/types/filmType";
import Link from "next/link";
import { userFavoriteStore } from "@/stores/favoriteStore";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useFilmRouter } from "@/hooks/filmRouter";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

const getPosterUrl = (film: any): string => {
  if (film.posterUrl) return film.posterUrl; // fallback for old format
  if (film.filmImages && Array.isArray(film.filmImages)) {
    const posterImage = film.filmImages.find(
      (img: any) => img.type === "backdrop"
    );
    if (posterImage) return posterImage.url;
    // fallback to first image if poster not found
    if (film.filmImages.length > 0) return film.filmImages[1].url;
  }
  return "/placeholder.svg";
};

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [films, setFilms] = useState<FilmDetailRes[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteStates, setFavoriteStates] = useState<{
    [key: string]: boolean;
  }>({});
  const { fetchFavoriteList, favoriteList } = userFavoriteStore();
  const { isAuthenticated } = useAuthStore();
  const { goGenre } = useAppRouter();
  const { goFilmDetail } = useFilmRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await filmService.getHeroSlides();

        const heroFilms = res.data.result.map(
          (film: any) =>
          ({
            filmId: film.filmId,
            title: film.title,
            originalTitle: film.originalTitle,
            description: film.description,
            posterUrl: getPosterUrl(film),
            year: film.year,
            age: film.age,
            genres: film.genres,
            slug: film.slug,
            duration: film.duration,
          } as FilmDetailRes)
        );
        setFilms(heroFilms);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phim:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
    if (isAuthenticated) {
      fetchFavoriteList();
    }
  }, []);

  useEffect(() => {
    const states: { [key: string]: boolean } = {};
    favoriteList.forEach((fav) => {
      states[fav.filmId] = true;
    });
    setFavoriteStates(states);
  }, [favoriteList]);

  const handleToggleFavorite = async (filmId: string) => {
    if (isAuthenticated) {
      await userServices.toggleFavoriteFilm(filmId);
      fetchFavoriteList();
    } else {
      toast.warning("Vui lòng đăng nhập");
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % films.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + films.length) % films.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getGenreText = (genre: any): string => {
    if (typeof genre === "string") return genre;
    return genre?.valueVi || genre?.valueEn || "";
  };

  if (loading || films.length === 0) {
    return (
      <section className="relative w-full h-[500px] md:h-[550px] lg:h-[100vh] bg-slate-950 flex items-center justify-center">
        <div className="text-white">Đang tải dữ liệu...</div>
      </section>
    );
  }

  const slide = films[currentSlide];
  const isCurrentSlideFavorite = favoriteStates[slide.filmId] || false;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-slate-950 cursor-grab active:cursor-grabbing"
      onMouseDown={(e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart(e.clientX);
        setAutoPlay(false);
      }}
      onMouseMove={() => { }}
      onMouseUp={(e: React.MouseEvent) => {
        if (!isDragging) return;
        setIsDragging(false);
        const dragEnd = e.clientX;
        const diff = dragStart - dragEnd;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        if (!isDragging) return;
        setIsDragging(false);
        const dragEnd = e.clientX;
        const diff = dragStart - dragEnd;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }}
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
      <div className="relative h-[500px] md:h-[550px] lg:h-[100vh] flex items-center select-none">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-xl space-y-2 md:space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {slide.title}
            </h1>

            {/* Original Title */}
            {slide.originalTitle && (
              <p className="text-sm md:text-base text-amber-400 font-semibold select-none">
                {slide.originalTitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1 select-none">
              <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.01)] backdrop-blur-sm px-2 py-1 rounded border border-[#f0d25c]">
                <span className="text-amber-400 font-bold text-xs">IMDb</span>
                <span className="text-white font-bold text-xs">7.5</span>
              </div>
              {slide.age && (
                <div className="bg-[rgba(255,255,255,0.01)] backdrop-blur-sm px-2 py-1 rounded border border-white text-white text-xs">
                  {slide.age.valueVi}
                </div>
              )}
              {slide.year && (
                <div className="bg-[rgba(255,255,255,0.01)] backdrop-blur-sm px-2 py-1 rounded border border-white text-white text-xs">
                  {slide.year}
                </div>
              )}
              {slide.duration && (
                <div className="bg-[rgba(255,255,255,0.01)] backdrop-blur-sm px-2 py-1 rounded border border-white text-white text-xs">
                  <span>
                    {" "}
                    {Math.floor(slide.duration / 60)}h {slide.duration % 60}m
                  </span>
                </div>
              )}
            </div>

            {slide.genres && slide.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {slide.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-[rgba(255,255,255,0.01)] backdrop-blur-sm text-white cursor-pointer text-xs font-medium rounded border border-slate-700 hover:border-slate-600 transition-colors"
                    onClick={() => {
                      goGenre(genre.valueEn);
                    }}
                  >
                    {getGenreText(genre)}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {slide.description && (
              <p className="text-xs md:text-sm text-white max-w-xl leading-relaxed pt-1 line-clamp-2 select-none">
                {slide.description}
              </p>
            )}

            <div className="flex items-center gap-2 pt-3">
              <div
                onClick={() => {
                  goFilmDetail(slide.slug);
                }}
              >
                <button
                  className="flex items-center justify-center w-17 h-17 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500
                            hover:from-yellow-400 hover:to-yellow-200 
                            hover:shadow-[0_0_20px_rgba(250,204,21,0.5)]
                            transition-all duration-300 ease-in-out cursor-pointer mr-4"
                >
                  <Play className="w-8 h-8 fill-current" />
                </button>
              </div>
              <button
                onClick={() => handleToggleFavorite(slide.filmId)}
                className="flex items-center justify-center w-10 cursor-pointer h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                <Heart
                  className="w-4 h-4"
                  fill={isCurrentSlideFavorite ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={() => {
                  goFilmDetail(slide.slug);
                }}
                className="flex items-center justify-center cursor-pointer w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
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
  );
}
