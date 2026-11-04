import { useEffect, useRef, useState } from "react";
import { HERO_CONTROLS_ID } from "../lib/elementIds";

interface Slide {
  src: string;
  alt: string;
  title: string;
  /**
   * Crop anchor. Phones show a wide, short strip; large screens a tall panel whose left side fades
   * behind the text, so keep the child in view at both.
   */
  position: string;
}

const SLIDES: Slide[] = [
  {
    src: "/hero/climbing-wall.webp",
    alt: "A young child climbing a sensory climbing wall",
    title: "Sensory integration gym",
    position: "object-[50%_40%] lg:object-[50%_30%]",
  },
  {
    src: "/hero/balance-training.webp",
    alt: "A boy balancing on textured balance pods while placing a cone",
    title: "Balance & coordination",
    position: "object-[50%_25%] lg:object-[50%_20%]",
  },
  {
    src: "/hero/craft-activity.webp",
    alt: "A boy working on a paper craft activity with his teacher",
    title: "Special education",
    position: "object-[50%_35%] lg:object-[25%_50%]",
  },
  {
    src: "/hero/motor-planning.webp",
    alt: "A boy using two long sticks to lift a ring onto a cone",
    title: "Hand–eye coordination",
    position: "object-[70%_50%] lg:object-[100%_50%]",
  },
  {
    src: "/hero/celebrations.webp",
    alt: "Children and teachers dressed in white with tricolour sashes, celebrating Independence Day",
    title: "Celebrating together",
    position: "object-[60%_50%] lg:object-[63%_50%]",
  },
];

const SLIDE_DURATION_MS = 5500;
const SWIPE_THRESHOLD_PX = 40;
/** Indicator dots; they cycle on their own, whatever the number of photos */
const INDICATOR_COUNT = 3;

const wrap = (n: number, size: number) => ((n % size) + size) % size;

/** Auto-advancing, cross-fading photo slideshow for the hero. Pauses on hover or focus and honours reduced motion. */
export default function HeroCarousel() {
  // Counts every advance without wrapping, so the photos and the indicator dots can each loop at their own length
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const index = wrap(step, SLIDES.length);
  const activeIndicator = wrap(step, INDICATOR_COUNT);
  const running = playing && !paused;

  // Restarts on every advance and on resume, so each photo gets a full turn on screen
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setStep((s) => s + 1), SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [step, running]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Moments from PROYAS"
      // clip rather than hidden: hidden would stop the caption row sticking to the bottom of the screen
      className="relative h-full w-full overflow-clip"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) setStep((s) => s + (dx < 0 ? 1 : -1));
        touchStartX.current = null;
      }}
    >
      {/* Only the photos fade into the page; the controls below stay fully visible */}
      <div aria-live={playing ? "off" : "polite"} className="absolute inset-0 mask-fade-bottom lg:mask-fade-left">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}: ${slide.title}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Slow zoom-out on the active slide */}
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className={`h-full w-full object-cover ${slide.position} transition-transform duration-[7000ms] ease-out motion-reduce:transition-none ${
                  active ? "scale-100" : "scale-[1.06]"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/*
        Spans the photo. The row rests near its bottom edge (on phones, just above the faded part the headline
        overlaps) and sticks to the bottom of the screen while the photo runs past the fold.
      */}
      <div className="absolute inset-0 flex flex-col justify-end pb-[4.75rem] sm:pb-28 lg:pb-8 pointer-events-none">
        {/* Caption at the right end; dots centred from sm up, at the left end on phones so both fit one row */}
        <div
          id={HERO_CONTROLS_ID}
          className="sticky bottom-6 mx-4 sm:mx-6 lg:mx-10 flex items-center justify-between gap-2 sm:grid sm:grid-cols-[1fr_auto_1fr]"
        >
          <span aria-hidden="true" className="hidden sm:block"></span>
          <div className="shrink-0 flex items-center gap-2 rounded-full bg-slate-950/40 backdrop-blur-sm pl-3 pr-1 py-1 shadow-lg pointer-events-auto">
            <div aria-hidden="true" className="flex items-center gap-2">
              {Array.from({ length: INDICATOR_COUNT }, (_, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndicator ? "bg-white scale-125" : "bg-white/45"
                  }`}
                ></span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 text-white text-[10px] flex items-center justify-center transition-colors"
            >
              <i className={`fa-solid ${playing ? "fa-pause" : "fa-play"}`}></i>
            </button>
          </div>
          {/* Screen readers get the title from the slide's label */}
          <p
            key={index}
            aria-hidden="true"
            className="min-w-0 truncate sm:justify-self-end rounded-full bg-slate-950/45 backdrop-blur-sm px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-sm font-semibold text-white shadow-lg animate-caption-in motion-reduce:animate-none"
          >
            {SLIDES[index].title}
          </p>
        </div>
      </div>
    </div>
  );
}
