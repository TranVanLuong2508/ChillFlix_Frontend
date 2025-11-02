import axios from "@/lib/axios";

export const actorServices = {
  getActorById: (actorId: string) => {
    return axios.get(`/actor/get-actor-by-id/${actorId}`);
  },
};
