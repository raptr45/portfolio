"use client";
import { BackToTopButton } from "@/components/back-to-top-button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/work/project-card";
import { projects, type Project } from "@/lib/projects-data";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";

// Lazy-load heavy modal; code split for faster TTI
const ProjectModal = dynamic(
  () => import("@/components/project-modal").then((m) => m.ProjectModal),
  {
    loading: () => null,
  }
);

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProject, setLoadingProject] = useState<string | null>(null);

  const handleViewDetails = useCallback((project: Project) => {
    setLoadingProject(project.id);
    setTimeout(() => {
      setSelectedProject(project);
      setIsModalOpen(true);
      setLoadingProject(null);
    }, 150);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-linear-to-br from-red-500/10 to-pink-500/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-linear-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-cyan-600 dark:text-foreground bg-cyan-600/5 dark:bg-primary/10 border border-cyan-800/20 dark:border-primary/20 hover:bg-cyan-500/10 dark:hover:bg-primary/15 hover:border-cyan-600/35 dark:hover:border-primary/35 hover:shadow-md transition-all duration-200"
                >
                  ← Back to Home
                </Link>
                <Badge
                  variant="secondary"
                  className="px-6 py-3 text-lg font-semibold bg-primary/10 text-primary border-2 border-primary/20"
                >
                  🚀 All Projects
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-soft">
                Complete Portfolio
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
                Browse through all {projects.length} projects I&apos;ve worked
                on, from{" "}
                <span className="text-primary font-semibold">concept</span> to
                <span className="text-green-600 font-semibold">
                  {" "}
                  deployment
                </span>
                .
              </p>
            </motion.div>
          </div>

          {/* All Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => {
                  // Warm modal chunk when user shows intent
                  import("@/components/project-modal");
                }}
              >
                <ProjectCard
                  project={project}
                  onViewDetails={handleViewDetails}
                  size={project.featured ? "large" : "small"}
                  featured={project.featured}
                  loading={loadingProject === project.id}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </section>
      <BackToTopButton />
    </main>
  );
}
