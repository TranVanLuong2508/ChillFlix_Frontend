import { EpisodeRes } from "./episode.type";

export interface PartRes {
  id: string;
  title: string;
  partNumber: number;
  description: string;
  episodes: EpisodeRes[];
}

export interface DetailPart {
  partData: PartRes[];
}