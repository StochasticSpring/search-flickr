import { useState, useEffect } from "react";

function useFlickrPublicFeed(input) {
  const [isLoading, setIsLoading] = useState(false);
  const [queryResultItems, setQueryResultItems] = useState([]);

  useEffect(() => {
    if (input.length === 0) return;

    const fetchResults = async () => {
      setIsLoading(true);
      const response = await fetch(
        `/flickr/services/feeds/photos_public.gne?format=json&tags=${input}`
      );
      const bodyText = await response.text();

      // Flickr returns a JSON wrapped in some extra text
      const jsonStr = bodyText.replace("jsonFlickrFeed(", "").slice(0, -1);
      setQueryResultItems(JSON.parse(jsonStr).items);
      setIsLoading(false);
    };

    fetchResults();
  }, [input]);

  return { isLoading, queryResultItems };
}

export default useFlickrPublicFeed;
