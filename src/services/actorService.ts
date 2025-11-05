import publicAxios from "@/lib/publicAxios"


export const actorServices = {
  getActorById: (actorId: string) => {
    return publicAxios.get(`/actor/get-actor-by-id/${actorId}`);
  },
};
