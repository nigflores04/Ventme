/**
 * Error message mappings for backend error codes
 * Maps backend error codes to user-friendly messages
 */

export const ERROR_MESSAGES: Record<string, string> = {
  // Authentication errors (401)
  AUTHENTICATION_FAILED: "Invalid email or password. Please try again.",
  INVALID_TOKEN: "Your session has expired. Please log in again.",
  
  // Authorization errors (403)
  FORBIDDEN: "You don't have permission to perform this action.",
  
  // Validation errors (422)
  VALIDATION_ERROR: "Please check your input and try again.",
  
  // Not found errors (404)
  RESOURCE_NOT_FOUND: "The requested resource was not found.",
  NOT_FOUND: "The requested resource was not found.",
  
  // Rate limiting (429)
  RATE_LIMIT_EXCEEDED: "Too many requests. Please wait a moment and try again.",
  
  // Payment errors (402)
  PAYMENT_ERROR: "Payment processing failed. Please try again.",
  INSUFFICIENT_CREDITS: "You don't have enough credits. Please purchase more to continue.",
  
  // External service errors (502)
  EXTERNAL_SERVICE_ERROR: "An external service is temporarily unavailable. Please try again later.",
  
  // Server errors (500)
  INTERNAL_SERVER_ERROR: "Something went wrong on our end. Please try again later.",
  DATABASE_ERROR: "A database error occurred. Please try again later.",
  
  // Generic fallback
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
};

/**
 * Get user-friendly error message from error code
 */
export function getErrorMessage(errorCode?: string, fallbackMessage?: string): string {
  if (!errorCode) {
    return fallbackMessage || ERROR_MESSAGES.UNKNOWN_ERROR;
  }
  
  return ERROR_MESSAGES[errorCode] || fallbackMessage || ERROR_MESSAGES.UNKNOWN_ERROR;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: any): boolean {
  return !error.response && error.message === 'Network Error';
}

/**
 * Check if error is a timeout error
 */
export function isTimeoutError(error: any): boolean {
  return error.code === 'ECONNABORTED' || error.message?.includes('timeout');
}

/**
 * Check if error should trigger a retry
 */
export function shouldRetry(error: any): boolean {
  // Retry on network errors, timeouts, and 5xx errors
  if (isNetworkError(error) || isTimeoutError(error)) {
    return true;
  }
  
  const status = error.response?.status;
  return status >= 500 && status < 600;
}
