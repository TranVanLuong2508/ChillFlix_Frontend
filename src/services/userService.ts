import { FavoriteListMessage } from "@/constants/messages/user.message";
import privateAxios from "@/lib/privateAxios";
import { IBackendRes } from "@/types/backend.type";
import { IFavorite, IFilmList } from "@/types/user.type";
import { toast } from "sonner";

export const userServices = {
  callFavoriteFilmsList: (): Promise<IBackendRes<IFilmList>> => {
    return privateAxios.get("/favorites/get-user-favorite-list");
  },

  CallToggleFavoriteFilm: (
    filmdId: string
  ): Promise<IBackendRes<IFavorite>> => {
    return privateAxios.post("/favorites/toggle", { filmId: filmdId });
  },

  toggleFavoriteFilm: async (filmId: string) => {
    try {
      const res = await userServices.CallToggleFavoriteFilm(filmId);
      if (res && res.EC === 1) {
        if (res.data?.isFavorite === true)
          toast.success(FavoriteListMessage.addSucess);
        if (res.data?.isFavorite === false)
          toast.success(FavoriteListMessage.deleteSucess);
      }
    } catch (error) {
      console.log("Error from toggleFavoriteFilm: ", error);
      toast.error(FavoriteListMessage.error);
    }
  },
};
