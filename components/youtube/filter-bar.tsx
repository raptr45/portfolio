"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { memo } from "react";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  options: FilterOption[];
  active: string;
  onSelect: (id: string) => void;
}

function FilterBarBase({ options, active, onSelect }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-3 mb-10"
    >
      {options.map((option) => (
        <Button
          key={option.id}
          variant={active === option.id ? "default" : "ghost"}
          size="lg"
          onClick={() => onSelect(option.id)}
          className={`px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
            active === option.id
              ? "bg-red-500 hover:bg-red-600 text-white border-red-400 shadow-lg shadow-red-500/25"
              : "bg-primary-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 dark:hover:border-white/40"
          }`}
        >
          {option.label}
        </Button>
      ))}
    </motion.div>
  );
}

export const FilterBar = memo(FilterBarBase);
