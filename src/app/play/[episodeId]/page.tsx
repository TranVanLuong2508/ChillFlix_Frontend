"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Player from "@/components/Player/Player";
import { EpisodesData } from "@/types/episodesData";
import { episodeServices } from "@/services/episodeService";

export default function PlayPage() {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState<EpisodesData | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await episodeServices.getEpisodeById(episodeId as string);
        setEpisode(res.data.episode);
      } catch (error) {
        console.error("Failed to fetch episode:", error);
      }
    };
    if (episodeId) fetchEpisode();
  }, [episodeId]);

  if (!episode)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Đang tải tập phim...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#191B24] text-white flex flex-col items-center py-6">
      <h1 className="text-xl font-semibold mb-4">
        {episode.title || `Tập ${episode.episodeNumber}`}
      </h1>
      <div className="w-full max-w-6xl">
        <Player video={episode} />
      </div>
    </div>
  );
}
