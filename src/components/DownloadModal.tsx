import React, { useState } from "react";
import { X, Check, Phone, Mail, User, Download, FileText } from "lucide-react";
import { LeadSubmission } from "../types";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<LeadSubmission, "id" | "submittedAt" | "status">) => void;
}

export default function DownloadModal({
  isOpen,
  onClose,
  onAddLead,
}: DownloadModalProps) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    let sanitizedValue = value;
    if (id === "phone") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (id === "fullName") {
      sanitizedValue = value.replace(/[^A-Za-z\s]/g, "");
    }
    
    setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/Hello_Bali_Brochure.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("download", "Hello_Bali_Official_Brochure.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Name should only contain letters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      onAddLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        source: "brochure_download_modal",
        notes: "Requested Hello Bali 42-page brochure download.",
      });
      setLoading(false);
      setSubmitted(true);
      handleDownloadBrochure();
      
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ fullName: "", email: "", phone: "" });
      }, 2500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 bg-[#12161A]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in font-body">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative border border-gray-200 max-h-[92vh] flex flex-col">
        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#E06D38] via-[#F48753] to-[#0284C7]" />
        
        {/* Header bar */}
        <div className="bg-[#1A1F24] p-5 sm:p-6 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl text-[#F48753]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold tracking-tight">
                Download Official Brochure
              </h3>
              <p className="text-[10px] text-[#F48753] uppercase tracking-widest font-bold">
                Hello Bali • 42-Page Prospectus
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-all text-white/80 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content/Form Area */}
        <div className="p-5 sm:p-8 overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="text-center mb-3">
                <p className="text-xs text-gray-600 font-body leading-relaxed">
                  Enter your contact details to download the high-resolution 42-page brochure featuring Type 1 & Type 2 villa layouts, amenities, and site master plans.
                </p>
              </div>
              
              {/* Full Name */}
              <div className="relative border-b border-gray-200 focus-within:border-[#E06D38] py-1">
                <label className="text-[9px] font-extrabold text-[#1A1F24] uppercase tracking-wider block mb-1">
                  Your Full Name
                </label>
                <div className="flex items-center gap-2.5">
                  <User className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    pattern="[A-Za-z\s]+"
                    title="Please enter letters only"
                    className="w-full bg-transparent border-none text-xs sm:text-sm font-body outline-none placeholder:text-gray-400 py-1"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-[10px] mt-1 absolute -bottom-4">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="relative border-b border-gray-200 focus-within:border-[#E06D38] py-1">
                <label className="text-[9px] font-extrabold text-[#1A1F24] uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent border-none text-xs sm:text-sm font-body outline-none placeholder:text-gray-400 py-1"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] mt-1 absolute -bottom-4">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="relative border-b border-gray-200 focus-within:border-[#E06D38] py-1">
                <label className="text-[9px] font-extrabold text-[#1A1F24] uppercase tracking-wider block mb-1">
                  Active Phone Number
                </label>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-xs font-bold text-[#1A1F24]">+91</span>
                  <input
                    type="tel"
                    id="phone"
                    required
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10 digit mobile number"
                    className="w-full bg-transparent border-none text-xs sm:text-sm font-body outline-none placeholder:text-gray-400 py-1"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[10px] mt-1 absolute -bottom-4">{errors.phone}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs font-bold tracking-widest uppercase py-4 rounded-xl shadow-lg disabled:opacity-70 transition-all cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Preparing PDF Download...
                    </span>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>DOWNLOAD 42-PAGE BROCHURE</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="h-14 w-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                <Check className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#1A1F24]">
                  Download Initiated
                </h3>
                <p className="font-body text-xs text-gray-600 mt-2 max-w-xs mx-auto">
                  Your official Hello Bali 42-page brochure PDF is downloading now.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
