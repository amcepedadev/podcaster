import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor, fireEvent } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import Home from "./Home";
import { renderWithProviders } from "../../utils/test-utils";

const apiData = {
  feed: {
    entry: [
      {
        id: {
          attributes: {
            "im:id": "0",
          },
        },
        "im:name": {
          label: "Test name 1",
        },
        "im:image": [
          {
            label:
              "https://fastly.picsum.photos/id/187/200/200.jpg?hmac=b_8v5WKwO-_jC2FqfZOP_n9niD1jQvZHB31GoegK2Ww",
          },
        ],
        summary: {
          label: "Test summary 1",
        },
        "im:artist": {
          label: "Test artist 1",
        },
      },
      {
        id: {
          attributes: {
            "im:id": "1",
          },
        },
        "im:name": {
          label: "Test name 2",
        },
        "im:image": [
          {
            label:
              "https://fastly.picsum.photos/id/187/200/200.jpg?hmac=b_8v5WKwO-_jC2FqfZOP_n9niD1jQvZHB31GoegK2Ww",
          },
        ],
        summary: {
          label: "Test summary 2",
        },
        "im:artist": {
          label: "Test artist 2",
        },
      },
    ],
  },
};

export const handlers = [
  rest.get(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
    (req, res, ctx) => {
      return res(ctx.json(apiData), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("shows loading while podcasts are loading", async () => {
  renderWithProviders(<Home />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("renders a list of 2 podcasts on load page", async () => {
  renderWithProviders(<Home />);

  // if it has name and autor 1 and name and autor 2 means 2 podcasts are displayed.
  await waitFor(() => {
    expect(screen.getByText(/Test name 1/i)).toBeInTheDocument();
  }).then(() => {
    expect(screen.getByText(/Test artist 1/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Test name 2/i)).toBeInTheDocument();
  }).then(() => {
    expect(screen.getByText(/Test artist 2/i)).toBeInTheDocument();
  });
});

test("filters by name and then by author and gets podcast 1, podcast 2 shouldn't be present", async () => {
  renderWithProviders(<Home />);

  const input = screen.getByLabelText("filter-input");
  expect(input).toBeInTheDocument();

  //waits until Test name 1 podcast is loaded that means podcasts are loaded.
  await waitFor(() => {
    expect(screen.getByText(/Test name 1/i)).toBeInTheDocument();
  }).then(() => {
    //fires the input event and checkes if the value is the right one.
    fireEvent.change(input, { target: { value: "Test name 1" } });
    expect(input).toHaveValue("Test name 1");
  });

  await waitFor(() => {
    expect(screen.getByText(/Test name 1/i)).toBeInTheDocument();
  }).then(() => {
    //searches by podcast name and checks that the searched podcast is present.
    fireEvent.change(input, { target: { value: "Test name 1" } });
    expect(screen.getByText(/Test name 1/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Test name 1/i)).toBeInTheDocument();
  }).then(() => {
    //searches by podcast author and checks that the searched podcast is present.
    fireEvent.change(input, { target: { value: "Test artist 1" } });
    expect(screen.getByText(/Test name 1/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Test name 1/i)).toBeInTheDocument();
  }).then(() => {
    //searches by podcast name and checks that the non searched podcast is not present.
    fireEvent.change(input, { target: { value: "Test name 1" } });
    expect(screen.queryByText(/Test name 2/i)).toBeNull();
  });
});
