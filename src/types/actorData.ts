import { AllCodeRow } from "./allcodeType";

export interface ActorData {
  actorId: number;
  actorName: string;
  slug: string;
  shortBio: string | null;
  genderCode: string | null;
  genderActor?: AllCodeRow | null;
  birthDate: string | null;
  nationalityCode: string | null;
  nationalityActor?: AllCodeRow | null;
  avatarUrl: string | null;
}
