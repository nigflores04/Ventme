export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: string; // Made optional since backend doesn't require it
}

/**
 * Backend token response format
 */
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_at: string;
}

/**
 * Backend authentication response format
 */
export interface AuthResponse {
  email: string;
  token: TokenResponse;
  message?: string;
  access_token?: string; // Helper field added by frontend
}

/**
 * Backend error response format
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    request_id: string;
    timestamp: string;
    details?: Record<string, any>;
  };
}

export interface ApiResponse<T = unknown> {
  message?: string;
  user?: T;
  error?: string;
}

export interface VerifyEmailFormValues {
  code: string;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface ResendVerificationData {
  email: string;
}
