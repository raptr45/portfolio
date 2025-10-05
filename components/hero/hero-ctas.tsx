"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroCTAsProps {
  onWork: () => void;
  onContact: () => void;
}

export function HeroCTAs({ onWork, onContact }: HeroCTAsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          onClick={onWork}
          className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-white border-0 hover:shadow-xl w-full sm:w-auto"
        >
          🚀 View My Work
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="lg"
          onClick={onContact}
          className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl border-2 border-gray-400/40 dark:border-white/30 bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 font-semibold hover:border-blue-500 dark:hover:border-blue-400 w-full sm:w-auto"
        >
          💬 Let&apos;s Connect
        </Button>
      </motion.div>
    </motion.div>
  );
}
