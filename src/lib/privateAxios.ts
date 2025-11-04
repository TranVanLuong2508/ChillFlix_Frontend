import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { Mutex } from "async-mutex";
import { AuthRes } from "@/types/authen.type";
import { IUser } from "@/types/user.type";

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  withCredentials: true,
});

const handleRefreshToken = async (): Promise<string | null> => {
  return await mutex.runExclusive(async () => {
    const res = (await privateAxios.get(
      "/auth/refreshToken"
    )) as AuthRes<IUser>;
    if (res && res.EC === 1 && res.data) {
      console.log("check refresh token", res.data?.access_token);
      return res.data?.access_token;
    } else return null;
  });
};

privateAxios.interceptors.request.use((config) => {
  const access_token = useAuthStore.getState().access_token;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

privateAxios.interceptors.response.use(
  (response) => {
    // const { data } = response
    return response.data;
  },

  async (error) => {
    console.log("==========================================");
    console.log("❌ INTERCEPTOR ERROR CAUGHT");
    console.log("URL:", error.config?.url);
    console.log("Status:", error.response?.status);
    console.log("Full Error:", error);
    console.log("Error Response Data:", error.response?.data);
    console.log("==========================================");
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      error.config.url !== "/auth/login" &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      console.log("Trying to refresh token...");

      const access_token = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        useAuthStore.setState({ access_token: access_token });
        return privateAxios.request(error.config);
      } else {
        console.log("❌ Failed to get new access token");
      }
    }
    console.log("Checking CASE 2 conditions:");
    console.log("- Has config?", !!error.config);
    console.log("- Has response?", !!error.response);
    console.log("- Status === 400?", +error.response?.status === 400);
    console.log("- URL matches?", error.config?.url === "/auth/refreshToken");
    console.log("- Current pathname:", location.pathname);

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/auth/refreshToken"
      // location.pathname.startsWith("/admin")
    ) {
      console.log("check erro from axios", error);

      const message =
        error?.error?.response?.data?.message ??
        "Có lỗi xảy ra, vui lòng login.";
      console.log("Message:", message);
      console.log("Setting refresh token action...");

      useAuthStore.getState().setRefreshTokenAction(true, message);
      console.log("Zustand state after set:", {
        isRefreshToken: useAuthStore.getState().isRefreshToken,
        errorRefreshToken: useAuthStore.getState().errorRefreshToken,
      });
    }
    console.log("==========================================");
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default privateAxios;
