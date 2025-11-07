"use client";
import type { Project } from "@/lib/projects-data";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

interface ProjectImageProps {
  project: Project;
  isLarge: boolean;
  loading: boolean;
  onClick: () => void;
  imageLoading: boolean;
  imageError: boolean;
  setImageLoading: (v: boolean) => void;
  setImageError: (v: boolean) => void;
  showFeatured: boolean;
}

function ProjectImageComponent({
  project,
  isLarge,
  loading,
  onClick,
  imageLoading,
  imageError,
  setImageLoading,
  setImageError,
  showFeatured,
}: ProjectImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-muted ${
        isLarge ? "aspect-16/10" : "aspect-4/3"
      }`}
      onClick={onClick}
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
          // Only prioritize the very first featured large image to help LCP; others lazy.
          priority={isLarge && project.featuredIndex === 0}
          placeholder={project.blurDataURL ? "blur" : undefined}
          blurDataURL={project.blurDataURL}
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

      {showFeatured && (
        <div className="absolute top-3 right-3">
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            Featured
          </div>
        </div>
      )}

      <motion.div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 flex items-center justify-center">
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
      </motion.div>
    </div>
  );
}

export const ProjectImage = memo(ProjectImageComponent);
