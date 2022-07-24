import { renderHook } from "@testing-library/react-hooks";
import useFlickrPublicFeed from "../useFlickrPublicFeed";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const makeFeedResponse = jest.fn((items, searchTag) => {
  const tag = searchTag || "something";
  const jsonStr = JSON.stringify({
    title: `Recent Uploads tagged ${tag}`,
    link: `"https://www.flickr.com/photos/tags/${tag}/`,
    description: "",
    modified: "2022-07-23T21:21:48Z",
    generator: "https://www.flickr.com",
    items: items,
  });

  return `jsonFlickrFeed(${jsonStr})`;
});

describe("useFlickrPublicFeed", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should have the correct initial values", () => {
    const { result } = renderHook(() => useFlickrPublicFeed(""));

    expect(result.current.status).toBe("INITIAL");
    expect(result.current.queryResultItems).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it("should switch isLoading and parse Flickr's wrapped JSON response correctly", async () => {
    fetch.mockResponseOnce(makeFeedResponse([{ title: "my photo" }]));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFlickrPublicFeed("search this")
    );

    expect(result.all).toEqual([
      { status: "INITIAL", queryResultItems: [] },
      { status: "FETCHING", queryResultItems: [] },
    ]);
    await waitForNextUpdate();
    expect(result.all.slice(2)).toEqual([
      { status: "FETCHING", queryResultItems: [{ title: "my photo" }] },
      { status: "FETCHED", queryResultItems: [{ title: "my photo" }] },
    ]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
