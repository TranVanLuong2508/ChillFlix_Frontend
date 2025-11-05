export interface EpisodeData {
  id: string;
  title?: string;
  episodeNumber: number;
  duration: number;
  videoUrl: string;
  thumbUrl: string;
  // partId: string;
  part: {
    id: string;
    title: string;
    partNumber: number;
  };
}
