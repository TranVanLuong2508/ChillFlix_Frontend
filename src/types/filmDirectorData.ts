import { AllCodeRow } from "./allcodeType";
import { FilmData } from "./filmData";
import { DirectorData } from "./directorData";

export interface FilmDirectorData {
  id: number;
  filmId: string;
  isMain: boolean;
  film: FilmData;
  director: DirectorData;
}

export interface FilmDirectorSimpleData {
  directorId: number;
  directorName: string;
  slug: string;
  birthDate: string | null;
  story: string | null;
  avatarUrl: string | null;
  isMain: boolean;
  genderCode: string | AllCodeRow | null;
  nationalityCode: string | AllCodeRow | null;
}
