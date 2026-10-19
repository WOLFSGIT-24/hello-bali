import React, { useEffect } from "react";
import { X } from "lucide-react";
import { projectSnapshot } from "../data";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#12161A]/90 backdrop-blur-sm animate-fade-in font-body">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-200 bg-[#FAF6F0] shrink-0">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#1A1F24] font-bold">Terms & Conditions</h2>
            <p className="font-body text-xs text-[#E06D38] mt-1 uppercase tracking-widest font-semibold">
              Hello Bali • Blissful Acres LLP & Brick N Land
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none cursor-pointer"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto font-body text-sm text-gray-600 leading-relaxed space-y-6">
          <p>
            Welcome to the official informational portal for <strong>Hello Bali - Luxury Weekend Villas</strong>, developed by <strong>Blissful Acres LLP</strong> in association with <strong>Brick N Land</strong>. By accessing this portal or requesting information, you agree to comply with the terms and conditions outlined below.
          </p>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-[#1A1F24]">1. Project Representation</h3>
            <p>
              Hello Bali comprises luxury weekend villas (Type 1 - 2 BHK with Rooftop Lounge and Type 2 - 3 BHK Single-Storey/Expandable) situated at Bolabaguthanahalli Village of Palacode Taluk, Tamil Nadu - 636804. All 3D architectural renders, site plans, dimensions, and visual features shown on this website and in the brochure are artistic impressions for conceptual representation.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-[#1A1F24]">2. Statutory Clearances & Master Development</h3>
            <p>
              Villa allocations, infrastructure works, and amenities are implemented adhering to statutory developmental parameters. The promoters reserve the right to incorporate architectural and landscape enhancements as recommended by town planning consultants.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-[#1A1F24]">3. Promoter & Development Enquiries</h3>
            <ul className="list-none space-y-2 text-xs text-gray-800 bg-[#FAF6F0] p-4 rounded-2xl border border-gray-200">
              <li><strong>Project:</strong> Hello Bali Luxury Weekend Villas</li>
              <li><strong>Location:</strong> Bolabaguthanahalli Village, Palacode Taluk, Tamil Nadu - 636804</li>
              <li><strong>Phone:</strong> {projectSnapshot.phonePrimary} / {projectSnapshot.phoneSecondary}</li>
              <li><strong>Email:</strong> {projectSnapshot.email}</li>
              <li><strong>Website:</strong> {projectSnapshot.website}</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-[#FAF6F0] shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1A1F24] text-white font-body text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
