import { create } from "zustand";

import { FilmDetail, FilmImages } from "@/types/film.type";
import filmServices from "@/services/filmService";

interface State {
  loading: boolean;
  error: string | null;

  filmData: FilmDetail | null;
}

interface Action {
  resetFilmDetail: () => void;
  getDetailFilm: (filmId: string) => Promise<void>;
}

const initialFilmDetail = {
  filmData: null,
};

export const useFilmStore = create<State & Action>((set, get) => ({
  ...initialFilmDetail,
  loading: false,
  error: null,

  resetFilmDetail: () => set(initialFilmDetail),

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

        set({ filmData: { ...res.data, filmImages } });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },
}));
