"use client";
import { filmPath, playPath } from "@/constants/path";
import { useRouter } from "next/navigation";

export const useAppRouter = () => {
  const router = useRouter();

  return {
    goActorDetail: (actorId: number | string) =>
      router.push(filmPath.ACTOR_DETAIL(actorId)),

    goDirectorDetail: (directorId: number | string) =>
      router.push(filmPath.DIRECTOR_DETAIL(directorId)),

    goWatchNow: (episodeId: string) =>
      router.push(playPath.WATCHNOW(episodeId)),

    goFilmDetail: (filmId: string) => router.push(filmPath.FILM_DETAIL(filmId)),
  };
};
