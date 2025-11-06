"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { EpisodesData } from "@/types/episodesData";

import { episodeServices } from "@/services/episodeService";

import Player from "@/components/Player/Player";
import { toast } from "sonner";

export default function PlayPage() {
  const { episodeSlug }: { episodeSlug: string } = useParams();

  const [episodeData, setEpisodeData] = useState<EpisodesData | null>(null);

  useEffect(() => {
    const handleFetchDataPlayer = async () => {
      try {
        const res = await episodeServices.getEpisodeById(episodeSlug);
        if (res && res.EC !== 0) {
          toast.error(res.EM);
        }
        setEpisodeData(res.data.episode);
      } catch (error) {
        console.error("Failed to fetch episode:", error);
      }
    };
    if (episodeSlug) handleFetchDataPlayer();
  }, [episodeSlug]);

  if (!episodeData)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Đang tải tập phim...
      </div>
    );

  return (
    <div className="w-full bg-zinc-950 text-white">
      <h1 className="text-xl font-semibold mb-4">Xem phim ...</h1>
      <div className="min-h-[80%] px-[150px]">
        <Player episodeData={episodeData} />
      </div>
    </div>
  );
}
