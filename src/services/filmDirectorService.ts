import publicAxios from "@/lib/publicAxios";
import { IBackendRes } from "@/types/backend.type";
import { FilmDirectorRes } from "@/types/filmDirectorData";

export const filmDirectorServices = {
  getDirectorsByFilmId: (filmId: string) => {
    return publicAxios.get(`/film-director/by-film/${filmId}`);
  },
  getFilmDirectorId: (id: number) => {
    return publicAxios.get(`/film-director/get-film-director-by-id/${id}`);
  },
  getFilmsByDirectorId: (
    directorId: string
  ): Promise<IBackendRes<FilmDirectorRes>> => {
    return publicAxios.get(`/film-director/by-director/${directorId}`);
  },
};
