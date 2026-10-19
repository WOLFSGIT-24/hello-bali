import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ZoomIn, X, Check, BedDouble, Bath, Maximize2, Layers } from "lucide-react";
import { floorPlansData } from "../data";
import { FloorPlanUnit } from "../types";

interface FloorPlansProps {
  onSelectUnit: (unitType: string) => void;
  isUnlocked: boolean;
  onUnlockRequest: () => void;
  onOpenBooking?: () => void;
}

export default function FloorPlans({
  onSelectUnit,
  isUnlocked,
  onUnlockRequest,
  onOpenBooking,
}: FloorPlansProps) {
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const currentPlan = floorPlansData[activePlanIdx] || floorPlansData[0];

  return (
    <section id="floor-plans" className="w-full py-16 sm:py-24 bg-[#FAF6F0] text-[#1A1F24] overflow-hidden font-body relative">
      {/* Ghost Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] text-[#1A1F24] font-display text-8xl sm:text-[14rem] font-black tracking-widest whitespace-nowrap">
        FLOOR PLAN
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Header matching PDF Page 30 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-[#E06D38] uppercase block">
              Dimensional Blueprints
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1F24] leading-[1.15]">
              Villa Floor Plans
            </h2>
            <p className="font-script text-2xl text-[#E06D38]">
              Spacious Interiors & Seamless Outdoor Living
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Choose between the Type 1 (2 BHK with Rooftop Lounge) or Type 2 (3 BHK Expandable Villa), each featuring generous deck areas, private crystal pools, and outdoor dining bars.
            </p>
            <div>
              <button
                onClick={() => {
                  if (onOpenBooking) onOpenBooking();
                  else onUnlockRequest();
                }}
                className="bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer tracking-wide inline-flex items-center gap-2"
              >
                <span>Request Floor Plans & Pricing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Plan Selector Buttons */}
        <div className="flex items-center justify-center gap-3">
          {floorPlansData.map((plan, idx) => (
            <button
              key={plan.id}
              onClick={() => setActivePlanIdx(idx)}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                idx === activePlanIdx
                  ? "bg-[#1A1F24] text-white shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Layers className="w-4 h-4 text-[#E06D38]" />
              <span>{plan.title.split("-")[0].trim()} ({plan.type})</span>
            </button>
          ))}
        </div>

        {/* Main Floor Plan Spotlight Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual 3D Layout Image */}
            <div className="lg:col-span-7 space-y-4">
              <div
                onClick={() => setFullscreenImage(currentPlan.imageUrl)}
                className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#FAF8F5] border border-gray-100 flex items-center justify-center p-4 cursor-pointer group"
              >
                <img
                  src={currentPlan.imageUrl}
                  alt={currentPlan.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1A1F24] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                    {currentPlan.unitNo}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md transition-all">
                  <ZoomIn className="w-4 h-4 text-[#E06D38]" />
                </div>
              </div>

              {/* Sub-Isometric Thumbnail Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setFullscreenImage(activePlanIdx === 0 ? "/assets/hello_bali/extracted/floor_plan_type1_iso_a.jpg" : "/assets/hello_bali/extracted/floor_plan_type2_iso_a.jpg")}
                  className="bg-[#FAF8F5] rounded-xl p-2 border border-gray-200 cursor-pointer hover:border-[#E06D38] transition-colors flex items-center gap-2"
                >
                  <img
                    src={activePlanIdx === 0 ? "/assets/hello_bali/extracted/floor_plan_type1_iso_a.jpg" : "/assets/hello_bali/extracted/floor_plan_type2_iso_a.jpg"}
                    alt="Isometric View 1"
                    className="w-16 h-12 object-contain rounded"
                  />
                  <div className="text-[11px]">
                    <span className="font-bold text-[#1A1F24] block">View 1</span>
                    <span className="text-gray-500">Living & Suite</span>
                  </div>
                </div>

                <div
                  onClick={() => setFullscreenImage(activePlanIdx === 0 ? "/assets/hello_bali/extracted/floor_plan_type1_iso_b.jpg" : "/assets/hello_bali/extracted/floor_plan_type2_iso_b.jpg")}
                  className="bg-[#FAF8F5] rounded-xl p-2 border border-gray-200 cursor-pointer hover:border-[#E06D38] transition-colors flex items-center gap-2"
                >
                  <img
                    src={activePlanIdx === 0 ? "/assets/hello_bali/extracted/floor_plan_type1_iso_b.jpg" : "/assets/hello_bali/extracted/floor_plan_type2_iso_b.jpg"}
                    alt="Isometric View 2"
                    className="w-16 h-12 object-contain rounded"
                  />
                  <div className="text-[11px]">
                    <span className="font-bold text-[#1A1F24] block">View 2</span>
                    <span className="text-gray-500">Deck & Pavilion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information & Spec */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#E06D38]">
                  {currentPlan.type}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1F24]">
                  {currentPlan.title}
                </h3>
              </div>

              {/* Quick Specs Pill Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1.5 bg-[#FAF6F0] px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-800">
                  <BedDouble className="w-4 h-4 text-[#E06D38]" />
                  <span>{currentPlan.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#FAF6F0] px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-800">
                  <Bath className="w-4 h-4 text-[#0284C7]" />
                  <span>{currentPlan.bathrooms} Spa Baths</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#FAF6F0] px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-800">
                  <Maximize2 className="w-4 h-4 text-[#15803D]" />
                  <span>Private Pool & Deck</span>
                </div>
              </div>

              {/* Layout Highlights */}
              <div className="space-y-2.5 pt-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Layout Highlights:
                </span>
                <div className="space-y-2">
                  {currentPlan.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-[#E06D38]/15 flex items-center justify-center shrink-0 text-[#E06D38]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectUnit(currentPlan.type)}
                  className="bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-8 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Enquire for {currentPlan.type}
                </button>
              </div>

            </div>

          </div>
        </div>


      </div>

      {/* Fullscreen Image Zoom Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full p-4 relative shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-xs uppercase font-bold tracking-wider text-[#E06D38]">
                Hello Bali • High-Resolution Layout Blueprint
              </span>
              <button
                onClick={() => setFullscreenImage(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-auto flex-1 my-3 flex items-center justify-center bg-[#FAF6F0] rounded-xl p-4">
              <img
                src={fullscreenImage}
                alt="Enlarged Blueprint"
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}


    </section>
  );
}
