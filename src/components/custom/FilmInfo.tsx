"use client";


import { ActorData } from "@/types/actorData";
import { FilmData } from "@/types/filmData";
import { FilmDirectorData } from "@/types/filmDirectorData";
import { RatingData } from "@/types/ratingData";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface FilmInfoProps {
  film: FilmData;
  director: FilmDirectorData[];
  actor: ActorData[];
  rating: RatingData;
}


export default function FilmInfo({ film, director, actor, rating }: FilmInfoProps) {

  const router = useRouter();

  const handleFilmClick = (actorId: number) => {
    router.push(`/actor-detail/${actorId}`);
  };

  return (
    <div className="flex flex-col gap-4 px-6 -mx-4 py-6 rounded-lg ">
      <img
        src={film.filmImages?.[0]?.url || "/images/small.jpg"}
        alt={film.title}
        className="w-40 md:w-48 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      />

      <h1 className="text-2xl font-bold text-white">{film.title}</h1>
      {film.originalTitle && <h2 className="text-sm text-gray-400 italic">{film.originalTitle}</h2>}



      <div className="flex items-center gap-2 text-sm text-gray-300">

        <span className="inline-flex items-center bg-[#facc15] text-black px-2 py-0.5 rounded font-semibold">
          {rating.averageRating > 0 ? `${rating.averageRating}` : 'Chưa có'}
          <Star size={14} className="ml-1" />
        </span>


        {film.age && (
          <span className="bg-[#FF3300] text-gray-100 px-2 py-0.5 rounded font-semibold">
            {film.age.valueVi}
          </span>
        )}
        {film.year && (
          <span className="bg-[#27272a] text-gray-200 px-2 py-0.5 rounded border">{film.year}</span>
        )}
        {film.duration > 0 && (
          <span className="bg-[#27272a] text-gray-200 px-2 py-0.5 rounded border">
            {Math.floor(film.duration / 60)}h {film.duration % 60}m
          </span>
        )}
      </div>

      {!!film.genres?.length && (
        <div className="flex flex-wrap gap-2 text-sm text-gray-300 mt-2 ">
          {film.genres.map((g: any) => (
            < button
              key={g.keyMap}
              className="bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 px-2 py-0.5 rounded cursor-pointer"
            >
              {g.valueVi}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-base font-semibold text-white mb-1">Giới thiệu:</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{film.description}</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-semibold text-white">Thời lượng: </h3>
        <span className="text-gray-300"> {Math.floor(film.duration / 60)}h {film.duration % 60}m</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-semibold text-white">Quốc gia: </h3>
        <button className="text-gray-300 cursor-pointer hover:text-yellow-400">{film.country?.valueVi}</button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-semibold text-white">Sản xuất:</h3>
        <button className="text-gray-300 cursor-pointer hover:text-yellow-400"></button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <h3 className="font-semibold text-white">Đạo diễn:</h3>
        {director?.length ? (
          director.map((d) => (
            <div key={d.directorId} className="flex items-center gap-2">
              <button className="text-gray-300 cursor-pointer hover:text-yellow-400">{d.directorName}</button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">Chưa cập nhật đạo diễn</p>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-semibold text-white">Diễn viên</h3>
        <div>
          {Array.isArray(actor) && actor.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-items-center -ml-2 ">
              {actor.map((a, index) => (
                <div
                  key={`${a.actorId}-${index}`}
                  onClick={() => handleFilmClick(a.actorId)}
                  className="flex flex-col items-center text-center cursor-pointer group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg mt-6 hover:scale-105 transition-transform duration-300">
                    <img
                      src={a.avatarUrl || "/images/small.jpg"}
                      alt={a.actorName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <button className="mt-3 text-sm md:text-base text-white group-hover:text-yellow-400 transition-colors whitespace-nowrap cursor-pointer">
                    {a.actorName}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic mt-2">Chưa có thông tin diễn viên</p>
          )}
        </div>
      </div>

    </div >
  );

}
