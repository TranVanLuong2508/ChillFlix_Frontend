import publicAxios from "@/lib/publicAxios"


export const directorServices = {
  getDirectorById: (directorId: string) => {
    return publicAxios.get(`/director/get-director-by-id/${directorId}`);
  },
};
