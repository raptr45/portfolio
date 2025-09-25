import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { AboutSection, WorkSection } from "@/components/placeholder-sections";
import { ServicesSection } from "@/components/services-section";
import { TechStack } from "@/components/tech-stack";
import { YouTubeSection } from "@/components/youtube-section";
import type { YouTubeData } from "@/types/youtube";

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

async function getYouTubeData(): Promise<YouTubeData> {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      console.warn("YouTube API key not found");
      return { items: [] };
    }

    const res = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLIWGHKiGCTxSEXgpAfdBXXJWC0YGA4R0v&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!res.ok) {
      throw new Error("Failed to fetch YouTube data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return { items: [] };
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
