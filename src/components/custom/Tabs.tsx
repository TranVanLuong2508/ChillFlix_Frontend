"use client";

import { useEffect, useState } from "react";
import { FilmActorSimpleData, FilmData, PartData, EpisodeData } from "@/types/backend.type";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useAppRouter } from "@/hooks/filmRouter";
import { useRouter } from "next/navigation";

const tabs = [
  { id: "episodes", label: "Tập phim" },
  { id: "gallery", label: "Hình ảnh" },
  { id: "cast", label: "Diễn viên" },
  { id: "recommend", label: "Đề xuất" },
];

type TabsSectionProps = {
  filmActor: FilmActorSimpleData[];
  film: FilmData;
  part: {
    parts: PartData[];
  };
};

export default function TabsSection({ film, part, filmActor }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState("episodes");
  const [selectedPart, setSelectedPart] = useState<PartData | null>();
  const [isLoadingPart, setIsLoadingPart] = useState(false);
  const { goActorDetail } = useAppRouter();
  const { goWatchNow } = useAppRouter();


  const handleSelectPart = (p: PartData) => {
    setIsLoadingPart(true);
    setTimeout(() => {
      setSelectedPart(p);
      setIsLoadingPart(false);
    }, 300);
  };

  useEffect(() => {
    if (part?.parts?.length) {
      setSelectedPart(part.parts[0]);
    }
  }, [part]);


  return (
    <div className="mt-8">
      <div className="flex border-b border-zinc-800 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-2 font-semibold cursor-pointer transition-all duration-500 ease-in-out ${activeTab === tab.id
              ? "text-yellow-400"
              : "text-white hover:text-yellow-400"
              }`}
          >
            {tab.label}
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-yellow-400 transition-all duration-500 ease-in-out ${activeTab === tab.id ? "w-full" : "w-0"
                }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "episodes" && (
          <div>
            {!part || !part.parts?.length ? (
              <div className="text-center text-gray-400 py-10">
                Đang tải danh sách phần...
              </div>
            ) : film.type?.keyMap === "FT_SINGLE" ? (

              <>
                <h2 className="text-xl font-semibold mb-3 text-yellow-400">Bản chiếu</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="relative overflow-hidden rounded-xl border border-zinc-800 
                 bg-zinc-900 hover:border-yellow-400 transition-all duration-300
                 shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]
                 cursor-pointer"
                  >
                    <img
                      src={film.thumbUrl || "/images/small.jpg"}
                      alt={film.title}
                      className="w-full h-48 md:h-40 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                    />

                    <h3 className="absolute bottom-3 left-4 text-yellow-400 text-base font-semibold tracking-wide drop-shadow-md">
                      {film.title || "Bản chiếu chính"}
                    </h3>

                    <button
                      onClick={() => goWatchNow(part.parts[0].episodes[0].id)}
                      className="absolute bottom-3 right-4 text-xs font-semibold 
                   bg-yellow-400 text-black px-3 py-1.5 rounded-full shadow-md
                   hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(250,204,21,0.6)]
                   transition-all duration-300 ease-in-out"
                    >
                      Xem ngay
                    </button>
                  </div>
                </div>
              </>




            ) : (

              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-gray-200 hover:text-yellow-400 transition-all focus:outline-none focus:ring-0">
                      <Menu size={22} />
                      <h2 className="text-xl font-semibold">
                        {selectedPart?.title || `Phần ${selectedPart?.partNumber}`}
                      </h2>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    side="right"
                    align="start"
                    className="w-52 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 
                              border border-zinc-800/70 text-gray-200 rounded-xl p-2 
                              shadow-[0_0_20px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-right-1
                              duration-300 ease-out"
                    sideOffset={8}
                  >
                    <DropdownMenuLabel
                      className="flex justify-between items-center px-2 py-1 text-[11px] uppercase 
                                  tracking-wide text-gray-400 border-b border-zinc-800/70">
                      <span>Chọn phần</span>
                    </DropdownMenuLabel>

                    {part.parts.map((p, index) => (
                      <DropdownMenuItem
                        key={`part-item-${index}`}
                        onClick={() => {
                          setSelectedPart(p);
                          handleSelectPart(p);
                          // route.push(`/play/${p.episodes[0].id}`);
                        }}
                        className={`flex items-center justify-between w-full my-1 px-3 py-2 rounded-lg 
                            text-sm font-medium cursor-pointer select-none transition-all duration-200 ease-in-out 
                             text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black 
                              hover:shadow-[0_0_12px_rgba(250,204,21,0.45)]
                             focus:bg-yellow-400 focus:text-black 
                                                        
                            ${selectedPart?.id === p.id
                            ? "bg-yellow-400 text-black shadow-[0_0_12px_rgba(250,204,21,0.45)]"
                            : "text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_14px_rgba(250,204,21,0.4)]"
                          }`}
                      >
                        <span className="truncate">{p.title || `Phần ${p.partNumber}`}</span>
                      </DropdownMenuItem>
                    ))}



                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                  {isLoadingPart ? (
                    <div className="flex justify-center items-center col-span-full py-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-400 text-sm">Đang tải tập phim...</span>
                      </div>
                    </div>
                  ) : (
                    selectedPart?.episodes?.map((ep, index) => (
                      <div
                        key={`${ep.id}-${index}`}
                        onClick={() => goWatchNow(ep.id)}
                        className="relative overflow-hidden rounded-xl border border-zinc-800 
                                  bg-zinc-900 hover:border-yellow-400 transition-all duration-300
                                  shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]
                                  cursor-pointer"
                      >
                        <div className="relative w-full h-32">
                          <img
                            src={ep.thumbUrl || "/images/small.jpg"}
                            alt={ep.title}
                            className="w-full h-full object-cover rounded-t-lg group-hover:brightness-110 transition-all duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <span className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors duration-200 hover:text-yellow-400 font-medium">
                            {ep.title || `Tập ${ep.episodeNumber}`}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>


              </>
            )}
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">Hình ảnh</h2>

            {Array.isArray(film.filmImages) && (film.filmImages.length > 0 || film.thumbUrl) ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 md:gap-2">
                {film.thumbUrl && (
                  <div
                    key="thumb"
                    className="aspect-[2/3] overflow-hidden rounded-lg border border-zinc-800 hover:border-yellow-400 hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={film.thumbUrl}
                      alt={`${film.title} - Thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {film.filmImages.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-[2/3] overflow-hidden rounded-lg border border-zinc-800 hover:border-yellow-400 hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={img.url || "/images/small.jpg"}
                      alt={`${film.title} - ${img.type}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic mt-2">Chưa có hình ảnh cho phim này</p>
            )}
          </div>
        )}



        {activeTab === "cast" && (
          <div>
            <h2 className="text-xl font-semibold mb-5">Diễn viên</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -ml-3">
              {Array.isArray(filmActor) && filmActor.length > 0 ? (
                filmActor.map((a, index) =>
                  a.actorId ? (
                    <div
                      key={`${a.actorId}-${index}`}
                      onClick={() => goActorDetail(a.actorId)}
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <div className="relative hover:scale-105 transition-transform duration-300">
                        <img
                          src={a.avatarUrl || "/images/small.jpg"}
                          alt={a.actorName}
                          className="w-36 md:w-48 md:h-48 object-cover rounded-xl shadow-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-opacity-60 py-1 rounded-b-xl justify-center text-center">
                          <button className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                            {a.actorName}
                          </button>
                        </div>
                      </div>
                      <span className="mt-2 text-sm text-pink-300 italic">
                        {a.characterName || ""}
                      </span>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-gray-400 italic">Chưa có thông tin diễn viên</p>
              )}
            </div>
          </div>
        )}



        {activeTab === "recommend" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Phim đề xuất</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-zinc-900 p-4 rounded-lg h-48"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
