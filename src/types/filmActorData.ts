import { AllCodeRow } from "./allcodeType";


export interface FilmActorData {
  actorId: string;
  actorName: string;
  avatarUrl: string;
  slug: string;
  nationalityCode: AllCodeRow | null;
  genderCode: AllCodeRow | null;
  characterName: string;
};
