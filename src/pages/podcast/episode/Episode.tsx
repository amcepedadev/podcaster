import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

export default function EpisodeDetails(props: Props) {
  const { episodeId } = useParams();

  return (
    <div>
      <h1>{episodeId}</h1>
    </div>
  );
}
