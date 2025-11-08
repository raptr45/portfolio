"use client";

import { YouTubeBackgroundDecor } from "@/components/youtube/background-decor";
import { EmptyVideoState } from "@/components/youtube/empty-state";
import { FilterBar } from "@/components/youtube/filter-bar";
import { VideoGrid } from "@/components/youtube/video-grid";
import type { YouTubeData } from "@/types/youtube";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface YouTubePageClientProps {
  data: YouTubeData;
}

export function YouTubePageClient({ data }: YouTubePageClientProps) {
  const [filter, setFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filterOptions = useMemo(() => {
    const base = [{ id: "all", label: "All" }];
    if (!data?.playlists?.length) return base;
    return [
      ...base,
      ...data.playlists.map((p) => ({ id: p.id, label: p.snippet.title })),
    ];
  }, [data?.playlists]);

  // Get filtered videos based on selected playlist
  const filteredVideos = useMemo(() => {
    if (filter === "all") return data.items || [];
    return data.playlists?.find((pl) => pl.id === filter)?.videos || [];
  }, [filter, data.items, data.playlists]);

  const copyToClipboard = useCallback(
    async (e: React.MouseEvent, videoUrl: string, videoId: string) => {
      e.preventDefault();
      e.stopPropagation();
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
    },
    []
  );

  const openVideo = useCallback((videoUrl: string) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  }, []);

  if (!data?.playlists?.length && !data?.items?.length) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No videos available at the moment.
        </p>
      </div>
    );
  }

  return (
    <>
      <YouTubeBackgroundDecor />

      <div className="relative z-10">
        <FilterBar
          options={filterOptions}
          active={filter}
          onSelect={setFilter}
        />

        <VideoGrid
          videos={filteredVideos}
          copiedId={copiedId}
          copyToClipboard={copyToClipboard}
          openVideo={openVideo}
        />

        {filteredVideos.length === 0 && <EmptyVideoState />}
      </div>
    </>
  );
}
