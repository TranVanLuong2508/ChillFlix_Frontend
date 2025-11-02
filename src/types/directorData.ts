import { AllCodeRow } from "./allcodeType";

export interface DirectorData {
  directorId: number;
  directorName: string;
  slug: string;
  birthDate: string;
  genderCode: string;
  story?: string;
  avatarUrl?: string;
  nationalityCode?: string;
  genderCodeRL?: AllCodeRow | null;
  nationalityCodeRL?: AllCodeRow | null;
}
