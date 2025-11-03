import { AllCodeValue } from "./allcode.type";

export interface FilmDirectorData {
  directorId: string;
  directorName: string;
  slug: string;
  avatarUrl: string;
  genderCode: AllCodeValue | null;
  nationalityCode: AllCodeValue | null;
}
