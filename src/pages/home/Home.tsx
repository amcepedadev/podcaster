import React, { FormEvent, useEffect, useState } from "react";
import { useGetBestPodcastsQuery } from "../../features/podcasts/podcastsAPI";
import { Podcast } from "../../shared/types";
import styled from "styled-components";
import PodcastCard from "../../features/podcasts/components/PodcastCard";

const PodcastsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const SearchBarAndTotalizerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
  margin-right: 40px;
  padding-right: 10px;
`;

const Totalizer = styled.div`
  background-color: #2778c0;
  border-radius: 10px;
  padding: 0 5px 0 5px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
`;

const SearchBar = styled.input`
  padding: 10px;
  border-radius: 5px;
  border-color: lightgray;
  border-width: 1px;
  border-style: solid;
  &:focus {
    outline: none;
  }
  width: 200px;
`;

function Home() {
  const { isFetching, data: podcastsRes } = useGetBestPodcastsQuery();

  const [podcasts, setPodcasts] = useState<Array<Podcast>>([]); // NOTE: saved this in state for easy management of search filter

  //this useEffect will set initial podcasts given by the itunes API or our cached data
  useEffect(() => {
    if (podcastsRes?.feed?.entry && Array.isArray(podcastsRes?.feed?.entry)) {
      setPodcasts(podcastsRes?.feed?.entry);
    }
  }, [podcastsRes]);

  function handleFilterPodcastsBySearch(event: FormEvent<HTMLInputElement>) {
    const initialPodcasts = podcastsRes?.feed?.entry || [];
    const value = event.currentTarget.value.toLowerCase();
    const filteredPodcasts = initialPodcasts.filter((podcast) => {
      const podcastName = podcast["im:name"].label.toLowerCase();
      const authorName = podcast["im:artist"].label.toLowerCase();
      return podcastName.includes(value) || authorName.includes(value);
    });
    setPodcasts(filteredPodcasts);
  }

  return (
    <div>
      <SearchBarAndTotalizerContainer>
        <Totalizer>{podcasts?.length || 0}</Totalizer>
        <SearchBar
          placeholder="Filter podcasts..."
          onChange={(e) => handleFilterPodcastsBySearch(e)}
        />
      </SearchBarAndTotalizerContainer>
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
    </div>
  );
}

export default Home;
