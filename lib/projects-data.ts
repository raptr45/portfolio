export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
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
    technologies: ["Next.js", "Node.js", "MongoDB", "+4 more"],
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
    technologies: ["React", "Socket.io", "Express", "+4 more"],
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
    technologies: ["TypeScript", "GraphQL", "PostgreSQL", "+5 more"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    featured: false,
  },
];
