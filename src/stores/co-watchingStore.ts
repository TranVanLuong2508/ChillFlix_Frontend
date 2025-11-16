import roomServices from "@/services/co-watching/roomService";
import { roomPayload, roomRes } from "@/types/co_watching.type";
import { FilmDataStream, FilmImages } from "@/types/film.type";
import { toast } from "sonner";
import { create } from "zustand";

interface CoWatchingState {
  dataRoom: {
    room: roomRes,
    filmData: FilmDataStream;
  } | null;

}

interface CoWatchingAction {
  create: (payload: roomPayload) => Promise<void>;
}

export const useCoWatchingStore = create<CoWatchingState & CoWatchingAction>((set) => ({
  dataRoom: null,

  create: async (payload) => {
    try {
      const res = await roomServices.createRoom(payload);
      if (res.EC !== 0) {
        toast.error("Had error when create live room");
        console.log(">>> Error create live stram room: ", res.EM);
      }
      console.log(">>Check data create: ", res.data);
      if (res && res.data) {
        const filmImages = res.data.film.filmImages.reduce((acc, item) => {
          acc[item.type as keyof FilmImages] = item.url;
          return acc;
        }, {} as FilmImages);

        set({
          dataRoom: {
            room: res.data.room,
            filmData: { film: res.data.film, filmImages }
          }
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}))