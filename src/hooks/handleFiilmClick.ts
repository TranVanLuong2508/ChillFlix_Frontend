"use client";

import { partServices } from "@/services/partService";
import { useFilmRouter } from "@/hooks/filmRouter";
import { useFilmStore } from "@/stores/filmStore";

export function useFilmClick() {
  const { goFilmDetail, goWatchNow } = useFilmRouter();
  const setIsLoading = (isLoading: boolean) =>
    useFilmStore.setState({ isLoading });

  const handleFilmClick = async (film: any) => {
    if (!film?.filmId) {
      console.warn("Missing filmId:", film);
      return;
    }

    setIsLoading(true);
    try {
      const res = await partServices.getPartsByFilmId(film.filmId);
      const part = res?.data;

      console.log("Part fetched:", part);

      const firstPart = part?.partData?.[0];
      const episodes = firstPart?.episodes || [];

      if (episodes.length > 0) {
        const firstEp = episodes[0];
        console.log("Opening first episode:", firstEp);
        goWatchNow(firstEp.id);
        return;
      }

      goFilmDetail(film.slug);
    } catch (err: any) {
      console.error("Error in handleFilmClick:", err?.message || err);
      goFilmDetail(film.slug);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFilmClick };
}
