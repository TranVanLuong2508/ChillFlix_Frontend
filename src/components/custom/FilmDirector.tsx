"use client";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { FilmData } from "@/types/backend.type";
import { AnimatePresence, motion } from "framer-motion";
import { useAppRouter } from "@/hooks/filmRouter";
import { useFilmStore } from "@/stores/filmStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFilmClick } from "@/hooks/handleFiilmClick";

interface FilmDirectorProps {
    filmDirectorData: FilmData[] | null;
}

export default function FilmDirector({ filmDirectorData }: FilmDirectorProps) {
    const swiperRef = useRef<any>(null);
    const { goFilmDetail } = useAppRouter();
    const { handleFilmClick } = useFilmClick();

    if (!filmDirectorData || filmDirectorData.length === 0) {
        return (
            <p className="text-gray-400 italic text-center mt-4">
                Chưa có phim nào được ghi nhận.
            </p>
        );
    }


    const filmsByYear = filmDirectorData.reduce((acc: Record<string, FilmData[]>, film) => {
        const year = film.year || "Không rõ";
        if (!acc[year]) acc[year] = [];
        acc[year].push(film);
        return acc;
    }, {}) || {};

    const sorted = Object.entries(filmsByYear)
        .map(([year, films]) => ({ year, films }))
        .sort((a, b) => Number(a.year) - Number(b.year));

    return (
        <Tabs defaultValue="all" className="w-full !overflow-visible">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Các Phim Tham Gia</h3>
                <TabsList className="bg-zinc-800 rounded-md">
                    <TabsTrigger
                        value="all"
                        className="text-zinc-300 hover:text-black hover:bg-yellow-400
                                    data-[state=active]:text-black data-[state=active]:bg-yellow-400
                                    transition-colors px-3 py-1 rounded-md font-medium"
                    >
                        Tất cả
                    </TabsTrigger>
                    <TabsTrigger
                        value="time"
                        className="text-zinc-300 hover:text-black hover:bg-yellow-400
                                    data-[state=active]:text-black data-[state=active]:bg-yellow-400
                                    transition-colors px-3 py-1 rounded-md font-medium"
                    >
                        Thời gian
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* TẤT CẢ */}
            <TabsContent value="all" className="mt-2">
                <div className="px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
                    {filmDirectorData.map((f, i) => {
                        const thumb = f.thumbUrl || f.filmImages?.[0]?.url || "/images/small.jpg";
                        return (
                            <motion.div
                                key={i}
                                whileHover={{
                                    scale: 1.08,
                                    zIndex: 10,
                                    boxShadow: "0 0 25px rgba(250, 204, 21, 0.3)",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="group relative overflow-hidden rounded-xl aspect-[3/4] md:aspect-[2/3] h-72 md:h-80 min-w-[220px] bg-zinc-800/50 cursor-pointer"
                                onClick={() => goFilmDetail(f.filmId)}
                            >
                                <img
                                    src={thumb}
                                    alt={f.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                                flex flex-col justify-end p-4"
                                >
                                    <h1 className="text-[11px] md:text-sm font-semibold text-white leading-tight line-clamp-2">
                                        {f.title}
                                    </h1>
                                    <h2 className="text-xs text-gray-300 mt-1 line-clamp-1">
                                        {f.originalTitle}
                                    </h2>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {f.year && <span>{f.year}</span>}
                                        {f.duration && <span> - {f.duration} phút</span>}
                                    </div>
                                    <button


                                        className="absolute bottom-3 right-4 text-xs font-semibold 
                                                    bg-yellow-400 text-black px-3 py-1.5 rounded-full shadow-md
                                                    hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(250,204,21,0.6)]
                                                    transition-all duration-300 ease-in-out"
                                    >
                                        Xem ngay
                                    </button>
                                </div>
                            </motion.div>

                        );
                    })}


                </div>
            </TabsContent>

            {/* THEO THỜI GIAN */}
            <TabsContent
                value="time"
                className="mt-6 relative w-full max-w-[1440px] mx-auto px-4"
            >
                <div className="relative w-full">
                    <div className="absolute top-[52px] left-0 right-0 h-[2px] bg-yellow-400/70 rounded-full z-0" />
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-yellow-400 p-3 rounded-full z-20 transition"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-yellow-400 p-3 rounded-full z-20 transition"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <Swiper
                        modules={[FreeMode]}
                        freeMode
                        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={36}
                        slidesPerView="auto"
                        grabCursor
                        className="relative z-10 w-full lg:px-4"
                    >
                        {sorted.map((group) => (
                            <SwiperSlide
                                key={group.year}
                                className="!w-[300px] flex-shrink-0 flex flex-col items-center"
                            >
                                <div className="flex flex-col items-center mb-5">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400 mb-2 shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
                                    <span className="text-yellow-400 font-semibold text-lg">{group.year}</span>
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    {group.films.map((f, i) => {
                                        const thumb = f.thumbUrl || f.filmImages?.[0]?.url || "/images/small.jpg";
                                        return (
                                            <motion.div
                                                key={f.filmId || i}
                                                whileHover={{ scale: 1.05 }}
                                                className="flex flex-col items-center cursor-pointer"
                                            >
                                                <HoverFilmCard f={f} handleFilmClick={handleFilmClick} thumb={thumb} />
                                                <h1 className="text-[11px] md:text-sm font-semibold text-white leading-tight line-clamp-2">
                                                    {f.title}
                                                </h1>
                                                <h2 className="text-xs text-gray-300 mt-1 line-clamp-1">{f.originalTitle}</h2>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {f.year && <span>{f.year}</span>}
                                                    {f.duration && <span> - {f.duration} phút</span>}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </TabsContent>
        </Tabs>
    );
}

function HoverFilmCard({ f, handleFilmClick, thumb }: any) {
    const [hovered, setHovered] = useState(false);
    const { goFilmDetail } = useAppRouter();
    return (
        <div
            className="relative flex items-center gap-3"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                onClick={() => goFilmDetail(f.filmId)}
                className="rounded-xl overflow-hidden aspect-[2/3] w-40 sm:w-44 
                   bg-zinc-800/60 cursor-pointer border border-zinc-700/60 
                   hover:border-yellow-400/60 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]
                   transition-all duration-300"
            >
                <img
                    src={thumb}
                    alt={f.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            <AnimatePresence>
                {hovered && (
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => handleFilmClick(f.filmId)}
                        className="text-[10px] font-semibold bg-yellow-400 text-black px-3 py-1.5 
                           rounded-full shadow-[0_0_12px_rgba(250,204,21,0.4)] 
                           hover:bg-yellow-300 hover:scale-105 
                           transition-all duration-300 whitespace-nowrap"
                    >
                        Xem ngay
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
