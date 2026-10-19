import React, { useState } from "react";
import { ArrowRight, ZoomIn, X } from "lucide-react";
import { lifestyleAmenitiesData, leisureAmenitiesData } from "../data";
import { AmenityItem } from "../types";

interface AmenitiesProps {
  onOpenBooking?: () => void;
}

export default function Amenities({ onOpenBooking }: AmenitiesProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);

  return (
    <section id="amenities" className="w-full py-16 sm:py-24 bg-white text-[#1A1F24] overflow-hidden font-body relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        
        {/* Section Header matching Page 38 & 39 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-[#E06D38] uppercase block">
              Curated World-Class Living
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1F24] leading-[1.15]">
              Lifestyle & Leisure Amenities
            </h2>
            <p className="font-script text-2xl text-[#E06D38]">
              Where Wellness Meets Tropical Vitality
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Thoughtfully curated wellness, recreation, and social spaces nestled within serene tropical landscapes for a true resort lifestyle.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-8 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer tracking-wide"
              >
                Book a Guided Tour
              </button>
            </div>
          </div>
        </div>

        {/* Curated Premier 6 Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            lifestyleAmenitiesData.find((a) => a.id === "swimming-pool")!,
            lifestyleAmenitiesData.find((a) => a.id === "gym")!,
            lifestyleAmenitiesData.find((a) => a.id === "spa-room")!,
            lifestyleAmenitiesData.find((a) => a.id === "cafe")!,
            leisureAmenitiesData.find((a) => a.id === "mango-trail")!,
            leisureAmenitiesData.find((a) => a.id === "yoga-deck")!,
          ].filter(Boolean).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAmenity(item)}
              className="group bg-[#FAF6F0] rounded-2xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[11px] text-white font-medium flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-[#F48753]" />
                    <span>View Details</span>
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E06D38] block mb-0.5">
                    {item.tagline}
                  </span>
                  <h3 className="font-display text-base font-bold text-[#1A1F24] leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs font-semibold text-[#1A1F24] group-hover:text-[#E06D38] transition-colors">
                  <span>Explore Amenity</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>



      </div>

      {/* Amenity Detail Modal */}
      {selectedAmenity && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedAmenity(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              <img
                src={selectedAmenity.imageUrl}
                alt={selectedAmenity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <button
                onClick={() => setSelectedAmenity(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F48753] block mb-1">
                  {selectedAmenity.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  {selectedAmenity.title}
                </h3>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div>
                <span className="text-xs font-bold text-[#E06D38] uppercase tracking-wider block mb-1">
                  {selectedAmenity.tagline}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  {selectedAmenity.description}
                </p>
              </div>

              {selectedAmenity.bullets && selectedAmenity.bullets.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Feature Highlights:
                  </span>
                  <div className="space-y-1.5">
                    {selectedAmenity.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E06D38] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedAmenity(null);
                    if (onOpenBooking) onOpenBooking();
                  }}
                  className="bg-[#E06D38] hover:bg-[#C55624] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all cursor-pointer"
                >
                  Schedule Site Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
