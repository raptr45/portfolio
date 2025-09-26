import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { AboutSection, WorkSection } from "@/components/placeholder-sections";
import { ServicesSection } from "@/components/services-section";
import { TechStack } from "@/components/tech-stack";
import { YouTubeSection } from "@/components/youtube-section";
import type { YouTubeData } from "@/types/youtube";

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

    // Fetch videos for each playlist
    const playlistsWithVideos = await Promise.all(
      playlists.map(async (playlist: any) => {
        try {
          const videosRes = await fetch(
            `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${playlist.id}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`,
            { next: { revalidate: 3600 } }
          );

          if (!videosRes.ok) {
            console.warn(`Failed to fetch videos for playlist ${playlist.id}`);
            return {
              ...playlist,
              videos: [],
            };
          }

          const videosData = await videosRes.json();
          return {
            ...playlist,
            videos: videosData.items || [],
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

    // Create flat list of all videos for backwards compatibility
    const allVideos = playlistsWithVideos.flatMap(
      (playlist) => playlist.videos
    );

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
      <AboutSection />
      <WorkSection />
      <TechStack />
      <YouTubeSection data={youtubeData} />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
