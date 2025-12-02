"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { PartDetail } from "@/types/part.type";
import { EpisodeDetail } from "@/types/episode.type";

import Player from "@/components/Player/Player";
import TabsSection from "@/components/film/detail/Tabs";
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";
import FilmInfo from "@/components/film/player/film-info";
import SuggestList from "@/components/film/player/suggest-list";

import { useFilmStore } from "@/stores/filmStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useAuthStore } from "@/stores/authStore";
import VIPContent from "@/components/custom/VipContent";

export default function PlayPage() {
  const { playSlug }: { playSlug: string } = useParams();
  const searchParams = useSearchParams();

  const ep = searchParams.get("ep");
  const p = searchParams.get("p");

  const { loading, filmData, partData, getDetailFilm, getPartData } = useFilmStore();
  const { handleInfoPlayer, resetInfoPlayer } = usePlayerStore();
  const { authUser, isLoggingIn } = useAuthStore();

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

    resetInfoPlayer();

    const foundPart = partData.find((part: PartDetail) => part.partNumber === +p);

    if (foundPart) {
      setPartDetail(foundPart);

      const foundEpisode = foundPart.episodes.find(
        (episode) => episode.episodeNumber === +ep
      );

      if (foundEpisode) {
        setEpisodeDetail(foundEpisode);
      }

      handleInfoPlayer(p, ep);
    }
  }, [partData, ep, p]);



  if (loading || !filmData || !partData)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Đang tải tập phim...
      </div>
    );

  if (!episodeDetail || !partDetail) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Không tìm thấy tập phim
      </div>
    );
  }

  if (filmData.film.isVip && !authUser.isVip) {
    return (
      <VIPContent />
    )
  }

  return (
    <div className="w-full bg-zinc-950 text-white pt-[72px]">
      <div className="px-[20px] pt-4">
        <Player currentPart={p!} currentEpisode={ep!} episodeDetail={episodeDetail} partDetail={partDetail} key={searchParams.toString()} />
        <div className="py-10">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-7 ">
              <FilmInfo />
              <TabsSection />
              <CommentRatingTabs />
            </div>
            <div className="col-span-3 border-l border-amber-500 px-4">
              <SuggestList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
