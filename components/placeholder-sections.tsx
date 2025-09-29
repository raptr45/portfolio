"use client";

import { ProjectModal } from "@/components/project-modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { projects, type Project } from "@/lib/projects-data";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export function AboutSection() {
  // Experience data rendered in a timeline while preserving the site's design language
  const experiences = [
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
  ] as const;

  return (
    <section
      id="experience"
      className="py-32 bg-gradient-to-br from-background via-muted/20 to-background relative"
    >
      {/* subtle gradient blobs to match rest of site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
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
              ✨ Experience
            </Badge>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              My professional journey spanning over{" "}
              <span className="text-primary font-semibold">8+ years</span> in
              the industry.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* center line */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent rounded-full" />

          <div className="space-y-16 lg:space-y-24">
            {experiences.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className={`relative lg:flex lg:items-stretch ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* node dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-6">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary ring-8 ring-primary/20 shadow-lg" />
                  </div>

                  {/* spacer to keep card away from center line */}
                  <div className="hidden lg:block w-1/2" />

                  {/* experience card */}
                  <Card className="w-full lg:w-[48%] group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-card/80 backdrop-blur-sm pt-0 pb-6">
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-1 text-sm text-muted-foreground">
                        {item.period}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <div className="text-base md:text-lg font-semibold text-primary mt-1">
                        {item.company}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mt-4">
                        {item.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-6">
                        {item.tech.map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="px-3 py-1 text-sm font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 border-2"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
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
    <section
      id="work"
      className="py-32 relative overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background decorations to mirror YouTube section */}
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
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              A showcase of projects I&apos;ve worked on, from{" "}
              <span className="text-primary font-semibold">concept</span> to
              <span className="text-green-600 font-semibold"> deployment</span>.
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
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
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

  const handleCardClick = () => {
    if (!loading) {
      onViewDetails(project);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !loading) {
      e.preventDefault();
      onViewDetails(project);
    }
  };

  return (
    <Card
      className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden bg-card border-border h-full flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 pt-0 pb-6"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title} project`}
    >
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="text-white text-center">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>View Details</span>
                </div>
              )}
            </div>
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
