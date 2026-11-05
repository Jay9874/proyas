import { useState, type ReactNode } from "react";
import {
  BRANCHES,
  PHONE_DISPLAY,
  PHONE_HREF,
  mapDirectionsUrl,
  mapEmbedUrl,
} from "../config";
import { whatsAppLink } from "../lib/whatsapp";

function DetailRow({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-teal-100/80 text-teal-800 flex items-center justify-center text-lg shrink-0 border border-teal-200 shadow-xs">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

export default function Visit() {
  // Which centre the embedded map shows; picked on the map itself
  const [mapId, setMapId] = useState(BRANCHES[0].id);
  const active =
    BRANCHES.find((branch) => branch.id === mapId) ?? BRANCHES[0];

  return (
    <section id="visit" className="py-12 sm:py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Visit Our Branches
            </h2>

            {/* One card per branch; both links open Google Maps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-teal-100/80 text-teal-800 flex items-center justify-center text-sm shrink-0">
                      <i className="fa-solid fa-location-dot"></i>
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {branch.name}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-teal-700 mb-1">
                    {branch.mapsName}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {branch.address}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${branch.name} on map (opens Google Maps)`}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100 transition-colors"
                    >
                      <i className="fa-solid fa-map-location-dot mr-1.5"></i>
                      View on map
                    </a>
                    <a
                      href={mapDirectionsUrl(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Directions to ${branch.name} (opens Google Maps)`}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-teal-800 transition-colors"
                    >
                      Directions
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px] ml-1.5"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 mb-9">
              <DetailRow icon="fa-phone" title="Direct Phone / Enquiries">
                <a
                  href={PHONE_HREF}
                  className="text-base font-bold text-teal-800 hover:text-teal-950 transition-colors inline-flex items-center gap-2"
                >
                  <span>{PHONE_DISPLAY}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs text-teal-600"></i>
                </a>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct line for admissions, consultation appointments, and
                  therapist inquiries.
                </p>
              </DetailRow>

              <DetailRow icon="fa-clock" title="Working Hours">
                <p className="text-sm font-semibold text-slate-800">
                  Opens daily at 10:00 AM
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  By consultation & appointment. Prior booking recommended for
                  detailed assessments.
                </p>
              </DetailRow>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md shadow-teal-900/15 hover:shadow-lg transition-all duration-200"
              >
                <i className="fa-solid fa-phone text-xs"></i>
                <span>Call Now</span>
              </a>
              <a
                href={whatsAppLink(
                  "Hello PROYAS, I would like to know more about your therapy services and book a visit.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-900/15 hover:shadow-lg transition-all duration-200"
              >
                <i className="fa-brands fa-whatsapp text-base"></i>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-3 rounded-3xl border border-slate-200/90 shadow-xl shadow-teal-950/5 relative overflow-hidden group">
              {/* Picks which centre the embedded map below shows */}
              <div
                role="group"
                aria-label="Centre shown on the map"
                className="grid grid-cols-2 gap-1 p-1 mb-3 rounded-xl bg-slate-100"
              >
                {BRANCHES.map((branch) => {
                  const shown = branch.id === active.id;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => setMapId(branch.id)}
                      aria-pressed={shown}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                        shown
                          ? "bg-white text-teal-800 shadow-xs"
                          : "text-slate-600 hover:text-teal-800"
                      }`}
                    >
                      {branch.name}
                    </button>
                  );
                })}
              </div>
              <div className="w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden relative bg-slate-100">
                <iframe
                  key={active.id}
                  title={`PROYAS ${active.name} centre location`}
                  src={mapEmbedUrl(active)}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>

                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 shadow-lg flex items-center justify-between sm:justify-start gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      PROYAS {active.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {active.landmark}
                    </div>
                  </div>
                  <a
                    href={active.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Open in Maps</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
