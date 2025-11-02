import { FilmData } from "./filmData";
import { ActorData } from "./actorData";


export interface FilmActorData {
  id: number;
  film: FilmData; 
  actor: ActorData;
  characterName: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
}


export interface FilmActorSimpleData {
  actorId: number;
  actorName: string;
  slug: string;
  avatarUrl: string | null;
  nationalityCode?: string | null;
  genderCode?: string | null;
  birthDate?: string | null;
  characterName?: string | null;
}
