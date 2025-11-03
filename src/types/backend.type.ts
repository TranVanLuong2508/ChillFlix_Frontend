import { AllCodeRow } from "./allcodeType";

export interface IBackendRes<T> {
  EC?: number;
  EM?: string;
  data?: T;
  message?: string;
  statusCode?: string;
}

export interface ICountryData {
  COUNTRY: AllCodeRow[];
}

export interface IGenreData {
  GENRE: AllCodeRow[];
}
