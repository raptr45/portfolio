"use client";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/lib/projects-data";
import { useState } from "react";
import { ProjectImage } from "./project-image";
import { ProjectStatusBadge } from "./project-status-badge";
import { ProjectMeta } from "./project-meta";
import { ProjectTechList } from "./project-tech-list";

export interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  size?: "small" | "large";
  featured?: boolean;
  loading?: boolean;
}

export function ProjectCard({
  project,
  onViewDetails,
  size = "small",
  featured = false,
  loading = false,
}: ProjectCardProps) {
  const isLarge = size === "large";
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const activate = () => {
    if (!loading) onViewDetails(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !loading) {
      e.preventDefault();
      onViewDetails(project);
    }
  };

  return (
    <Card
      className="group relative cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden bg-card border-border h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 pt-0 pb-6"
      onClick={activate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title} project`}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <ProjectImage
          project={project}
          isLarge={isLarge}
          loading={loading}
          onClick={activate}
          imageLoading={imageLoading}
          imageError={imageError}
          setImageLoading={setImageLoading}
          setImageError={setImageError}
          showFeatured={featured}
        />
        <div className="pointer-events-none z-20">
          <ProjectStatusBadge status={project.status} large={isLarge} />
        </div>
        <div className={`space-y-3 flex-1 flex flex-col ${isLarge ? "p-6" : "p-4"}`}>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className={`font-bold text-foreground line-clamp-2 ${isLarge ? "text-xl" : "text-lg"}`}>
                {project.title}
              </h3>
            </div>
            <p className={`text-muted-foreground leading-relaxed line-clamp-3 mb-3 ${isLarge ? "text-base" : "text-sm"}`}>
              {project.description}
            </p>
            <ProjectMeta project={project} isLarge={isLarge} />
          </div>
          <ProjectTechList technologies={project.technologies} isLarge={isLarge} />
        </div>
      </CardContent>
    </Card>
  );
}
