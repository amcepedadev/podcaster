export type Podcast = {
  id: {
    attributes: {
      "im:id": string
    }
  },
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
