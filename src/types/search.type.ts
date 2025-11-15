export interface ISearchFilmResponse {
  films: IFilmSearch[];
}

export interface IFilmSearch {
  filmId: string;
  title: string;
  originalTitle: string;
  thumbUrl: string;
  slug: string;
  year: string;
  description: string;
}
