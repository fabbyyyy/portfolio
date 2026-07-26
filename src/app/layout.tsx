import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { fraunces, frauncesItalic, ppEditorial } from "./fonts";
import "./globals.css";
import { IntroLoader } from "@/components/IntroLoader";
import { HERO_BG_SRC, HERO_BG_SRC_MOBILE } from "@/components/heroBg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Fabian Garza",
  description: "Creative Fullstack & Swift Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Hero painting is the largest paint — start it before React hydrates */}
        <link
          rel="preload"
          as="image"
          href={HERO_BG_SRC}
          imageSrcSet={`${HERO_BG_SRC_MOBILE} 1280w, ${HERO_BG_SRC} 2400w`}
          imageSizes="100vw"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${frauncesItalic.variable} ${ppEditorial.variable} ${satoshi.variable} flex h-dvh flex-col overflow-hidden antialiased border border-transparent`}
        suppressHydrationWarning
      >
        <IntroLoader />
        <div className="relative min-h-0 flex-1">{children}</div>
      </body>
    </html>
  );
}
