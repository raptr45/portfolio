"use client";

import { ProjectModal } from "@/components/project-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects, type Project } from "@/lib/projects-data";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              About
            </Badge>
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate full-stack developer with expertise in modern web
              technologies
            </p>
          </motion.div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-center">
              I&apos;m a dedicated full-stack developer who loves creating
              innovative solutions and bringing ideas to life through code. With
              experience in both frontend and backend technologies, I enjoy
              building scalable applications that provide exceptional user
              experiences.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProject, setLoadingProject] = useState<string | null>(null);

  const handleViewDetails = useCallback((project: Project) => {
    setLoadingProject(project.id);
    // Simulate loading for better UX
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

  const { featuredProjects, regularProjects } = useMemo(
    () => ({
      featuredProjects: projects.filter((p) => p.featured),
      regularProjects: projects.filter((p) => !p.featured),
    }),
    []
  );

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              Portfolio
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A showcase of projects I&apos;ve worked on, from concept to
              deployment.
            </p>
          </motion.div>
        </div>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
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
          </div>
        )}

        {/* Regular Projects Section */}
        {regularProjects.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold text-center mb-8"
            >
              Other Projects
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {regularProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    project={project}
                    onViewDetails={handleViewDetails}
                    size="small"
                    loading={loadingProject === project.id}
                  />
                </motion.div>
              ))}
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

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  size?: "small" | "large";
  featured?: boolean;
  loading?: boolean;
}

function ProjectCard({
  project,
  onViewDetails,
  size = "small",
  featured = false,
  loading = false,
}: ProjectCardProps) {
  const isLarge = size === "large";
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const statusConfig = {
    completed: {
      color: "text-green-600",
      bg: "bg-green-100",
      text: "Completed",
    },
    "in-progress": {
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      text: "In Progress",
    },
    "coming-soon": {
      color: "text-blue-600",
      bg: "bg-blue-100",
      text: "Coming Soon",
    },
  };

  const statusInfo = statusConfig[project.status];

  return (
    <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden bg-card border-border h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Project Image */}
        <div
          className={`relative overflow-hidden bg-muted ${
            isLarge ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          {!imageError ? (
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              sizes={
                isLarge
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground bg-muted">
              <div className="text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <p className="text-xs">No image</p>
              </div>
            </div>
          )}

          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
            >
              {statusInfo.text}
            </div>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 right-3">
              <div className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                Featured
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
            <Button
              onClick={() => onViewDetails(project)}
              variant="secondary"
              size={isLarge ? "default" : "sm"}
              disabled={loading}
              className="bg-background/95 hover:bg-background text-foreground shadow-lg border backdrop-blur-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/20"
              aria-label={`View details for ${project.title} project`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onViewDetails(project);
                }
              }}
            >
              {loading ? (
                <div
                  className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"
                  aria-hidden="true"
                />
              ) : (
                <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              {loading ? "Loading..." : "View Details"}
            </Button>
          </div>
        </div>

        {/* Project Info */}
        <div
          className={`space-y-3 flex-1 flex flex-col ${
            isLarge ? "p-6" : "p-4"
          }`}
        >
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3
                className={`font-bold text-foreground line-clamp-2 ${
                  isLarge ? "text-xl" : "text-lg"
                }`}
              >
                {project.title}
              </h3>
            </div>

            <p
              className={`text-muted-foreground leading-relaxed line-clamp-3 mb-3 ${
                isLarge ? "text-base" : "text-sm"
              }`}
            >
              {project.description}
            </p>

            {/* Project Meta */}
            {isLarge && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                {project.duration && (
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-current rounded-full"></span>
                    {project.duration}
                  </span>
                )}
                {project.team && (
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-current rounded-full"></span>
                    {project.team}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {(isLarge
              ? project.technologies.slice(0, 6)
              : project.technologies.slice(0, 4)
            ).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs px-2 py-1 font-medium"
              >
                {tech}
              </Badge>
            ))}
            {((isLarge && project.technologies.length > 6) ||
              (!isLarge && project.technologies.length > 4)) && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{project.technologies.length - (isLarge ? 6 : 4)} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
