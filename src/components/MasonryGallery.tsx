
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from './ImageWithFallback';

interface MasonryGalleryProps {
  images: string[];
  columnCount?: number;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ 
  images = [], 
  columnCount = 3 
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(-1);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  
  // Ensure we have at least 9 images for the gallery
  const displayImages = images.length < 9 ? 
    [...images, ...Array(9 - images.length).fill('/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png')] : 
    images;
  
  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setPrevImageIndex(-1);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
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
              className="w-full overflow-hidden rounded-md cursor-pointer transition-transform hover:shadow-lg relative group"
              onClick={() => openLightbox(index)}
            >
              <ImageWithFallback
                src={image}
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
      
      {/* Enhanced Lightbox with blurred background of next image */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Background image (blurred next image) */}
          <div 
            className="absolute inset-0 opacity-30 transition-opacity duration-500 ease-in-out" 
            style={{
              backgroundImage: `url(${displayImages[getNextImageIndex()]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
            }}
          />
          
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
                    defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png" 
                    alt={`Gallery image ${prevImageIndex + 1}`}
                    className="max-w-full max-h-[80vh] object-contain mx-auto"
                  />
                </div>
              )}
              
              {/* Current image */}
              <div className={`transition-all duration-300 ${
                prevImageIndex >= 0 ? (
                  direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                ) : ''
              }`}>
                <ImageWithFallback
                  src={displayImages[activeImageIndex]}
                  defaultFallback="/lovable-uploads/bcac50e7-5c57-4a7d-b36e-aebbe083f46c.png"
                  alt={`Gallery image ${activeImageIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg shadow-xl"
                />
              </div>
              
              {/* Navigation buttons with enhanced styling */}
              <button 
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/60 rounded-full p-4 transition-all transform hover:scale-110 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/60 rounded-full p-4 transition-all transform hover:scale-110 backdrop-blur-sm"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Close button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/30 hover:bg-white/60 rounded-full p-3 transition-all transform hover:scale-110 backdrop-blur-sm"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Download button */}
              <button 
                onClick={(e) => handleDownload(e, displayImages[activeImageIndex])}
                className="absolute bottom-4 right-4 bg-white/30 hover:bg-white/60 rounded-full p-3 transition-all transform hover:scale-110 backdrop-blur-sm flex items-center justify-center"
                aria-label="Download image"
              >
                <Download className="h-6 w-6 text-white" />
              </button>
              
              {/* Image counter and badge */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <Badge className="bg-white/30 text-white backdrop-blur-sm px-4 py-1.5 hover:bg-white/40 transition-colors text-lg">
                  {activeImageIndex + 1} / {displayImages.length}
                </Badge>
                
                <Badge variant="outline" className="bg-black/40 text-white backdrop-blur-sm border-white/30 px-3 py-1.5">
                  Gallery
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasonryGallery;
