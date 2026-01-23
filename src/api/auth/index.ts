import {  LoginCredentials, SignupData } from "@/interface/auth";
import { axiosBaseInstance, baseURL } from "@/lib/axiosBaseInstanse";
import axios from "axios";

export async function loginUser(
  credentials: LoginCredentials
) {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error
  }
}

export async function signupUser(userData: SignupData) {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error
  }
}

export async function googleLogin(idToken: string) {
  try {
    const response = await axios.post(`${baseURL}/auth/google`, {id_token: idToken});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function verifyEmail(email: string, code: string) {
  try {
    const response = await axiosBaseInstance.post("/auth/verify-email", {
      email,
      code
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function resendVerificationCode(email: string) {
  try {
    const response = await axiosBaseInstance.post("/auth/resend-verification", {
      email
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
