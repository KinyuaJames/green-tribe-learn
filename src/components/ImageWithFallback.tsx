
import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc1?: string;
  fallbackSrc2?: string;
  defaultFallback?: string;
  alt: string;
  className?: string;
}

const defaultPlaceholder = "/placeholder.svg";

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc1,
  fallbackSrc2,
  defaultFallback = defaultPlaceholder,
  alt,
  className = "",
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src);
    setFallbackIndex(0);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (fallbackIndex === 0 && fallbackSrc1) {
      setImgSrc(fallbackSrc1);
      setFallbackIndex(1);
    } else if (fallbackIndex === 1 && fallbackSrc2) {
      setImgSrc(fallbackSrc2);
      setFallbackIndex(2);
    } else {
      setImgSrc(defaultFallback);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={`${className} ${hasError ? 'error' : ''} with-fallback`}
      loading="lazy"
      {...rest}
    />
  );
};

export default ImageWithFallback;
