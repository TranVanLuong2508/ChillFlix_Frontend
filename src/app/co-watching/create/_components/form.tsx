"use client";

import { FormCreateRoom } from "@/components/co_watching/formCreateRoom";
import { cn } from "@/lib/utils";
import { useFilmStore } from "@/stores/filmStore";
import { IFilmSearch } from "@/types/search.type";
import { useEffect, useState } from "react";
import SearchDropdown from "./search-dropdown";
import { FilmCard } from "./filmCard";

export const Form = () => {

  const [selectedFilm, setSelectedFilm] = useState<IFilmSearch | null>(null);

  const { filmData, getDetailFilm, resetFilmDetail } = useFilmStore();
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    handleGetDataFilm();
  }, [selectedFilm]);


  const handleGetDataFilm = async () => {
    if (!selectedFilm || (filmData && selectedFilm.filmId === filmData.film.filmId)) return;
    if (flag === 0) {
      setFlag(1);
    }
    getDetailFilm(selectedFilm.slug);
  }

  return (
    <div className="">
      {!selectedFilm && flag === 0 && (
        <div className="@container">
          <div className="flex mt-16 min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-start p-6 text-center" data-alt="Abstract gradient background with film reel overlay">
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                Tìm kiếm phim để xem cùng nhau
              </h1>
              <h2 className="text-zinc-400 leading-normal max-w-xl mx-auto">
                Vui lòng chọn phim bạn muốn xem để tiến hành tạo phòng xem chung!
              </h2>
            </div>
            <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px]">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg">
                <SearchDropdown
                  onSelectFilm={(film) => {
                    setSelectedFilm(film);
                  }}
                />
              </div>
            </label>
          </div>
        </div>
      )}
      {filmData && (
        <div className="pt-8 grid grid-cols-12 gap-8 min-h-[90vh] max-h-[90vh]">
          <div className={cn(
            "col-span-5 rounded-3xl bg-[#212a56] overflow-hidden transition-all duration-240 ease",
            "hover:shadow-[0px_0px_22px_0px_rgba(234,_179,_8,_1)] ring-1 ring-transparent ring-offset-transparent hover:ring-amber-400 cursor-pointer"
          )}>
            <FilmCard filmData={filmData} />
          </div>
          <div className="col-span-7 rounded-3xl">
            <FormCreateRoom
              filmData={filmData}
              setSelectedFilm={setSelectedFilm}
              resetFilmDetail={resetFilmDetail}
            />
          </div>
        </div>
      )}

    </div>

  )
}