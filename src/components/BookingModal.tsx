import React, { useState } from "react";
import { X, Calendar, Check, Phone, Mail, User, Home } from "lucide-react";
import { LeadSubmission } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<LeadSubmission, "id" | "submittedAt" | "status">) => void;
  initialUnitType?: string | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  onAddLead,
  initialUnitType,
}: BookingModalProps) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "11:00",
    unitType: initialUnitType || "Type 1 Villa (2 BHK)",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        preferredDate: formData.preferredDate || undefined,
        preferredTime: formData.preferredTime || undefined,
        source: "floor_plan_enquiry",
        notes: `Unlocked Floor Plans for ${formData.unitType}`,
      });
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 bg-[#12161A]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in font-body">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-gray-200 max-h-[92vh] flex flex-col">
        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#E06D38] via-[#F48753] to-[#0284C7]" />
        
        {/* Header bar */}
        <div className="bg-[#1A1F24] p-5 sm:p-6 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl text-[#F48753]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold tracking-tight">
                Unlock Hello Bali Floor Layouts
              </h3>
              <p className="text-[10px] text-[#F48753] uppercase tracking-widest font-bold">
                Type 1 & Type 2 Luxury Weekend Villas
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
                  Phone Number
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

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs font-bold tracking-widest uppercase py-4 rounded-xl shadow-lg disabled:opacity-50 cursor-pointer transition-all mt-4"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>UNLOCKING PLANS...</span>
                  </>
                ) : (
                  "VIEW FULL VILLA BLUEPRINTS"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="h-14 w-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                <Check className="h-7 w-7" />
              </div>
              
              <div>
                <h4 className="font-display text-xl font-bold text-[#1A1F24]">
                  Floor Plans Unlocked
                </h4>
                <p className="font-body text-xs text-gray-600 mt-1.5 max-w-sm mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. You now have full access to explore the Hello Bali Type 1 & Type 2 villa layouts.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#1A1F24] hover:bg-black text-white font-body text-xs font-bold tracking-widest uppercase py-3.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                VIEW LAYOUTS NOW
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
