import axios from "@/lib/axios";

export const partServices = {
  getPartsByFilmId: (filmId: string) => axios.post("/parts/film", { filmId }),

  getPartById: (id: string) => axios.get(`/parts/${id}`),
};
