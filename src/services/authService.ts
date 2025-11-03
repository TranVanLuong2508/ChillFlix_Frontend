import privateAxios from "@/lib/privateAxios";
import publicAxios from "@/lib/publicAxios";
import { LoginInput } from "@/types/authen.type";
import { IBackendRes } from "@/types/axios.type";
import { IUser } from "@/types/user.type";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const authService = {
  login: (credentials: LoginInput): Promise<IBackendRes<IUser>> => {
    return publicAxios.post(`${baseURL}/auth/login`, credentials);
  },

  logout: () => {
    return privateAxios.post(`${baseURL}/auth/logout`);
  },

  refreshToken: () => {
    return privateAxios.get(`${baseURL}/auth/refreshToken`);
  },
};
