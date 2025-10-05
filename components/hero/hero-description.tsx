"use client";
import { motion } from "framer-motion";

export function HeroDescription() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0"
    >
      I build
      <span className="text-primary font-bold bg-primary/10 mx-1 px-2 py-1 rounded-lg">
        scaleable web apps
      </span>
      with TypeScript, React, Next.js, Node.js, and other modern technologies.
    </motion.p>
  );
}
