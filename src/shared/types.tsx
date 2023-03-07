export type Podcast = {
  title: {
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
