import { Cloud, Code, GitBranch, Globe, Server, Wrench } from "lucide-react";
import type React from "react";
import techIcons from "./assets";

import type { StaticImageData } from "next/image";

export interface TechItem {
  name: string;
  icon?: string | StaticImageData;
}

export interface SkillCategory {
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  tech: TechItem[];
}

export const techStack: SkillCategory[] = [
  {
    type: "Frontend Technologies",
    icon: Globe,
    tech: [
      { name: "React", icon: techIcons.react },
      { name: "Next.js", icon: techIcons.nextjs },
      { name: "TailwindCSS", icon: techIcons.tailwind },
      { name: "TypeScript", icon: techIcons.typescript },
      { name: "Vue.js", icon: techIcons.vue },
      { name: "HTML5", icon: techIcons.html },
      { name: "CSS3", icon: techIcons.css },
      { name: "JavaScript", icon: techIcons.javascript },
      { name: "Framer Motion", icon: techIcons.framer },
    ],
  },
  {
    type: "Backend Technologies",
    icon: Server,
    tech: [
      { name: "Node.js", icon: techIcons.node },
      { name: "Laravel", icon: techIcons.laravel },
      { name: "Auth.js", icon: techIcons.authjs },
      { name: "Auth0", icon: techIcons.auth0 },
      { name: "Prisma", icon: techIcons.prisma },
      { name: "Drizzle", icon: techIcons.drizzle },
      { name: "GraphQL", icon: techIcons.graphql },
      { name: "Firebase", icon: techIcons.firebase },
    ],
  },
  {
    type: "Databases",
    icon: Server,
    tech: [
      { name: "PostgreSQL", icon: techIcons.postgresql },
      { name: "MongoDB", icon: techIcons.mongodb },
      { name: "MySQL", icon: techIcons.mysql },
    ],
  },
  {
    type: "Tools & IDEs",
    icon: Wrench,
    tech: [
      { name: "VS Code", icon: techIcons.vs_code },
      { name: "Visual Studio", icon: techIcons.visual_studio },
      { name: "Figma", icon: techIcons.figma },
      { name: "Linux", icon: techIcons.linux },
    ],
  },
  {
    type: "DevOps & Cloud",
    icon: Cloud,
    tech: [
      { name: "AWS", icon: techIcons.aws },
      { name: "GCP", icon: techIcons.gcp },
      { name: "Azure", icon: techIcons.azure },
      { name: "Nginx", icon: techIcons.nginx },
    ],
  },
  {
    type: "Languages",
    icon: Code,
    tech: [
      { name: "TypeScript", icon: techIcons.typescript },
      { name: "JavaScript", icon: techIcons.javascript },
      { name: "Python", icon: techIcons.python },
      { name: "C#", icon: techIcons.cs },
      { name: "C++", icon: techIcons.cpp },
    ],
  },
  {
    type: "Version Control & Tools",
    icon: GitBranch,
    tech: [
      { name: "Git", icon: techIcons.git },
      { name: "GitHub", icon: techIcons.github },
      { name: "Bash", icon: techIcons.bash },
      { name: "Flutter", icon: techIcons.flutter },
    ],
  },
];
