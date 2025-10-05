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
          "cursor-pointer group relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-white/15 dark:border-white/20",
          "bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60 backdrop-blur-md",
          "flex items-center justify-center overflow-hidden",
          "transition-colors duration-300 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        )}
      >
        {/* Static subtle ring pulse (CSS only) */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-hover:ring-primary/40 transition-[ring-color] duration-500"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-b from-primary/0 via-primary/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <motion.span
          aria-hidden
          className="relative flex items-center justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors duration-300" />
        </motion.span>
      </button>
    </motion.div>
  );
}
