import React from "react";
import "./Home.css";
import { useGetBestPodcastsQuery } from "../../features/podcasts/podcastsAPI";
import { Podcast } from "../../shared/types";
import styled from "styled-components";
import PodcastCard from "../../features/podcasts/components/PodcastCard";

function Home() {
  const { isFetching, data: podcastsRes } = useGetBestPodcastsQuery();

  const podcasts: Array<Podcast> = podcastsRes?.feed?.entry || [];

  const PodcastsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `;

  return (
    <div className="Home">
      <header className="Home-header">
        {isFetching ? (
          <div>Cargando...</div>
        ) : (
          <PodcastsGrid>
            {podcasts &&
              Array.isArray(podcasts) &&
              podcasts.length > 0 &&
              podcasts.map((podcast, i) => {
                return <PodcastCard podcast={podcast} />;
              })}
          </PodcastsGrid>
        )}
      </header>
    </div>
  );
}

export default Home;
