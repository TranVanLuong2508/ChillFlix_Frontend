import privateAxios from "@/lib/privateAxios";

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL;
export const subsciptionPlanService = {
  getSubscriptionsPlanList: () => {
    return privateAxios.get(`${baseURL}/subscription-plans`);
  },
};
