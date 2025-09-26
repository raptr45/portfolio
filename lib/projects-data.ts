export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  status: "completed" | "in-progress" | "coming-soon";
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
  highlights?: string[];
  duration?: string;
  team?: string;
}

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with payment integration, user authentication, and admin dashboard.",
    longDescription:
      "This comprehensive e-commerce solution features a modern React frontend with Next.js, secure payment processing through Stripe, user authentication with NextAuth.js, and a robust admin dashboard for inventory management. The platform handles thousands of products with advanced search and filtering capabilities, real-time inventory updates, and responsive design optimized for all devices.",
    image: "/modern-ecommerce-interface.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Stripe",
      "NextAuth.js",
      "Tailwind CSS",
      "Prisma",
    ],
    category: "Full-Stack Web Application",
    status: "completed",
    duration: "4 months",
    team: "Solo project",
    highlights: [
      "Handles 10,000+ products with advanced search",
      "Integrated Stripe payment processing",
      "Real-time inventory management",
      "Mobile-responsive design",
    ],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    featured: false,
  },
  {
    id: "realtime-chat",
    title: "Real-time Chat Application",
    description:
      "A scalable chat application with real-time messaging, file sharing, and user presence indicators.",
    longDescription:
      "This real-time communication platform enables instant messaging, file sharing, and video calls. Built with React for the frontend and Socket.io for real-time functionality, it features end-to-end encryption, read receipts, typing indicators, and user presence status. The application was designed to handle thousands of concurrent users with minimal latency, making it suitable for both personal and enterprise use.",
    image: "/modern-chat-app.png",
    technologies: [
      "React",
      "TypeScript",
      "Socket.io",
      "Express.js",
      "Redis",
      "PostgreSQL",
      "JWT",
      "WebRTC",
    ],
    category: "Real-time Communication",
    status: "completed",
    duration: "3 months",
    team: "2-person team",
    highlights: [
      "Supports 1000+ concurrent users",
      "End-to-end encryption",
      "File sharing up to 100MB",
      "Video calling integration",
    ],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "project-management",
    title: "Project Management Tool",
    description:
      "A comprehensive project management solution with task tracking, team collaboration, and reporting features.",
    longDescription:
      "A full-featured project management platform that streamlines team collaboration and project tracking. Built with TypeScript and GraphQL, it offers advanced task management, real-time collaboration tools, comprehensive reporting dashboards, and integration with popular development tools. The application supports agile methodologies with sprint planning, burndown charts, and automated workflow management.",
    image: "/project-management-dashboard.png",
    technologies: [
      "TypeScript",
      "React",
      "GraphQL",
      "PostgreSQL",
      "Apollo",
      "Node.js",
      "Docker",
      "AWS",
    ],
    category: "Enterprise Software",
    status: "completed",
    duration: "6 months",
    team: "4-person team",
    highlights: [
      "Agile workflow management",
      "Real-time collaboration tools",
      "Advanced reporting dashboards",
      "Integration with 10+ dev tools",
    ],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    featured: false,
  },
];
