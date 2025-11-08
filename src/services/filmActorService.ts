import publicAxios from "@/lib/publicAxios";
import { IBackendRes } from "@/types/backend.type";
import { FilmDetailRes } from "@/types/film.type";
import { FilmActorRes } from "@/types/filmActorData";

export const filmActorServices = {
  getActorsByFilmId: (filmId: string) => {
    return publicAxios.get(`/film-actor/get-actors-by-film/${filmId}`);
  },
  getFilmActorId: (id: number) => {
    return publicAxios.get(`/film-actor/get-film-actor-by-id/${id}`);
  },
  getFilmsByActorId: (actorId: string): Promise<IBackendRes<FilmActorRes>> => {
    return publicAxios.get(`/film-actor/get-films-by-actor/${actorId}`);
  },
};
