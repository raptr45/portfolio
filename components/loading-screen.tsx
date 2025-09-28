"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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
      setTimeout(() => setIsLoading(false), 200);
    };

    // Multiple completion triggers
    const handleDOMContentLoaded = () => completeLoading();
    const handleLoad = () => completeLoading();

    // Check current state
    if (document.readyState === "complete") {
      setTimeout(completeLoading, 300); // Brief delay to show animation
    } else if (document.readyState === "interactive") {
      setTimeout(completeLoading, 600);
    } else {
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
      window.addEventListener("load", handleLoad);
    }

    // Maximum timeout - never longer than 1 second
    const maxTimeout = setTimeout(completeLoading, 1000);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      clearTimeout(maxTimeout);
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
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
              <div className="relative w-16 h-12 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <span className="text-white font-bold text-2xl">A</span>
                </div>
                <span className="absolute left-[19px] right-0 mx-auto text-center font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pointer-events-none">
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
