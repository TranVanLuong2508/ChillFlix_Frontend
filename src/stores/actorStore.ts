import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { actorServices } from "@/services/actorService";
import { filmActorServices } from "@/services/filmActorService";
import { ActorData, FilmActorData } from "@/types/backend.type";

interface ActorStoreState {
  actor: ActorData | null;
  filmActorData: FilmActorData[];
  isLoading: boolean;
  error: string | null;

  fetchActorDetail: (actorId: string) => Promise<void>;
  clearActor: () => void;
}

export const useActorStore = create<ActorStoreState>()((set) => ({
  actor: null,
  filmActorData: [],
  isLoading: false,
  error: null,

  fetchActorDetail: async (actorId: string) => {
    set({ isLoading: true, error: null });
    try {
      const [actorRes, filmActorRes] = await Promise.all([
        actorServices.getActorById(actorId),
        filmActorServices.getFilmsByActorId(actorId),
      ]);

      set({
        actor: actorRes.data?.result || actorRes.data || null,
        filmActorData: filmActorRes.data?.result || [],
      });
    } catch (error: any) {
      set({ error: error.message || "Lỗi tải dữ liệu diễn viên" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearActor: () => set({ actor: null, filmActorData: [] }),
}));
