/**
 * Centralized error handler for API errors
 * Handles error logging, user notifications, and error transformation
 */

import toast from "react-hot-toast";
import { getErrorMessage, isNetworkError, isTimeoutError } from "@/constants/errorMessages";

export interface BackendError {
    error: {
        code: string;
        message: string;
        request_id: string;
        timestamp: string;
        details?: Record<string, any>;
    };
}

export interface ErrorHandlerOptions {
    showToast?: boolean;
    logError?: boolean;
    customMessage?: string;
}

/**
 * Handle API errors with proper user feedback
 */
export function handleApiError(
    error: any,
    options: ErrorHandlerOptions = {}
): string {
    const { showToast = true, logError = true, customMessage } = options;

    let errorMessage: string;
    let errorCode: string | undefined;

    // Check if it's a backend error with our new format
    if (error.response?.data?.error) {
        const backendError = error.response.data as BackendError;
        errorCode = backendError.error.code;
        errorMessage = customMessage || getErrorMessage(errorCode, backendError.error.message);

        // Log request ID for debugging
        if (logError && backendError.error.request_id) {
            console.error(`[API Error] ${errorCode} - Request ID: ${backendError.error.request_id}`);
        }
    }
    // Network errors
    else if (isNetworkError(error)) {
        errorMessage = customMessage || "Network error. Please check your internet connection.";
        errorCode = "NETWORK_ERROR";
    }
    // Timeout errors
    else if (isTimeoutError(error)) {
        errorMessage = customMessage || "Request timed out. Please try again.";
        errorCode = "TIMEOUT_ERROR";
    }
    // Old format or unknown errors
    else {
        errorMessage = customMessage || error.response?.data?.message || error.message || "An unexpected error occurred";
        errorCode = "UNKNOWN_ERROR";
    }

    // Log error for debugging
    if (logError) {
        console.error("[API Error]", {
            code: errorCode,
            message: errorMessage,
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method,
        });
    }

    // Show toast notification
    if (showToast) {
        toast.error(errorMessage);
    }

    return errorMessage;
}

/**
 * Extract validation errors from backend response
 */
export function getValidationErrors(error: any): Record<string, string> | null {
    if (error.response?.data?.error?.details?.errors) {
        const errors = error.response.data.error.details.errors;
        const fieldErrors: Record<string, string> = {};

        errors.forEach((err: any) => {
            if (err.field) {
                fieldErrors[err.field] = err.message;
            }
        });

        return Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
    }

    return null;
}

/**
 * Check if error is authentication error
 */
export function isAuthError(error: any): boolean {
    const status = error.response?.status;
    const errorCode = error.response?.data?.error?.code;

    return status === 401 || errorCode === "AUTHENTICATION_FAILED" || errorCode === "INVALID_TOKEN";
}

/**
 * Check if error is rate limit error
 */
export function isRateLimitError(error: any): boolean {
    const status = error.response?.status;
    const errorCode = error.response?.data?.error?.code;

    return status === 429 || errorCode === "RATE_LIMIT_EXCEEDED";
}

/**
 * Get retry-after time from rate limit error
 */
export function getRetryAfter(error: any): number | null {
    // Check Retry-After header
    const retryAfter = error.response?.headers?.["retry-after"];
    if (retryAfter) {
        return parseInt(retryAfter, 10);
    }

    // Check error details
    const retryAfterDetails = error.response?.data?.error?.details?.retry_after;
    if (retryAfterDetails) {
        return retryAfterDetails;
    }

    return null;
}
