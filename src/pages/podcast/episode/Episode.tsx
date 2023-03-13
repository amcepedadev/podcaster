import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetPodcastDetailsQuery } from "../../../features/podcasts/podcastsAPI";
import { PodcastDetailsWithEpisode } from "../../../shared/types";
import PodcastDetailsCard from "../../../features/podcasts/components/PodcastDetailsCard";
import { Separator } from "../../../features/podcasts/components/SharedStyles";
import { startLoading, stopLoading } from "../../../features/ui/loadingSlice";
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

const EpisodeTitle = styled.p`
  margin: 0;
  margin-bottom: 0.4rem;
  font-weight: 700;
  font-size: 23px;
`;

const EpisodeDescription = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 16px;
`;

const Audio = styled.audio`
  width: 100%;
  margin: 0.3rem 0 0.3rem 0;
`;

export default function EpisodeDetails() {
  const { podcastId, episodeId } = useParams();
  const dispatch = useDispatch();

  const { isFetching, data: podcastDetailsRes } = useGetPodcastDetailsQuery(
    parseInt(podcastId || "")
  );

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
  /** --- END LOADER STATE MANAGEMENT --- */

  const podcastResults = podcastDetailsRes?.results;

  const [podcastWithRequestedEpisode, setPodcastWithRequestedEpisode] =
    useState<PodcastDetailsWithEpisode>();

  useEffect(() => {
    if (
      podcastResults &&
      Array.isArray(podcastResults) &&
      podcastResults.length > 0 &&
      episodeId
    ) {
      const pordastInfo = podcastResults.filter((p) => p.kind === "podcast")[0];
      const podcastEpisode = podcastResults.filter(
        (p) => p.trackId === parseInt(episodeId || "")
      )[0];
      setPodcastWithRequestedEpisode({
        podcast: pordastInfo,
        episode: podcastEpisode,
      });
    }
  }, [episodeId, podcastResults]);

  const podcast = podcastWithRequestedEpisode?.podcast;
  const episode = podcastWithRequestedEpisode?.episode;

  return (
    <Container>
      {isFetching ? (
        <div>Cargando</div>
      ) : (
        <>
          <LeftContent>
            {podcast && (
              <PodcastDetailsCard
                podcastDetails={podcast}
                isFromEpisodeDetails
              />
            )}
          </LeftContent>
          <RightContent>
            <CardContainer>
              {episode && (
                <>
                  <EpisodeTitle>{episode.trackName}</EpisodeTitle>
                  <EpisodeDescription
                    dangerouslySetInnerHTML={{ __html: episode.description }}
                  />
                  <Separator />
                  {episode.episodeUrl && (
                    <Audio controls>
                      <source
                        src={episode.episodeUrl}
                        type={`${episode.episodeContentType}/${episode.episodeFileExtension}`}
                      />
                    </Audio>
                  )}
                </>
              )}
            </CardContainer>
          </RightContent>
        </>
      )}
    </Container>
  );
}
