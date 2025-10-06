"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoadingContext } from "./loading-context";

export function LoadingScreen() {
  const { isInitialLoading, setInitialLoading } = useLoadingContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hide the CSS loading screen immediately
    document.body.classList.add("js-loaded");
    const cssLoadingScreen = document.getElementById("initial-loading-screen");
    if (cssLoadingScreen) {
      cssLoadingScreen.style.display = "none";
    }

    // Quick loading completion
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 300); // Reduced from longer timeout

    return () => clearTimeout(timer);
  }, [setInitialLoading]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isInitialLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="text-center space-y-4">
            {/* Simplified Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="relative w-26 h-16 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <span className="text-white font-bold text-4xl">A</span>
                </div>
                <span className="absolute left-[19px] right-0 mx-auto text-center font-bold text-4xl text-gradient-brand pointer-events-none">
                  bid
                </span>
              </div>
            </motion.div>

            {/* Simple loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <p className="text-sm text-muted-foreground">Loading...</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
