"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Tv } from "lucide-react";

import { EpisodeDetail } from "@/types/episode.type";

import PlayerInfo from "./playerInfo";
import PlayerLineConfig from "./playerLineConfig";
import PlayListNav from "./playListNav";
import { PartDetail } from "@/types/part.type";


const PlayerController = dynamic(
  () => import("@/components/Player/PlayerController"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[700px] bg-zinc-900 flex items-center justify-center text-white text-3xl">
        <div className="flex">
          <div className="relative">
            <div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-80 animate-pulse"
              aria-hidden="true"
            />
            <div className="relative bg-zinc-900 rounded-full p-6">
              <Tv className="size-12 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

// shadow-[0_0_30px_rgba(0,0,0,0.6)] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
//  shadow-[-8px_-8px_40px_10px_rgba(255,255,255,0.1),_8px_8px_40px_10px_rgba(255,255,255,0.1)]
// shadow-[-8px_-8px_40px_10px_rgba(0,0,0,0.3),_8px_8px_40px_10px_rgba(0,0,0,0.3)]

interface PlayerProps {
  currentPart: string;
  currentEpisode: string;
  episodeDetail: EpisodeDetail;
  partDetail: PartDetail;
}

const Player = ({ currentPart, currentEpisode, episodeDetail, partDetail }: PlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-[-8px_-8px_40px_10px_rgba(0,0,0,0.3),8px_8px_40px_10px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden">
      <div className="relative group">
        <PlayerInfo
          episodeTitle={episodeDetail.title}
          partTitle={partDetail.title}
          onOpenChange={setIsOpen}
        />
        <PlayListNav currentPart={currentPart} currentEpisode={currentEpisode} open={isOpen} onOpenChange={setIsOpen} />
        <div className="relative">
          <PlayerController
            videoUrl={episodeDetail.videoUrl}
            posterUrl={episodeDetail.thumbUrl}
          />
        </div>
      </div>
      <PlayerLineConfig />
    </div>
  );
};

export default Player;
