import axios from "@/lib/axios";
import { IBackendRes } from "@/types/backend.type";
import { FilmDetailRes } from "@/types/film.type";

const filmServices = {
  getFilmById: (filmId: string): Promise<IBackendRes<FilmDetailRes>> => {
    return axios.get(`/films/${filmId}`);
  },

  getFilmBySlug: (filmSLug: string): Promise<IBackendRes<FilmDetailRes>> => {
    return axios.get(`/films/slug/${filmSLug}`);
  },

  getActorByFilmId: (filmId: string) => {
    return axios.get(`/film-actor/get-actors-by-film/${filmId}`);
  },

  getDirectorByFilm: (filmId: string) => {
    return axios.get(`/film-director/by-film/${filmId}`);
  },

  getRatingsByFilmId: (filmId: string) => {
    return axios.get(`/rating/get-rating-by-film/${filmId}`);
  },
};

export default filmServices;
