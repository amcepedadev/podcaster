import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

export default function PodcastDetails(props: Props) {
  const { podcastId } = useParams();

  return (
    <div>
      <h1>Podcast: {podcastId}</h1>
      <a href={`/podcast/${podcastId}/episode/1`}>To episode 1</a>
    </div>
  );
}
