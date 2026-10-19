import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface IntimateScaleProps {
  onOpenEnquiry?: () => void;
}

export default function IntimateScale({ onOpenEnquiry }: IntimateScaleProps) {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-[#FAF6F0] text-[#1A1F24] overflow-hidden font-body relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Short, Refined Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center bg-[#E06D38]/10 px-3.5 py-1 rounded-full text-[#E06D38]">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  Genesis of Hello Bali
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1F24] leading-[1.15]">
                A Breath of Fresh Air in Weekend Luxury
              </h2>
            </div>

            {/* Shortened, Impactful Content */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              Born from a vision to bring meaningful innovation to weekend living, <strong className="font-semibold text-[#1A1F24]">Hello Bali</strong> is an exclusive nature sanctuary of private pool villas, designed for tranquility, rejuvenation, and effortless elegance.
            </p>

            {/* 3 Quick Value Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transition-transform hover:-translate-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#E06D38] block tracking-wider">Design</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1F24] block mt-0.5">Balinese Luxury</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transition-transform hover:-translate-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#0284C7] block tracking-wider">Setting</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1F24] block mt-0.5">Nature Sanctuary</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs text-center transition-transform hover:-translate-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#15803D] block tracking-wider">Access</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1F24] block mt-0.5">90 Mins Drive</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-3">
              <button
                onClick={onOpenEnquiry}
                className="bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2 tracking-wide"
              >
                <span>Connect with Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Entrance Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-gray-100 group">
              <img
                src="/assets/hello_bali/extracted/entrance_gate_rock.jpg"
                alt="Hello Bali Stone Entrance Gate and Water Feature"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <span className="bg-[#E06D38] text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
                    Grand Arrival
                  </span>
                  <p className="font-display text-base sm:text-lg font-bold leading-tight">
                    Natural Stone Entrance & Water Feature
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="font-medium">Gated Enclave</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
