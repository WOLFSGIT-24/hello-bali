import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { projectSnapshot } from "../data";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: any) => void;
}

export default function OfferModal({ isOpen, onClose, onAddLead }: OfferModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    unitPreference: "Type 1 Villa (2 BHK with Rooftop Lounge)",
    agree: true,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let sanitizedValue = value;
    if (name === "phone") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "fullName") {
      sanitizedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitizedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    await new Promise((resolve) => setTimeout(resolve, 900));
    
    onAddLead({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      source: "popup_enquiry_modal",
      status: "Pending",
      notes: `Preference: ${formData.unitPreference}`,
    });
    
    setLoading(false);
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
      setTimeout(() => setSubmitted(false), 300);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in font-body">
      <div 
        className="absolute inset-0 bg-[#12161A]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 z-10 max-h-[92vh] flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
            <div className="p-6 sm:p-7 pb-5 bg-[#1A1F24] text-white border-b border-white/10 shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#F48753]">
                Hello Bali • Weekend Villas
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                Experience Pure Luxury
              </h3>
              <p className="font-body text-xs text-white/70 mt-1 leading-relaxed font-light">
                Connect directly with our villa concierge for layout customisation, plot availability, and private site visits.
              </p>
            </div>

            <div className="p-6 sm:p-7 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1A1F24]">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  pattern="[A-Za-z\s]+"
                  title="Please enter letters only"
                  className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#E06D38] focus:bg-white font-body"
                />
                {errors.fullName && <p className="text-red-500 text-[10px]">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1A1F24]">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#E06D38] focus:bg-white font-body"
                />
                {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1A1F24]">
                  Phone Number*
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus-within:border-[#E06D38] focus-within:bg-white">
                  <span className="text-xs font-bold text-[#1A1F24] border-r border-gray-300 pr-2 mr-2">+91</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10 digit mobile number"
                    className="w-full bg-transparent text-sm outline-none font-body"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1A1F24]">
                  Preferred Villa Type
                </label>
                <select
                  name="unitPreference"
                  value={formData.unitPreference}
                  onChange={handleChange}
                  className="w-full bg-[#FAF6F0] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-[#E06D38] focus:bg-white font-body text-gray-700"
                >
                  <option value="Type 1 Villa (2 BHK with Rooftop Lounge)">Type 1 Villa (2 BHK with Rooftop Lounge)</option>
                  <option value="Type 2 Villa (3 BHK with Thatched Gazebo)">Type 2 Villa (3 BHK with Thatched Gazebo)</option>
                  <option value="Both Villa Types">Interested in Both Configurations</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs font-bold tracking-[0.2em] uppercase py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3 transition-all"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "SCHEDULE PRIVATE VILLA TOUR"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center h-[360px] flex flex-col justify-center items-center space-y-3">
            <div className="h-14 w-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center text-green-600 shadow-sm">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1A1F24]">Inquiry Received</h3>
            <p className="font-body text-xs text-gray-600 leading-relaxed max-w-xs">
              Thank you! Our relationship team from Blissful Acres LLP & Brick N Land will connect with you promptly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
