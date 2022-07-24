import { useState, useEffect } from "react";

function useFlickrPublicFeed(input) {
  const INITIAL = "INITIAL";
  const FETCHING = "FETCHING";
  const FETCHED = "FETCHED";

  const [status, setStatus] = useState(INITIAL);
  const [queryResultItems, setQueryResultItems] = useState([]);

  useEffect(() => {
    if (input.length === 0) return;

    const fetchResults = async () => {
      setStatus(FETCHING);
      const response = await fetch(
        `/flickr/services/feeds/photos_public.gne?format=json&tags=${input}`
      );
      const bodyText = await response.text();

      // Flickr returns a JSON wrapped in some extra text
      const jsonStr = bodyText.replace("jsonFlickrFeed(", "").slice(0, -1);
      setQueryResultItems(JSON.parse(jsonStr).items);
      setStatus(FETCHED);
    };

    fetchResults();
  }, [input]);

  return { status, queryResultItems };
}

export default useFlickrPublicFeed;
