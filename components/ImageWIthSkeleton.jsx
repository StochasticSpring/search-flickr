import { useState } from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

const ImageWithSkeleton = (props) => {
  const { src, alt } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Box
        component={"img"}
        onLoad={() => setIsLoading(false)}
        src={src}
        alt={alt}
        width="100%"
        display={isLoading ? "none" : "block"}
      />
      {isLoading && (
        <Skeleton variant="rectangular" width="100%" height="25vh" />
      )}
    </>
  );
};

export default ImageWithSkeleton;
