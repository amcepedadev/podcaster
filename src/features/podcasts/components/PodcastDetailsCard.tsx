import React from "react";
import { PodcastDetails } from "../../../shared/types";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Separator } from "./SharedStyles";

type Props = {
  podcastDetails: PodcastDetails;
  isFromEpisodeDetails?: boolean;
};

const PodcastDetailsContainer = styled("div")`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 2px 2px lightgray;
  padding: 15px;
`;

const PodcastArtbook = styled("img")<{ clickable?: boolean }>`
  border-radius: 5px;
  width: 90%;
  height: 90%;
  margin-left: 5%;
  margin-right: 5%;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;

const PodcastTitleAndArtirstContainer = styled("div")`
  padding-left: 10px;
`;

const PodcastTitle = styled("p")<{ clickable?: boolean }>`
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 0;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;

const PodcastAuthor = styled("p")<{ clickable?: boolean }>`
  font-size: 17px;
  font-weight: 500;
  font-style: italic;
  margin-top: 0.2rem;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;

const DescriptionTitle = styled("p")`
  font-size: 18px;
  font-weight: 700;
`;

const PodcastDescription = styled("p")`
  font-size: 15px;
  font-weight: 500;
  font-style: italic;
`;
const PodcastDescriptionContainer = styled("div")`
  line-height: 15px;
  padding-left: 10px;
`;

export default function PodcastDetailsCard(props: Props) {
  const { podcastDetails, isFromEpisodeDetails } = props;
  const { trackName, artworkUrl600, artistName } = podcastDetails;

  const navigate = useNavigate();

  function toPodcastDetails() {
    if (isFromEpisodeDetails) {
      navigate(`/podcast/${podcastDetails.trackId}`);
    }
  }

  return (
    <PodcastDetailsContainer>
      <PodcastArtbook
        src={artworkUrl600}
        onClick={() => toPodcastDetails()}
        clickable={isFromEpisodeDetails}
      />
      <Separator />
      <PodcastTitleAndArtirstContainer>
        <PodcastTitle
          onClick={() => toPodcastDetails()}
          clickable={isFromEpisodeDetails}
        >
          {trackName}
        </PodcastTitle>
        <PodcastAuthor
          onClick={() => toPodcastDetails()}
          clickable={isFromEpisodeDetails}
        >
          by {artistName}
        </PodcastAuthor>
      </PodcastTitleAndArtirstContainer>
      <Separator />
      <PodcastDescriptionContainer>
        <DescriptionTitle>Description:</DescriptionTitle>
        <PodcastDescription>Todo</PodcastDescription>
      </PodcastDescriptionContainer>
    </PodcastDetailsContainer>
  );
}
