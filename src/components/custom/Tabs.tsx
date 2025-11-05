"use client";

import { useEffect, useState } from "react";
import { FilmActorData } from "@/types/filmActorData";
import { FilmDetail } from "@/types/film.type";
import { PartData, EpisodeData } from "@/types/partData";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useFilmStore } from "@/stores/filmStore";

const tabs = [
  { id: "episodes", label: "Tập phim" },
  { id: "gallery", label: "Hình ảnh" },
  { id: "cast", label: "Diễn viên" },
  { id: "recommend", label: "Đề xuất" },
];

export default function TabsSection() {
  const { filmData } = useFilmStore();


  const [activeTab, setActiveTab] = useState("episodes");
  const [selectedPart, setSelectedPart] = useState<PartData | null>();
  const [isLoadingPart, setIsLoadingPart] = useState(false);
  const route = useRouter();

  const handleSelectPart = (p: PartData) => {
    setIsLoadingPart(true);
    setTimeout(() => {
      setSelectedPart(p);
      setIsLoadingPart(false);
    }, 500);
  };

  const handleChooseEpisode = (ep: EpisodeData) => {
    route.push(`/play/${ep.id}`);
  };

  // useEffect(() => {
  //   if (part?.parts?.length) {
  //     setSelectedPart(part.parts[0]);
  //   }
  // }, [part]);


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
          <div>Part data</div>
          // <div>
          //   {!part || !part.parts?.length ? (
          //     <div className="text-center text-gray-400 py-10">
          //       Đang tải danh sách phần...
          //     </div>
          //   ) : film.type?.keyMap === "FT_SINGLE" ? (
          //     <>
          //       <h2 className="text-xl font-semibold mb-2">Bản chiếu</h2>
          //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          //         <div className="bg-zinc-900 p-4 rounded-lg h-32 flex items-center justify-center border border-zinc-800 hover:border-yellow-400 transition-colors cursor-pointer">
          //           <span className="text-gray-400">Bản chiếu chính</span>
          //         </div>
          //       </div>
          //     </>
          //   ) : (
          //     <>
          //       <DropdownMenu>
          //         <DropdownMenuTrigger asChild>
          //           <button className="flex items-center gap-2 text-gray-200 hover:text-yellow-400 transition-all focus:outline-none focus:ring-0">
          //             <Menu size={22} />
          //             <h2 className="text-xl font-semibold">
          //               {selectedPart?.title ||
          //                 `Phần ${selectedPart?.partNumber}`}
          //             </h2>
          //           </button>
          //         </DropdownMenuTrigger>

          //         <DropdownMenuContent
          //           side="right"
          //           align="start"
          //           className="w-52 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 
          //                     border border-zinc-800/70 text-gray-200 rounded-xl p-2 
          //                     shadow-[0_0_20px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-right-1
          //                     duration-300 ease-out"
          //           sideOffset={8}
          //         >
          //           <DropdownMenuLabel
          //             className="flex justify-between items-center px-2 py-1 text-[11px] uppercase 
          //                         tracking-wide text-gray-400 border-b border-zinc-800/70"
          //           >
          //             <span>Chọn phần</span>
          //           </DropdownMenuLabel>

          //           {part.parts.map((p, index) => (
          //             <DropdownMenuItem
          //               key={`part-item-${index}`}
          //               onClick={() => {
          //                 setSelectedPart(p);
          //                 handleSelectPart(p);
          //                 route.push(`/play/${p.episodes[0].id}`);
          //               }}
          //               className={`flex items-center justify-between w-full my-1 px-3 py-2 rounded-lg 
          //                   text-sm font-medium cursor-pointer select-none transition-all duration-200 ease-in-out 
          //                    text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black 
          //                     hover:shadow-[0_0_12px_rgba(250,204,21,0.45)]
          //                    focus:bg-yellow-400 focus:text-black 

          //                   ${selectedPart?.id === p.id
          //                   ? "bg-yellow-400 text-black shadow-[0_0_12px_rgba(250,204,21,0.45)]"
          //                   : "text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_14px_rgba(250,204,21,0.4)]"
          //                 }`}
          //             >
          //               <span className="truncate">
          //                 {p.title || `Phần ${p.partNumber}`}
          //               </span>
          //             </DropdownMenuItem>
          //           ))}
          //         </DropdownMenuContent>
          //       </DropdownMenu>

          //       <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
          //         {isLoadingPart ? (
          //           <div className="flex justify-center items-center col-span-full py-10">
          //             <div className="flex flex-col items-center gap-3">
          //               <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          //               <span className="text-gray-400 text-sm">
          //                 Đang tải tập phim...
          //               </span>
          //             </div>
          //           </div>
          //         ) : (
          //           selectedPart?.episodes?.map((ep, index) => (
          //             <div
          //               key={`${ep.id}-${index}`}
          //               className="bg-zinc-900 rounded-lg border border-zinc-800 hover:border-yellow-400 transition-all duration-300 cursor-pointer overflow-hidden group"
          //             >
          //               <div className="relative w-full h-32">
          //                 <img
          //                   src={ep.thumbUrl || "/images/small.jpg"}
          //                   alt={ep.title}
          //                   className="w-full h-full object-cover rounded-t-lg group-hover:brightness-110 transition-all duration-300"
          //                 />
          //               </div>
          //               <div className="p-2 text-center">
          //                 <span className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors duration-200">
          //                   {ep.title || `Tập ${ep.episodeNumber}`}
          //                 </span>
          //               </div>
          //             </div>
          //           ))
          //         )}
          //       </div>
          //     </>
          //   )}
          // </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-900 rounded-lg w-40 h-48  overflow-hidden border border-zinc-800 hover:border-yellow-400 transition-all cursor-pointer">
                <img
                  src={filmData?.filmImages.poster || "/images/small.jpg"}
                  alt={filmData?.film.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "cast" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-3 gap-y-12">
              {filmData?.actors.map((a, index) => (
                <div
                  key={`${a.actorId}-${index}`}
                  className="cursor-pointer relative size-full group"
                >
                  <div className="size-full overflow-hidden rounded-xl">
                    <img
                      src={a.avatarUrl || "/images/small.jpg"}
                      alt={a.actorName}
                      className="size-full object-cover object-center overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute left-0 right-0 -bottom-6">
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="bg-opacity-60 rounded-b-xl justify-center text-center bg-gradient-to-b from-transparent to-zinc-900/80 w-full pb-2 pt-2">
                        <button className="text-white group-hover:text-yellow-400 transition-colors cursor-pointer">
                          {a.actorName}
                        </button>
                      </div>
                      <p className="text-sm text-rose-400/90 italic whitespace-nowrap w-full text-center overflow-hidden pt-1 mx-2">
                        {a.characterName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
