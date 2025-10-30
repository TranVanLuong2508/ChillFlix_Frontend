import axios from "@/lib/axios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const authService = {
  login: (credentials: any) => {
    return axios.post(`${baseURL}/auth/login`, credentials);
  },
};
