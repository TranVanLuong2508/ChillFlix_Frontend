export interface IUser {
  userId: number;
  email: string;
  fullName: string;
  roleId: number;
  genderCode: string;
  isVip: boolean;
  statusCode: string;
  permissions?: {
    name: string;
    apiPath: string;
    method: string;
    module: string;
  }[];
}

export interface IFilmList {
  favorites: filmInUserPage[];
}

export interface filmInUserPage {
  filmId: string;
  title: string;
  thumbUrl: string;
  originalTitle?: string;
  badge?: string;
  slug: string;
}

export interface IFavorite {
  isFavorite: boolean;
}
