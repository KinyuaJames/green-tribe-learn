
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
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
  
  if (images.length === 0) {
    return null;
  }
  
  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
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
  
  // Dynamically set the column class based on props
  const columnClass = `masonry-gallery`;
  
  // Light box navigation handling with keyboard
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prevIndex) => 
          (prevIndex + 1) % images.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prevIndex) => 
          (prevIndex - 1 + images.length) % images.length
        );
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);
  
  return (
    <>
      <div className={columnClass} style={{ columnCount: columnCount }}>
        {images.map((image, index) => (
          <div className="masonry-item" key={index}>
            <div 
              className="w-full overflow-hidden rounded-md cursor-pointer transition-transform hover:shadow-lg relative group"
              onClick={() => openLightbox(index)}
            >
              <ImageWithFallback
                src={image}
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
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative max-w-screen-lg max-h-[90vh] p-4" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <ImageWithFallback
                src={images[activeImageIndex]}
                alt={`Gallery image ${activeImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain mx-auto"
              />
              
              {/* Navigation buttons */}
              <button 
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/50 rounded-full p-2 transition"
              >
                ←
              </button>
              <button 
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/50 rounded-full p-2 transition"
              >
                →
              </button>
              
              {/* Close button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/50 rounded-full p-2 transition"
              >
                ✕
              </button>
              
              {/* Download button */}
              <button 
                onClick={(e) => handleDownload(e, images[activeImageIndex])}
                className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/50 rounded-full p-2 transition"
              >
                <Download className="h-4 w-4" />
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-4 bg-white/20 px-3 py-1 rounded-full text-sm">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasonryGallery;
