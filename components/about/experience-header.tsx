"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function ExperienceHeader() {
  return (
    <div className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Badge
          variant="secondary"
          className="mb-6 px-6 py-3 text-lg font-semibold bg-primary/10 text-primary border-2 border-primary/20"
        >
          ✨ Experience
        </Badge>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
          Work Experience
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
          My professional journey spanning over {" "}
          <span className="text-primary font-semibold">8+ years</span> in the
          industry.
        </p>
      </motion.div>
    </div>
  );
}
