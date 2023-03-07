import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PodcastDetails from "./pages/podcast/Podcast";
import EpisodeDetails from "./pages/podcast/episode/Episode";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/podcast/:podcastId",
    element: <PodcastDetails />,
  },
  {
    path: "/podcast/:podcastId/episode/:episodeId",
    element: <EpisodeDetails />,
  },
]);
