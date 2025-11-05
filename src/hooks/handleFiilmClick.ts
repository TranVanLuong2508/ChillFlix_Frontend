"use client";

import { partServices } from "@/services/partService";
import { useFilmStore } from "@/stores/filmStore";
import { useAppRouter } from "@/hooks/filmRouter";

export function useFilmClick() {
  const { goFilmDetail, goWatchNow } = useAppRouter();
  const setIsLoading = (isLoading: boolean) =>
    useFilmStore.setState({ isLoading });

  const handleFilmClick = async (filmId: string) => {
    setIsLoading(true);
    try {
      const res = await partServices.getPartsByFilmId(filmId);
      const parts = res.data.result;
      const episodes = parts?.[0]?.episodes || [];

      if (!episodes.length) return goFilmDetail(filmId);

      const firstEpisodeId = episodes[0].id;
      goWatchNow(firstEpisodeId);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách tập:", err);
      goFilmDetail(filmId);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFilmClick };
}
