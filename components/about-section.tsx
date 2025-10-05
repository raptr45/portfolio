"use client";
import { ExperienceHeader, ExperienceTimeline } from "@/components/about";
import { experiences } from "@/lib/experiences-data";

export function AboutSection() {
  return (
    <section
      id="experience"
      className="py-32 bg-gradient-to-br from-background via-muted/20 to-background relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <ExperienceHeader />
        <ExperienceTimeline items={experiences} />
      </div>
    </section>
  );
}
