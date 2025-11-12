import { EpisodeDetail } from "./episode.type";

export interface PartDetail {
  id: string;
  title: string;
  partNumber: number;
  description: string;
  episodes: EpisodeDetail[];
}

export interface PartRes {
  partData: PartDetail[];
}