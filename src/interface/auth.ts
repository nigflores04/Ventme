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
  role: string;
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
