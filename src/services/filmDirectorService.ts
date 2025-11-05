import publicAxios from "@/lib/publicAxios";


export const filmDirectorServices = {
  getDirectorsByFilmId: (filmId: string) => {
    return publicAxios.get(`/film-director/get-directors-by-film/${filmId}`);
  },
  getFilmDirectorId: (id: number) => {
    return publicAxios.get(`/film-director/get-film-director-by-id/${id}`);
  },
  getFilmsByDirectorId: (directorId: string) => {
    return publicAxios.get(`/film-director/by-director/${directorId}`);
  },
};
