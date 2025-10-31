import axios from "@/lib/axios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const paymentService = {
  createPaymentURL: (amount: number) => {
    return axios.post(`${baseURL}/payments`, { amount });
  },
};
