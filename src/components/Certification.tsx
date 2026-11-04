import { CERTIFICATE } from "../config";

/** A single-line credential strip; the full details live in the linked PDF. */
export default function Certification() {
  return (
    <section
      id="certification"
      aria-labelledby="certification-title"
      className="bg-slate-50 pt-6 sm:pt-10 lg:pt-16 pb-12 sm:pb-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl bg-white border border-slate-200 p-5 sm:px-7">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-award text-xl"></i>
            </span>
            <div>
              <h2
                id="certification-title"
                className="font-display text-lg sm:text-xl font-bold text-slate-900"
              >
                {CERTIFICATE.standard} Certified
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Certified by {CERTIFICATE.issuer}
              </p>
            </div>
          </div>
          <a
            href={CERTIFICATE.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-teal-200 text-teal-800 hover:bg-teal-50 font-bold text-sm transition-colors shrink-0"
          >
            <span>View Certificate</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
