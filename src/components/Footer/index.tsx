"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
// import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full flex flex-row md:flex-row justify-between  items-center gap-8 max-sm:flex-wrap py-8">
          {/* Brand */}
          {/* <div className="text-xl font-bold">Ventics AI</div> */}

          <Image
            src="/images/logo-green-trans.png"
            alt="Ventics AI"
            width={50}
            height={50}
            className=" object-cover rounded-lg"
            unoptimized
            quality={100}
          />

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-8">
            <Link
              href="/"
              className="text-gray-300 !text-xs hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-gray-300 !text-xs hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-2 flex flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-[11px]">© 2025 Ventics AI</div>

          <div className="flex gap-6">
            {/* <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Term of service
            </a> */}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 ">
            {/* <FaLinkedinIn className="w-4 h-4 text-gray-400" /> */}

            <a href="https://www.instagram.com/ventics_ai" target="_blank">
              <FaInstagram className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
