import { ErrorBoundary } from "@/components/error-boundary";
import type { PlaylistItem, YouTubeData } from "@/types/youtube";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Static imports for critical components
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";

// Dynamic imports for non-critical components
const AboutSection = dynamic(
  () =>
    import("@/components/placeholder-sections").then((mod) => ({
      default: mod.AboutSection,
    })),
  {
    loading: () => (
      <div className="py-32 flex justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    ),
  }
);
const WorkSection = dynamic(
  () =>
    import("@/components/placeholder-sections").then((mod) => ({
      default: mod.WorkSection,
    })),
  {
    loading: () => (
      <div className="py-32 flex justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    ),
  }
);
const TechStack = dynamic(
  () =>
    import("@/components/tech-stack").then((mod) => ({
      default: mod.TechStack,
    })),
  {
    loading: () => (
      <div className="py-32 flex justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    ),
  }
);
const YouTubeSection = dynamic(
  () =>
    import("@/components/youtube-section").then((mod) => ({
      default: mod.YouTubeSection,
    })),
  {
    loading: () => (
      <div className="py-32 flex justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    ),
  }
);
const ServicesSection = dynamic(
  () =>
    import("@/components/services-section").then((mod) => ({
      default: mod.ServicesSection,
    })),
  {
    loading: () => (
      <div className="py-32 flex justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    ),
  }
);
const ContactSection = dynamic(
  () =>
    import("@/components/contact-section").then((mod) => ({
      default: mod.ContactSection,
    })),
  {
    loading: () => (
      <div className="py-32 flex justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    ),
  }
);

interface YouTubePlaylistAPI {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
    publishedAt: string;
  };
  contentDetails: {
    itemCount: number;
  };
}

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const CHANNEL_ID = "UCYVf_0t2qsjyHILRsLatlHg";

async function getYouTubeData(): Promise<YouTubeData> {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      console.warn("YouTube API key not found");
      return { playlists: [], items: [] };
    }

    // Fetch all public playlists from the channel
    const playlistsRes = await fetch(
      `${YOUTUBE_API_BASE}/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!playlistsRes.ok) {
      throw new Error("Failed to fetch playlists");
    }

    const playlistsData = await playlistsRes.json();
    const playlists = playlistsData.items || [];

    // Helper function to fetch videos for a playlist
    const getPlaylistVideos = async (
      playlistId: string
    ): Promise<PlaylistItem[]> => {
      const videosUrl = `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;
      const videosResponse = await fetch(videosUrl);
      const videosData = await videosResponse.json();
      return videosData.items || [];
    };

    // Fetch videos for each playlist
    const playlistsWithVideos = await Promise.all(
      playlists.map(async (playlist: YouTubePlaylistAPI) => {
        try {
          const videos = await getPlaylistVideos(playlist.id);
          return {
            ...playlist,
            videos,
          };
        } catch (error) {
          console.error(
            `Error fetching videos for playlist ${playlist.id}:`,
            error
          );
          return {
            ...playlist,
            videos: [],
          };
        }
      })
    );

    // Create deduplicated flat list of all videos using Map for O(n) performance
    // This prevents the same video from appearing multiple times in "All Videos" view
    const videoMap = new Map<string, PlaylistItem>();

    playlistsWithVideos.forEach((playlist) => {
      playlist.videos.forEach((video: PlaylistItem) => {
        const videoId = video.snippet.resourceId?.videoId;
        // Only add video if it has a valid ID and isn't already in our map
        if (videoId && !videoMap.has(videoId)) {
          videoMap.set(videoId, video);
        }
      });
    });

    // Convert Map back to array - maintains insertion order for consistent display
    const allVideos = Array.from(videoMap.values());
    return {
      playlists: playlistsWithVideos,
      items: allVideos,
    };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return { playlists: [], items: [] };
  }
}

export default async function Home() {
  const youtubeData = await getYouTubeData();

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="py-32 flex justify-center">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
          }
        >
          <AboutSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="py-32 flex justify-center">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
          }
        >
          <WorkSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="py-32 flex justify-center">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
          }
        >
          <TechStack />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="py-32 flex justify-center">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
          }
        >
          <YouTubeSection data={youtubeData} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="py-32 flex justify-center">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
          }
        >
          <ServicesSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="py-32 flex justify-center">
              <div className="loading-spinner w-8 h-8"></div>
            </div>
          }
        >
          <ContactSection />
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </main>
  );
}
