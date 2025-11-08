import { create } from "zustand";

interface PlayerStoreState {
  videoUrl: string;
  thumbUrl: string;
  previewThumbUrl: string;
}

interface PlayerStoreAcion {
  handleDataPlayer: (vUrl: string, tUrl: string, ptUrl: string) => void;


}

export const usePlayerStore = create<PlayerStoreState & PlayerStoreAcion>()((set, get) => ({
  videoUrl: "",
  thumbUrl: "",
  previewThumbUrl: "",

  handleDataPlayer: (vUrl, tUrl, ptUrl) => {

  },

}))