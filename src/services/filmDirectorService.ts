import axios from "@/lib/axios";

export const filmDirectorServices = {
  getDirectorsByFilmId: (filmId: string) => {
    return axios.get(`/film-director/get-directors-by-film/${filmId}`);
  },
  getFilmDirectorId: (id: number) => {
    return axios.get(`/film-director/get-film-director-by-id/${id}`);
  },
  getFilmsByDirectorId: (directorId: string) => {
    return axios.get(`/film-director/by-director/${directorId}`);
  },
};
