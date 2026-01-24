import { LoginCredentials, SignupData } from "@/interface/auth";
import { axiosBaseInstance, baseURL } from "@/lib/axiosBaseInstanse";
import { handleApiError } from "@/lib/errorHandler";
import axios from "axios";

export async function loginUser(credentials: LoginCredentials) {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, credentials);

    // Backend returns: { email, token: { access_token, token_type, expires_at }, message }
    return {
      ...response.data,
      // Extract access_token for easier access
      access_token: response.data.token?.access_token,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}


export async function signupUser(userData: SignupData) {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, userData);

    // Backend returns: { email, token: { access_token, token_type, expires_at }, message }
    return {
      ...response.data,
      // Extract access_token for easier access
      access_token: response.data.token?.access_token,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}


export async function googleLogin(idToken: string) {
  try {
    const response = await axios.post(`${baseURL}/auth/google`, { id_token: idToken });

    // Backend returns: { email, token: { access_token, token_type, expires_at }, message }
    return {
      ...response.data,
      // Extract access_token for easier access
      access_token: response.data.token?.access_token,
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}


export async function verifyEmail(email: string, code: string) {
  try {
    const response = await axiosBaseInstance.post("/auth/verify-email", {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}


export async function resendVerificationCode(email: string) {
  try {
    // Updated endpoint path to match backend
    const response = await axiosBaseInstance.post("/auth/resend-code", {
      email,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
