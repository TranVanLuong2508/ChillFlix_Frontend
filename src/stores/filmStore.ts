import { create } from "zustand";

import { FilmDetail, FilmImages } from "@/types/film.type";
import filmServices from "@/services/filmService";
import { partServices } from "@/services";
import { DetailPart } from "@/types/part.type";
import { RatingRes } from "@/types/backend.type";

interface FilmState {
  isLoading: boolean;
  error: string | null;
  loading: boolean;
  loadingPart: boolean;
  filmData: FilmDetail | null;
  partDetail: DetailPart | null;
  ratingData: RatingRes | null;
}

const initialFilmDetail = {
  filmData: null,
  partDetail: null,
  ratingData: null,
};

interface FilmAction {
  resetFilmDetail: () => void;
  getRatingByFilmId: (filmId: string) => Promise<void>;
  getDetailFilm: (filmId: string) => Promise<void>;
  getPartData: (filmId: string) => Promise<void>;
}

export const useFilmStore = create<FilmState & FilmAction>()((set) => ({
  ...initialFilmDetail,
  loading: false,
  loadingPart: false,
  ratingData: null,
  filmParts: null,
  isLoading: false,
  error: null,

  resetFilmDetail: () => set(initialFilmDetail),

  getRatingByFilmId: async (filmId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await filmServices.getRatingsByFilmId(filmId);
      if (res.data?.result) {
        set({ ratingData: res.data?.result || null });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },
  getDetailFilm: async (filmSlug) => {
    set({ loading: true, error: null });
    try {
      const res = await filmServices.getFilmBySlug(filmSlug);

      if (res.EC !== 0) {
        set({ error: res.EM });
        console.error("Error FilmStore getDetailFilm: ", res.EM);
      }

      if (res.data) {
        const filmImages = res.data.film.filmImages.reduce((acc, item) => {
          acc[item.type as keyof FilmImages] = item.url;
          return acc;
        }, {} as FilmImages);

        set({
          filmData: { ...res.data, filmImages },
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  getPartData: async (filmId) => {
    set({ loadingPart: true, error: null });
    try {
      const res = await partServices.getPartsByFilmId(filmId);

      if (res.EC !== 0) {
        set({ error: res.EM });
        console.error("Error FilmStore getDetailFilm: ", res.EM);
      }

      if (res.data) {
        set({ partDetail: res.data });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ loadingPart: false });
    }
  },
}));
