import axios from "@/lib/axios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const allCodeServie = {
  getByType: (type: string) => {
    return axios.get(`${baseURL}/all-codes/type/get-by-type?type=${type}`);
  },
};
