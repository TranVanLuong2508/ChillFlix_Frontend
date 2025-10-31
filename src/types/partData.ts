export interface EpisodeData {
  id: string;
  title: string;
  episodeNumber: number;
  duration: number;
  videoUrl: string;
  thumbUrl: string;
}

export interface PartData {
  id: string;
  title: string;
  partNumber: number;
  description?: string;
  filmId: string;
  episodes: EpisodeData[];
}
