import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import ImageList from "@mui/material/ImageList";
import ImageListItemWithExpansion from "@components/ListItemWithExpansion";
import useDebouncedValue from "../hooks/useDebouncedValue";

const QUERY_DEBOUNCE_MS = 300;

export default function Home() {
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [queryResultItems, setQueryResultItems] = useState([]);
  const debouncedUserInput = useDebouncedValue(userInput, QUERY_DEBOUNCE_MS).trim();

  const fetchQueryResults = async (input) => {
    setIsLoading(true);
    const response = await fetch(
      `/flickr/services/feeds/photos_public.gne?format=json&tags=${input}`
    );
    const bodyText = await response.text();

    // Flickr returns a JSON wrapped in some extra text
    const jsonStr = bodyText.replace("jsonFlickrFeed(", "").slice(0, -1);
    const items = JSON.parse(jsonStr).items;
    setQueryResultItems(items);
    setIsLoading(false);
  };

  useEffect(() => {
    if (debouncedUserInput.length > 0) {
      fetchQueryResults(debouncedUserInput);
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
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="inherit" />
        </Box>
      )}
      <Box>
        {!!queryResultItems.length && (
          <ImageList variant="masonry" cols={matchesDownSm ? 1 : 3} gap={8}>
            {queryResultItems.map((item) => (
              <ImageListItemWithExpansion
                item={item}
                key={item.media.m}
                sx={{
                  width: { xs: "80vw", sm: "30vw", lg: 380 },
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
