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
  padding: 0 10px;
  cursor: pointer;
`;

const ImageContainer = styled("div")`
  position: relative;
  bottom: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 3rem;
`;

const PodcastImage = styled("img")`
  height: 7rem;
  width: 7rem;
  border-radius: 100%;
`;

const PodcastTitle = styled("p")`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 3rem;
  text-align: center;
  margin-bottom: 0;
`;

const PodcastAuthor = styled("p")`
  font-size: 16px;
  color: gray;
  font-weight: 600;
  text-align: center;
  margin-top: 0.1rem;
`;

export default function PodcastCard({ podcast }: Props) {
  const navigate = useNavigate();

  function goToDetails() {
    navigate(`/podcast/${podcast.id.attributes["im:id"]}`);
  }

  //getting the last image as is the one with the highest resolution
  const lastImage = podcast["im:image"][podcast["im:image"].length - 1];

  return (
    <CardContainer onClick={() => goToDetails()}>
      <ImageContainer>
        <PodcastImage src={lastImage.label} alt="" />
      </ImageContainer>
      <PodcastTitle>{podcast["im:name"]?.label || ""}</PodcastTitle>
      <PodcastAuthor>Author: {podcast["im:artist"]?.label || ""}</PodcastAuthor>
    </CardContainer>
  );
}
