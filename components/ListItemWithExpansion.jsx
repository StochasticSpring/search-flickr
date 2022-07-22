import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageWithSkeleton from "@components/ImageWIthSkeleton";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const ImageListItemWithExpansion = (props) => {
  const { item, isTouchDevice, ...otherProps } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const ImageListItemRef = useRef(null);

  return (
    <ImageListItem
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
          sx={{ maxHeight: "100%", overflowY: "auto" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
        />
      </Slide>
      <Fade in={!isExpanded}>
        <ImageListItemBar
          title={item.title}
          subtitle={item.author}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${item.title}`}
            >
              <InfoIcon />
            </IconButton>
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }}
        />
      </Fade>
    </ImageListItem>
  );
};

export default ImageListItemWithExpansion;
