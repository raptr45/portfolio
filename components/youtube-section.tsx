"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { YouTubeData } from "@/types/youtube";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VideoCard } from "@/components/youtube/video-card";

interface YouTubeSectionProps {
  data: YouTubeData;
}

export function YouTubeSection({ data }: YouTubeSectionProps) {
  const [filter, setFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Create filter options from playlists
  const filterOptions = [
    { id: "all", label: "All" },
    ...(data?.playlists?.map((playlist) => ({
      id: playlist.id,
      label: playlist.snippet.title,
    })) || []),
  ];

  if (!data?.playlists?.length && !data?.items?.length) {
    return (
      <section id="youtube" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">YouTube</h2>
            <p className="text-muted-foreground">
              No videos available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Get filtered videos based on selected playlist
  const filteredVideos =
    filter === "all"
      ? data.items || []
      : data.playlists?.find((playlist) => playlist.id === filter)?.videos ||
        [];

  const copyToClipboard = async (
    e: React.MouseEvent,
    videoUrl: string,
    videoId: string
  ) => {
    e.preventDefault(); // Prevent opening the video
    e.stopPropagation(); // Stop event bubbling
    try {
      await navigator.clipboard.writeText(videoUrl);
      setCopiedId(videoId);
      toast.success("Link copied!", {
        description: "Video link has been copied to clipboard.",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy", {
        description: "Could not copy the video link.",
      });
    }
  };

  const openVideo = (videoUrl: string) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="youtube"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-red-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-6 py-3 text-base bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 dark:text-white backdrop-blur-sm"
            >
              🎥 YouTube
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-red-400 to-pink-400 bg-clip-text text-transparent">
              Latest Videos
            </h2>
            <p className="dark:text-gray-50/80 max-w-3xl mx-auto text-2xl leading-relaxed">
              Watch my{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-300 dark:to-pink-300 bg-clip-text text-transparent font-bold">
                tutorials and development content
              </span>{" "}
              where I share insights about{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600  dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent font-bold">
                modern web development
              </span>
            </p>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={filter === option.id ? "default" : "ghost"}
              size="lg"
              onClick={() => setFilter(option.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
                filter === option.id
                  ? "bg-red-500 hover:bg-red-600 text-white border-red-400 shadow-lg shadow-red-500/25"
                  : "bg-primary-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 dark:hover:border-white/40"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((item) => {
              const { id, snippet } = item;
              const { title, thumbnails, resourceId, publishedAt } = snippet;
              const videoUrl = `https://www.youtube.com/watch?v=${resourceId.videoId}`;
              return (
                <VideoCard
                  key={id}
                  title={title}
                  thumbnail={thumbnails.high.url || "/placeholder.svg"}
                  videoUrl={videoUrl}
                  published={publishedAt}
                  videoId={resourceId.videoId}
                  openVideo={openVideo}
                  copyToClipboard={copyToClipboard}
                  copied={copiedId === resourceId.videoId}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-white/70 text-lg">
                No videos found for the selected filter.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
