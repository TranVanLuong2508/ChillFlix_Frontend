import axios from "@/lib/axios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const userServices = {
  getAllUser: async () => {
    return await axios.get(`${baseURL}/users`);
  },
};
