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
`;

const LeftContent = styled("div")`
  width: 25%;
`;

const RightContent = styled("div")`
  padding-left: 5rem;
  padding-right: 1.2rem;
  width: 75%;
`;

const CardContainer = styled("div")`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 2px 2px lightgray;
  padding: 13px;
  width: 100%;
`;

const TotalEpisodes = styled("p")`
  margin: 0;
  font-weight: 700;
  font-size: 23px;
`;

export default function PodcastDetails() {
  const { podcastId } = useParams();

  const { isFetching, data: podcastDetailsRes } = useGetPodcastDetailsQuery(
    parseInt(podcastId || "")
  );

  const podcastResults = podcastDetailsRes?.results;

  const [podcastWithEpisodes, setPodcastWithEpisodes] =
    useState<PodcastDetailsWithEpisodes>();

  useEffect(() => {
    if (
      podcastResults &&
      Array.isArray(podcastResults) &&
      podcastResults.length > 0
    ) {
      const pordastInfo = podcastResults.filter((p) => p.kind === "podcast")[0];
      const podcastEpisodes = podcastResults.filter(
        (p) => p.kind === "podcast-episode"
      );
      setPodcastWithEpisodes({
        podcast: pordastInfo,
        episodes: podcastEpisodes,
      });
    }
  }, [podcastResults]);

  //TODO: move this inside a helper function
  function millisToMinutesAndSeconds(millis: number) {
    var minutes: number = Math.floor(millis / 60000);
    var seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <Container>
      {isFetching ? (
        <div>Cargando</div>
      ) : (
        <>
          <LeftContent>
            {podcastWithEpisodes?.podcast && (
              <PodcastDetailsView
                podcastDetails={podcastWithEpisodes?.podcast}
              />
            )}
          </LeftContent>
          <RightContent>
            <CardContainer>
              <TotalEpisodes>
                Episodes: {podcastWithEpisodes?.episodes?.length}
              </TotalEpisodes>
            </CardContainer>
            <CardContainer>
              <table>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
                {podcastWithEpisodes?.episodes &&
                  Array.isArray(podcastWithEpisodes?.episodes) &&
                  podcastWithEpisodes?.episodes.map((episode, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <a href={`/podcast/${podcastId}/episode/1`}>
                            {episode.trackName}
                          </a>
                        </td>
                        <td>{episode.releaseDate}</td>
                        <td>
                          {millisToMinutesAndSeconds(episode.trackTimeMillis)}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </CardContainer>
          </RightContent>
        </>
      )}
    </Container>
  );
}
