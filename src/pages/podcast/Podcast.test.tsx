import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import Podcast from "./Podcast";
import { renderWithProviders } from "../../utils/test-utils";

const apiData = {
  results: [
    {
      kind: "podcast",
      artworkUrl600:
        "https://fastly.picsum.photos/id/187/200/200.jpg?hmac=b_8v5WKwO-_jC2FqfZOP_n9niD1jQvZHB31GoegK2Ww",
      trackName: "Podcast name 1",
      artistName: "Podcast artist 1",
      description: "",
      releaseDate: "2023-02-25T00:30:00Z",
      trackId: 1,
    },
    {
      kind: "podcast-episode",
      trackName: "Episode 1",
      description: "Description 1",
      releaseDate: "2023-02-25T00:30:00Z",
      trackTimeMillis: 60000,
      episodeUrl:
        "https://dts.podtrac.com/redirect.mp3/landmark-dynamic.barstoolsports.com/stream/qJsLEUHtwa1nWlrvDWWC2Qnw/audio.mp3?v=eyJzcmMiOiJodHRwczovL2JhcnN0b29sLXBvZGNhc3RzLnMzLmFtYXpvbmF3cy5jb20vYmFyc3Rvb2wtc3BvcnRzL21pbGxpb24tZG9sbGF6LXdvcnRoLW9mLWdhbWUvcUpzTEVVSHR3YTFuV2xydkRXV0MyUW53L0VQLTIwOS1GVC5LRVktR0xPQ0stLS1hdWRpby0tLUZpbmFsLmZiOGE2MjhlLjk2cy5tcDMiLCJiZWMiOlsibWFsZSIsImxpZmVzdHlsZSJdLCJhZnAiOm51bGx9",
      trackId: 2,
      episodeContentType: "audio",
      episodeFileExtension: "mp3",
    },
  ],
};

export const handlers = [
  rest.get("https://itunes.apple.com/lookup", (req, res, ctx) => {
    return res(ctx.json(apiData), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("renders the basic details of podcast 1", async () => {
  renderWithProviders(<Podcast />);

  // if it has Podcast name 1 means left card with basic podcast data is loaded
  await waitFor(() => {
    expect(screen.getByText(/Podcast name 1/i)).toBeInTheDocument();
  }).then(() => {
    expect(screen.getByText(/Podcast artist 1/i)).toBeInTheDocument();
  });
});

test("renders the episodes table of podcast 1 correctly", async () => {
  renderWithProviders(<Podcast />);

  // if it has Podcast name 1 means right card with episodes is loaded
  await waitFor(() => {
    expect(screen.getByText(/Podcast name 1/i)).toBeInTheDocument();
  }).then(() => {
    expect(screen.getByText(/Episode 1/i)).toBeInTheDocument();
  });

  //checks that the date formatter is working correctly
  await waitFor(() => {
    expect(screen.getByText(/Podcast name 1/i)).toBeInTheDocument();
  }).then(() => {
    expect(screen.getByText(/1:00/i)).toBeInTheDocument();
  });

  //checks that the duration formatter is working correctly
  await waitFor(() => {
    expect(screen.getByText(/Podcast name 1/i)).toBeInTheDocument();
  }).then(() => {
    const formattedDateStr = "25/02/2023";
    expect(
      screen.getByText(new RegExp(formattedDateStr, "i"))
    ).toBeInTheDocument();
  });
});
