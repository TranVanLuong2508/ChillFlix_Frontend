import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  // withCredentials: true
});
instance.interceptors.response.use((response) => {
  // const { data } = response
  return response.data;
});

export default instance;
