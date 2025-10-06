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
          className="mb-6 px-6 py-3 text-base bg-yt-badge dark:text-white backdrop-blur-sm"
        >
          🎥 YouTube
        </Badge>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-yt-title">
          Latest Videos
        </h2>
        <p className="dark:text-gray-50/80 max-w-3xl mx-auto text-2xl leading-relaxed">
          Watch my{" "}
          <span className="text-gradient-yt-emphasis font-bold">
            tutorials and development content
          </span>{" "}
          where I share insights about{" "}
          <span className="text-gradient-yt-tech font-bold">
            modern web development
          </span>
        </p>
      </motion.div>
    </div>
  );
}
