import privateAxios from "@/lib/privateAxios";
import publicAxios from "@/lib/publicAxios";
import {
  IAccount,
  IGetAccount,
  LoginInput,
  RegisterInput,
} from "@/types/authen.type";
import { IBackendRes } from "@/types/backend.type";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const authService = {
  callLogin: (credentials: LoginInput): Promise<IBackendRes<IAccount>> => {
    return publicAxios.post(`${baseURL}/auth/login`, credentials);
  },

  callLogout: (): Promise<IBackendRes<IAccount>> => {
    return privateAxios.post(`${baseURL}/auth/logout`);
  },

  CallRefreshToken: (): Promise<IBackendRes<IAccount>> => {
    return privateAxios.get(`${baseURL}/auth/refreshToken`);
  },

  callFetchAccount: (): Promise<IBackendRes<IGetAccount>> => {
    return privateAxios.get("/auth/account");
  },

  callRegister: (data: RegisterInput): Promise<IBackendRes<IGetAccount>> => {
    return publicAxios.post(`${baseURL}/auth/register`, data);
  },
};
