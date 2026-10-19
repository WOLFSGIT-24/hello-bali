import React, { useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight, Compass, Layers, Check } from "lucide-react";
import { masterPlanPoints } from "../data";

interface MasterPlanProps {
  onSelectUnit?: (unitType: string) => void;
  onOpenBooking?: () => void;
}

const masterPlanViews = [
  {
    id: "enclave",
    title: "Master Enclave Plan",
    subtitle: "Full Villa Community & Green Infrastructure",
    image: "/assets/hello_bali/extracted/master_plan_enclave.jpg",
    description:
      "A thoughtfully organized enclave featuring Type 1 and Type 2 private villas connected by wide boulevards, lush green tree buffers, clubhouse zones, and scenic nature paths.",
  },
  {
    id: "isometric-callouts",
    title: "3D Villa Feature Anatomy",
    subtitle: "Rooftop Lounge, Pool, Gazebo & Bar Layout",
    image: "/assets/hello_bali/extracted/villa_type1_isometric_design.jpg",
    description:
      "Detailed 3D isometric overview highlighting key zones: Rooftop Lounge, Villa, Balinese Gazebo, Swimming Pool, Outdoor Bar & Kitchen, Symmetrical Tropical Garden, and Private Entrance.",
  },
  {
    id: "type1-plot",
    title: "Type 1 Villa Plot Layout",
    subtitle: "2 BHK with Rooftop Lounge & Deep Frontyard",
    image: "/assets/hello_bali/extracted/master_plan_type1_plot.jpg",
    description:
      "Top-down site plan showing the Type 1 villa plot layout: private pool, sunken firepit with surround seating, open-air gazebo, stone stepping path, frontyard lawn, and dedicated parking.",
  },
  {
    id: "type2-plot",
    title: "Type 2 Villa Plot Layout",
    subtitle: "3 BHK Single-Storey Footprint & Thatched Gazebo",
    image: "/assets/hello_bali/extracted/master_plan_type2_plot.jpg",
    description:
      "Site plan showcasing the Type 2 villa footprint: timber pool deck, swimming pool, authentic thatched-roof gazebo, sunken firepit, winding pathway, and entrance gate.",
  },
];

export default function MasterPlan({ onSelectUnit, onOpenBooking }: MasterPlanProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeView = masterPlanViews[currentIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? masterPlanViews.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === masterPlanViews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="master-plan" className="w-full py-16 sm:py-24 bg-[#FAF6F0] text-[#1A1F24] overflow-hidden font-body relative">
      {/* Ghost Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] text-[#1A1F24] font-display text-8xl sm:text-[14rem] font-black tracking-widest whitespace-nowrap">
        MASTER PLAN
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header matching PDF Page 26 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-[#E06D38] uppercase block">
              Architectural Site Layout
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1F24] leading-[1.15]">
              Master Plan
            </h2>
            <p className="font-script text-2xl text-[#E06D38]">
              Where Nature Embraces Luxury
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              A thoughtfully organized gated enclave featuring private pool villas, landscaped walkways, wide boulevards, and calming water features designed for ultimate serenity.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer tracking-wide inline-flex items-center gap-2"
              >
                <ZoomIn className="h-4 w-4" />
                <span>Enlarge Blueprint</span>
              </button>
            </div>
          </div>
        </div>

        {/* Master Plan Tab Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {masterPlanViews.map((view, idx) => (
            <button
              key={view.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                idx === currentIndex
                  ? "bg-[#1A1F24] text-white shadow-md scale-102"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {view.title}
            </button>
          ))}
        </div>

        {/* Master Plan Showcase Card */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm relative group">
          
          {/* Main Visual Display */}
          <div
            onClick={() => setModalOpen(true)}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#FAF8F5] rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer border border-gray-100"
          >
            <img
              src={activeView.image}
              alt={activeView.title}
              loading="lazy"
              className="w-full h-full object-contain p-2 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Slider Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-md z-10 transition-all opacity-80 hover:opacity-100 cursor-pointer"
              aria-label="Previous layout"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-md z-10 transition-all opacity-80 hover:opacity-100 cursor-pointer"
              aria-label="Next layout"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Hint overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="bg-black/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg">
                <ZoomIn className="h-4 w-4 text-[#F48753]" />
                <span>Click to inspect high-resolution blueprint</span>
              </div>
            </div>
          </div>

          {/* Caption & Description */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-5 border-t border-gray-100">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#E06D38] block">
                {activeView.subtitle}
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold text-[#1A1F24]">
                {activeView.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
                {activeView.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {masterPlanViews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-[#E06D38]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* High-Resolution Fullscreen Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-6xl w-full p-4 sm:p-6 relative shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-[#1A1F24] tracking-tight">
                  {activeView.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {activeView.subtitle} • Hello Bali Luxury Weekend Villas
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative overflow-auto flex-1 my-4 flex items-center justify-center bg-[#FAF8F5] p-2 sm:p-6 rounded-xl border border-gray-100 group">
              <img
                src={activeView.image}
                alt={activeView.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
              
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-4 rounded-full shadow-xl z-10 transition-all opacity-80 hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-4 rounded-full shadow-xl z-10 transition-all opacity-80 hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-gray-400 hidden sm:block">
                All villa plot layouts and amenities subject to final development plans
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2.5 bg-[#E06D38] hover:bg-[#C55624] text-white rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
