"use client";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";

interface ProjectTechListProps {
  technologies: string[];
  isLarge: boolean;
}

function ProjectTechListComponent({
  technologies,
  isLarge,
}: ProjectTechListProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(isLarge ? technologies.slice(0, 6) : technologies.slice(0, 4)).map(
        (tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="text-xs px-2 py-1 font-medium"
          >
            {tech}
          </Badge>
        )
      )}
      {((isLarge && technologies.length > 6) ||
        (!isLarge && technologies.length > 4)) && (
        <Badge variant="outline" className="text-xs px-2 py-1">
          +{technologies.length - (isLarge ? 6 : 4)} more
        </Badge>
      )}
    </div>
  );
}

export const ProjectTechList = memo(ProjectTechListComponent);
