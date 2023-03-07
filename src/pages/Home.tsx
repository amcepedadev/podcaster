import React from "react";
import "./Home.css";
import { useGetBestPodcastsQuery } from "../features/podcasts/podcastsAPI";
import { Podcast } from "../shared/types";

function Home() {
  const { isFetching, data: podcastsRes } = useGetBestPodcastsQuery();

  const podcasts: Array<Podcast> = podcastsRes?.feed?.entry || [];

  console.log("podcasts ", podcastsRes);
  return (
    <div className="Home">
      <header className="Home-header">
        {isFetching ? (
          <div>Cargando...</div>
        ) : (
          podcasts &&
          Array.isArray(podcasts) &&
          podcasts.length > 0 &&
          podcasts.map((podcast, i) => {
            return (
              <div key={i}>
                <p>{podcast.title?.label}</p>
              </div>
            );
          })
        )}
      </header>
    </div>
  );
}

export default Home;
