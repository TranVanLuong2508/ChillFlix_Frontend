import publicAxios from "@/lib/publicAxios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const allCodeServie = {
  getByType: (type: string) => {
    return publicAxios.get(
      `${baseURL}/all-codes/type/get-by-type?type=${type}`
    );
  },
};
