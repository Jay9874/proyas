import { useState } from "react";
import { LOGO_URL, PHONE_DISPLAY, PHONE_HREF } from "../config";

const NAV_LINKS = [
  { href: "#concerns", label: "Child Concerns" },
  { href: "#services", label: "Therapies & Services" },
  { href: "#approach", label: "Our Approach" },
  { href: "#visit", label: "Visit Us" },
];

export default function Header({ onBook }: { onBook: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Shorter on phones to leave more of the screen for the hero photo */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <img
              src={LOGO_URL}
              alt=""
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-teal-900 leading-tight">
                PROYAS
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="hover:text-teal-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200/90 rounded-xl hover:bg-teal-100/80 transition-colors whitespace-nowrap"
            >
              <i className="fa-solid fa-phone text-teal-700"></i>
              <span>Call Direct</span>
            </a>

            {/* Shortened to "Book" on phones so the header fits 320px screens; screen readers still hear the full label */}
            <button
              type="button"
              onClick={onBook}
              aria-label="Book Child Assessment"
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 rounded-xl shadow-md shadow-teal-900/15 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              <i className="fa-regular fa-calendar-check text-amber-300"></i>
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Child Assessment</span>
            </button>

            <button
              type="button"
              aria-label="Toggle Navigation Menu"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden p-2 text-slate-700 hover:text-teal-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <i
                className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-xl`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobileMenu"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl"
        >
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700 pt-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-teal-50 hover:text-teal-800 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 rounded-xl"
            >
              <i className="fa-solid fa-phone text-teal-700"></i>
              <span>Call {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
