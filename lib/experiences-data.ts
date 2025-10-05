import type { ExperienceItemData } from "@/components/about/experience-timeline-item";

export const experiences: readonly ExperienceItemData[] = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2020 - Present",
    summary:
      "Leading development of enterprise-level web applications, mentoring junior developers, and implementing best practices across multiple projects.",
    tech: ["Next.js", "TypeScript", "Node.js", "GraphQL", "AWS"],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2017 - 2020",
    summary:
      "Developed and maintained multiple client projects, implemented CI/CD pipelines, and optimized application performance.",
    tech: ["React", "Express", "MongoDB", "Docker", "Firebase"],
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2015 - 2017",
    summary:
      "Created responsive and interactive user interfaces for various client websites and web applications.",
    tech: ["JavaScript", "HTML/CSS", "Angular", "SASS", "jQuery"],
  },
];
