import { Cloud, Code, GitBranch, Globe, Server, Wrench } from "lucide-react";
import type React from "react";

export interface SkillCategory {
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  tech: string[];
}

export const techStack: SkillCategory[] = [
  {
    type: "Frontend Technologies",
    icon: Globe,
    tech: [
      "React",
      "Next.js",
      "TailwindCSS",
      "Shadcn/ui",
      "Framer Motion",
      "TypeScript",
    ],
  },
  {
    type: "Backend Technologies",
    icon: Server,
    tech: [
      "Next-Auth",
      "JWT/OAUTH",
      "Prisma-ORM",
      "PostgreSQL",
      "MongoDB",
      "Node.js",
      "Express",
    ],
  },
  {
    type: "Tools & IDEs",
    icon: Wrench,
    tech: ["VS Code", "Visual Studio", "Linux", "Figma"],
  },
  {
    type: "DevOps & Cloud",
    icon: Cloud,
    tech: ["GCP", "AWS", "Azure", "Nginx", "Vercel"],
  },
  {
    type: "Languages",
    icon: Code,
    tech: ["JavaScript", "TypeScript", "C#", "Python", "HTML5", "CSS3"],
  },
  {
    type: "Version Control & CI/CD",
    icon: GitBranch,
    tech: ["Git", "GitHub", "Bash"],
  },
];
