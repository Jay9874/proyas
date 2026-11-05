import SectionHeader from "./SectionHeader";

// Full class strings per colour so Tailwind can find them when scanning the source
const TONES = {
  teal: {
    check: "text-teal-600",
  },
  amber: {
    check: "text-amber-600",
  },
};

const PROGRAMS: {
  tone: keyof typeof TONES;
  icon: string;
  iconClassName: string;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    tone: "teal",
    icon: "fa-child-reaching",
    iconClassName: "bg-teal-700 text-teal-100 shadow-teal-900/10",
    title: "Occupational Therapy & Sensory Integration",
    description:
      "A fully equipped sensory gym with swings, balance beams and tactile play to build regulation and motor skills.",
    points: [
      "Sensory swings & balance work",
      "Fine motor & handwriting skills",
      "Self-care independence",
    ],
  },
  {
    tone: "amber",
    icon: "fa-comment-dots",
    iconClassName: "bg-amber-600 text-amber-50 shadow-amber-900/10",
    title: "Speech & Language Therapy",
    description:
      "Speech therapists work on oral motor skills, clear pronunciation and fluency so children can express their needs with confidence.",
    points: [
      "Oral motor rehabilitation",
      "Vocal clarity & stammering support",
      "Communication tools & vocabulary",
    ],
  },
  {
    tone: "teal",
    icon: "fa-book-open-reader",
    iconClassName: "bg-teal-800 text-teal-100 shadow-teal-950/10",
    title: "Special Education & IEP",
    description:
      "Certified special educators set one-to-one learning goals that build school readiness at the child's own pace.",
    points: [
      "1-on-1 personalised curriculum",
      "Visual schedules & pictorial aids",
      "Mainstream school readiness",
    ],
  },
];

const SUPPORTING_THERAPIES = [
  {
    icon: "fa-comment-dots",
    title: "Speech & Language Therapy",
    text: "Oral motor rehabilitation, vocal clarity, stammering intervention, and communication tools.",
  },
  {
    icon: "fa-child-reaching",
    title: "Occupational Therapy",
    text: "Motor skills, sensory regulation, handwriting and daily self-care, built through purposeful play.",
  },
  {
    icon: "fa-shapes",
    title: "Behavior Modification",
    text: "Positive reinforcement routines, emotional tantrum reduction, and self-soothing methods.",
  },
  {
    icon: "fa-puzzle-piece",
    title: "Play Therapy & Brain Gym",
    text: "Guided play and simple movement exercises that build social skills, emotional expression, focus and coordination.",
  },
  {
    icon: "fa-screwdriver-wrench",
    title: "Vocational Training & Special Education",
    text: "Special education alongside practical work and daily-living skills that build independence for teens and young adults.",
  },
  {
    icon: "fa-clipboard-list",
    title: "Psychological Counselling & IQ Test",
    text: "Counselling for children and families, plus standardised IQ and psychometric assessments.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="mb-10 sm:mb-16"
          eyebrowClassName="text-teal-800 bg-teal-100/70 border-teal-200"
          eyebrow="Our Specialities & Facilities"
          title="Specialized Therapies & Child-Centred Programs"
          description="At PROYAS, our clinical programs combine proven therapeutic science with deep human compassion to nurture emotional stability, physical independence, and joyful learning."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16">
          {PROGRAMS.map((program) => {
            const tone = TONES[program.tone];
            return (
              <div
                key={program.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 shadow-md ${program.iconClassName}`}
                >
                  <i className={`fa-solid ${program.icon}`}></i>
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                  {program.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed sm:leading-5 mb-5">
                  {program.description}
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {program.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <i
                        className={`fa-solid fa-circle-check ${tone.check}`}
                      ></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mb-3">
          <span className="h-px flex-1 bg-slate-200"></span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 text-center text-balance">
            Our Services
          </h3>
          <span className="h-px flex-1 bg-slate-200"></span>
        </div>
        <p className="text-center text-sm text-slate-600 mb-8">
          Focused programmes that work alongside each child's core therapy plan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPPORTING_THERAPIES.map(({ icon, title, text }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-colors flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <i className={`fa-solid ${icon} text-lg`}></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  {title}
                </h4>
                <p className="text-xs text-slate-600 leading-normal">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
