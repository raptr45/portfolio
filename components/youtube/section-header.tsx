"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function YouTubeSectionHeader() {
  return (
    <div className="text-center mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Badge
          variant="secondary"
          className="mb-6 px-6 py-3 text-base bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 dark:text-white backdrop-blur-sm"
        >
          🎥 YouTube
        </Badge>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-red-400 to-pink-400 bg-clip-text text-transparent">
          Latest Videos
        </h2>
        <p className="dark:text-gray-50/80 max-w-3xl mx-auto text-2xl leading-relaxed">
          Watch my{" "}
          <span className="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-300 dark:to-pink-300 bg-clip-text text-transparent font-bold">
            tutorials and development content
          </span>{" "}
          where I share insights about{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent font-bold">
            modern web development
          </span>
        </p>
      </motion.div>
    </div>
  );
}
