import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QueryProvider from "@/components/providers/query-provider";
import GoogleProvider from "@/components/providers/google-oauth-provider";
import ReduxProvider from "@/components/providers/redux-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import React from "react";
import MantineUIProvider from "@/components/providers/mantine-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ventics AI",
  description: "Design and visualize interior spaces in seconds with AI",
  keywords: [
    "AI",
    "interior design",
    "room design",
    "home design",
    "architecture",
    "design tool",
  ],
  authors: [{ name: "Ventics AI" }],
  creator: "Ventics AI",
  publisher: "Ventics AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://ventics.ai"
  ),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/images/logo-white.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Ventics AI",
    description: "Design and visualize interior spaces in seconds with AI",
    siteName: "Ventics AI",
    images: [
      {
        url: "/images/logo-white.jpg",
        width: 1200,
        height: 630,
        alt: "Ventics AI - AI-Powered Interior Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ventics AI",
    description: "Design and visualize interior spaces in seconds with AI",
    images: ["/images/logo-white.jpg"],
    creator: "@venticsai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "",
            duration: 3000,
            removeDelay: 2000,
            style: {
              background: "var(--card)",
              color: "var(--card-foreground)",
              fontWeight: 500,
              border: "1px solid var(--border)",
            },
          }}
        />
        <ThemeProvider defaultTheme="light" storageKey="ventics-theme">
          <ReduxProvider>
            <GoogleProvider>
              <QueryProvider>
                <MantineUIProvider>{children}</MantineUIProvider>
              </QueryProvider>
            </GoogleProvider>
          </ReduxProvider>
        </ThemeProvider>

        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1800597687249494');
            fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1800597687249494&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
