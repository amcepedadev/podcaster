export type Podcast = {
  id: {
    attributes: {
      "im:id": string;
    };
  };
  "im:name": {
    label: string;
  };
  "im:image": Array<{
    label: string;
  }>;
  summary: {
    label: string;
  };
  "im:artist": {
    label: string;
  };
};

export type PodcastResponse = {
  feed: {
    entry: Array<Podcast>;
  };
};

export type PodcastDetails = {
  kind: string;
  artworkUrl600: string;
  trackName: string;
  artistName: string;
  description: string;
  releaseDate: string;
  trackTimeMillis: number;
  episodeUrl: string;
};

export type PodcastDetailsWithEpisodes = {
  podcast: PodcastDetails;
  episodes: Array<PodcastDetails>;
};

export type PodcastDetailsResponse = {
  results: Array<PodcastDetails>;
};
