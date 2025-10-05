"use client";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "@/components/project-modal";
import { projects, type Project } from "@/lib/projects-data";
import { ProjectCard } from "@/components/work/project-card";

export function WorkSection() {
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

  const { featuredProjects } = useMemo(
    () => ({
      featuredProjects: projects.filter((p) => p.featured),
    }),
    []
  );

  return (
    <section
      id="work"
      className="py-32 relative overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-red-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
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
              🚀 Portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              A showcase of projects I&apos;ve worked on, from <span className="text-primary font-semibold">concept</span> to
              <span className="text-green-600 font-semibold"> deployment</span>.
            </p>
          </motion.div>
        </div>

        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    project={project}
                    onViewDetails={handleViewDetails}
                    size="large"
                    featured
                    loading={loadingProject === project.id}
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-14 flex justify-center">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                href="#work-all"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/40"
              >
                View All
                <span className="text-xl" aria-hidden>
                  →
                </span>
              </motion.a>
            </div>
          </div>
        )}

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
