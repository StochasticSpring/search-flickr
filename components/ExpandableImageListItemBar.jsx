import { useState } from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const ExpandedImageListItemBar = (props) => {
  const { item } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const makeSubtitle = () => {
    if (isExpanded) {
      return `by: ${item.author} \non: ${item.date_taken.split("T")[0]}`
    } else {
      return item.author
    }
  }

  return <ImageListItemBar
    title={item.title}
    subtitle={makeSubtitle()}
    onMouseEnter={() => setIsExpanded(true)}
    onMouseLeave={() => setIsExpanded(false)}
  />;
};

export default ExpandedImageListItemBar;
