import { ALL_CODE_TYPES } from "@/constants/allCode";
import publicAxios from "@/lib/publicAxios";
import { IBackendRes, ICountryData, IGenreData } from "@/types/backend.type";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const allCodeServie = {
  getGenresList: () => {
    return publicAxios.get(
      `${baseURL}/all-codes/type/get-by-type?type=${ALL_CODE_TYPES.GENRE}`
    ) as Promise<IBackendRes<IGenreData>>;
  },

  getCountriesList: () => {
    return publicAxios.get(
      `${baseURL}/all-codes/type/get-by-type?type=${ALL_CODE_TYPES.COUNTRY}`
    ) as Promise<IBackendRes<ICountryData>>;
  },
};
