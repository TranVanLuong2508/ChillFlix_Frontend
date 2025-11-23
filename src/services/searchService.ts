import publicAxios from "@/lib/publicAxios";
import { IBackendRes } from "@/types/backend.type";
import { ISearchFilmResponse } from "@/types/search.type";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const searchService = {
  //   callLogin: (credentials: LoginInput): Promise<IBackendRes<IAccount>> => {
  //     return publicAxios.post(`${baseURL}/auth/login`, credentials);
  //   },
  callSearchFilm: (
    keyword: string
  ): Promise<IBackendRes<ISearchFilmResponse>> => {
    return publicAxios.get(`${baseURL}/search/films`, {
      params: {
        q: keyword,
      },
    });
  },
};
