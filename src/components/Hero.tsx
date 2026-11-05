import { CERTIFICATE, PHONE_DISPLAY, PHONE_HREF } from "../config";
import HeroCarousel from "./HeroCarousel";

const HIGHLIGHTS = [
  {
    icon: "fa-child-reaching",
    iconClassName: "bg-teal-50 border-teal-100 text-teal-700",
    title: "Occupational Therapy",
  },
  {
    icon: "fa-comment-dots",
    iconClassName: "bg-amber-50 border-amber-100 text-amber-600",
    title: "Speech Therapy",
  },
  {
    icon: "fa-book-open-reader",
    iconClassName: "bg-teal-50 border-teal-100 text-teal-700",
    title: "Special Education",
  },
  {
    icon: "fa-hands-holding-child",
    iconClassName: "bg-mint-100 border-mint-200 text-teal-800",
    title: "Attentive Day Care",
  },
];

export default function Hero({ onBook }: { onBook: () => void }) {
  return (
    // overflow-clip rather than hidden so the carousel caption can stick to the bottom of the screen
    <section className="relative flex flex-col lg:block overflow-clip bg-gradient-to-b from-teal-50/60 via-white to-slate-50">
      {/* Decorative background accent */}
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-mint-200/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Text column. First in the DOM for screen readers; on phones it is pulled up over the photo's faded edge */}
      <div className="relative z-10 order-2 -mt-20 sm:-mt-24 lg:mt-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-0 lg:pointer-events-none">
        <div className="lg:min-h-[640px] lg:flex lg:items-center">
          <div className="lg:w-1/2 lg:py-14 lg:pointer-events-auto">
            <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-6">
              {/* Hidden on phones to leave more room for the photo; the certificate strip follows the hero */}
              <a
                href="#certification"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs hover:bg-amber-100 transition-colors"
              >
                <i className="fa-solid fa-award text-amber-600"></i>
                <span>{CERTIFICATE.standard} Certified</span>
              </a>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-900 text-xs font-medium shadow-xs">
                Occupational Therapist & Child Development Centre
              </span>
            </div>

            <h1 className="font-display text-[1.875rem] sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-4 sm:mb-5 text-balance">
              Nurturing Every Child's Unique Potential With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900">
                Care & Specialized Therapy
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 sm:mb-8 max-w-xl">
              A 100% child-safe environment, experienced specialists,
              individualized education (IEP) and integrated day care at our Dum
              Dum and Barrackpore centres, working hand-in-hand with parents
              towards every milestone.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-8">
              <button
                type="button"
                onClick={onBook}
                aria-haspopup="dialog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-sm shadow-lg shadow-teal-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <i className="fa-regular fa-calendar-check text-amber-300"></i>
                <span>Book Child Assessment</span>
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm hover:border-teal-300 hover:text-teal-800 shadow-xs transition-colors"
              >
                <span>Explore Therapies</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            </div>

            <ul className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-3 mb-8 max-w-lg">
              {HIGHLIGHTS.map(({ icon, iconClassName, title }) => (
                <li key={title} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                  <span
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${iconClassName}`}
                  >
                    <i className={`fa-solid ${icon} text-sm`}></i>
                  </span>
                  <span>{title}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-xs text-slate-600 pt-4 border-t border-slate-200/70">
              <div className="flex items-center gap-1.5 font-medium">
                <i className="fa-solid fa-location-dot text-teal-700 w-3.5 text-center"></i>
                <span>Airport Gate 1, Dum Dum, Kolkata and Barrackpore</span>
              </div>
              <span className="hidden sm:inline text-slate-300">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <i className="fa-solid fa-clock text-teal-700 w-3.5 text-center"></i>
                <span>Opens 10:00 AM Daily</span>
              </div>
              <span className="hidden sm:inline text-slate-300">·</span>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-bold"
              >
                <i className="fa-solid fa-phone w-3.5 text-center"></i>
                <span className="underline decoration-teal-300 underline-offset-2">Call {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*
        Photos: on phones a full-width strip above the text that fades into the headline;
        on large screens a panel on the right that fades in from behind the text.
      */}
      <div className="order-1 relative h-[30rem] sm:h-96 md:h-[28rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%]">
        <HeroCarousel />
      </div>
    </section>
  );
}
