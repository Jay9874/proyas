import { BRANCHES, CERTIFICATE, EMAIL, LOGO_URL, PHONE_DISPLAY, PHONE_HREF } from "../config";
import { whatsAppLink } from "../lib/whatsapp";

const QUICK_LINKS = [
  { href: "#concerns", label: "Child Concerns & Challenges" },
  { href: "#services", label: "Therapies & Clinical Services" },
  { href: "#approach", label: "Our Approach & Methodology" },
  { href: "#certification", label: "ISO Certification" },
  { href: "#visit", label: "Our Centres" },
];

export default function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-24 sm:pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* Thin white rim so the logo's blue ring stands out on the dark footer */}
              <img
                src={LOGO_URL}
                alt=""
                width={44}
                height={44}
                className="w-11 h-11 rounded-full bg-white p-0.5 shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-white leading-tight">
                  PROYAS
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Nurturing every child's unique potential with dedicated
              occupational therapy, speech rehabilitation, sensory integration,
              special education, and structured day care at our Dum Dum and
              Barrackpore centres.
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold">
                <i className="fa-solid fa-award text-amber-400"></i>
                <span>
                  Occupational Therapist & Child Development Centre
                </span>
              </div>
              <a
                href={CERTIFICATE.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 font-semibold"
              >
                <i className="fa-solid fa-certificate text-amber-400"></i>
                <span>{CERTIFICATE.standard} Certified</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onBook}
                  className="hover:text-teal-400 transition-colors"
                >
                  Book Child Assessment
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Visit
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              {BRANCHES.map((branch) => (
                <p key={branch.id} className="flex items-start gap-2.5">
                  <i className="fa-solid fa-location-dot text-teal-400 mt-0.5 shrink-0"></i>
                  <span>
                    <span className="text-white font-semibold">{branch.name}:</span>{" "}
                    {branch.shortAddress}
                  </span>
                </p>
              ))}
              <p className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-teal-400 shrink-0"></i>
                <a
                  href={PHONE_HREF}
                  className="text-white hover:text-teal-400 font-semibold"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <i className="fa-brands fa-whatsapp text-emerald-400 shrink-0 text-sm"></i>
                <a
                  href={whatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 font-semibold"
                >
                  WhatsApp: {PHONE_DISPLAY}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <i className="fa-solid fa-envelope text-teal-400 shrink-0"></i>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-white hover:text-teal-400 font-semibold break-all"
                >
                  {EMAIL}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <i className="fa-regular fa-clock text-teal-400 shrink-0"></i>
                <span>Opens Daily at 10:00 AM (By Appointment)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PROYAS. All rights reserved.</p>
          <p className="text-slate-500">
            Empowering children with love, dignity & clinical guidance.
          </p>
        </div>
      </div>
    </footer>
  );
}
