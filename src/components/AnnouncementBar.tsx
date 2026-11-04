import { PHONE_DISPLAY, PHONE_HREF } from '../config';

export default function AnnouncementBar() {
  return (
    <aside className="bg-teal-950 text-teal-100 text-xs border-b border-teal-900 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-800 text-teal-300 text-[10px]">
            <i className="fa-solid fa-bullhorn"></i>
          </span>
          <span className="font-medium text-teal-200">Admissions & Assessment Sessions Open</span>
          <span className="hidden lg:inline text-teal-400">·</span>
          <span className="hidden lg:inline text-teal-300">Dum Dum 1 No. Airport Gate + Barrackpore</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a href={PHONE_HREF} className="flex items-center gap-1.5 text-teal-200 hover:text-white transition-colors whitespace-nowrap">
            <i className="fa-solid fa-phone text-amber-400"></i>
            <span className="font-semibold">{PHONE_DISPLAY}</span>
          </a>
          {/* The hours repeat in the hero, so the narrowest phones show just the number */}
          <span className="text-teal-700 max-[359px]:hidden">|</span>
          <div className="flex items-center gap-1.5 text-teal-300 whitespace-nowrap max-[359px]:hidden">
            <i className="fa-regular fa-clock text-teal-400"></i>
            <span>Opens Daily 10:00 AM</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
