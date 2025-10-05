"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ExperienceItemData {
  title: string;
  company: string;
  period: string;
  summary: string;
  tech: readonly string[];
}

interface ExperienceTimelineItemProps {
  item: ExperienceItemData;
  index: number;
}

export function ExperienceTimelineItem({ item, index }: ExperienceTimelineItemProps) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`relative lg:flex lg:items-stretch ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-6">
        <div className="w-3.5 h-3.5 rounded-full bg-primary ring-8 ring-primary/20 shadow-lg" />
      </div>
      <div className="hidden lg:block w-1/2" />
      <Card className="w-full lg:w-[48%] group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-card/80 backdrop-blur-sm pt-0 pb-6">
        <CardContent className="p-6 md:p-8">
          <div className="mb-1 text-sm text-muted-foreground">{item.period}</div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">{item.title}</h3>
          <div className="text-base md:text-lg font-semibold text-primary mt-1">{item.company}</div>
          <p className="text-muted-foreground leading-relaxed mt-4">{item.summary}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {item.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="px-3 py-1 text-sm font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 border-2"
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
