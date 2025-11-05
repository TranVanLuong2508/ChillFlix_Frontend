import publicAxios from "@/lib/publicAxios"


export const filmActorServices = {
  getActorsByFilmId: (filmId: string) => {
    return publicAxios.get(`/film-actor/get-actors-by-film/${filmId}`);
  },
  getFilmActorId: (id: number) => {
    return publicAxios.get(`/film-actor/get-film-actor-by-id/${id}`);
  },
  getFilmsByActorId: (actorId: string) => {
    return publicAxios.get(`/film-actor/get-films-by-actor/${actorId}`);
  },
};
