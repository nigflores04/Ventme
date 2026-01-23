"use client";
import Link from "next/link";
import Button from "../ui/button";
import { useSelector } from "react-redux";
import Avatar from "../AvatarMenu";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { RootState } from "@/store";
import Image from "next/image";
// import { Menu, Sparkles } from "lucide-react";

export function Header() {
  const token = useSelector((state: RootState) => state.user.token);

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src="/images/logo-white.png"
            alt="Ventics AI"
            width={80}
            height={80}
            className="w-10 md:w-20 aspect-[5/5] object-cover"
          />
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#howitworks"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors hidden"
            >
              Catalog
            </a>

            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {data?.email ? (
              <>
                <Link href="/design" className="hidden md:block">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    New Design
                  </Button>
                </Link>

                <Avatar />
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
