import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import MainLayout from "@/components/layout/MainLayout";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased border border-transparent`}
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
