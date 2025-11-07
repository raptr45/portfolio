"use client";

import { YouTubeBackgroundDecor } from "@/components/youtube/background-decor";
import { EmptyVideoState } from "@/components/youtube/empty-state";
import { FilterBar } from "@/components/youtube/filter-bar";
import { YouTubeSectionHeader } from "@/components/youtube/section-header";
import { VideoGrid } from "@/components/youtube/video-grid";
import type { YouTubeData } from "@/types/youtube";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface YouTubeSectionProps {
  data: YouTubeData;
}

export function YouTubeSection({ data }: YouTubeSectionProps) {
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

  return (
    <section
      id="youtube"
      className="py-24 relative overflow-hidden bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <YouTubeBackgroundDecor />

      <div className="container mx-auto px-4 relative z-10">
        <YouTubeSectionHeader />

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
    </section>
  );
}
