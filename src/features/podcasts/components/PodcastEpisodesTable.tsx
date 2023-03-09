import React from "react";
import { PodcastDetails } from "../../../shared/types";
import styled from "styled-components";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { startLoading } from "../../ui/loadingSlice";

type Props = {
  episodes: Array<PodcastDetails>;
  podcastId: string;
};

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

const TableRow = styled.tr<{ stripped?: boolean; isHeader?: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.stripped ? "#f7f7f7" : "white")};
  border: 0;
  border-bottom: ${(props) =>
    props.isHeader ? "2px solid lightgray" : "1px solid lightgray"};
`;

const TableHeader = styled.th`
  font-weight: bold;
  text-align: left;
  border: 0;
  margin-right: 0;
  padding: 10px;
`;

const TableCell = styled.td`
  text-align: left;
  padding: 10px;
`;

//keeping visited link purple color as it looks good for me keeping it as a "episode seen" functionality
//and in mockup doesn't say anything about it
const EpisodeTitle = styled.a`
  text-decoration: none;
`;

export default function PodcastEpisodesTable(props: Props) {
  const { episodes, podcastId } = props;
  const dispatch = useDispatch();

  //NOTE: move this inside a helper function is needed in other places, by now is staying here
  function millisToMinutesAndSeconds(millis: number) {
    var minutes: number = Math.floor(millis / 60000);
    var seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <Table>
      <TableRow isHeader>
        <TableHeader>Title</TableHeader>
        <TableHeader>Date</TableHeader>
        <TableHeader>Duration</TableHeader>
      </TableRow>
      {episodes &&
        Array.isArray(episodes) &&
        episodes.map((episode, i) => {
          return (
            <TableRow key={i} stripped={i % 2 === 0}>
              <TableCell>
                <EpisodeTitle
                  href={`/podcast/${podcastId}/episode/${episode.trackId}`}
                  onClick={() => dispatch(startLoading())}
                >
                  {episode.trackName}
                </EpisodeTitle>
              </TableCell>
              <TableCell>
                {dayjs(episode.releaseDate).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {millisToMinutesAndSeconds(episode.trackTimeMillis)}
              </TableCell>
            </TableRow>
          );
        })}
    </Table>
  );
}
