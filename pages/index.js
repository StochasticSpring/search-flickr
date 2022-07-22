import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import ImageList from "@mui/material/ImageList";
import ImageListItemWithExpansion from "@components/ListItemWithExpansion";
import useDebouncedValue from "../hooks/useDebouncedValue";

const QUERY_DEBOUNCE_MS = 300;

export default function Home() {
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Container>
      <Typography variant="h3" sx={{ margin: theme.spacing(2) }}>
        Search the Flickr public feed!
      </Typography>
      <TextField
        fullWidth
        label="Search"
        placeholder="Search images by tag..."
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
      />
      <Box>
        {!!queryResultItems.length && (
          <ImageList variant="masonry" cols={matchesDownSm ? 2 : 3} gap={8}>
            {queryResultItems.map((item) => (
              <ImageListItemWithExpansion
                item={item}
                key={item.media.m}
                sx={{
                  width: { xs: "40vw", sm: "30vw", lg: 380 },
                  minHeight: 120,
                }}
              />
            ))}
          </ImageList>
        )}
      </Box>
    </Container>
  );
}
