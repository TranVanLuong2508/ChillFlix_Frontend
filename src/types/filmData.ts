import { AllCodeRow } from "./allcodeType";

export interface FilmImage {
  url: string;
  type: "poster" | "horizontal" | "backdrop";
}

export interface FilmData {
  filmId: string;
  originalTitle: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  year: string;
  thumbUrl: string;
  slug: string;
  view: number;
  filmImages: FilmImage[] | null;
  genres: AllCodeRow[] | null;
  age: AllCodeRow | null;
  type: AllCodeRow | null;
  country: AllCodeRow | null;
  language: AllCodeRow | null;
  publicStatus: AllCodeRow | null;
}
