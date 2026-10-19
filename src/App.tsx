import React, { useState, useEffect, Suspense, lazy } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { LeadSubmission } from "./types";
import { motion } from "motion/react";

// Lazy-load below-the-fold components
const IntimateScale = lazy(() => import("./components/IntimateScale"));
const Gallery = lazy(() => import("./components/Gallery"));
const MasterPlan = lazy(() => import("./components/MasterPlan"));
const Amenities = lazy(() => import("./components/Amenities"));
const FloorPlans = lazy(() => import("./components/FloorPlans"));
const Location = lazy(() => import("./components/Location"));
const BrochureForm = lazy(() => import("./components/BrochureForm"));
const Footer = lazy(() => import("./components/Footer"));

// Lazy load dialog modals
const BookingModal = lazy(() => import("./components/BookingModal"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const PrivacyPolicyModal = lazy(() => import("./components/PrivacyPolicyModal"));
const TermsModal = lazy(() => import("./components/TermsModal"));
const OfferModal = lazy(() => import("./components/OfferModal"));

const LOCAL_STORAGE_KEY = "hello_bali_leads";

function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [preselectedUnit, setPreselectedUnit] = useState<string | null>(null);
  const [floorPlansUnlocked, setFloorPlansUnlocked] = useState(() => {
    try {
      return localStorage.getItem("hello_bali_floor_plans_unlocked") === "true";
    } catch {
      return false;
    }
  });

  // Read initial lead cache
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setLeads(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading localized storage cache", e);
    }
  }, []);

  const saveLeadsToCache = (newLeads: LeadSubmission[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error("Error saving lead entries to localized storage", e);
    }
  };

  const handleAddLead = (rawLead: Omit<LeadSubmission, "id" | "submittedAt" | "status">) => {
    const isoTimestamp = new Date().toISOString();
    const localTimestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    
    const newLead: LeadSubmission = {
      ...rawLead,
      id: "HB-" + Math.floor(1000 + Math.random() * 9000),
      submittedAt: isoTimestamp,
      status: "Pending",
    };

    // Post to Make.com Webhook if configured
    fetch("https://hook.us1.make.com/2bmmq21zo8ocu9itedtq5oyhu5sg5zad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project: "Hello Bali",
        developer: "Blissful Acres LLP & Brick N Land",
        id: newLead.id,
        fullName: newLead.fullName,
        email: newLead.email,
        phone: newLead.phone,
        source: newLead.source,
        notes: newLead.notes || "",
        submittedAt: isoTimestamp,
        localTimestamp: localTimestamp,
        status: newLead.status,
      }),
    }).catch((err) => {
      console.error("Webhook submission failed:", err);
    });

    const updated = [newLead, ...leads];
    saveLeadsToCache(updated);
    try {
      localStorage.setItem("hello_bali_floor_plans_unlocked", "true");
    } catch (e) {
      console.error(e);
    }
    setFloorPlansUnlocked(true);
  };

  const handleUpdateStatus = (id: string, status: LeadSubmission["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    saveLeadsToCache(updated);
  };

  const handleClearLeads = () => {
    saveLeadsToCache([]);
  };

  const handleSelectUnitType = (unitType: string) => {
    setPreselectedUnit(unitType);
    setOfferOpen(true);
  };

  const handleHeroEnquiry = () => {
    setOfferOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#1A1F24] text-[#1A1F24] w-full font-body">
      {/* Header Navigation */}
      <Header
        onOpenBooking={() => {
          setPreselectedUnit(null);
          setOfferOpen(true);
        }}
        onToggleAdmin={() => setAdminOpen(!adminOpen)}
        isAdminActive={adminOpen}
      />

      {/* Hero Entrance Banner */}
      <Hero
        onOpenEnquiry={handleHeroEnquiry}
      />

      {/* Below-the-fold sections */}
      <Suspense fallback={<div className="min-h-screen bg-[#1A1F24]" />}>
        {/* Section 1: About Us, How We Are Different & The Concept (Pages 2, 3, 5) */}
        <AnimatedSection>
          <IntimateScale 
            onOpenEnquiry={handleHeroEnquiry}
          />
        </AnimatedSection>

        {/* Section 2: Villa Design, Type 1 & Type 2 Spotlights & 10 Signature Spaces (Pages 7 to 25) */}
        <AnimatedSection>
          <Gallery 
            onSelectUnit={handleSelectUnitType}
            onOpenBooking={handleHeroEnquiry}
          />
        </AnimatedSection>

        {/* Section 3: Master Plan & Site Layout (Pages 26, 27, 28, 29, 9) */}
        <AnimatedSection>
          <MasterPlan 
            onSelectUnit={handleSelectUnitType} 
            onOpenBooking={handleHeroEnquiry}
          />
        </AnimatedSection>

        {/* Section 4: Curated Lifestyle & Leisure Amenities (Pages 38 & 39) */}
        <AnimatedSection>
          <Amenities 
            onOpenBooking={handleHeroEnquiry} 
          />
        </AnimatedSection>

        {/* Section 5: Villa Floor Plans & 3D Cutaways (Pages 30 to 36) */}
        <AnimatedSection>
          <FloorPlans 
            onSelectUnit={handleSelectUnitType} 
            isUnlocked={floorPlansUnlocked}
            onUnlockRequest={() => setBookingOpen(true)}
            onOpenBooking={handleHeroEnquiry}
          />
        </AnimatedSection>

        {/* Section 6: Way to Find Hello Bali & Highway Route (Pages 37 & 42) */}
        <AnimatedSection>
          <Location onOpenEnquiry={handleHeroEnquiry} />
        </AnimatedSection>

        {/* Section 8: Schedule Tour / Brochure Intake Form */}
        <AnimatedSection>
          <BrochureForm 
            onAddLead={handleAddLead} 
            preselectedUnit={preselectedUnit} 
          />
        </AnimatedSection>

        {/* Global Footer (Page 42) */}
        <AnimatedSection>
          <Footer 
            onOpenPrivacy={() => setPrivacyOpen(true)}
            onOpenTerms={() => setTermsOpen(true)}
            onOpenBooking={handleHeroEnquiry}
          />
        </AnimatedSection>
      </Suspense>

      {/* Fixed Mobile Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#12161A] border-t border-white/10 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.6)] flex items-center gap-2.5">
        <a 
          href="tel:9606015429" 
          className="flex-1 flex items-center justify-center gap-2 bg-[#232930] hover:bg-[#2B323B] text-white font-body text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all border border-white/10 active:scale-[0.98]"
        >
          <svg className="h-4 w-4 text-[#F48753]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>Call Concierge</span>
        </a>
        <button 
          onClick={() => {
            setPreselectedUnit(null);
            setOfferOpen(true);
          }}
          className="flex-1 flex items-center justify-center bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
        >
          <span>Enquire Now</span>
        </button>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919606015429?text=Hi%2C%20I%20am%20interested%20in%20Hello%20Bali%20Luxury%20Weekend%20Villas.%20Please%20share%20details."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[76px] md:bottom-8 right-4 md:right-8 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all z-40 flex items-center justify-center animate-fade-in"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="26" 
          height="26" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Legal & CRM Modals */}
      <Suspense fallback={null}>
        {bookingOpen && (
          <BookingModal
            isOpen={bookingOpen}
            onClose={() => {
              setBookingOpen(false);
              setPreselectedUnit(null);
            }}
            onAddLead={handleAddLead}
            initialUnitType={preselectedUnit}
          />
        )}


        {adminOpen && (
          <AdminDashboard
            isOpen={adminOpen}
            onClose={() => setAdminOpen(false)}
            leads={leads}
            onUpdateStatus={handleUpdateStatus}
            onClearLeads={handleClearLeads}
            onAddMockLeads={() => {}}
          />
        )}

        {privacyOpen && (
          <PrivacyPolicyModal 
            isOpen={privacyOpen} 
            onClose={() => setPrivacyOpen(false)} 
          />
        )}

        {termsOpen && (
          <TermsModal 
            isOpen={termsOpen} 
            onClose={() => setTermsOpen(false)} 
          />
        )}

        {offerOpen && (
          <OfferModal
            isOpen={offerOpen}
            onClose={() => setOfferOpen(false)}
            onAddLead={handleAddLead}
          />
        )}
      </Suspense>
    </div>
  );
}
