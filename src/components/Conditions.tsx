import type { ConcernId } from '../data/concerns';
import SectionHeader from './SectionHeader';

// Full class strings per colour so Tailwind can find them when scanning the source
const TONES = {
  teal: {
    card: 'hover:border-teal-400 hover:shadow-teal-900/5',
    icon: 'bg-teal-100/70 text-teal-800',
    title: 'group-hover:text-teal-800',
    label: 'text-teal-800',
    button: 'text-teal-800 bg-teal-50 group-hover:bg-teal-700 border-teal-200 group-hover:border-teal-700',
  },
  amber: {
    card: 'hover:border-amber-400 hover:shadow-amber-900/5',
    icon: 'bg-amber-100/70 text-amber-700',
    title: 'group-hover:text-amber-800',
    label: 'text-amber-700',
    button: 'text-amber-800 bg-amber-50 group-hover:bg-amber-600 border-amber-200 group-hover:border-amber-600',
  },
};

interface Condition {
  concern: ConcernId;
  tone: keyof typeof TONES;
  icon: string;
  title: string;
  signs: string;
  intervention: string;
}

const CONDITIONS: Condition[] = [
  {
    concern: 'autism',
    tone: 'teal',
    icon: 'fa-puzzle-piece',
    title: 'Autism Spectrum Disorder (ASD)',
    signs:
      'Signs include limited eye contact, repetitive play routines, sensory hypersensitivity, distress during transitions, and social communication barriers.',
    intervention:
      'Structured sensory routines, visual timetables, communication strategies, and gentle behavioral regulation.',
  },
  {
    concern: 'adhd',
    tone: 'amber',
    icon: 'fa-bolt',
    title: 'ADHD & Hyperactivity',
    signs:
      'Difficulty sustaining attention, continuous restless movement, impulsiveness, difficulty completing table-top tasks, or frequent emotional dysregulation.',
    intervention:
      'Vestibular grounding, deep pressure therapies, attention-stretching games, and executive function coaching.',

  },
  {
    concern: 'speech',
    tone: 'teal',
    icon: 'fa-comments',
    title: 'Speech & Communication Delay',
    signs:
      'Late speech onset, struggling to express basic needs, difficulty imitating sounds, pronunciation challenges, stammering, or regression of spoken words.',
    intervention:
      'Oral-motor exercise routines, play-based conversational cues, vocabulary enrichment, and parent speech coaching.',
  },
  {
    concern: 'intellectual',
    tone: 'teal',
    icon: 'fa-brain',
    title: 'Intellectual Disability',
    signs:
      'Significant delays in cognitive understanding, abstract reasoning, daily self-care tasks (brushing, dressing, feeding), and adaptive living capabilities.',
    intervention:
      'Specialized Individualized Education Plans (IEP), functional independence skills, and multi-sensory tools.',
  },
  {
    concern: 'cp',
    tone: 'teal',
    icon: 'fa-person-walking-with-cane',
    title: 'Cerebral Palsy',
    signs:
      'Variations in muscle tone (spasticity or floppiness), mobility limitations, posture asymmetry, balance hurdles, and difficulty in fine motor coordination.',
    intervention:
      'Pediatric occupational therapy, muscle relaxation techniques, adaptive gripping aids, and posture support.',
  },
  {
    concern: 'down',
    tone: 'teal',
    icon: 'fa-heart-pulse',
    title: 'Down Syndrome',
    signs:
      'Generalized muscle weakness (hypotonia), delays in walking or speech, unique sensory integration requirements, and developmental learning pacing.',
    intervention:
      'Holistic early stimulation, articulation and oral-motor strengthening, fine motor games, and social integration.',
  },
];


function ConditionCard({ condition, onInquire }: { condition: Condition; onInquire: () => void }) {
  const tone = TONES[condition.tone];

  return (
    <div
      className={`group bg-slate-50/80 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${tone.card}`}
    >
      <div>
        {/* Icon beside the title on phones to keep the cards short, above it from sm up */}
        <div className="flex items-center gap-3 mb-3 sm:block sm:mb-0">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0 sm:mb-4 group-hover:scale-110 transition-transform ${tone.icon}`}
          >
            <i className={`fa-solid ${condition.icon}`}></i>
          </div>
          <h3 className={`font-display text-lg font-bold text-slate-900 sm:mb-2 leading-snug transition-colors ${tone.title}`}>
            {condition.title}
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">{condition.signs}</p>
        <div className="p-3 bg-white rounded-xl border border-slate-200/70 text-xs text-slate-700">
          <span className={`font-bold ${tone.label}`}>Our Intervention:</span> {condition.intervention}
        </div>
      </div>
    </div>
  );
}

export default function Conditions({ onInquire }: { onInquire: (concern: ConcernId) => void }) {
  return (
    <section id="concerns" className="py-12 sm:py-16 lg:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="mb-8 sm:mb-14"
          eyebrow="Early Identification & Intervention"
          title="Is Your Child Facing Any of These Development Challenges?"
          description="Every child blossoms on their own developmental timeline. When signs of delay emerge, timely intervention guided by clinical therapists creates life-altering breakthroughs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CONDITIONS.map((condition) => (
            <ConditionCard
              key={condition.concern}
              condition={condition}
              onInquire={() => onInquire(condition.concern)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
