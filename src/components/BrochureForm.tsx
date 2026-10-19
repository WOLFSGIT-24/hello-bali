import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { LeadSubmission } from "../types";

interface BrochureFormProps {
  onAddLead: (lead: Omit<LeadSubmission, "id" | "submittedAt" | "status">) => void;
  preselectedUnit?: string | null;
}

export default function BrochureForm({ onAddLead, preselectedUnit }: BrochureFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    source: "Website Landing Page",
    unitType: preselectedUnit || "Type 1 Villa (2 BHK)",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedUnit) {
      setFormData((prev) => ({ ...prev, unitType: preselectedUnit }));
      const el = document.getElementById("lead-capture-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [preselectedUnit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        source: formData.source,
        notes: `Villa preference: ${formData.unitType}`,
      });

      setLoading(false);
      setFormSubmitted(true);
    }, 1000);
  };

  return (
    <section id="lead-capture-section" className="w-full relative min-h-[580px] md:min-h-[660px] overflow-hidden flex items-center py-12 md:py-20 font-body">
      {/* Full-bleed Background Image from PDF */}
      <img
        src="/assets/hello_bali/extracted/lakeside_sunset_clubhouse.jpg"
        alt="Hello Bali Resort Sunset Ambiance"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
      {/* Cinematic dark overlay for card readability */}
      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-l from-black/85 via-black/40 to-black/25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10 flex justify-center lg:justify-end">
        {/* Floating Card */}
        <div className="w-full max-w-[460px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60">
          
          {!formSubmitted ? (
            <>
              <div className="mb-4 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E06D38]">
                  Hello Bali • Weekend Sanctuary
                </span>
                <h3 className="font-display text-2xl font-bold text-[#1A1F24] leading-tight tracking-tight">
                  Schedule Your Private Tour
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  Experience the private swimming pools, Balinese gazebos, sunken firepits, and lakeside tranquility in person.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#1A1F24] uppercase tracking-wider block">
                    Full Name*
                  </label>
                  <div className="border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus-within:border-[#E06D38] focus-within:bg-white transition-all">
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      pattern="[A-Za-z\s]+"
                      title="Please enter letters only"
                      className="w-full bg-transparent text-xs sm:text-sm font-body outline-none placeholder:text-gray-400"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-[10px]">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#1A1F24] uppercase tracking-wider block">
                    Email Address*
                  </label>
                  <div className="border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus-within:border-[#E06D38] focus-within:bg-white transition-all">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent text-xs sm:text-sm font-body outline-none placeholder:text-gray-400"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#1A1F24] uppercase tracking-wider block">
                    Phone Number*
                  </label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus-within:border-[#E06D38] focus-within:bg-white transition-all">
                    <span className="text-xs font-bold text-[#1A1F24] border-r border-gray-300 pr-2 shrink-0">+91</span>
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
                      className="w-full bg-transparent text-xs sm:text-sm font-body outline-none placeholder:text-gray-400"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone}</p>}
                </div>

                {/* Villa Preference */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#1A1F24] uppercase tracking-wider block">
                    Villa Preference
                  </label>
                  <div className="border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#FAF6F0] focus-within:border-[#E06D38] focus-within:bg-white transition-all">
                    <select
                      id="unitType"
                      value={formData.unitType}
                      onChange={handleChange}
                      className="w-full bg-transparent text-xs sm:text-sm font-body outline-none text-gray-700"
                    >
                      <option value="Type 1 Villa (2 BHK with Rooftop Lounge)">Type 1 Villa (2 BHK with Rooftop Lounge)</option>
                      <option value="Type 2 Villa (3 BHK with Thatched Gazebo)">Type 2 Villa (3 BHK with Thatched Gazebo)</option>
                      <option value="Both Villa Types">Interested in Both Villa Types</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold tracking-wide py-3.5 rounded-full shadow-md disabled:opacity-50 cursor-pointer transition-all hover:scale-[1.01] active:scale-98"
                  >
                    {loading ? (
                      <>
                        <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Connecting with Villa Concierge...</span>
                      </>
                    ) : (
                      <>
                        <span>Schedule Private Tour</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-center text-[10px] text-gray-400 font-body pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Direct from Blissful Acres LLP & Brick N Land • No Brokerage</span>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="h-14 w-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                <CheckCircle className="h-7 w-7" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1A1F24]">
                  Private Tour Requested
                </h3>
                <p className="font-body text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Our Hello Bali relationship manager will reach out shortly to schedule your personalized visit.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-[#1A1F24] hover:bg-black text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all cursor-pointer shadow-md"
                >
                  NEW ENQUIRY
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
