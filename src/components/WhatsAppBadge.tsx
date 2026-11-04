import { useEffect, useRef, useState } from 'react';
import { HERO_CONTROLS_ID } from '../lib/elementIds';
import { whatsAppLink } from '../lib/whatsapp';

export default function WhatsAppBadge() {
  const badgeRef = useRef<HTMLElement>(null);
  const [coversHeroCaption, setCoversHeroCaption] = useState(false);

  // On first load the hero's caption row can sit at the bottom of the screen right where this badge floats,
  // so the badge fades out until the row scrolls clear
  useEffect(() => {
    const check = () => {
      const badge = badgeRef.current?.getBoundingClientRect();
      const caption = document.getElementById(HERO_CONTROLS_ID)?.getBoundingClientRect();
      setCoversHeroCaption(
        !!badge &&
          !!caption &&
          badge.left < caption.right &&
          badge.right > caption.left &&
          badge.top < caption.bottom &&
          badge.bottom > caption.top,
      );
    };

    // Scroll events already arrive at most once per frame, and the check is two cheap measurements
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    // The hero settles after first paint (web fonts swapping in change its height), so re-check when the page resizes
    const pageResize = new ResizeObserver(check);
    pageResize.observe(document.body);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      pageResize.disconnect();
    };
  }, []);

  return (
    <aside
      ref={badgeRef}
      aria-label="WhatsApp Quick Connect"
      // Only opacity and visibility change, so the badge's measured position stays put while hidden
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center transition-[opacity,visibility] duration-300 ${
        coversHeroCaption ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      <a
        href={whatsAppLink('Hello PROYAS, I would like to inquire about a child assessment session.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with PROYAS Centre"
        className="animate-pulse-ring flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xl transition-all duration-300 hover:scale-105 group"
      >
        <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center text-xl sm:text-lg">
          <i className="fa-brands fa-whatsapp text-white"></i>
        </div>
        {/* Icon only on phones so it doesn't cover page content */}
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] text-emerald-100 font-medium leading-none">Instant Support</span>
          <span className="text-xs font-bold leading-tight mt-0.5">Chat on WhatsApp</span>
        </div>
      </a>
    </aside>
  );
}
