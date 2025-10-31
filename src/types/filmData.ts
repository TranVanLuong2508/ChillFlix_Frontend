import { AllCodeRow } from "./allcodeType";

export interface FilmData {
  filmId: string;
  originalTitle: string;
  title: string;
  description: string;
  releaseDate: Date;
  year: string;
  thumbUrl: string;
  posterUrl: string;
  slug: string;
  age: AllCodeRow | null;
  type: AllCodeRow | null;
  genres: AllCodeRow[] | null;
  country: AllCodeRow | null;
  lang: AllCodeRow | null;
  publicStatus: AllCodeRow | null;
}
