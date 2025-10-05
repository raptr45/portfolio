"use client";
import { motion } from "framer-motion";

export function HeroTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
    >
      <span className="text-gray-800 dark:text-white">Abid Al Wassie</span>
    </motion.h1>
  );
}
