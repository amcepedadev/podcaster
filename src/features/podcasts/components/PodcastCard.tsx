import React from "react";
import { Podcast } from "../../../shared/types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type Props = {
  podcast: Podcast;
};

const CardContainer = styled("div")`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 2px 2px lightgray;
  margin: 70px 20px 30px 20px;
  padding: 50px 20px 5px 20px;
  position: relative;
  cursor: pointer;
`;

const PodcastImage = styled("img")`
  position: absolute;
  bottom: 55%;
  left: 0;
  right: 0;
  margin: auto;
  height: 7rem;
  width: 7rem;
  border-radius: 100%;
`;

const PodcastTitle = styled("p")`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 3rem;
`;

const PodcastAuthor = styled("p")`
  font-size: 16px;
  color: gray;
  font-weight: 600;
`;

export default function PodcastCard({ podcast }: Props) {
  const navigate = useNavigate();

  function goToDetails() {
    navigate(`/podcast/${podcast.id.attributes["im:id"]}`);
  }

  return (
    <CardContainer onClick={() => goToDetails()}>
      <PodcastImage src={podcast["im:image"][0].label} alt="" />
      <PodcastTitle>{podcast["im:name"]?.label || ""}</PodcastTitle>
      <PodcastAuthor>Author: {podcast["im:artist"]?.label || ""}</PodcastAuthor>
    </CardContainer>
  );
}
