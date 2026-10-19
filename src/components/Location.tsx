import React, { useState } from "react";
import { MapPin, Navigation, Clock, Building, Compass, ZoomIn, X, Phone, ExternalLink } from "lucide-react";
import { locationsData, projectSnapshot } from "../data";

interface LocationProps {
  onOpenEnquiry: () => void;
}

export default function Location({ onOpenEnquiry }: LocationProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="location" className="w-full py-16 sm:py-24 bg-white text-[#1A1F24] overflow-hidden font-body relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header matching Page 37 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-[#E06D38] uppercase block">
              Strategic Highway Connectivity
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1F24] leading-[1.15]">
              Way to Find Hello Bali
            </h2>
            <p className="font-script text-2xl text-[#E06D38]">
              90 Mins Drive from Electronic City, Bangalore
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Effortless highway connectivity via the NH44 corridor through Hosur & Krishnagiri, placing your weekend sanctuary just 90 minutes from Bengaluru.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent("Bolabaguthanahalli, Palacode Taluk, Tamil Nadu 636804")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer tracking-wide inline-flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                <span>Navigate via Google Maps</span>
              </a>
              <button
                onClick={onOpenEnquiry}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-body text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer"
              >
                Schedule Site Visit Cab
              </button>
            </div>
          </div>
        </div>

        {/* Location Route Map & Commute Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Route Map Render from PDF */}
          <div className="lg:col-span-7 relative group">
            <div
              onClick={() => setModalOpen(true)}
              className="bg-[#FAF6F0] rounded-3xl overflow-hidden border border-gray-200 shadow-md p-4 sm:p-6 cursor-pointer relative"
            >
              <img
                src="/assets/hello_bali/extracted/route_map_full.jpg"
                alt="Route Map to Hello Bali from Bengaluru via NH44"
                className="w-full h-auto object-contain rounded-2xl group-hover:scale-[1.01] transition-transform duration-500"
              />
              
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-white/20">
                <Clock className="w-3.5 h-3.5 text-[#F48753]" />
                <span>1 Hr 30 Min (90 Mins Drive)</span>
              </div>

              <div className="absolute bottom-8 right-8 bg-[#E06D38] hover:bg-[#C55624] text-white p-3 rounded-full shadow-lg transition-all">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Quick Route Highway Ribbon */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-semibold text-gray-700 bg-[#FAF6F0] p-3 rounded-xl border border-gray-200">
              <span className="text-[#1A1F24] font-bold">Route:</span>
              <span>Bengaluru</span>
              <span className="text-[#E06D38]">→</span>
              <span>Attibele</span>
              <span className="text-[#E06D38]">→</span>
              <span>Hosur</span>
              <span className="text-[#E06D38]">→</span>
              <span className="bg-[#1A1F24] text-white px-2 py-0.5 rounded text-[10px]">NH44</span>
              <span className="text-[#E06D38]">→</span>
              <span>Krishnagiri</span>
              <span className="text-[#E06D38]">→</span>
              <span className="text-[#E06D38] font-bold">Hello Bali</span>
            </div>
          </div>

          {/* Right Column: Key Destinations & Hubs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#1A1F24] text-white p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-[#F48753] uppercase font-bold tracking-widest block">
                Official Property Address
              </span>
              <h4 className="font-display text-lg font-bold">
                Hello Bali Luxury Weekend Villas
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {projectSnapshot.address}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#F48753]">
                <Phone className="w-3.5 h-3.5" />
                <a href={`tel:${projectSnapshot.phoneRaw}`} className="hover:underline">
                  {projectSnapshot.phonePrimary}
                </a>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Drive Time & Connecting Hubs:
              </span>
              {locationsData.map((dest) => (
                <div
                  key={dest.id}
                  className="flex items-center justify-between p-3.5 bg-[#FAF6F0] rounded-xl border border-gray-200/90 hover:border-gray-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#E06D38] shadow-2xs border border-gray-100">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-body text-xs sm:text-sm font-bold text-[#1A1F24]">
                        {dest.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-normal">
                        {dest.distance}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold text-lg text-[#E06D38] block">
                      {dest.times.driving}
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider -mt-1 block">
                      Minutes
                    </span>
                  </div>
                </div>
              ))}
            </div>


          </div>

        </div>

      </div>

      {/* Fullscreen Map Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full p-4 relative shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-xs uppercase font-bold tracking-wider text-[#E06D38]">
                Way to Find Hello Bali • High-Resolution Route
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-auto flex-1 my-3 flex items-center justify-center bg-[#FAF6F0] rounded-xl p-3">
              <img
                src="/assets/hello_bali/extracted/route_map_full.jpg"
                alt="Enlarged Route Map"
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
