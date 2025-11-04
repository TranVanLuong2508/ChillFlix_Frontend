export interface IBackendRes<T> {
  statusCode?: number;
  message?: string;
  EC: number;
  EM: string;
  data?: T;
}

export interface IPaginatedRes<T> {
  EC: number;
  EM: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: T[];
  };
}

export type AllCodeRow = {
  id: number;
  keyMap: string;
  valueVi: string;
  valueEn: string;
};

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

export interface FilmImage {
  url: string;
  type: "poster" | "horizontal" | "backdrop";
}

export interface FilmData {
  filmId: string;
  originalTitle: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  year: string;
  thumbUrl: string;
  slug: string;
  view: number;
  filmImages: FilmImage[] | null;
  genres: AllCodeRow[] | null;
  age: AllCodeRow | null;
  type: AllCodeRow | null;
  country: AllCodeRow | null;
  language: AllCodeRow | null;
  publicStatus: AllCodeRow | null;
}

export interface EpisodeData {
  id: string;
  title: string;
  episodeNumber: number;
  duration: number;
  videoUrl: string;
  thumbUrl: string;
}

export interface PartData {
  id: string;
  title: string;
  partNumber: number;
  description?: string;
  filmId: string;
  episodes: EpisodeData[];
}

//episodesData.ts
export interface EpisodesData {
  id: string;
  title: string;
  episodeNumber: number;
  duration: number;
  videoUrl: string;
  thumbUrl: string;
  partId: string;
  part?: {
    id: string;
    title: string;
    partNumber: number;
  };
}

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

export interface RatingData {
  filmId: string;
  averageRating: number;
  totalRatings: number;
}
