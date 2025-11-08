import { Badge } from "@/components/ui/badge";
import type { PlaylistItem, YouTubeData } from "@/types/youtube";
import Link from "next/link";
import { YouTubePageClientWrapper } from "./youtube-client-wrapper";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const CHANNEL_ID = "UCYVf_0t2qsjyHILRsLatlHg";

// Enable static generation with revalidation
export const revalidate = 86400; // Revalidate every day

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

interface ChannelResponse {
  items: Array<{
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
}

async function getYouTubeData(): Promise<YouTubeData> {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      console.warn("YouTube API key not found");
      return { playlists: [], items: [] };
    }

    // Fetch channel details to get the uploads playlist ID
    const channelRes = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`,
      { next: { revalidate: 86400 } }
    );

    if (!channelRes.ok) {
      throw new Error("Failed to fetch channel details");
    }

    const channelData: ChannelResponse = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error("Uploads playlist not found");
    }

    // Fetch ALL public videos from the channel's uploads playlist
    const allVideos: PlaylistItem[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const videosUrl: string = `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50${
        nextPageToken ? `&pageToken=${nextPageToken}` : ""
      }&key=${process.env.YOUTUBE_API_KEY}`;

      const videosResponse: Response = await fetch(videosUrl, {
        next: { revalidate: 86400 },
      });

      if (!videosResponse.ok) {
        throw new Error("Failed to fetch videos");
      }

      const videosData: any = await videosResponse.json();
      allVideos.push(...(videosData.items || []));
      nextPageToken = videosData.nextPageToken;
    } while (nextPageToken);

    // Fetch all playlists for filtering
    const playlistsRes = await fetch(
      `${YOUTUBE_API_BASE}/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`,
      { next: { revalidate: 86400 } }
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
      const videos: PlaylistItem[] = [];
      let pageToken: string | undefined = undefined;

      do {
        const url: string = `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50${
          pageToken ? `&pageToken=${pageToken}` : ""
        }&key=${process.env.YOUTUBE_API_KEY}`;

        const response: Response = await fetch(url, {
          next: { revalidate: 86400 },
        });
        const data: any = await response.json();
        videos.push(...(data.items || []));
        pageToken = data.nextPageToken;
      } while (pageToken);

      return videos;
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

    return {
      playlists: playlistsWithVideos,
      items: allVideos, // All channel videos
    };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return { playlists: [], items: [] };
  }
}

export default async function YouTubePage() {
  const youtubeData = await getYouTubeData();

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-linear-to-br from-red-600/20 to-red-500/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-linear-to-br from-red-500/10 to-pink-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-cyan-600 dark:text-foreground bg-cyan-600/5 dark:bg-primary/10 border border-cyan-800/20 dark:border-primary/20 hover:bg-cyan-500/10 dark:hover:bg-primary/15 hover:border-cyan-600/35 dark:hover:border-primary/35 hover:shadow-md transition-all duration-200"
              >
                ← Back to Home
              </Link>
              <Badge
                variant="secondary"
                className="px-6 py-3 text-base bg-yt-badge dark:text-white backdrop-blur-sm"
              >
                🎥 YouTube
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-yt-title">
              All Videos
            </h1>
            <p className="dark:text-gray-50/80 max-w-3xl mx-auto text-2xl leading-relaxed">
              Watch all my{" "}
              <span className="text-gradient-yt-emphasis font-bold">
                tutorials and development content
              </span>{" "}
              where I share insights about{" "}
              <span className="text-gradient-yt-tech font-bold">
                modern web development
              </span>
            </p>
          </div>

          <YouTubePageClientWrapper data={youtubeData} />
        </div>
      </section>
    </main>
  );
}
