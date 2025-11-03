import publicAxios from "@/lib/publicAxios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const paymentService = {
  createPaymentURL: (amount: number) => {
    return publicAxios.post(`${baseURL}/payments`, { amount });
  },
};
