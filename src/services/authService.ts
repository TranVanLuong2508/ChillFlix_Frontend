import axios from "@/lib/axios";
import { LoginInput } from "@/types/authen.type";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const authService = {
  login: (credentials: LoginInput) => {
    return axios.post(`${baseURL}/auth/login`, credentials);
  },
};
