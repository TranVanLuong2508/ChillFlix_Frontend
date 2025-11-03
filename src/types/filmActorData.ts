import { AllCodeValue } from "./allcode.type";

export interface FilmActorData {
  actorId: string;
  actorName: string;
  avatarUrl: string;
  slug: string;
  nationalityCode: AllCodeValue | null;
  genderCode: AllCodeValue | null;
  characterName: string;
}
