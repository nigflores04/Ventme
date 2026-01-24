import Cookies from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { downloadDesigns } from "@/api/design";
import toast from "react-hot-toast";

/**
 * Get authentication token from cookies
 */
export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

/**
 * Set authentication token in cookies
 * @param token - JWT access token
 * @param expiresAt - Optional expiration date
 */
export const setToken = (token: string, expiresAt?: string | Date): void => {
  const options: Cookies.CookieAttributes = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  if (expiresAt) {
    options.expires = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  } else {
    // Default to 7 days if no expiration provided
    options.expires = 7;
  }

  Cookies.set("token", token, options);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadImageOutput = async (
  id: string,
  resolution: number | null
) => {
  try {
    // console.log("resolution applied", resolution);
    const response = await downloadDesigns(id, resolution);
    // console.log("response", response);
    // Handle both Blob and Buffer/ArrayBuffer
    let blob: Blob;
    if (response instanceof Blob) {
      blob = response;
    } else if (response instanceof ArrayBuffer || response?.buffer) {
      // Convert ArrayBuffer or Buffer to Blob
      blob = new Blob([response], { type: "image/png" });
    } else {
      // If it's raw data, wrap it in a Blob
      blob = new Blob([response], { type: "image/png" });
    }

    const url = window.URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `design-${id}.jpg`;
    link.style.display = "none";

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
    throw error;
  }
};

export const convertKoboToNGN = (kobo: number): string => {
  const ngn = kobo / 100;
  return ngn === 0 ? "₦0" : `₦${ngn.toLocaleString()}`;
};

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast.success("Image URL copied to clipboard!");
};

export const handleShare = async (title: string, url: string) => {
  copyToClipboard(url);

  if (navigator.share) {
    await navigator.share({
      title,
      text: "View the design here",
      url,
      // images/logo not supported by navigator.share (as of 2024)
      // See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#parameters
      // If you want logo preview, use Open Graph meta image in HTML head
    });

    toast.success("Image shared successfully!");
  }
};

export const logOut = () => {
  Cookies.remove("token");
  localStorage.removeItem("persist:root");
  window.location.href = "/";
};

/**
 * Check if JWT token is expired
 * @param token - JWT token string
 * @returns true if token is expired or invalid
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    if (!token || token.split(".").length !== 3) {
      console.warn("Invalid token format");
      return true;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) {
      console.warn("Token missing expiration");
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp < currentTime;

    if (isExpired) {
      console.log("Token has expired");
    }

    return isExpired;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Hash function using Web Crypto API
const hashSHA256 = async (text: string): Promise<string> => {
  if (!text) return "";

  const encoder = new TextEncoder();
  const data = encoder.encode(text.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export const buildEventParams = async (event: string, data: any) => {
  // Hash email and phone parameters
  const hashedEmail = await hashSHA256(data.email);
  const hashedPhone = await hashSHA256(data.phone);

  const eventParameters = {
    data: [
      {
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: {
          em: [hashedEmail],
          ph: [hashedPhone],
          client_ip_address: data.clientIpAddress || null,
          client_user_agent: data.clientUserAgent || null,
        },
      },
    ],
  };

  return eventParameters;
};
