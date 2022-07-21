import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [userInput, setUserInput] = useState("");

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
          sx={{maxWidth: "600px"}}
        />
      </main>

      <Footer />
    </div>
  )
}
