import { ContentWrapper } from "@/components/content-wrapper";
import { LoadingProvider } from "@/components/loading-context";
import { LoadingScreen } from "@/components/loading-screen";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Add font-display swap for better performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var d=document.documentElement.classList;if(s){if(s==='dark'){d.add('dark')}else{d.remove('dark')}}else{d.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();",
          }}
        /> */}
        {/* Preload critical resources */}
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />

        {/* Immediate loading screen CSS - shows before JS loads */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            #initial-loading-screen {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.2) 50%, hsl(var(--background)) 100%);
              backdrop-filter: blur(8px);
            }
            
            .loading-logo {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              animation: fadeInScale 0.6s ease-out;
            }
            
            .loading-circle {
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(215 100% 60%) 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 20px hsl(var(--primary) / 0.3);
              animation: pulse 2s ease-in-out infinite;
            }
            
            .loading-text {
              font-size: 2rem;
              font-weight: bold;
              background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(215 100% 60%) 100%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            
            .loading-dots {
              display: flex;
              gap: 0.25rem;
              margin-top: 1rem;
              justify-content: center;
            }
            
            .loading-dot {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
              background: hsl(var(--primary));
              animation: loadingDots 1.4s ease-in-out infinite both;
            }
            
            .loading-dot:nth-child(1) { animation-delay: -0.32s; }
            .loading-dot:nth-child(2) { animation-delay: -0.16s; }
            .loading-dot:nth-child(3) { animation-delay: 0s; }
            
            @keyframes fadeInScale {
              from { opacity: 0; transform: scale(0.8); }
              to { opacity: 1; transform: scale(1); }
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); box-shadow: 0 4px 20px hsl(var(--primary) / 0.3); }
              50% { transform: scale(1.05); box-shadow: 0 6px 30px hsl(var(--primary) / 0.5); }
            }
            
            @keyframes loadingDots {
              0%, 80%, 100% { transform: scale(0); }
              40% { transform: scale(1); }
            }
            
            /* Hide when JS loads */
            .js-loaded #initial-loading-screen {
              display: none;
            }
          `,
          }}
        />
      </head>
      {/* Adding suppressHydrationWarning to <body> as well because next-themes may mutate the class list on the client (adding light/dark) before/after hydration causing benign mismatches. */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Immediate loading screen - shows before JS loads */}
        <div id="initial-loading-screen">
          <div>
            <div className="loading-logo">
              <div className="loading-circle">
                <span
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  A
                </span>
              </div>
              <span className="loading-text">bid</span>
            </div>
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        </div>
        <Providers>
          <LoadingProvider>
            <LoadingScreen />
            <ContentWrapper>
              <Suspense fallback={null}>{children}</Suspense>
            </ContentWrapper>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
