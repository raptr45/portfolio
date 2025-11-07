"use client";
import {
  ExperienceTimelineItem,
  type ExperienceItemData,
} from "./experience-timeline-item";

interface ExperienceTimelineProps {
  items: readonly ExperienceItemData[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-linear-to-b from-primary/30 via-primary/10 to-transparent rounded-full" />
      <div className="space-y-16 lg:space-y-24">
        {items.map((item, i) => (
          <ExperienceTimelineItem key={item.title} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
