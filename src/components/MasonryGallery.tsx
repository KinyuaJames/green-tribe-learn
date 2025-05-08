
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from './ImageWithFallback';
import '../styles/animations.css';

interface MasonryGalleryProps {
  images: string[];
  columnCount?: number;
}

// Array of reliable fallback images
const fallbackImages = [
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png',
  '/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png'
];

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ 
  images = [], 
  columnCount = 3 
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(-1);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [animatingClosure, setAnimatingClosure] = useState(false);
  
  // Ensure we have at least 9 images for the gallery
  const displayImages = images.length < 9 ? 
    [...images, ...fallbackImages.slice(0, Math.max(9 - images.length, 0))] : 
    images;
  
  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setPrevImageIndex(-1);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  const closeLightbox = () => {
    setAnimatingClosure(true);
    setTimeout(() => {
      setLightboxOpen(false);
      setAnimatingClosure(false);
      document.body.style.overflow = ''; // Re-enable scrolling
    }, 300); // Match this with the animation duration
  };
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrevImageIndex(activeImageIndex);
    setDirection('next');
    setActiveImageIndex((prevIndex) => 
      (prevIndex + 1) % displayImages.length
    );
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrevImageIndex(activeImageIndex);
    setDirection('prev');
    setActiveImageIndex((prevIndex) => 
      (prevIndex - 1 + displayImages.length) % displayImages.length
    );
  };
  
  const handleDownload = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get the next image for blurred background
  const getNextImageIndex = () => {
    return (activeImageIndex + 1) % displayImages.length;
  };
  
  // Light box navigation handling with keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setPrevImageIndex(activeImageIndex);
        setDirection('next');
        setActiveImageIndex((prevIndex) => 
          (prevIndex + 1) % displayImages.length
        );
      } else if (e.key === 'ArrowLeft') {
        setPrevImageIndex(activeImageIndex);
        setDirection('prev');
        setActiveImageIndex((prevIndex) => 
          (prevIndex - 1 + displayImages.length) % displayImages.length
        );
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, displayImages.length, activeImageIndex]);
  
  return (
    <>
      <div className="masonry-gallery" style={{ columnCount: columnCount }}>
        {displayImages.map((image, index) => (
          <div className="masonry-item" key={index}>
            <div 
              className="w-full overflow-hidden rounded-md cursor-pointer transition-transform hover:shadow-lg relative group mb-4"
              onClick={() => openLightbox(index)}
            >
              <ImageWithFallback
                src={image}
                fallbackSrc1={fallbackImages[index % fallbackImages.length]}
                defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png"
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => handleDownload(e, image)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Lightbox with fullscreen blurred background of next image */}
      {lightboxOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center ${animatingClosure ? 'animate-fade-out' : 'animate-lightbox-open'}`}
          onClick={closeLightbox}
        >
          {/* Background image (blurred next image) */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url(${displayImages[getNextImageIndex()] || fallbackImages[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
              transform: 'scale(1.1)', // Slightly larger to avoid seeing edges during blur
              opacity: 0.8,
            }}
          />
          
          {/* Additional dark overlay for better visibility */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Main content */}
          <div 
            className="relative max-w-screen-lg max-h-[90vh] p-4" 
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              {/* Previous image (for animation) */}
              {prevImageIndex >= 0 && (
                <div 
                  className={`absolute inset-0 transition-all duration-300 ${
                    direction === 'next' ? 'animate-slide-out-left' : 'animate-slide-out-right'
                  }`}
                >
                  <ImageWithFallback
                    src={displayImages[prevImageIndex]}
                    fallbackSrc1={fallbackImages[prevImageIndex % fallbackImages.length]}
                    defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png" 
                    alt={`Gallery image ${prevImageIndex + 1}`}
                    className="max-w-full max-h-[80vh] object-contain mx-auto"
                  />
                </div>
              )}
              
              {/* Current image with animation */}
              <div className={`transition-all duration-300 ${
                prevImageIndex >= 0 ? (
                  direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                ) : 'animate-zoom-in'
              }`}>
                <ImageWithFallback
                  src={displayImages[activeImageIndex]}
                  fallbackSrc1={fallbackImages[activeImageIndex % fallbackImages.length]}
                  defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png"
                  alt={`Gallery image ${activeImageIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
          
          {/* Fixed position navigation buttons (outside the image container) */}
          <button 
            onClick={prevImage}
            className="fixed left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-4 transition-all transform hover:scale-110 backdrop-blur-sm z-60 animate-fade-in"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextImage}
            className="fixed right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-4 transition-all transform hover:scale-110 backdrop-blur-sm z-60 animate-fade-in"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Fixed close button */}
          <button 
            onClick={closeLightbox}
            className="fixed top-8 right-8 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all transform hover:scale-110 backdrop-blur-sm z-60 animate-fade-in"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Fixed download button */}
          <button 
            onClick={(e) => handleDownload(e, displayImages[activeImageIndex])}
            className="fixed bottom-8 right-8 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all transform hover:scale-110 backdrop-blur-sm z-60 flex items-center justify-center animate-fade-in"
            aria-label="Download image"
          >
            <Download className="h-6 w-6 text-white" />
          </button>
          
          {/* Fixed image counter and badge */}
          <div className="fixed bottom-8 left-8 flex items-center space-x-2 z-60 animate-fade-in">
            <Badge className="bg-white/20 text-white backdrop-blur-sm px-4 py-1.5 hover:bg-white/40 transition-colors text-lg">
              {activeImageIndex + 1} / {displayImages.length}
            </Badge>
            
            <Badge variant="outline" className="bg-black/20 text-white backdrop-blur-sm border-white/30 px-3 py-1.5">
              Gallery
            </Badge>
          </div>
        </div>
      )}
    </>
  );
};

export default MasonryGallery;
