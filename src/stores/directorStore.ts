import { create } from "zustand";
import { directorServices } from "@/services/directorService";
import { filmDirectorServices } from "@/services/filmDirectorService";
import { DirectorData, FilmDirectorData } from "@/types/backend.type";

interface DirectorStoreState {
  director: DirectorData | null;
  filmDirectorData: FilmDirectorData[];
  isLoading: boolean;
  error: string | null;
  metaPage: any;

  fetchDirectorDetail: (directorId: string) => Promise<void>;
  clearDirector: () => void;
}

export const useDirectorStore = create<DirectorStoreState>()((set) => ({
  director: null,
  filmDirectorData: [],
  isLoading: false,
  error: null,
  metaPage: null,

  fetchDirectorDetail: async (directorId: string) => {
    set({ isLoading: true, error: null });
    try {
      const [directorRes, filmDirectorRes] = await Promise.all([
        directorServices.getDirectorById(directorId),
        filmDirectorServices.getFilmsByDirectorId(directorId),
      ]);

      set({
        director: directorRes.data?.result || directorRes.data || null,
        filmDirectorData: filmDirectorRes.data?.result || [],
        metaPage: filmDirectorRes.data?.meta || null,
      });
    } catch (error: any) {
      set({ error: error.message || "Lỗi tải dữ liệu đạo diễn" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearDirector: () => set({ director: null, filmDirectorData: [] }),
}));
