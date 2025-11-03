import privateAxios from "@/lib/privateAxios";
import publicAxios from "@/lib/publicAxios";
import { AuthRes, LoginInput } from "@/types/authen.type";
import { IBackendRes } from "@/types/backend.type";
import { IUser } from "@/types/user.type";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const authService = {
  login: (credentials: LoginInput): Promise<AuthRes<IUser>> => {
    return publicAxios.post(`${baseURL}/auth/login`, credentials);
  },

  logout: (): Promise<IBackendRes<IUser>> => {
    return privateAxios.post(`${baseURL}/auth/logout`);
  },

  refreshToken: (): Promise<AuthRes<IUser>> => {
    return privateAxios.get(`${baseURL}/auth/refreshToken`);
  },
};
