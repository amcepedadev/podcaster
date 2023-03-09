import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PodcastDetailsResponse, PodcastResponse } from "../../shared/types";

export const podcastApi = createApi({
  reducerPath: "podcastApi",
  keepUnusedDataFor: 86400, // 24 hours
  baseQuery: fetchBaseQuery({
    baseUrl: "https://itunes.apple.com",
  }),
  endpoints: (builder) => ({
    getBestPodcasts: builder.query<PodcastResponse, void>({
      query: () => `/us/rss/toppodcasts/limit=100/genre=1310/json`,
    }),
    getPodcastDetails: builder.query<PodcastDetailsResponse, number>({
      query: (podcastId) =>
        `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBestPodcastsQuery, useGetPodcastDetailsQuery } =
  podcastApi;
