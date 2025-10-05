"use client";
import { VideoCard } from "@/components/youtube/video-card";
import type { PlaylistItem } from "@/types/youtube";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";

interface VideoGridProps {
  videos: PlaylistItem[];
  copiedId: string | null;
  copyToClipboard: (e: React.MouseEvent, url: string, id: string) => void;
  openVideo: (url: string) => void;
}

function VideoGridBase({
  videos,
  copiedId,
  copyToClipboard,
  openVideo,
}: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {videos.map((item) => {
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
  );
}

export const VideoGrid = memo(VideoGridBase);
