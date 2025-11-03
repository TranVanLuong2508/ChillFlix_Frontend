export interface IBackendRes<T> {
  EC?: number;
  EM?: string;
  data?: T;
  message?: string;
  statusCode?: string;
}

export interface AllCodeRow {
  id: number;
  keyMap: string;
  valueEn: string;
  valueVi: string;
  description: string;
}

export interface ICountryData {
  COUNTRY: AllCodeRow[];
}

export interface IGenreData {
  GENRE: AllCodeRow[];
}
