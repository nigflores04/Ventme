import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getToken, isTokenExpired, logOut } from "./helpers";
import { handleApiError, isAuthError, isRateLimitError } from "./errorHandler";

export const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!baseURL) {
  console.warn("⚠️ NEXT_PUBLIC_BASE_API_URL is not set. API calls will fail.");
}

const axiosBaseInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000, // 30 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosBaseInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add request ID for tracking using built-in crypto API
    const requestId = crypto.randomUUID();
    config.headers["X-Request-ID"] = requestId;

    // Add authentication token
    const token = getToken();
    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.warn("Token expired, logging out");
        logOut();
        return Promise.reject(new Error("Token expired"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        requestId,
        hasAuth: !!token,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosBaseInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      const requestId = response.config.headers["X-Request-ID"];
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        requestId,
        status: response.status,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      const requestId = originalRequest?.headers?.["X-Request-ID"];
      console.error(`[API Error] ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
        requestId,
        status: error.response?.status,
        errorCode: (error.response?.data as any)?.error?.code,
      });
    }

    // Handle authentication errors
    if (isAuthError(error)) {
      const currentRoute = window.location.pathname;
      // Only logout and redirect if not already on login page
      if (currentRoute !== "/login" && currentRoute !== "/signup") {
        console.warn("Authentication failed, logging out");
        logOut();
      }
      return Promise.reject(error);
    }

    // Handle rate limiting
    if (isRateLimitError(error)) {
      // Don't retry rate limited requests
      handleApiError(error, { showToast: true });
      return Promise.reject(error);
    }

    // Retry logic for 5xx errors (max 2 retries)
    if (error.response?.status && error.response.status >= 500 && error.response.status < 600) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        console.log("Retrying request due to server error...");

        // Wait 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));

        return axiosBaseInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosBaseInstance };
