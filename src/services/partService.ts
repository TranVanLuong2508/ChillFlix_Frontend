import axios from "@/lib/axios";
import { IBackendRes } from "@/types/backend.type";
import { DetailPart } from "@/types/part.type";

export const partServices = {
  getPartsByFilmId: (filmId: string): Promise<IBackendRes<DetailPart>> => {
    return axios.post("/parts/film", { filmId })
  },

  getPartById: (id: string) => axios.get(`/parts/${id}`),
};
