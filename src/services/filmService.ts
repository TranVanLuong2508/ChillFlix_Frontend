import publicAxios from "@/lib/publicAxios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

import { IBackendRes, RatingRes } from "@/types/backend.type";
import { FilmDetailRes } from "@/types/film.type";

const filmServices = {
  getFilmById: (filmId: string): Promise<IBackendRes<FilmDetailRes>> => {
    return publicAxios.get(`/films/${filmId}`);
  },

  getFilmBySlug: (filmSLug: string): Promise<IBackendRes<FilmDetailRes>> => {
    return publicAxios.get(`/films/slug/${filmSLug}`);
  },

  getActorByFilmId: (filmId: string): Promise<IBackendRes<FilmDetailRes>> => {
    return publicAxios.get(`/film-actor/get-actors-by-film/${filmId}`);
  },

  getDirectorByFilm: (filmId: string): Promise<IBackendRes<FilmDetailRes>> => {
    return publicAxios.get(`/film-director/by-film/${filmId}`);
  },

  getRatingsByFilmId: (
    filmId: string
  ): Promise<IBackendRes<{ result: RatingRes }>> => {
    return publicAxios.get(`/rating/get-rating-by-film/${filmId}`);
  },

  async getAll() {
    return publicAxios.get(`${baseURL}/films?current=1&pageSize=10`);
  },
  async getById(id: string) {
    return publicAxios.get(`${baseURL}/films/${id}`);
  },
  async getHeroSlides() {
    return publicAxios.get(`${baseURL}/films?current=1&pageSize=5`);
  },
  async getByCountry(countryName: string, page: number = 1, pageSize: number = 20) {
    return publicAxios.get(`/films/by-country/${countryName}?current=${page}&pageSize=${pageSize}`);
  },
  async getByGenre(genreName: string, page: number = 1, pageSize: number = 20) {
    return publicAxios.get(`/films/by-genre/${genreName}?current=${page}&pageSize=${pageSize}`);
  },
};

export default filmServices;
