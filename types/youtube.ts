export interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
    playlistId: string;
  };
}

export interface YouTubeData {
  items: YouTubeVideo[];
}
