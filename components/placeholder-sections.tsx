"use client";

import { ProjectModal } from "@/components/project-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects, type Project } from "@/lib/projects-data";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              Portfolio
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of my most impactful work over the years.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Left project */}
          {otherProjects[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:mt-12"
            >
              <ProjectCard
                project={otherProjects[0]}
                onViewDetails={handleViewDetails}
                size="small"
              />
            </motion.div>
          )}

          {/* Featured project (center) */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                project={featuredProject}
                onViewDetails={handleViewDetails}
                size="large"
                featured
              />
            </motion.div>
          )}

          {/* Right project */}
          {otherProjects[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:mt-12"
            >
              <ProjectCard
                project={otherProjects[1]}
                onViewDetails={handleViewDetails}
                size="small"
              />
            </motion.div>
          )}
        </div>

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
}

function ProjectCard({
  project,
  onViewDetails,
  size = "small",
  featured = false,
}: ProjectCardProps) {
  const isLarge = size === "large";

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card border-border">
      <CardContent className="p-0">
        {/* Project Image */}
        <div
          className={`relative overflow-hidden bg-muted ${
            isLarge ? "aspect-[4/3]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 33vw"
                : "(max-width: 768px) 100vw, 25vw"
            }
          />

          {/* Overlay with View Details button */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={() => onViewDetails(project)}
              variant="secondary"
              size={isLarge ? "default" : "sm"}
              className="bg-background/90 hover:bg-background text-foreground shadow-lg"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>

        {/* Project Info */}
        <div className={`space-y-3 ${isLarge ? "p-6" : "p-4"}`}>
          <div>
            <h3
              className={`font-semibold mb-2 text-foreground ${
                isLarge ? "text-xl" : "text-lg"
              }`}
            >
              {project.title}
            </h3>
            <p
              className={`text-muted-foreground leading-relaxed ${
                isLarge ? "text-base" : "text-sm"
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {(isLarge
              ? project.technologies
              : project.technologies.slice(0, 4)
            ).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                {tech}
              </Badge>
            ))}
            {!isLarge && project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{project.technologies.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
