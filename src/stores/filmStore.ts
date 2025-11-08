
import { create } from "zustand";

import { FilmDetail, FilmImages } from "@/types/film.type";
import filmServices from "@/services/filmService";
import { partServices } from "@/services";
import { PartDetail } from "@/types/part.type";

import {
  FilmActorData,
  FilmDirectorData,
  RatingData,
} from "@/types/backend.type";

interface FilmState {
  filmActors: FilmActorData[];
  filmDirectors: FilmDirectorData[];
  filmRatings: RatingData | null;
  isLoading: boolean;
  error: string | null;

  loading: boolean;
  loadingPart: boolean;

  filmData: FilmDetail | null;
  partData: PartDetail[] | null;
}


const initialFilmDetail = {
  filmData: null,
  partData: null,
};

interface FilmAction {
  //fetchFullFilmDetail: (filmId: string) => Promise<void>;
  //clearFilm: () => void;

  resetFilmDetail: () => void;
  getDetailFilm: (filmId: string) => Promise<void>;
  getPartData: (filmId: string) => Promise<void>;
}

export const useFilmStore = create<FilmState & FilmAction>()((set) => ({
  ...initialFilmDetail,
  loading: false,
  loadingPart: false,

  film: null,
  filmActors: [],
  filmDirectors: [],
  filmRatings: null,
  filmParts: null,
  isLoading: false,
  error: null,

  // fetchFullFilmDetail: async (filmId) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const [filmRes, directorRes, actorRes, ratingRes, partRes] =
  //       await Promise.all([
  //         filmServices.getFilmById(filmId),
  //         filmServices.getDirectorByFilm(filmId),
  //         filmServices.getActorByFilmId(filmId),
  //         filmServices.getRatingsByFilmId(filmId),
  //         partServices.getPartsByFilmId(filmId),
  //       ]);

  //     const partData =
  //       partRes.data.result.length > 0 ? partRes.data.result[0] : null;

  //     set({
  //       film: filmRes.data.film,
  //       filmDirectors: directorRes.data.result,
  //       filmActors: actorRes.data.result,
  //       filmRatings: ratingRes.data.result,
  //       filmParts: { parts: partData ? [partData] : [] },
  //     });
  //   } catch (error: any) {
  //     set({ error: error.message });
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },

  // clearFilm: () => set({
  //   film: null,
  //   filmActors: [],
  //   filmDirectors: [],
  //   filmRatings: null,
  //   filmParts: null,
  // }),

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

  getPartData: async (filmId) => {
    set({ loadingPart: true, error: null });
    try {
      const res = await partServices.getPartsByFilmId(filmId);

      if (res.EC !== 0) {
        set({ error: res.EM });
        console.error("Error FilmStore getDetailFilm: ", res.EM);
      }

      if (res.data) {
        set({ partData: res.data.partData })
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ loadingPart: false });
    }
  }
}));
