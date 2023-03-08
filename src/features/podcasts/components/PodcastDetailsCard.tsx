import React from 'react'
import { PodcastDetails } from '../../../shared/types'
import styled from 'styled-components'

type Props = {
  podcastDetails: PodcastDetails
}

const PodcastDetailsContainer = styled("div")`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 2px 2px lightgray;
  padding: 15px;
`

const PodcastArtbook = styled("img")`
  border-radius: 5px;
  width: 90%;
  height: 90%;
  margin-left: 5%;
  margin-right: 5%;
`

const Separator = styled("div")`
  height: 1px;
  width: 100%;
  background-color: lightgray;
  margin: 20px 0 10px 0;
`

const PodcastTitleAndArtirstContainer = styled("div")`
  line-height: 5px;
  padding-left: 10px;
`

const PodcastTitle = styled("p")`
  font-size: 23px;
  font-weight: 700;
`

const PodcastAuthor = styled("p")`
  font-size: 17px;
  font-weight: 500;
  font-style: italic;
`

const DescriptionTitle = styled("p")`
  font-size: 18px;
  font-weight: 700;
`

const PodcastDescription = styled("p")`
  font-size: 15px;
  font-weight: 500;
  font-style: italic;
`
const PodcastDescriptionContainer = styled("div")`
  line-height: 15px;
  padding-left: 10px;
`


export default function PodcastDetailsView(props: Props) {
  const { podcastDetails } = props
  const {trackName, artworkUrl600, artistName} = podcastDetails

  return (
    <PodcastDetailsContainer>
      <PodcastArtbook src={artworkUrl600} />
      <Separator />
      <PodcastTitleAndArtirstContainer>
        <PodcastTitle>{trackName}</PodcastTitle>
        <PodcastAuthor>by {artistName}</PodcastAuthor>
      </PodcastTitleAndArtirstContainer>
      <Separator />
      <PodcastDescriptionContainer>
        <DescriptionTitle>
          Description:
        </DescriptionTitle>
        <PodcastDescription>
          Todo
        </PodcastDescription>
      </PodcastDescriptionContainer>
    </PodcastDetailsContainer>
  )

}