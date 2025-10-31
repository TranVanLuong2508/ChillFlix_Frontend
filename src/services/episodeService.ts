import axios from "@/lib/axios";

export const episodeServices = {
  getEpisodeById: (episodeId: string) => {
    return axios.get(`/episodes/${episodeId}`);
  },
};
