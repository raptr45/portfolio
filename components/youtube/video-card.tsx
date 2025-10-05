"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Check, Copy, Play } from "lucide-react";
import Image from "next/image";
// Removed unused imports (useState, toast)

interface VideoCardProps {
  title: string;
  thumbnail: string;
  videoUrl: string;
  videoId: string;
  openVideo: (url: string) => void;
  copyToClipboard: (
    e: React.MouseEvent,
    videoUrl: string,
    videoId: string
  ) => void;
  copied: boolean;
}

export function VideoCard({
  title,
  thumbnail,
  videoUrl,
  videoId,
  openVideo,
  copyToClipboard,
  copied,
}: VideoCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 pt-0 pb-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-red-500/10 hover:scale-105"
        onClick={() => openVideo(videoUrl)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openVideo(videoUrl);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Watch ${title} on YouTube`}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Watch on YouTube"
                  className="rounded-full p-3 bg-red-500 hover:bg-red-600 text-white shadow-2xl shadow-red-500/50 backdrop-blur-sm border border-red-400/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    openVideo(videoUrl);
                  }}
                >
                  <Play className="h-5 w-5" fill="currentColor" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Watch on YouTube</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => copyToClipboard(e, videoUrl, videoId)}
                  aria-label="Copy video link"
                  className="rounded-full p-3 bg-slate-500 hover:bg-slate-600 text-white shadow-2xl shadow-slate-500/50 backdrop-blur-sm border border-slate-400/30"
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy link"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <CardContent>
          <h3 className="font-semibold text-base line-clamp-2 leading-tight text-gray-800 dark:text-white dark:group-hover:text-blue-50 transition-colors duration-300">
            {title}
          </h3>
        </CardContent>
      </Card>
    </motion.div>
  );
}
