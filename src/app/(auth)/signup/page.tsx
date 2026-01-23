"use client"

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { googleLogin, signupUser } from "@/api/auth";
import { signupSchema } from "@/lib/schema";
import { SignupData, SignupFormValues } from "@/interface/auth";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const roleOptions = [
  { value: "", label: "Select a role" },
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "developer", label: "Developer" },
];

export default function SignupPage() {
  const router = useRouter();

  const {
    mutate: signupMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (values: SignupFormValues) => {
      // Remove confirmPassword before sending to API
      const { confirmPassword: _, ...signupData } = values;
      return await signupUser(signupData as SignupData);
    },
    onSuccess: () => {
      // Redirect to email verification page with the email
      // router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { mutate: googleLoginMutation } = useMutation({
    mutationFn: googleLogin,
    onSuccess: () => {
      router.push("/redirect-auth");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const handleGoogleSuccess = async (credentialResponse: any) => {
    googleLoginMutation(credentialResponse.credential);
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik<SignupFormValues>({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      },
      validationSchema: signupSchema,
      onSubmit: (values) => {
        signupMutation(values);
      },
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="morphism-card rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">
              Create your account
            </h2>
            <p className="text-sm text-muted-foreground">
              Please create your account to get started
            </p>
          </div>

          <div className="space-y-6">
            {/* Google Login Button */}
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="signup_with"
                shape="rectangular"
                logo_alignment="left"
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                name="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />

              <Select
                id="role"
                name="role"
                label="Role"
                options={roleOptions}
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.role}
                touched={touched.role}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={isPending}
                disabled={isPending}
                size="lg"
              >
                Create Account
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>

              {isError && (
                <div className="rounded-lg bg-destructive/10 p-4">
                  <div className="text-sm text-destructive">
                    Failed to create account. Please try again.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
