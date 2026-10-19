import React, { useState } from "react";
import { Download, ChevronLeft, ChevronRight, ZoomIn, X, BookOpen, Layers } from "lucide-react";
import { brochurePages } from "../data";

interface BrochurePreviewProps {
  onRequestDownload?: () => void;
}

export default function BrochurePreview({ onRequestDownload }: BrochurePreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const totalPages = brochurePages.length; // 42 pages

  const handlePrev = () => {
    setCurrentPage((prev) => (prev <= 1 ? totalPages : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
  };

  const handleDirectDownload = () => {
    try {
      window.open("/Hello_Bali_Brochure.pdf", "_blank");
      const link = document.createElement("a");
      link.href = "/Hello_Bali_Brochure.pdf";
      link.setAttribute("download", "Hello_Bali_Official_Brochure.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Error downloading PDF", e);
    }
  };

  const currentImage = `/assets/hello_bali/pages/page_${String(currentPage).padStart(2, "0")}.webp`;

  return (
    <section id="brochure-preview" className="w-full py-16 sm:py-24 bg-[#1A1F24] text-white overflow-hidden font-body relative">
      {/* Ghost Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-5 text-white font-display text-8xl sm:text-[14rem] font-black tracking-widest whitespace-nowrap">
        BROCHURE
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full">
            <BookOpen className="w-3.5 h-3.5 text-[#F48753]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#F48753] font-semibold">
              Official Document
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Explore the 42-Page Official Brochure
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto">
            Browse through the complete architectural prospectus, concepts, layout blueprints, lifestyle amenities, and route maps page by page.
          </p>
        </div>

        {/* Interactive Viewer Card */}
        <div className="bg-[#232930] rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-8 max-w-5xl mx-auto">
          
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
              <span className="text-[#F48753]">Page {currentPage}</span>
              <span className="text-white/40">/</span>
              <span>{totalPages} Pages</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFullscreenOpen(true)}
                className="flex items-center gap-1.5 text-xs text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#F48753]" />
                <span>Fullscreen</span>
              </button>

              <button
                onClick={handleDirectDownload}
                className="flex items-center gap-1.5 text-xs text-white bg-[#E06D38] hover:bg-[#C55624] px-4 py-1.5 rounded-full font-semibold transition-all shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Main Page Display Frame */}
          <div className="relative my-4 aspect-[16/11] bg-black/50 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 group">
            <img
              src={currentImage}
              alt={`Hello Bali Brochure Page ${currentPage}`}
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={() => setFullscreenOpen(true)}
            />

            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full transition-all border border-white/20 cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full transition-all border border-white/20 cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Slider Bar */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {brochurePages.map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => setCurrentPage(p.pageNumber)}
                className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[16/11] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  currentPage === p.pageNumber
                    ? "border-[#E06D38] ring-2 ring-[#E06D38] scale-105"
                    : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={p.imageUrl}
                  alt={`Thumb ${p.pageNumber}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 bg-black/80 text-[8px] text-white px-1 py-0.2 rounded-tl">
                  {p.pageNumber}
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fade-in"
          onClick={() => setFullscreenOpen(false)}
        >
          <div
            className="bg-[#1A1F24] rounded-2xl max-w-6xl w-full p-4 relative shadow-2xl flex flex-col max-h-[96vh] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10 text-xs text-white">
              <span className="text-[#F48753] font-semibold uppercase tracking-wider">
                Hello Bali • Official Brochure Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDirectDownload}
                  className="flex items-center gap-1.5 text-xs text-white bg-[#E06D38] px-3.5 py-1 rounded-full cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setFullscreenOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative overflow-auto flex-1 my-3 flex items-center justify-center bg-black/80 rounded-xl p-2">
              <img
                src={currentImage}
                alt={`Hello Bali Full Page ${currentPage}`}
                className="max-w-full max-h-[78vh] object-contain rounded"
              />

              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
