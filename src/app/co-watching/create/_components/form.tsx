"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IFilmSearch } from "@/types/search.type";
import { useFilmStore } from "@/stores/filmStore";

import SearchDropdown from "./search-dropdown";
import { FilmCard } from "./filmCard";
import { FormCreateRoom } from "@/components/co_watching/formCreateRoom";
import { toast } from "sonner";
import { useCoWatchingStore } from "@/stores/co-watchingStore";

export const Form = () => {

  const [selectedFilm, setSelectedFilm] = useState<IFilmSearch | null>(null);
  const [flag, setFlag] = useState(0);
  const [hasFetch, setHasFetch] = useState(false);

  const { filmData, partData, loadingPart, getDetailFilm, resetFilmDetail, getPartData } = useFilmStore();
  const { resetDataRoom } = useCoWatchingStore();

  useEffect(() => {
    resetDataRoom();
  }, [])

  useEffect(() => {
    handleGetDataFilm();
    setHasFetch(false);
  }, [selectedFilm]);

  useEffect(() => {
    if (loadingPart) return;

    if (selectedFilm && filmData && selectedFilm.filmId === filmData.film.filmId) {
      if (hasFetch && (!partData || partData.length === 0)) {
        toast.error("Phim này chưa có tập phim nào, vui lòng chọn phim khác");
        setFlag(0);
        setSelectedFilm(null);
        resetFilmDetail();
        setHasFetch(false);
      }
    }
  }, [selectedFilm, filmData, partData, loadingPart, hasFetch]);

  useEffect(() => {
    if (loadingPart) return;
    if (!filmData) {
      return;
    }
    if (partData !== null) {
      return;
    }

    const handleFetchPart = async () => {
      await getPartData(filmData.film.filmId);
      setHasFetch(true);
    }

    handleFetchPart();
  }, [filmData, partData, getPartData, loadingPart]);

  const handleGetDataFilm = async () => {
    if (!selectedFilm) return;
    if ((filmData && selectedFilm.filmId === filmData.film.filmId)) {
      setFlag(1);
      return;
    }
    resetFilmDetail();
    setFlag(1);
    getDetailFilm(selectedFilm.slug);
  }

  return (
    <div className="">
      {!selectedFilm && flag === 0 && (
        <div className="@container">
          <div className="flex mt-16 min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-start p-6 text-center" data-alt="Abstract gradient background with film reel overlay">
            <div className="flex flex-col gap-2">
              <h1 className="text-amber-400 text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
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
      {filmData && partData && partData.length > 0 && flag !== 0 && (
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
              partData={partData}
              setSelectedFilm={setSelectedFilm}
              resetFilmDetail={resetFilmDetail}
            />
          </div>
        </div>
      )}

    </div>

  )
}