import { AllCodeRow } from "./allcodeType";

export interface FilmDirectorData {
  directorId: number;
  directorName: string;
  slug: string;
  isMain: boolean;
  genderCode: string | AllCodeRow | null;
  nationalityCode: string | AllCodeRow | null;
}
