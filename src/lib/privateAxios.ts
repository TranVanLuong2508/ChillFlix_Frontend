import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  withCredentials: true,
});

privateAxios.interceptors.request.use(async (config) => {
  const access_token = useAuthStore.getState().access_token;
  console.log("check token", access_token);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

privateAxios.interceptors.response.use((response) => {
  // const { data } = response
  return response.data;
});

export default privateAxios;
