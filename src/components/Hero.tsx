import React from "react";
import { MapPin, Compass } from "lucide-react";
import { projectSnapshot } from "../data";

interface HeroProps {
  onOpenEnquiry: () => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="overview"
      className="relative w-full min-h-[96vh] sm:min-h-screen flex flex-col justify-between items-center text-left overflow-hidden bg-[#1A1F24]"
    >
      {/* Background Photography from PDF */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/hello_bali/extracted/villa_type1_hero.jpg"
          alt="Hello Bali Luxury Weekend Villas"
          className="w-full h-full object-cover object-center transform scale-105 animate-fade-in"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />

        {/* Cinematic gradient overlays for maximum contrast and elegance */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12161A]/90 via-[#1A1F24]/70 to-[#1A1F24]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F24] via-transparent to-black/40" />
      </div>

      {/* Upper Empty Spacer for Fixed Header */}
      <div className="h-24 sm:h-28 w-full relative z-10 shrink-0" />

      {/* Main Content */}
      <div className="flex w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 justify-start my-auto py-8 sm:py-16">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start space-y-4 sm:space-y-6">
          
          {/* Tagline in Signature Script Font */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
            <span className="font-script text-xl sm:text-2xl text-[#F48753] tracking-wide">
              {projectSnapshot.scriptTagline}
            </span>
          </div>

          {/* Main Large Headline */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-lg">
              HELLO BALI
            </h1>
            <p className="font-display text-lg sm:text-2xl lg:text-3xl text-white/90 font-light tracking-[0.15em] uppercase">
              Luxury Weekend Villas
            </p>
          </div>

          {/* Overview text */}
          <p className="font-body text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-normal max-w-xl drop-shadow-sm">
            Private pool villas, Balinese gazebos, sunken firepits & lush tropical tranquility. Just 90 mins from Electronic City, Bangalore.
          </p>

          {/* Fast Spec Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-white text-xs sm:text-sm font-medium pt-1">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <Compass className="w-3.5 h-3.5 text-[#E06D38]" />
              <span>90 Mins from Electronic City</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <span>Type 1 & Type 2 Villas</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <MapPin className="w-3.5 h-3.5 text-[#E06D38]" />
              <span>Palacode Taluk, Tamil Nadu</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenEnquiry}
              className="bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-7 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all shadow-[0_10px_25px_rgba(224,109,56,0.4)] hover:scale-105 active:scale-95 cursor-pointer tracking-wide"
            >
              Book a Site Visit
            </button>


            <button
              onClick={() => handleScrollTo("design")}
              className="text-white/80 hover:text-white underline underline-offset-4 font-body text-xs sm:text-sm py-2 px-1 transition-colors"
            >
              Explore Spaces ↓
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Features Strip */}
      <div className="w-full relative z-10 bg-black/60 backdrop-blur-md border-t border-white/10 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-white/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E06D38]" />
            <span className="font-semibold text-white">Private Pool & Deck</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="font-semibold text-white">Outdoor Bar & Kitchen</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E06D38]" />
            <span className="font-semibold text-white">Sunken Firepit with Seating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="font-semibold text-white">Balinese Gazebo Pavilion</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E06D38]" />
            <span className="font-semibold text-white">15+ Curated Amenities</span>
          </div>
        </div>
      </div>
    </section>
  );
}
