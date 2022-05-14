import React, { useEffect, useState } from "react";
import Image from "next/image";
import fallback from "../public/fallback.png";

interface IImageWithFallback {
  src: any;
  alt: string;
  [propName: string]: {} | null;
}

const ImageWithFallback = (props: IImageWithFallback) => {
  const { src, alt, ...rest } = props;
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      alt={alt}
      {...rest}
      src={imageError ? fallback : src || fallback}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          setImageError(true);
        }
      }}
      onError={() => setImageError(true)}
    />
  );
};

export default ImageWithFallback;
