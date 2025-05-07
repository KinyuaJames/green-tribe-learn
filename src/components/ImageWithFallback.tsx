
import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc1?: string;
  fallbackSrc2?: string;
  defaultFallback?: string;
  alt: string;
  className?: string;
}

// Use the newly uploaded image as default fallback
const defaultPlaceholder = "/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png";

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc1,
  fallbackSrc2,
  defaultFallback = defaultPlaceholder,
  alt,
  className = "",
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || '');
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Reset state when src changes
    if (src) {
      setImgSrc(src);
      setFallbackIndex(0);
      setHasError(false);
      setIsLoaded(false);
    } else if (fallbackSrc1) {
      // If src is empty but we have a fallback, use it immediately
      setImgSrc(fallbackSrc1);
      setFallbackIndex(1);
      setIsLoaded(false);
    } else if (fallbackSrc2) {
      setImgSrc(fallbackSrc2);
      setFallbackIndex(2);
      setIsLoaded(false);
    } else {
      setImgSrc(defaultFallback);
      setHasError(true);
      setIsLoaded(true);
    }
  }, [src, fallbackSrc1, fallbackSrc2, defaultFallback]);

  const handleError = () => {
    console.log(`Image failed to load: ${imgSrc}`);
    if (fallbackIndex === 0 && fallbackSrc1) {
      setImgSrc(fallbackSrc1);
      setFallbackIndex(1);
    } else if (fallbackIndex === 1 && fallbackSrc2) {
      setImgSrc(fallbackSrc2);
      setFallbackIndex(2);
    } else {
      console.log(`Using default fallback: ${defaultFallback}`);
      setImgSrc(defaultFallback);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      className={`${className} ${hasError ? 'error' : ''} with-fallback ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
      loading="lazy"
      {...rest}
    />
  );
};

export default ImageWithFallback;
