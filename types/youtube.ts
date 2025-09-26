export interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description?: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
      medium?: {
        url: string;
      };
      default?: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
    playlistId: string;
  };
}

export interface YouTubePlaylist {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
      medium?: {
        url: string;
      };
      default?: {
        url: string;
      };
    };
    publishedAt: string;
  };
  contentDetails: {
    itemCount: number;
  };
  videos: YouTubeVideo[];
}

export interface YouTubeData {
  playlists: YouTubePlaylist[];
  // Backwards compatibility
  items: YouTubeVideo[];
}
