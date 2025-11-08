import type { PlaylistItem, YouTubeData } from "@/types/youtube";
import { NextResponse } from "next/server";

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

interface ChannelResponse {
  items: Array<{
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
}

export async function GET() {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      console.warn("YouTube API key not found");
      return NextResponse.json({ playlists: [], items: [] });
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

    // Fetch all public playlists from the channel
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

    const data: YouTubeData = {
      playlists: playlistsWithVideos,
      items: allVideos, // All channel videos from uploads playlist
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return NextResponse.json({ playlists: [], items: [] });
  }
}
