import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PodcastResponse } from "../../shared/types";

export const podcastApi = createApi({
  reducerPath: "podcastApi",
  keepUnusedDataFor: 3600,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://itunes.apple.com",
  }),
  endpoints: (builder) => ({
    getBestPodcasts: builder.query<PodcastResponse, void>({
      query: () => `/us/rss/toppodcasts/limit=100/genre=1310/json`,
      keepUnusedDataFor: 3600,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBestPodcastsQuery } = podcastApi;
