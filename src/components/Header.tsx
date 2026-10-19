import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
  onToggleAdmin: () => void;
  isAdminActive: boolean;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { label: "Overview", id: "overview" },
    { label: "About", id: "about" },
    { label: "Villas", id: "design" },
    { label: "Master Plan", id: "master-plan" },
    { label: "Amenities", id: "amenities" },
    { label: "Floor Plans", id: "floor-plans" },
    { label: "Location", id: "location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1A1F24]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.35)] border-b border-white/10"
            : "bg-gradient-to-b from-black/75 via-black/35 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 md:px-12 flex items-center justify-between gap-4">
          {/* Left Brand Logo */}
          <a
            href="#overview"
            onClick={(e) => handleLinkClick(e, "overview")}
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <div className="bg-white rounded-xl px-2.5 py-1 shadow-md flex items-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/hello_bali/logo_crop.png"
                alt="Hello Bali - Luxury Weekend Villas"
                className="h-9 sm:h-11 w-auto object-contain"
                width="130"
                height="45"
              />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display text-sm font-bold tracking-wider text-white uppercase leading-tight">
                Hello Bali
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#F48753] font-semibold">
                Weekend Villas
              </span>
            </div>
          </a>

          {/* Center Navigation Links - Clean, Managed, Single-line, No Wrapping */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="font-body text-xs xl:text-[13px] font-medium text-white/90 hover:text-[#F48753] transition-colors tracking-wide py-1 whitespace-nowrap border-b-2 border-transparent hover:border-[#E06D38]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Enquire Now Button Only */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="inline-flex bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer tracking-wide whitespace-nowrap"
            >
              Enquire Now
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer bg-[#1A1F24]/80 backdrop-blur-md"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-[#1A1F24]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col p-6 sm:p-8 space-y-4 animate-fade-in border-t border-white/10 overflow-y-auto">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div className="bg-white rounded-lg px-2 py-1 inline-flex">
              <img
                src="/assets/hello_bali/logo_crop.png"
                alt="Hello Bali Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#F48753] font-semibold">
              Weekend Villas
            </span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="font-body text-base font-medium text-white/90 hover:text-[#F48753] tracking-wide py-2.5 border-b border-white/5 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#E06D38] hover:bg-[#C55624] text-white font-body text-sm font-semibold py-3.5 rounded-full shadow-lg cursor-pointer"
            >
              Schedule Site Visit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
