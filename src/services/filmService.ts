import axios from "@/lib/axios";


export const filmServices = {
  getFilmId: (filmId: string) => {
    return axios.get(`/films/${filmId}`);
  },
  getActorByFilmId: (filmId: string) => {
    return axios.get(`/film-actor/get-actors-by-film/${filmId}`);
  },
  getDirectorByFilm: (filmId: string) =>
    axios.get(`/film-director/by-film/${filmId}`),
  getRatingsByFilmId: (filmId: string) => {
    return axios.get(`/rating/get-rating-by-film/${filmId}`);
  },
};
