import axios from "@/lib/axios";

export const directorServices = {
  getDirectorById: (directorId: string) => {
    return axios.get(`/director/get-director-by-id/${directorId}`);
  },
};
