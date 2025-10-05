"use client";
import { motion } from "framer-motion";

export function EmptyVideoState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
        <p className="text-white/70 text-lg">
          No videos found for the selected filter.
        </p>
      </div>
    </motion.div>
  );
}
