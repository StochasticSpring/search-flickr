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
import useFlickrPublicFeed from "../hooks/useFlickrPublicFeed";

const QUERY_DEBOUNCE_MS = 300;

export default function Home() {
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [userInput, setUserInput] = useState("");
  const debouncedUserInput = useDebouncedValue(
    userInput,
    QUERY_DEBOUNCE_MS
  ).trim();

  const { isLoading, queryResultItems } =
    useFlickrPublicFeed(debouncedUserInput);

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
          <ImageList
            variant="masonry"
            cols={matchesDownSm ? 1 : 3}
            gap={8}
            sx={{ overflowY: "visible" }}
          >
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
