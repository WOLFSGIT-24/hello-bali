import React, { useEffect } from "react";
import { X } from "lucide-react";
import { projectSnapshot } from "../data";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
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
            <h2 className="font-display text-2xl sm:text-3xl text-[#1A1F24] font-bold">Privacy Policy</h2>
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
            This website serves as an official inquiry and informational portal for <strong>Hello Bali - Luxury Weekend Villas</strong>, promoted by <strong>Blissful Acres LLP</strong> in association with <strong>Brick N Land</strong>. We respect the privacy of every prospective customer and are committed to maintaining data security.
          </p>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-[#1A1F24]">1. Information Collected</h3>
            <p>
              When you submit an enquiry form, schedule a site visit, or download the brochure, we collect personal contact details including your Name, Mobile Number, Email Address, and preferred villa configuration (Type 1 or Type 2).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-[#1A1F24]">2. Utilization of Data</h3>
            <p>
              Your contact information is utilized exclusively by our authorized sales relationship managers to coordinate site tours, provide layout plans and pricing sheets, and share official updates regarding Hello Bali.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-[#1A1F24]">3. Data Security</h3>
            <p>
              We do not sell, rent, or distribute personal data to unaffiliated third-party marketing companies. All submissions are processed through secure encrypted connections.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-[#1A1F24]">4. Direct Communication</h3>
            <ul className="list-none space-y-2 text-xs text-gray-800 bg-[#FAF6F0] p-4 rounded-2xl border border-gray-200">
              <li><strong>Project:</strong> Hello Bali (Luxury Weekend Villas)</li>
              <li><strong>Location:</strong> Bolabaguthanahalli Village, Palacode Taluk, Tamil Nadu - 636804</li>
              <li><strong>Contact:</strong> {projectSnapshot.phonePrimary} | {projectSnapshot.phoneSecondary}</li>
              <li><strong>Email:</strong> {projectSnapshot.email}</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-[#FAF6F0] shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1A1F24] text-white font-body text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
