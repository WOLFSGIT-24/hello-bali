import React, { useState, useEffect } from "react";
import { ZoomIn, X, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { villaExperiences } from "../data";

interface GalleryProps {
  onSelectUnit?: (unitType: string) => void;
  onOpenBooking?: () => void;
}

export default function Gallery({ onSelectUnit, onOpenBooking }: GalleryProps) {
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevExperience = () => {
    setActiveExperienceIndex((prev) => (prev - 1 + villaExperiences.length) % villaExperiences.length);
  };

  const handleNextExperience = () => {
    setActiveExperienceIndex((prev) => (prev + 1) % villaExperiences.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) handleNextExperience();
    else if (diff < -40) handlePrevExperience();
    setTouchStartX(null);
  };

  const getCircularOffset = (index: number) => {
    let diff = index - activeExperienceIndex;
    const total = villaExperiences.length;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const getCardStyle = (diff: number) => {
    const absDiff = Math.abs(diff);
    const maxVisible = isMobile ? 2 : 3;

    if (absDiff > maxVisible) {
      return {
        opacity: 0,
        pointerEvents: "none" as const,
        transform: `translate(-50%, -50%) translateX(${diff * 260}px) scale(0.5) translateZ(-400px)`,
        zIndex: 0,
      };
    }

    const spacing = isMobile ? 120 : 210;
    const x = diff * spacing;
    const rotateY = -diff * (isMobile ? 22 : 18);
    const z = -absDiff * (isMobile ? 25 : 35);
    const scale = 1 - absDiff * (isMobile ? 0.12 : 0.065);
    const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.95 : absDiff === 2 ? 0.8 : 0.6;
    const zIndex = 30 - absDiff * 5;

    return {
      transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  const featuredPillars = [
    { index: 0, num: "#01", title: "FrontYard Experience", subtitle: "Western Tradition & Bliss" },
    { index: 3, num: "#02", title: "Private Pool", subtitle: "Crystal-Clear Lagoon Waters" },
    { index: 5, num: "#03", title: "Balinese Gazebo", subtitle: "Open-Air Sheltered Pavilion" },
    { index: 1, num: "#04", title: "Outdoor Bar & Kitchen", subtitle: "Al Fresco Dining & BBQ" },
  ];

  return (
    <section id="design" className="w-full bg-[#1A1F24] text-white py-16 sm:py-24 overflow-hidden relative font-body">
      {/* Ghost Watermark Background Word */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-5 text-white font-display text-8xl sm:text-[14rem] font-black tracking-widest whitespace-nowrap">
        DESIGN
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header with "Schedule Walkthrough" CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-3.5 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E06D38]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#F48753] font-semibold">
                Curated Spaces
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Signature Villa Experiences
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl font-light">
              Explore each thoughtfully crafted Balinese sanctuary across Hello Bali's luxury weekend villas.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenBooking}
              className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold pl-5 pr-2 py-2 rounded-full border border-white/20 transition-all cursor-pointer shadow-lg hover:border-[#E06D38]/50"
            >
              <span>Schedule a Walkthrough</span>
              <span className="w-8 h-8 rounded-full bg-[#E06D38] group-hover:bg-[#C55624] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* 3D Curved Perspective Carousel Stage */}
        <div 
          className="relative w-full py-4 select-none overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* The 3D Scene */}
            <div 
              className="relative w-full h-[380px] sm:h-[450px] md:h-[510px] flex items-center justify-center"
              style={{
                perspective: isMobile ? "900px" : "1100px",
                perspectiveOrigin: "50% 50%",
                transformStyle: "preserve-3d",
              }}
            >
              {villaExperiences.map((exp, idx) => {
                const diff = getCircularOffset(idx);
                const isCenter = diff === 0;
                const cardStyle = getCardStyle(diff);

                return (
                  <div
                    key={exp.id}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveExperienceIndex(idx);
                      }
                    }}
                    style={cardStyle}
                    className={`absolute top-1/2 left-1/2 w-[220px] sm:w-[270px] md:w-[310px] h-[320px] sm:h-[390px] md:h-[460px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isCenter
                        ? "border-[#E06D38] ring-4 ring-[#E06D38]/40 shadow-[0_30px_70px_rgba(224,109,56,0.35)] cursor-default"
                        : "border-white/20 hover:border-white/40 cursor-pointer brightness-90 hover:brightness-105"
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={exp.imageUrl}
                      alt={exp.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                    {/* Top Tag Pill & Zoom */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
                      <span className="bg-[#E06D38] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full shadow-md">
                        {exp.tag}
                      </span>
                      {isCenter && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(exp.imageUrl);
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-[#E06D38] backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-md"
                          title="View High-Res Render"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white z-10">
                      <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#F48753] block mb-1">
                        #{String(idx + 1).padStart(2, "0")} • {exp.subtitle}
                      </span>
                      <h4 className="font-display text-base sm:text-xl md:text-2xl font-bold leading-tight drop-shadow-md">
                        {exp.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Navigation Controls */}
            <button
              onClick={handlePrevExperience}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#E06D38] text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-2xl hover:scale-110 active:scale-95 z-40"
              aria-label="Previous Space"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
            <button
              onClick={handleNextExperience}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#E06D38] text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-2xl hover:scale-110 active:scale-95 z-40"
              aria-label="Next Space"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>

          {/* Bottom Stepper Feature Row matching Reference Screenshot */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-white/10 max-w-5xl mx-auto">
            {featuredPillars.map((pillar) => {
              const isActive = activeExperienceIndex === pillar.index;
              return (
                <button
                  key={pillar.num}
                  onClick={() => setActiveExperienceIndex(pillar.index)}
                  className={`text-left group transition-all cursor-pointer p-3.5 rounded-2xl border ${
                    isActive
                      ? "border-[#E06D38]/60 bg-white/5 shadow-md"
                      : "border-transparent hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`text-xs sm:text-sm font-bold block transition-colors ${
                      isActive ? "text-[#E06D38]" : "text-[#F48753]/70 group-hover:text-[#F48753]"
                    }`}
                  >
                    {pillar.num}
                  </span>
                  <h5
                    className={`font-display text-sm sm:text-base font-bold mt-0.5 transition-colors ${
                      isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {pillar.title}
                  </h5>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-light">
                    {pillar.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

        </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-[#1A1F24] rounded-2xl max-w-5xl w-full p-4 relative shadow-2xl flex flex-col max-h-[92vh] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#F48753] font-semibold">
                Hello Bali • High-Resolution Render
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-auto flex-1 my-3 flex items-center justify-center bg-black/60 rounded-xl p-2">
              <img
                src={selectedImage}
                alt="Enlarged Render"
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
