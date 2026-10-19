import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LevelCarouselProps {
  images: string[];
  title: string;
}

export default function LevelCarousel({ images, title }: LevelCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.4)] bg-navy-dark group">
      {/* Image sliding track */}
      <div 
        className="flex transition-transform duration-700 ease-in-out w-full aspect-[4/3] sm:aspect-[16/10]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${title} - image ${idx + 1}`}
            loading="lazy"
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy-dark/40 hover:bg-navy-dark/80 border border-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-auto"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy-dark/40 hover:bg-navy-dark/80 border border-white/20 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-auto"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-6 bg-champagne" : "w-1.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
