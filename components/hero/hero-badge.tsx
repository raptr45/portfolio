"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex justify-center lg:justify-start"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-300"></div>
        <Badge
          variant="secondary"
          className="relative px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-widest bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white border border-primary/30 hover:border-primary/50 transition-all duration-300 uppercase"
        >
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent bg-300% font-extrabold"
            style={{ backgroundSize: "300% 100%" }}
          >
            ⚡ FULL STACK DEVELOPER ⚡
          </motion.span>
        </Badge>
      </div>
    </motion.div>
  );
}
