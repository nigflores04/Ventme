import { axiosBaseInstance } from "@/lib/axiosBaseInstanse";
import { handleApiError } from "@/lib/errorHandler";

export async function subscribeToPlan(planId: string) {
  try {
    const response = await axiosBaseInstance.post("/payments/subscribe", {
      plan: planId,
      callback_url: window.location.origin + "/pricing", // Use dynamic origin
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}



export const getSubscriptionsPlans = async () => {
  try {
    const response = await axiosBaseInstance.get("/plans");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};



export const verifyPayment = async (reference: string) => {
  try {
    const response = await axiosBaseInstance.get(`/payments/verify/${reference}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};



export const getActiveSubscription = async () => {
  try {
    const response = await axiosBaseInstance.get(`/subscriptions/active`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const getIndividualPlan = async () => {
  try {
    const response = await axiosBaseInstance.get("/plans/individual");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
