import publicAxios from "@/lib/publicAxios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const searchService = {
  //   callLogin: (credentials: LoginInput): Promise<IBackendRes<IAccount>> => {
  //     return publicAxios.post(`${baseURL}/auth/login`, credentials);
  //   },
  callSearchFilm: (keyword: string) => {
    return publicAxios.get(`${baseURL}/search/films`, {
      params: {
        q: keyword,
      },
    });
  },
};
