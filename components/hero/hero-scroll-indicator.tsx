"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroScrollIndicatorProps {
  onScroll: () => void;
}

export function HeroScrollIndicator({ onScroll }: HeroScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="hidden lg:flex justify-center mt-8"
    >
      <button
        onClick={onScroll}
        aria-label="Scroll to next section"
        className={cn(
          "cursor-pointer group relative h-12 w-12 sm:h-14 sm:w-14 rounded-full",
          // Base shell
          "border border-white/15 dark:border-white/15 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-950/70 dark:to-gray-800/60 backdrop-blur-md",
          "flex items-center justify-center overflow-hidden",
          "transition-colors duration-300 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        )}
      >
        {/* Hover gradient overlay (Tailwind colors, easy to tweak) */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/30 via-primary/20 to-blue-600/30"
        />
        {/* Soft glow using blur (separate layer for stronger color editing) */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500 bg-gradient-to-br from-primary/40 to-blue-600/40"
        />
        {/* Inner subtle ring that brightens on hover */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full ring-1 ring-white/10 dark:ring-white/5 group-hover:ring-primary/50 transition-colors duration-500"
        />
        <motion.span
          aria-hidden
          className="relative z-10 flex items-center justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors duration-300" />
        </motion.span>
      </button>
    </motion.div>
  );
}
