import publicAxios from "@/lib/publicAxios";

import { IBackendRes } from "@/types/backend.type";
import { DetailPart } from "@/types/part.type";

export const partServices = {
  getPartsByFilmId: (filmId: string): Promise<IBackendRes<DetailPart>> => {
    return publicAxios.post("/parts/film", { filmId })
  },

  getPartById: (id: string) => publicAxios.get(`/parts/${id}`),
};
