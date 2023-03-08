import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PodcastDetailsView from "../../features/podcasts/components/PodcastDetailsCard";
import { useGetPodcastDetailsQuery } from "../../features/podcasts/podcastsAPI";
import { PodcastDetailsWithEpisodes } from "../../shared/types";

const Container = styled("div")`
  padding: 20px;
  display: flex;
  flex-direction: row;
`

const LeftContent = styled("div")`
  width: 25%;

`

export default function PodcastDetails() {
  const { podcastId } = useParams();

  const { isFetching, data: podcastDetailsRes } = useGetPodcastDetailsQuery(parseInt(podcastId || ""));

  const podcastResults = podcastDetailsRes?.results

  const [podcastWithEpisodes, setPodcastWithEpisodes] = useState<PodcastDetailsWithEpisodes>()

  useEffect(() => {
    if(podcastResults && Array.isArray(podcastResults) && podcastResults.length > 0) {
      const pordastInfo = podcastResults.filter(p => p.kind === "podcast")[0];
      const podcastEpisodes = podcastResults.filter(p => p.kind === "podcast-episode");
      setPodcastWithEpisodes({podcast: pordastInfo, episodes: podcastEpisodes})
    }
  }, [podcastResults])

  useEffect(() => {
    if(podcastWithEpisodes) {
      console.log(podcastWithEpisodes)
    }
  
  }, [podcastWithEpisodes])
  
  

  return (
    <Container>
    {
      isFetching ? 
      <div>Cargando</div>
      : 
      <>
        <LeftContent>
          {podcastWithEpisodes?.podcast && <PodcastDetailsView podcastDetails={podcastWithEpisodes?.podcast} />}
        </LeftContent>
        <a href={`/podcast/${podcastId}/episode/1`}>To episode 1</a>
      </> 
    }
    </Container>
  );
}
