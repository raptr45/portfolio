"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroScrollIndicatorProps {
  onScroll: () => void;
}

export function HeroScrollIndicator({ onScroll }: HeroScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.8 }}
      className="flex justify-center"
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative group"
      >
        <div className="absolute -inset-3 bg-gradient-to-b from-primary/30 to-blue-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition duration-300"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onScroll}
          className="relative w-12 h-12 sm:w-14 sm:h-14 hidden lg:flex rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-white hover:border-primary dark:hover:bg-gray-800 dark:hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 text-gray-700 dark:text-white group"
          aria-label="Scroll to experience section"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
}
