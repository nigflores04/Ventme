"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { verifyEmail, resendVerificationCode } from "@/api/auth";
import { verifyEmailSchema } from "@/lib/schema";
import { VerifyEmailFormValues } from "@/interface/auth";
import CodeInput from "@/components/ui/code-input";
import Button from "@/components/ui/button";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [resendCooldown, setResendCooldown] = useState(0);


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const {
    mutate: verifyMutation,
    isPending: verifyIsLoading,
    isError: verifyIsError,
    error: verifyError,
  } = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyEmail(email, code),
    onSuccess: () => {
      router.push(
        "/login?message=Email verified successfully! You can now log in."
      );
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { mutate: resendMutation, isPending: resendIsLoading } = useMutation({
    mutationFn: (email: string) => resendVerificationCode(email),
    onSuccess: () => {
      setResendCooldown(60); // 60 seconds cooldown
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { values, handleBlur, handleSubmit, errors, touched, setFieldValue } =
    useFormik<VerifyEmailFormValues>({
      initialValues: {
        code: "",
      },
      validationSchema: verifyEmailSchema,
      onSubmit: (values) => {
        if (email) {
          verifyMutation({ email, code: values.code });
        }
      },
    });

  const handleCodeChange = (code: string) => {
    setFieldValue("code", code);
  };

  const handleResendCode = () => {
    if (email && resendCooldown === 0) {
      resendMutation(email);
    }
  };

  // if (!email) {
  //   return null; // Will redirect to login
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We&apos;ve sent a 4-digit verification code to
          </p>
          <p className="text-center text-sm font-medium text-gray-900">
            {email}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <CodeInput
              value={values.code}
              onChange={handleCodeChange}
              onBlur={() => handleBlur("code")}
              error={errors.code}
              touched={touched.code}
              disabled={verifyIsLoading}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={verifyIsLoading}
              disabled={verifyIsLoading || values.code.length !== 4}
            >
              Verify Email
            </Button>

            {verifyIsError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">
                  {verifyError?.response?.data?.message ||
                    verifyError?.message ||
                    "Invalid verification code. Please try again."}
                </div>
              </div>
            )}
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || resendIsLoading}
              isLoading={resendIsLoading}
              className="w-full"
            >
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend verification code"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
