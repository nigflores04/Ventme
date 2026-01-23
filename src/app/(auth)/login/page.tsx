"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { googleLogin, loginUser } from "@/api/auth";
import { loginSchema } from "@/lib/schema";
import { LoginFormValues } from "@/interface/auth";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setTokenState, setUserState } from "@/store/slices/userSlice";
import { getUser } from "@/api/user";
import Cookies from "js-cookie";
import { IoMdUnlock } from "react-icons/io";
import Image from "next/image";
import { Loader } from "@mantine/core";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const dispatch = useDispatch();

  const setup = (token: any) => {
    const hasLoggedInBefore = Cookies.get("has_logged_in");

    Cookies.set("token", token.access_token);
    dispatch(setTokenState(token));
    mutateUser();

    if (!hasLoggedInBefore) {
      Cookies.set("has_logged_in", "true", { expires: 365 * 3 }); // 3 years

      router.push("/redirect-auth");
    } else {
      router.push("/");
    }
  };

  const {
    mutate: loginMutation,
    isPending: loginIsLoading,
    isError: isError,
    error: error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      setup(res.token);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { mutate: mutateUser } = useMutation({
    mutationFn: getUser,
    onSuccess: (res) => {
      dispatch(setUserState(res));
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const {
    mutate: googleLoginMutation,
    isPending: googleLoginIsLoading = true,
  } = useMutation({
    mutationFn: googleLogin,
    onSuccess: (res) => {
      setup(res.token);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const handleGoogleSuccess = async (credentialResponse: any) => {
    googleLoginMutation(credentialResponse.credential);
  };

  const handleGoogleError = () => {
    toast.error("Google login failed");
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik<LoginFormValues>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        loginMutation(values);
      },
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Link href="/">
          <Image
            src="/images/logo-white.jpg"
            alt="Ventics AI"
            width={70}
            height={70}
            className="absolute top-0 left-0 mx-auto mb-2"
          />
        </Link>
        <div className="morphism-card rounded-xl p-8">
          <div className="text-center mb-8">
            <IoMdUnlock className="w-10 h-10 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-card-foreground mb-2">
              Sign in
            </h2>
            <p className="text-sm text-muted-foreground">
              Use Google to continue to Ventics AI
            </p>
          </div>

          {message && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 mb-6">
              <div className="text-sm text-green-800 dark:text-green-200">
                {message}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Google Login Button */}
            <div className="w-full">
              {/* <div style={{ borderRadius: "1.5rem", overflow: "hidden" }}> */}
              {googleLoginIsLoading ? (
                <div className="flex justify-center py-4">
                  <Loader
                    color="black"
                    size={14}
                    width={20}
                    height={20}
                    className="mx-auto"
                  />
                </div>
              ) : (
                <div className="relative w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="circle"
                    logo_alignment="center"
                    // pill/shape="pill" increases rounding, and wrapper applies more intense rounding
                  />
                </div>
              )}
              {/* </div> */}
            </div>

            {/* Divider */}
            <div className="relative hidden">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4 hidden">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                placeholder="Enter your email address"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={loginIsLoading}
                disabled={loginIsLoading}
                size="lg"
              >
                Continue
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
                    {error?.response?.data?.message || error?.message}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center hidden">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
