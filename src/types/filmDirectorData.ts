import { AllCodeRow } from "./allcodeType";

export interface FilmDirectorData  {
  directorId: string;
  directorName: string;
  slug: string;
  avatarUrl: string;
  genderCode: AllCodeRow | null;
  nationalityCode: AllCodeRow | null;
};
