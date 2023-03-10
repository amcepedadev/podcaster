import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PodcastDetailsCard from "../../features/podcasts/components/PodcastDetailsCard";
import { useGetPodcastDetailsQuery } from "../../features/podcasts/podcastsAPI";
import { PodcastDetailsWithEpisodes } from "../../shared/types";
import PodcastEpisodesTable from "../../features/podcasts/components/PodcastEpisodesTable";
import { startLoading, stopLoading } from "../../features/ui/loadingSlice";
import { useDispatch } from "react-redux";

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
  padding-right: 1.5rem;
  width: 75%;
`;

const CardContainer = styled("div")`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 2px 2px lightgray;
  padding: 13px;
  width: 100%;
  margin-bottom: 20px;
`;

const TotalEpisodes = styled("p")`
  margin: 0;
  font-weight: 700;
  font-size: 23px;
`;

export default function PodcastDetails() {
  const { podcastId } = useParams();
  const dispatch = useDispatch();

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

  /** --- START LOADER STATE MANAGEMENT --- */
  //want to show loading indicator while fetching podcast details
  useEffect(() => {
    if (isFetching) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, isFetching]);

  //if unloading view, means we're loading another page so start loading indicator
  useEffect(() => {
    return () => {
      dispatch(startLoading());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /** --- STOP LOADER STATE MANAGEMENT --- */

  return (
    <Container>
      {isFetching ? (
        <div>Cargando</div>
      ) : (
        <>
          <LeftContent>
            {podcastWithEpisodes?.podcast && (
              <PodcastDetailsCard
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
              <PodcastEpisodesTable
                episodes={podcastWithEpisodes?.episodes || []}
                podcastId={podcastId || ""}
              />
            </CardContainer>
          </RightContent>
        </>
      )}
    </Container>
  );
}
