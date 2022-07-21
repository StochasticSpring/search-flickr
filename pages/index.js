import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import useDebouncedValue from "../hooks/useDebouncedValue";

const QUERY_DEBOUNCE_MS = 300;

export default function Home() {
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
    const items = JSON.parse(jsonStr).items
    setQueryResultItems(items);
    console.log(items);
  };

  useEffect(
    () => {
      if (debouncedUserInput.trim().length > 0) {
        fetchQueryResults(debouncedUserInput.trim());
      }
    }, [debouncedUserInput]
  )

  return (
    <div className="container">
      <Head>
        <title>Search Flickr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Search the Flickr public feed!" />
        <TextField
          fullWidth
          label="Search"
          placeholder="Search images by tag..."
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          sx={{ maxWidth: "600px" }}
        />
      </main>

      <Footer />
    </div>
  );
}
