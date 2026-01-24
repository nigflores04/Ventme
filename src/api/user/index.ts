import { axiosBaseInstance, baseURL } from "@/lib/axiosBaseInstanse";
import { handleApiError } from "@/lib/errorHandler";
import axios from "axios";

export async function getUser() {
  try {
    const response = await axiosBaseInstance.get("/users/me");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}


export async function subscribeToNewsletter(email: string) {
  try {
    const response = await axios.post(`${baseURL}/emails/subscribe`, {
      email,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
