"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { YouTubeData } from "@/types/youtube";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

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
    <section id="youtube" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              YouTube
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Latest Videos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out my latest tutorials and development content
            </p>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={filter === option.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(option.id)}
              className="transition-all duration-200"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((item) => {
              const { id, snippet } = item;
              const { title, thumbnails, resourceId } = snippet;
              const videoUrl = `https://www.youtube.com/watch?v=${resourceId.videoId}`;

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                        src={thumbnails.high.url || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3">
                          <Play className="h-6 w-6" />
                        </div>

                        <Button
                          size="icon"
                          variant="secondary"
                          onClick={(e) =>
                            copyToClipboard(e, videoUrl, resourceId.videoId)
                          }
                          aria-label="Copy video link"
                          className="rounded-full"
                        >
                          {copiedId === resourceId.videoId ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
                        {title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No videos found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
