"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu } from "lucide-react";
import { useFilmRouter } from "@/hooks/filmRouter";
import { PartRes } from "@/types/part.type";
import { PartDetail } from "@/types/part.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilmStore } from "@/stores/filmStore";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "episodes", label: "Tập phim" },
  { id: "gallery", label: "Hình ảnh" },
  { id: "cast", label: "Diễn viên" },
];

export default function TabsSection() {
  const { filmData, partData, getPartData } = useFilmStore();
  const { part, episode, resetInfoPlayer } = usePlayerStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("episodes");
  const [isLoadingPart, setIsLoadingPart] = useState(false);
  const { goActorDetail } = useFilmRouter();
  const { goWatchNow } = useFilmRouter();

  const handleSelectPart = (p: PartRes) => {
    setIsLoadingPart(true);
    setTimeout(() => {
      setSelectedPart(p.partData[0]);
      setIsLoadingPart(false);
    }, 300);
  };

  const [selectedPart, setSelectedPart] = useState<PartDetail>();
  const { goPlayerFilm } = useFilmRouter();

  useEffect(() => {
    resetInfoPlayer();
  }, []);

  useEffect(() => {
    if (partData) {
      if (part && part.toString() !== "1") {
        console.log("part number: ", part);
        setSelectedPart(partData[+part - 1]);
      } else {
        setSelectedPart(partData[0]);
      }
    }
  }, [partData, part]);

  console.log(">> CHECK: ", part, " - ", selectedPart);

  useEffect(() => {
    if (filmData?.film.filmId) {
      getPartData(filmData?.film.filmId);
    }
  }, [filmData?.film.filmId]);

  const handleWatchVideo = (episode: string) => {
    if (!filmData || !selectedPart) return;

    const isPlayPage = pathname.startsWith("/play");
    if (isPlayPage && selectedPart) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("ep", episode);
      params.set("p", selectedPart.partNumber?.toString());
      router.push(`${pathname}?${params.toString()}`);
    } else {
      goPlayerFilm(
        filmData.film.slug,
        selectedPart.partNumber.toString(),
        episode
      );
    }
  };

  return (
    <div className="mt-3 min-[400px]:mt-4 sm:mt-8">
      <div className="flex border-b border-zinc-800 space-x-2 min-[400px]:space-x-3 sm:space-x-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-1.5 min-[400px]:pb-2 text-xs min-[400px]:text-sm sm:text-base font-semibold cursor-pointer transition-all duration-500 ease-in-out whitespace-nowrap ${activeTab === tab.id
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

      <div className="mt-3 min-[400px]:mt-4 sm:mt-6">
        {activeTab === "episodes" && (
          <div>
            {!partData || !partData.length ? (
              <div className="text-center text-gray-400 py-8 sm:py-10 text-xs sm:text-sm">
                Đang tải danh sách phần...
              </div>
            ) : filmData?.film.type.keyMap === "FT_SINGLE" ? (
              <>
                <h2 className="text-base min-[400px]:text-lg sm:text-xl font-semibold mb-2 min-[400px]:mb-3 text-yellow-400">
                  Bản chiếu
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-[400px]:gap-4">
                  <div className="relative overflow-hidden rounded-lg min-[400px]:rounded-xl border border-zinc-800  bg-zinc-900 transition-all duration-300 cursor-pointer">
                    <img
                      src={filmData?.film.thumbUrl || "/images/small.jpg"}
                      alt={filmData?.film.title}
                      className="w-full h-32 min-[400px]:h-40 sm:h-48 md:h-40 object-cover rounded-lg min-[400px]:rounded-xl transition-transform duration-500 hover:scale-105"
                    />

                    <h3 className="absolute bottom-2 min-[400px]:bottom-3 left-2 min-[400px]:left-3 sm:left-4 text-yellow-400 text-xs min-[400px]:text-sm sm:text-base font-semibold tracking-wide drop-shadow-md">
                      {filmData?.film.title || "Bản chiếu chính"}
                    </h3>

                    <button
                      onClick={() =>
                        handleWatchVideo(
                          selectedPart?.episodes?.[0]?.episodeNumber?.toString() ??
                          "1"
                        )
                      }
                      className="absolute bottom-2 min-[400px]:bottom-3 right-2 min-[400px]:right-3 sm:right-4 text-[9px] min-[400px]:text-[10px] sm:text-xs font-semibold 
                                bg-yellow-400 text-black px-1.5 min-[400px]:px-2 sm:px-3 py-0.5 min-[400px]:py-1 sm:py-1.5 rounded-full shadow-md
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
                <div className="flex items-center gap-1.5 min-[400px]:gap-2">
                  <Menu size={20} className="text-white min-[400px]:w-6 min-[400px]:h-6 sm:w-[30px] sm:h-[30px]" />
                  <Select
                    value={(selectedPart?.partNumber || 1).toString()}
                    onValueChange={(value) => {
                      const found = partData.find(
                        (p) => p.partNumber === +value
                      );
                      if (found) {
                        setSelectedPart(found);
                      }
                    }}
                  >
                    <SelectTrigger className="flex items-center gap-1.5 min-[400px]:gap-2 w-[150px] min-[400px]:w-[180px] sm:w-[220px] border border-zinc-800/70 text-white rounded-lg min-[400px]:rounded-xl px-2 min-[400px]:px-3 sm:px-4 py-1.5 min-[400px]:py-2 text-xs min-[400px]:text-sm sm:text-base focus:ring-0 focus:outline-none">
                      <SelectValue
                        placeholder="Chọn phần"
                        className="text-base min-[400px]:text-lg sm:text-xl font-semibold"
                      >
                        {selectedPart?.title ||
                          `Phần ${selectedPart?.partNumber}`}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent
                      className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 
                   border border-zinc-800/70 text-gray-200 rounded-xl p-2"
                    >
                      {partData.map((p, index) => (
                        <SelectItem
                          key={`part-item-${index}`}
                          value={p.partNumber.toString()}
                          className={`flex items-center justify-between w-full my-1 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer select-none transition-all duration-200 ease-in-out
                        ${selectedPart?.id === p.id
                              ? "bg-yellow-400 text-black shadow-[0_0_12px_rgba(250,204,21,0.45)]"
                              : "text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_14px_rgba(250,204,21,0.4)]"
                            }`}
                        >
                          {p.title || `Phần ${p.partNumber}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 min-[400px]:gap-3 sm:gap-4 mt-3 min-[400px]:mt-4">
                  {selectedPart?.episodes?.map((ep, index) => (
                    <div
                      key={`${ep.id}-${index}`}
                      onClick={() =>
                        handleWatchVideo(ep.episodeNumber.toString())
                      }
                      className="relative overflow-hidden rounded-lg min-[400px]:rounded-xl border border-zinc-800 
                                  bg-zinc-900 hover:border-yellow-400 transition-all duration-300
                                  shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]
                                  cursor-pointer"
                    >
                      <div className="relative w-full h-24 min-[400px]:h-28 sm:h-32">
                        <img
                          src={ep.thumbUrl || "/images/small.jpg"}
                          alt={ep.title}
                          className="w-full h-full object-cover rounded-t-lg group-hover:brightness-110 transition-all duration-300 hover:scale-105"
                        />
                      </div>
                      <div
                        className={cn(
                          "p-1.5 min-[400px]:p-2 text-center text-white font-semibold",
                          ep.episodeNumber === +episode &&
                          selectedPart.partNumber === +part &&
                          "bg-yellow-400  font-semibold text-zinc-800"
                        )}
                      >
                        <span
                          className={
                            "text-[10px] min-[400px]:text-xs sm:text-sm group-hover:text-yellow-400 transition-colors duration-200 hover:text-yellow-400 font-medium"
                          }
                        >
                          {ep.title || `Tập ${ep.episodeNumber}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            {/* <h2 className="text-xl font-semibold mb-3 text-yellow-400">
              Hình ảnh
            </h2> */}

            {filmData && (filmData?.filmImages || filmData.film.thumbUrl) ? (
              <div className="flex flex-wrap items-center justify-center gap-2 min-[400px]:gap-3 sm:gap-4 max-w-[1000px] mx-auto">
                {filmData.film.thumbUrl && (
                  <div
                    key="thumb"
                    className="h-[100px] w-[150px] min-[400px]:h-[130px] min-[400px]:w-[190px] sm:h-[180px] sm:w-[260px] overflow-hidden rounded-lg border border-zinc-800 hover:border-yellow-400 hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={filmData.film.thumbUrl}
                      alt={`${filmData.film.title} - Thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="h-[100px] w-[150px] min-[400px]:h-[130px] min-[400px]:w-[190px] sm:h-[180px] sm:w-[260px] overflow-hidden rounded-lg border border-zinc-800 hover:border-yellow-400 hover:scale-105 transition-transform duration-300">
                  <img
                    src={filmData?.filmImages.backdrop || "/images/small.jpg"}
                    alt={filmData.film.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="h-[100px] w-[150px] min-[400px]:h-[130px] min-[400px]:w-[190px] sm:h-[180px] sm:w-[260px] overflow-hidden rounded-lg border border-zinc-800 hover:border-yellow-400 hover:scale-105 transition-transform duration-300">
                  <img
                    src={filmData?.filmImages.horizontal || "/images/small.jpg"}
                    alt={filmData.film.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="h-[100px] w-[70px] min-[400px]:h-[130px] min-[400px]:w-[90px] sm:h-[180px] sm:w-[120px] overflow-hidden rounded-lg  border border-zinc-800 hover:border-yellow-400 hover:scale-105 transition-transform duration-300">
                  <img
                    src={filmData?.filmImages.poster || "/images/small.jpg"}
                    alt={`${filmData.film.title} Poster`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-400 italic mt-2 text-xs sm:text-sm">
                Chưa có hình ảnh cho phim này
              </p>
            )}
          </div>
        )}

        {activeTab === "cast" && (
          <div>
            <div className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-5 gap-x-2 min-[400px]:gap-x-3 gap-y-8 min-[400px]:gap-y-12">
              {filmData?.actors.map((a, index) => (
                <div
                  key={`${a.actorId}-${index}`}
                  className="cursor-pointer relative size-full group"
                  onClick={() => goActorDetail(a.slug)}
                >
                  <div className="size-full overflow-hidden rounded-lg min-[400px]:rounded-xl">
                    <img
                      src={a.avatarUrl || "/images/small.jpg"}
                      alt={a.actorName}
                      className="size-full object-cover object-center overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute left-0 right-0 -bottom-5 min-[400px]:-bottom-6">
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="bg-opacity-60 rounded-b-lg min-[400px]:rounded-b-xl justify-center text-center bg-gradient-to-b from-transparent to-zinc-900/80 w-full pb-1.5 min-[400px]:pb-2 pt-1.5 min-[400px]:pt-2">
                        <button className="text-white text-xs min-[400px]:text-sm group-hover:text-yellow-400 transition-colors cursor-pointer">
                          {a.actorName}
                        </button>
                      </div>
                      <p className="text-[10px] min-[400px]:text-sm text-rose-400/90 italic whitespace-nowrap w-full text-center overflow-hidden pt-0.5 min-[400px]:pt-1 mx-1 min-[400px]:mx-2">
                        {a.characterName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
