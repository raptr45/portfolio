import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abid Al Wassie | Portfolio Website",
  description:
    "Full stack developer. My techstack includes, TypeScript, React, Next.js, Auth.js, Figma, Git, Tailwind, CSS3, Python, MongoDB, Firebase, Supabase, Prisma ORM, etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Adding suppressHydrationWarning to <body> as well because next-themes may mutate the class list on the client (adding light/dark) before/after hydration causing benign mismatches. */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Suspense fallback={null}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
