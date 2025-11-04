// src/stores/filmStore.ts
import { create } from "zustand";
import { filmServices } from "@/services/filmService";
import { partServices } from "@/services/partService";
import {
  FilmData,
  FilmActorData,
  FilmDirectorData,
  RatingData,
  PartData,
} from "@/types/backend.type";

interface FilmState {
  film: FilmData | null;
  filmActors: FilmActorData[];
  filmDirectors: FilmDirectorData[];
  filmRatings: RatingData | null;
  filmParts: { parts: PartData[] } | null;
  isLoading: boolean;
  error: string | null;
}

interface FilmAction {
  fetchFullFilmDetail: (filmId: string) => Promise<void>;
  clearFilm: () => void;
}

export const useFilmStore = create<FilmState & FilmAction>()((set) => ({
  film: null,
  filmActors: [],
  filmDirectors: [],
  filmRatings: null,
  filmParts: null,
  isLoading: false,
  error: null,

  fetchFullFilmDetail: async (filmId) => {
    set({ isLoading: true, error: null });
    try {
      const [filmRes, directorRes, actorRes, ratingRes, partRes] =
        await Promise.all([
          filmServices.getFilmId(filmId),
          filmServices.getDirectorByFilm(filmId),
          filmServices.getActorByFilmId(filmId),
          filmServices.getRatingsByFilmId(filmId),
          partServices.getPartsByFilmId(filmId),
        ]);

      const partData =
        partRes.data.result.length > 0 ? partRes.data.result[0] : null;

      set({
        film: filmRes.data.film,
        filmDirectors: directorRes.data.result,
        filmActors: actorRes.data.result,
        filmRatings: ratingRes.data.result,
        filmParts: { parts: partData ? [partData] : [] },
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearFilm: () =>
    set({
      film: null,
      filmActors: [],
      filmDirectors: [],
      filmRatings: null,
      filmParts: null,
    }),
}));
