import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { specificationsData } from "../data";

export default function Specifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="specifications" className="w-full py-16 md:py-24 bg-white text-[#161A22] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-10 sm:mb-12">
          
          {/* Left Large Headline */}
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#C5A880] uppercase block mb-2">
              Exceptional Interiors
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#161A22] leading-[1.15]">
              Craftsmanship & premium specifications
            </h2>
          </div>

          {/* Right Description */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Indulge in the epitome of luxury with our meticulously designed apartments. Featuring high-end finishes, premium materials, and modern aesthetics, each residence exudes elegance and style. Every detail is crafted for your comfort and pleasure.
            </p>
          </div>

        </div>

        {/* Two-Column Grid: Left Visual Banner, Right Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 bg-[#0E172A] aspect-[16/10] sm:aspect-[4/5] w-full">
              <img
                src="/assets/silver_horizon/specifications_interior.webp"
                alt="ARS Svaasa Luxury Living Finishes"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Column: Specification Categories Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {specificationsData.map((cat, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#FAF8F5] border-[#C5A880] shadow-md"
                      : "bg-white border-[#E5DED3] hover:border-[#C5A880]/50"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isOpen ? "bg-[#0E172A] text-[#C5A880]" : "bg-[#FAF8F5] text-[#0E172A]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {cat.icon}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-[#161A22] tracking-tight">
                        {cat.title}
                      </h4>
                    </div>

                    <div className="text-[#A88758]">
                      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 space-y-3 text-xs sm:text-sm text-[#4A5260] font-body border-t border-[#E5DED3]/60">
                      {cat.items.map((itemText, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5 shrink-0" />
                          <span className="leading-relaxed text-[#161A22]">{itemText}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
