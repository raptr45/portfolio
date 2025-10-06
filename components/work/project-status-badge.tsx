"use client";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";

interface ProjectStatusBadgeProps {
  status: "completed" | "in-progress" | "coming-soon";
  large?: boolean;
}

const STATUS_MAP = {
  completed: {
    color: "text-green-600",
    bg: "bg-green-100",
    label: "Completed",
  },
  "in-progress": {
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    label: "In Progress",
  },
  "coming-soon": {
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "Coming Soon",
  },
};

function ProjectStatusBadgeComponent({
  status,
  large,
}: ProjectStatusBadgeProps) {
  const s = STATUS_MAP[status];
  if (!s) return null;
  return (
    <div className="absolute top-3 left-3">
      <Badge
        variant="secondary"
        className={`${
          large ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[10px]"
        } font-semibold rounded-full ${s.bg} ${s.color}`}
      >
        {s.label}
      </Badge>
    </div>
  );
}

export const ProjectStatusBadge = memo(ProjectStatusBadgeComponent);
