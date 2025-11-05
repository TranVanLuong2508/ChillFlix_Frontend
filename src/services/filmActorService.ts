import axios from "@/lib/axios";

export const filmActorServices = {
  getActorsByFilmId: (filmId: string) => {
    return axios.get(`/film-actor/get-actors-by-film/${filmId}`);
  },
  getFilmActorId: (id: number) => {
    return axios.get(`/film-actor/get-film-actor-by-id/${id}`);
  },
  getFilmsByActorId: (actorId: string) => {
    return axios.get(`/film-actor/get-films-by-actor/${actorId}`);
  },
};
