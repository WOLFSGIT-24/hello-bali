import React from "react";
import { Phone, Mail, MapPin, ArrowUpRight, Globe, Compass } from "lucide-react";
import { projectSnapshot, partnersData } from "../data";

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenBooking?: () => void;
}

export default function Footer({
  onOpenPrivacy,
  onOpenTerms,
  onOpenBooking,
}: FooterProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#12161A] text-white pt-14 sm:pt-20 pb-32 md:pb-16 border-t border-white/10 font-body">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        
        {/* Top Minimal Brand & CTA Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-10 sm:pb-16 border-b border-white/10">
          <div className="space-y-4 max-w-xl">
            <div className="bg-white/95 rounded-xl px-3 py-1.5 inline-flex items-center shadow-md">
              <img
                src="/assets/hello_bali/logo_crop.png"
                alt="Hello Bali"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>
            <p className="font-script text-2xl sm:text-3xl text-[#F48753] block">
              {projectSnapshot.scriptTagline}
            </p>
            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
              Luxurious, innovative, sustainable, and economical weekend villas nestled seamlessly within nature's embrace. Located 90 mins from Electronic City, Bangalore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleScrollTo("lead-capture-section")}
              className="bg-[#E06D38] hover:bg-[#C55624] text-white text-xs sm:text-sm font-semibold px-8 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer tracking-wide inline-flex items-center gap-2"
            >
              <span>Schedule Villa Visit</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Middle Clean 3-Column Info Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 sm:py-14 border-b border-white/10">
          
          {/* Col 1: Property Location & Developer Association */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#F48753] block">
              Project Location
            </span>
            <div className="flex items-start gap-2 text-sm text-white/80 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#E06D38] shrink-0 mt-1" />
              <span>{projectSnapshot.address}</span>
            </div>

            <div className="pt-2 space-y-2 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">
                In Association with:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/70">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <strong className="text-white block">BRICK N LAND</strong>
                  <span className="text-[11px] text-gray-400 block mt-0.5">HSR Layout, Bangalore</span>
                  <a href="tel:+918045890824" className="text-[11px] text-[#F48753] mt-1 block hover:underline">
                    +91 80 4589 0824
                  </a>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <strong className="text-white block">BLISSFUL ACRES LLP</strong>
                  <span className="text-[11px] text-gray-400 block mt-0.5">Suryacity Phase 1, Bengaluru</span>
                  <a href="tel:+919606015429" className="text-[11px] text-[#F48753] mt-1 block hover:underline">
                    +91 96060 15429
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#F48753] block">
              Quick Navigation
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-white/70">
              {[
                { label: "Overview", id: "overview" },
                { label: "About Hello Bali", id: "about" },
                { label: "Villa Experiences", id: "design" },
                { label: "Master Plan", id: "master-plan" },
                { label: "Amenities", id: "amenities" },
                { label: "Floor Plans", id: "floor-plans" },
                { label: "Way to Find Hello Bali", id: "location" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-left hover:text-[#F48753] transition-colors cursor-pointer py-0.5"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#F48753] block">
              Direct Contact
            </span>
            <div className="space-y-3 text-sm text-white/80">
              <a
                href={`tel:${projectSnapshot.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-[#F48753] transition-colors bg-white/5 p-3 rounded-xl border border-white/5"
              >
                <Phone className="h-4 w-4 text-[#E06D38] shrink-0" />
                <span className="font-semibold text-white">{projectSnapshot.phonePrimary}</span>
              </a>

              <a
                href={`mailto:${projectSnapshot.email}`}
                className="flex items-center gap-2.5 hover:text-[#F48753] transition-colors bg-white/5 p-3 rounded-xl border border-white/5"
              >
                <Mail className="h-4 w-4 text-[#E06D38] shrink-0" />
                <span>{projectSnapshot.email}</span>
              </a>

              <a
                href="https://www.hellobali.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#F48753] transition-colors bg-white/5 p-3 rounded-xl border border-white/5"
              >
                <Globe className="h-4 w-4 text-[#E06D38] shrink-0" />
                <span>{projectSnapshot.website}</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-white/60 pt-1">
                <Compass className="w-3.5 h-3.5 text-[#F48753]" />
                <span>90 Mins from Electronic City via NH44</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Compliance & Legal Row */}
        <div className="pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-white/50">
          <p className="text-[11px] text-white/40">
            Artistic impressions only. Subject to final development plans.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
            <span>© {new Date().getFullYear()} Hello Bali</span>
            <span>•</span>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
