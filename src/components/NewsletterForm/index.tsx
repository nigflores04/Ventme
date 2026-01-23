"use client";

import type React from "react";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import Button from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "@/api/user";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");


  const { mutateAsync, isPending, isSuccess} = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      setEmail("");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    mutateAsync(email)
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      {/* Background with curved pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/90 to-black">
        {/* Curved overlay pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 150C50 100 100 50 150 75C200 100 250 125 300 100C350 75 400 50 400 100V300H0V150Z"
              fill="url(#gradient1)"
            />
            <path
              d="M0 200C60 150 120 100 180 125C240 150 300 175 360 150C380 140 400 130 400 160V300H0V200Z"
              fill="url(#gradient2)"
            />
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8B4513" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#A0522D" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#D2691E" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#654321" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8B4513" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/minh.jpg')",
          // position:"top"
        }}
      /> */}

      {/* Content */}
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 text-center">
        {/* Stay connected badge */}
        <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <FiMail className="w-4 h-4 text-white/80" />
          <span className="text-sm text-white/80 font-medium">
            Don&apos;t miss out
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Join mailing list
        </h2>

        {/* Subheading */}
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Get exclusive features updates, and offers straight to your inbox.
        </p>
        {/* <p className="text-base text-white/70 mb-8">
         Subscribe to get notified
        </p> */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex items-center bg-white/95 backdrop-blur-sm py-[1px] p-[2px] rounded-md shadow-lg">
            {/* <input
              type="name"
              placeholder="First name"
              value={""}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1   bg-transparent border-b border-b-gray-600 text-gray-800 placeholder-gray-500 focus:outline-none text-base"
              required
            /> */}
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-base"
              required
            />
            <Button
              isLoading={isPending}
              type="submit"
              disabled={isPending}
              className="min-w-[100px] !h-full"
            >
              Subscribe
            </Button>
          </div>
        </form>

        {/* Footer text */}

        {isSuccess && (
          <p className="text-sm text-green-500 mt-6">
            Email subscription successful.
          </p>
        )}

        {/* <p className="text-sm text-white/60 mt-6">
          Only one email a week. Unsubscribe anytime.
        </p> */}
      </div>
    </div>
  );
};

export default NewsletterForm;
