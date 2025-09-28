"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoadingContext } from "./loading-context";

export function LoadingScreen() {
  const { isInitialLoading, setInitialLoading } = useLoadingContext();
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hide the CSS loading screen and mark body as JS loaded
    document.body.classList.add("js-loaded");
    const cssLoadingScreen = document.getElementById("initial-loading-screen");
    if (cssLoadingScreen) {
      cssLoadingScreen.style.display = "none";
    }
  }, []);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout | null = null;
    let isComplete = false;

    // Fast initial progress to show activity
    const updateProgress = () => {
      setProgress((prev) => {
        if (isComplete || prev >= 90) {
          return prev;
        }
        return Math.min(prev + Math.random() * 15 + 5, 90);
      });
    };

    progressTimer = setInterval(updateProgress, 80);

    // Complete loading when page is ready
    const completeLoading = () => {
      if (isComplete) return;
      isComplete = true;
      if (progressTimer) clearInterval(progressTimer);

      setProgress(100);
      // Quick exit - just enough time for progress bar to reach 100%
      setTimeout(() => setInitialLoading(false), 100);
    };

    // Multiple completion triggers - immediate response
    const handleDOMContentLoaded = () => completeLoading();
    const handleLoad = () => completeLoading();

    // Check current state - respond immediately
    if (document.readyState === "complete") {
      // Page already loaded - hide quickly
      setTimeout(completeLoading, 100);
    } else if (document.readyState === "interactive") {
      // DOM ready - hide quickly
      setTimeout(completeLoading, 100);
    } else {
      // Still loading - wait for events
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
      window.addEventListener("load", handleLoad);
    }

    // Safety net - maximum 800ms (reduced from 1000ms)
    const maxTimeout = setTimeout(completeLoading, 600);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      clearTimeout(maxTimeout);
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isInitialLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background"
        >
          <div className="text-center space-y-8">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="relative w-26 h-16 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <span className="text-white font-bold text-4xl">A</span>
                </div>
                <span className="absolute left-[19px] right-0 mx-auto text-center font-bold text-4xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pointer-events-none">
                  bid
                </span>
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Loading Portfolio
              </h2>

              {/* Progress Bar */}
              <div className="w-64 mx-auto">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Loading...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Loading Dots */}
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
