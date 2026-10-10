"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { SignupSkeleton } from "../components/SignupSkeleton";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Check password
    if (password !== confirmPassword) {
      setErrorMessage("পাসওয়ার্ড দুটি একই নয়");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: "",
      callbackURL: "/",
    });

    if (data) {
      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/");
    }

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      setErrorMessage(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    }

    setLoading(false);
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?socialLogin=success",
      });

      if (error) {
        toast.error(error.message || "Google login failed!");
      }
    } catch {
      toast.error("Something went wrong with Google login.");
    }
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/?socialLogin=success",
      });

      if (error) {
        toast.error(error.message || "GitHub login failed!");
      }
    } catch {
      toast.error("Something went wrong with GitHub login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            নিচে থেকে সাইন আপ করে সব সুবিধা পান
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-7">
          {loading ? (
            <SignupSkeleton />
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  নাম
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="যেমন: রহিম উদ্দিন"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  ইমেইল
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  পাসওয়ার্ড
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  placeholder="আবার লিখুন"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Inline error */}
              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-green-600 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                অ্যাকাউন্ট তৈরি করুন
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="h-px bg-gray-200 flex-1"></div>

            <span className="text-sm text-gray-500">অথবা</span>

            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="h-10 border border-gray-200 rounded-lg
              flex items-center justify-center gap-2
              text-sm font-medium text-gray-700
              hover:bg-gray-50 transition"
            >
              <span className="font-bold text-base text-blue-500">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={handleGithubLogin}
              className="h-10 border border-gray-200 rounded-lg
              flex items-center justify-center gap-2
              text-sm font-medium text-gray-700
              hover:bg-gray-50 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a10.98 10.98 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-5">
            অ্যাকাউন্ট আছে?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              সাইন ইন করুন
            </button>
          </p>
        </div>
        {/* Back to Home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="block mx-auto mt-5 text-sm text-gray-400
          hover:text-gray-600 transition"
        >
          ← হোম পেজে ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
