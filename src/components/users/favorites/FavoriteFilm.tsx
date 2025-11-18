"use client";

import { useFilmRouter } from "@/hooks/filmRouter";
import { filmInUserPage } from "@/types/user.type";
import { X } from "lucide-react";
import { userServices } from "@/services";
import { Loader } from "lucide-react";

export interface FavoriteFilmsProps {
  films: filmInUserPage[];
  fetchFilmList: () => void;
  isLoading: boolean;
}

export default function FavoriteFilms({
  films,
  fetchFilmList,
  isLoading,
}: FavoriteFilmsProps) {
  const { goFilmDetail } = useFilmRouter();

  const hanhleToggleFavorite = async (filmId: string) => {
    await userServices.toggleFavoriteFilm(filmId);
    fetchFilmList();
  };

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-white mb-6">Phim Yêu thích</h1>

      {isLoading === true ? (
        <>
          <div className="w-full flex justify-center mt-4 ">
            <div
              className="w-full max-w-4xl h-48 rounded-xl flex items-center justify-center
                      border border-[#2a3040]/60 bg-[#1a1d24]/60 backdrop-blur-sm
                      text-gray-400 text-base font-medium shadow-inner"
            >
              <Loader
                className="animate-spin"
                size={20}
                style={{ animationDuration: "1.5s" }}
              />{" "}
              <span className="ml-1"> Đang tải danh sách phim yêu thích</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Nếu không có film */}
          {films.length === 0 && (
            <div className="w-full flex justify-center mt-4">
              <div
                className="w-full max-w-4xl h-48 rounded-xl flex items-center justify-center
                      border border-[#2a3040]/60 bg-[#1a1d24]/60 backdrop-blur-sm
                      text-gray-400 text-base font-medium shadow-inner"
              >
                Bạn chưa có phim yêu thích nào
              </div>
            </div>
          )}

          {/* Grid film cards */}
          {films.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-scroll overflow-y-auto">
              {films.map((film) => (
                <div key={film.filmId} className="flex flex-col">
                  {/* CARD */}
                  <div
                    className="relative bg-[#25272f] rounded-xl overflow-hidden shadow cursor-pointer "
                    style={{ borderRadius: "12px" }}
                  >
                    {/* Button remove */}
                    <button
                      onClick={() => {
                        hanhleToggleFavorite(film.filmId);
                      }}
                      className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full hover:bg-black/80 z-20"
                    >
                      <X size={18} className="text-white cursor-pointer" />
                    </button>

                    {/* Poster */}
                    <div
                      onClick={() => {
                        goFilmDetail(film.slug);
                      }}
                      className="w-full h-64 relative"
                    >
                      <img
                        src={film.thumbUrl}
                        alt={film.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-[1.04]"
                      />
                    </div>

                    {/* Badge */}
                    {film.badge && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 text-xs rounded-md bg-yellow-300 text-black font-semibold shadow">
                          {film.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Info */}
                  <div className="flex flex-col justify-between text-center">
                    <p className="mt-3 text-white font-semibold truncate px-1">
                      {film.title}
                    </p>
                    <p className="text-gray-400 text-sm truncate px-1">
                      {film.originalTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
