import { useState } from "react";
import { Typography } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageWithSkeleton from "@components/ImageWIthSkeleton";
import styled, { ThemeProvider } from 'styled-components';

const ImageListItemWithExpansion = (props) => {
  const { item, ...otherProps } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ImageListItem
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      {...otherProps}
    >
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <ImageWithSkeleton src={item.media.m} alt={item.title} loading="lazy" />
      </a>
      <ImageListItemBar
        title={item.title}
        subtitle={
          isExpanded ? (
            <>
              <Typography>{`by: ${item.author}`}</Typography>
              <Typography>{`on: ${item.date_taken.split("T")[0]}`}</Typography>
            </>
          ) : (
            item.author
          )
        }
        sx={{
          height: isExpanded ? "50%" : "default",
          transition: "all 4s 1s",
        }}
      />
    </ImageListItem>
  );
};

export default ImageListItemWithExpansion;
