import React from "react";

interface ProjectHighlightsProps {
  onRequestDownload?: () => void;
  onOpenBooking?: () => void;
}

export default function ProjectHighlights({ onRequestDownload, onOpenBooking }: ProjectHighlightsProps) {
  return (
    <section id="highlights" className="w-full relative bg-white overflow-hidden py-16 md:py-24">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          
          {/* Top Left Image */}
          <div className="w-full md:w-1/2 flex flex-col justify-start pb-0 md:pb-20 lg:pb-28">
            <img
              src="/assets/silver_horizon/second-sec.png"
              alt="ARS Svaasa View 1"
              className="w-full h-auto object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500"
              loading="lazy"
            />
          </div>

          {/* Bottom Right Image */}
          <div className="w-full md:w-1/2 flex flex-col justify-end pt-0 md:pt-24 lg:pt-32">
            <img
              src="/assets/silver_horizon/second-sec2.png"
              alt="ARS Svaasa View 2"
              className="w-full h-auto object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-500"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
