import axiosInstance from "@/lib/axios";
import { IBackendRes } from "@/types/backend.type";
import { EpisodeData } from "@/types/episodeData";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

const episodeServices = {
  getEpisodeById: (episodeId: string): Promise<IBackendRes<EpisodeData>> => {
    return axiosInstance.get(`${baseURL}/episodes/${episodeId}`);
  },
};

export default episodeServices;
