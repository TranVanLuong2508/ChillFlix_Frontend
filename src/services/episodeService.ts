import axios from "@/lib/axios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

export const episodeServices = {
  getEpisodeById: (episodeId: string) => {
    return axios.get(`${baseURL}/episodes/${episodeId}`);
  },
};
