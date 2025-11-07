"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/lib/projects-data";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  Github,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  completed: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  "in-progress": { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  "coming-soon": {
    icon: AlertCircle,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  const statusInfo = statusConfig[project.status];
  const StatusIcon = statusInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden [&>button]:bg-red-500 [&>button]:text-white [&>button]:rounded-md [&>button]:flex [&>button]:justify-center [&>button]:items-center [&>button:hover]:bg-red-600 [&>button]:w-8 [&>button]:h-8 [&>button]:text-3xl">
        <DialogHeader className="shrink-0 pb-4 text-left">
          <DialogTitle className="text-2xl font-bold text-left leading-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground mt-2 text-left">
            {project.category}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="space-y-6">
            {/* Project Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted border">
              {!imageError ? (
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className={`object-cover transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p>Image not available</p>
                  </div>
                </div>
              )}
              {imageLoading && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {project.duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{project.duration}</span>
                </div>
              )}
              {project.team && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Team:</span>
                  <span className="font-medium">{project.team}</span>
                </div>
              )}
              {/* <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{project.category}</span>
              </div> */}
              <div
                className={`flex justify-center items-center gap-1 px-1 py-1 rounded-full ${statusInfo.bg} shrink-0 w-auto max-w-32`}
              >
                <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                <span
                  className={`text-sm font-medium ${statusInfo.color} capitalize`}
                >
                  {project.status.replace("-", " ")}
                </span>
              </div>
            </div>

            <Separator />

            {/* Technologies */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-lg">🛠️</span>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="font-medium">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Project Description */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-lg">📋</span>
                About This Project
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">⭐</span>
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="shrink-0 pt-6 border-t">
          <div className="flex flex-col sm:flex-row gap-3">
            {project.liveUrl && (
              <Button asChild className="flex-1" size="lg">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live site for ${project.title}`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Site
                </a>
              </Button>
            )}
            {project.codeUrl && (
              <Button variant="outline" asChild className="flex-1" size="lg">
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.title}`}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
