import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageWithSkeleton from "@components/ImageWIthSkeleton";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";

const ImageListItemWithExpansion = (props) => {
  const { item, ...otherProps } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const ImageListItemRef = useRef(null);

  return (
    <ImageListItem
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      ref={ImageListItemRef}
      {...otherProps}
    >
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <ImageWithSkeleton src={item.media.m} alt={item.title} loading="lazy" />
      </a>
      <Slide
        direction="up"
        in={isExpanded}
        container={ImageListItemRef.current}
      >
        <ImageListItemBar
          title={item.title}
          subtitle={
            <>
              <Typography variant="inherit">{`by: ${item.author}`}</Typography>
              <Typography variant="inherit">{`on: ${
                item.date_taken.split("T")[0]
              }`}</Typography>
              <Typography
                variant="inherit"
                sx={{ whiteSpace: "normal" }}
              >{`tags: ${item.tags}`}</Typography>
            </>
          }
        />
      </Slide>
      <Fade in={!isExpanded}>
        <ImageListItemBar title={item.title} subtitle={item.author} />
      </Fade>
    </ImageListItem>
  );
};

export default ImageListItemWithExpansion;
