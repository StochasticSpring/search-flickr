import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageWithSkeleton from "@components/ImageWIthSkeleton";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import humanizeDateShort from "../utils/humanizeDateShort";

const ImageListItemWithExpansion = (props) => {
  const { item, isTouchDevice, ...otherProps } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const imageListItemRef = useRef(null);

  return (
    <ImageListItem ref={imageListItemRef} {...otherProps}>
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <ImageWithSkeleton src={item.media.m} alt={item.title} loading="lazy" />
      </a>
      <Slide
        direction="up"
        in={isExpanded}
        container={imageListItemRef.current}
      >
        <ImageListItemBar
          title={
            <Typography variant="inherit" sx={{ whiteSpace: "normal" }}>
              {item.title}
            </Typography>
          }
          subtitle={
            <>
              <Typography variant="inherit" sx={{ whiteSpace: "normal" }}>
                {`by: ${item.author}`}
              </Typography>
              <Typography variant="inherit">{`on: ${humanizeDateShort(
                item.date_taken
              )}`}</Typography>
              <Typography
                variant="inherit"
                sx={{ whiteSpace: "normal" }}
              >{`tags: ${item.tags}`}</Typography>
            </>
          }
          sx={{ maxHeight: "100%" }}
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
