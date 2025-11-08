"use client";

import { BackToTopButton } from "@/components/back-to-top-button";
import type { YouTubeData } from "@/types/youtube";
import { YouTubePageClient } from "./youtube-client";

interface YouTubePageClientWrapperProps {
  data: YouTubeData;
}

export function YouTubePageClientWrapper({
  data,
}: YouTubePageClientWrapperProps) {
  return (
    <>
      <YouTubePageClient data={data} />
      <BackToTopButton />
    </>
  );
}
