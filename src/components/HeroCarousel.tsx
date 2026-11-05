import { useRef, useState } from "react";
import { HERO_CONTROLS_ID } from "../lib/elementIds";

interface Slide {
  src: string;
  alt: string;
  title: string;
  /**
   * Crop anchor. Phones show a tall strip pinned to the top of each photo, so none loses its top; tablets a
   * wide, short strip; large screens a tall panel whose left side fades behind the text. Keep the child in view.
   */
  position: string;
}

const SLIDES: Slide[] = [
  {
    src: "/hero/img_1_proyas.jpeg",
    alt: "A girl sticking torn red paper onto a Santa Claus drawing",
    title: "Fine motor skills",
    position: "object-[50%_0%] sm:object-[50%_40%] lg:object-[50%_35%]",
  },
  {
    src: "/hero/img_2_proyas.jpeg",
    alt: "A girl guiding two hoops over a cone in the sensory gym",
    title: "Motor planning",
    position: "object-[50%_0%]",
  },
  {
    src: "/hero/img_3_proyas.jpeg",
    alt: "Children, parents and teachers seated in a circle outdoors under the trees",
    title: "Together with families",
    position: "object-[50%_0%] sm:object-[50%_70%] lg:object-[55%_50%]",
  },
  {
    src: "/hero/img_4_proyas.jpeg",
    alt: "A boy stacking coloured rings on a ring tower",
    title: "Hand–eye coordination",
    position: "object-[60%_0%] sm:object-[50%_30%] lg:object-[60%_40%]",
  },
  {
    src: "/hero/img_5_proyas.jpeg",
    alt: "Children around classroom tables making a tricolour paper chain",
    title: "Group activities",
    position: "object-[50%_0%] sm:object-[50%_50%] lg:object-[45%_50%]",
  },
  {
    src: "/hero/img_7_proyas.jpeg",
    alt: "A girl kneeling beside a rope on an obstacle course, placing a cone",
    title: "Obstacle course",
    position: "object-[50%_0%]",
  },
];

const SLIDE_DURATION_MS = 5500;
const SWIPE_THRESHOLD_PX = 40;
/** Time for the dots to slide one place; the timer starts once the new dot reaches the centre */
const DOT_SLIDE_MS = 300;
/** Distance between dot centres */
const DOT_SPACING_PX = 24;
/** The centre dot and one either side are shown; the outer two wait faded out, ready to slide in */
const DOT_OFFSETS = [-2, -1, 0, 1, 2];

const wrap = (n: number, size: number) => ((n % size) + size) % size;

/**
 * Auto-advancing, cross-fading photo slideshow for the hero. The centre dot fills up as the timer, and the dots
 * either side step back and forward. Pauses for keyboard focus and honours reduced motion.
 */
export default function HeroCarousel() {
  // Counts every advance without wrapping. It also keys the dots, so each keeps its element as it slides along
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const index = wrap(step, SLIDES.length);
  const running = playing && !paused;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Moments from PROYAS"
      // clip rather than hidden: hidden would stop the caption row sticking to the bottom of the screen
      className="relative h-full w-full overflow-clip"
      // Holds still while keyboard users move through the controls; a click or tap leaves the timer running
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setPaused(true);
      }}
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
      <div
        aria-live={playing ? "off" : "polite"}
        className="absolute inset-0 mask-fade-long sm:mask-fade-bottom lg:mask-fade-left"
      >
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
        Spans the photo. The row rests near its bottom edge (below large screens, just above the strip the headline
        overlaps) and sticks to the bottom of the screen while the photo runs past the fold.
      */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 sm:pb-28 lg:pb-8 pointer-events-none">
        {/* Caption at the right end; dots centred from sm up, at the left end on phones so both fit one row */}
        <div
          id={HERO_CONTROLS_ID}
          className="sticky bottom-6 mx-4 sm:mx-6 lg:mx-10 flex items-center justify-between gap-2 sm:grid sm:grid-cols-[1fr_auto_1fr]"
        >
          <span aria-hidden="true" className="hidden sm:block"></span>
          <div className="shrink-0 flex items-center gap-1 rounded-full bg-slate-950/40 backdrop-blur-sm px-1 py-1 shadow-lg pointer-events-auto">
            {/* Previous and next buttons sit over the side dots, which slide past underneath them */}
            <div className="relative w-[72px] h-7">
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                {DOT_OFFSETS.map((offset) => {
                  const centre = offset === 0;
                  return (
                    <span
                      key={step + offset}
                      className={`absolute top-1/2 left-1/2 h-2 rounded-full overflow-hidden bg-white/45 transition-all ease-out motion-reduce:transition-none ${
                        centre ? "w-6" : "w-2"
                      } ${Math.abs(offset) > 1 ? "opacity-0" : "opacity-100"}`}
                      style={{
                        transform: `translate(-50%, -50%) translateX(${offset * DOT_SPACING_PX}px)`,
                        transitionDuration: `${DOT_SLIDE_MS}ms`,
                      }}
                    >
                      {centre && (
                        <span
                          className="block h-full rounded-full bg-white animate-dot-progress"
                          style={{
                            animationDuration: `${SLIDE_DURATION_MS}ms`,
                            animationDelay: `${DOT_SLIDE_MS}ms`,
                            animationPlayState: running ? "running" : "paused",
                          }}
                          // This is the timer: the next photo comes in when the centre dot is full
                          onAnimationEnd={() => setStep((s) => s + 1)}
                        ></span>
                      )}
                    </span>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                aria-label="Previous photo"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-white/15 transition-colors"
              ></button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                aria-label="Next photo"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-white/15 transition-colors"
              ></button>
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
