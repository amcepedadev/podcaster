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

//This type is used for podcast details or podcasts episodes as they share attributes in itunes api
export type PodcastDetails = {
  kind: string;
  artworkUrl600: string;
  trackName: string;
  artistName: string;
  description: string;
  releaseDate: string;
  trackTimeMillis: number;
  episodeUrl: string;
  trackId: number; //podcast id or episode id if it is a podcast or a podcast-episode kind
};

export type PodcastDetailsWithEpisodes = {
  podcast: PodcastDetails;
  episodes: Array<PodcastDetails>;
};

export type PodcastDetailsResponse = {
  results: Array<PodcastDetails>;
};
