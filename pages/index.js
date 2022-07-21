import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import useDebouncedValue from "../hooks/useDebouncedValue";

const QUERY_DEBOUNCE_MS = 300;

export default function Home() {
  const theme = useTheme();

  const [userInput, setUserInput] = useState("");
  const [queryResultItems, setQueryResultItems] = useState([]);
  const debouncedUserInput = useDebouncedValue(userInput, QUERY_DEBOUNCE_MS);

  const fetchQueryResults = async (input) => {
    const response = await fetch(
      `/flickr/services/feeds/photos_public.gne?format=json&tags=${input}`
    );
    const bodyText = await response.text();

    // Flickr returns a JSON wrapped in some extra text
    const jsonStr = bodyText.replace("jsonFlickrFeed(", "").slice(0, -1);
    const items = JSON.parse(jsonStr).items;
    setQueryResultItems(items);
  };

  useEffect(() => {
    if (debouncedUserInput.trim().length > 0) {
      fetchQueryResults(debouncedUserInput.trim());
    }
  }, [debouncedUserInput]);

  return (
    <Box container display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" sx={{ margin: theme.spacing(2) }}>
        Search the Flickr public feed!
      </Typography>
      <TextField
        fullWidth
        label="Search"
        placeholder="Search images by tag..."
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        sx={{ maxWidth: "600px" }}
      />
      <Box>
        {!!queryResultItems.length && (
          <ImageList variant="masonry" cols={3} gap={8} sx={{ width: 500 }}>
            {queryResultItems.map((item) => (
              <ImageListItem key={item.media.m}>
                <img src={item.media.m} alt={item.title} loading="lazy" />
                <ImageListItemBar title={item.title} subtitle={item.author} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Box>
  );
}
