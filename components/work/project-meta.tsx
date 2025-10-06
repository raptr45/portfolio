"use client";
import type { Project } from "@/lib/projects-data";
import { memo } from "react";

interface ProjectMetaProps {
  project: Project;
  isLarge: boolean;
}

function ProjectMetaComponent({ project, isLarge }: ProjectMetaProps) {
  if (!isLarge) return null;
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
      {project.duration && (
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 bg-current rounded-full" />
          {project.duration}
        </span>
      )}
      {project.team && (
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 bg-current rounded-full" />
          {project.team}
        </span>
      )}
    </div>
  );
}

export const ProjectMeta = memo(ProjectMetaComponent);
