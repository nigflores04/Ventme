import { axiosBaseInstance } from "@/lib/axiosBaseInstanse";

export async function subscribeToPlan(planId: string) {
  try {
    const response = await axiosBaseInstance.post("/payments/subscribe", {
        plan: planId,
        callback_url: "http://localhost:3000/pricing"
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getSubscriptionsPlans = async () => {
  try {
    const response = await axiosBaseInstance.get("/plans");
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const verifyPayment = async (reference: string) => {
  try {
    const response = await axiosBaseInstance.get(`/payments/verify/${reference}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getActiveSubscription = async () => {
  try {
    const response = await axiosBaseInstance.get(
      `/subscriptions/active`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

