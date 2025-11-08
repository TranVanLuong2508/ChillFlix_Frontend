"use client";

import { useEffect, useState } from "react";

import Player from "@/components/Player/Player";
import { EpisodeDetail } from "@/types/episode.type";
import { useFilmStore } from "@/stores/filmStore";
import { PartDetail } from "@/types/part.type";
import { useParams, useSearchParams } from "next/navigation";


export default function PlayPage() {
  const { playSlug }: { playSlug: string } = useParams();
  const searchParams = useSearchParams();

  const ep = searchParams.get("ep");
  const p = searchParams.get("p");

  const { loading, filmData, partData, getDetailFilm, getPartData } = useFilmStore();

  const [episodeDetail, setEpisodeDetail] = useState<EpisodeDetail | null>(null);
  const [partDetail, setPartDetail] = useState<PartDetail | null>(null);

  useEffect(() => {
    if (!playSlug) return;
    getDetailFilm(playSlug);
  }, [playSlug, getDetailFilm]);

  useEffect(() => {
    if (filmData?.film.filmId) {
      getPartData(filmData?.film.filmId)
    }
  }, [filmData?.film.filmId, getPartData])

  useEffect(() => {
    if (!partData || !p || !ep) return;

    const foundPart = partData.find((part: PartDetail) => part.partNumber === +p);

    if (foundPart) {
      setPartDetail(foundPart);

      const foundEpisode = foundPart.episodes.find(
        (episode) => episode.episodeNumber === +ep
      );

      if (foundEpisode) {
        setEpisodeDetail(foundEpisode);
      }
    }
  }, [partData, ep, p]);



  if (loading || !filmData || !partData)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Đang tải tập phim...
      </div>
    );

  console.log(">> Check query: ", playSlug, p, '-', ep)


  console.log("Check film: ", filmData)
  console.log("Check part data: ", partData)

  console.log(">>> Check part data: ", partDetail);
  console.log(">>> Check episode data: ", episodeDetail);

  if (!episodeDetail || !partDetail) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Không tìm thấy tập phim
      </div>
    );
  }


  return (
    <div className="w-full bg-zinc-950 text-white">
      <div className="px-[100px] pt-4">
        <Player currentPart={p!} currentEpisode={ep!} episodeDetail={episodeDetail} partDetail={partDetail} />
      </div>
    </div>
  );
}
