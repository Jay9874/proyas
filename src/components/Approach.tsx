import SectionHeader from './SectionHeader';

const STEPS = [
  {
    badgeClassName: 'bg-teal-800',
    title: 'Developmental Evaluation',
    text: 'Comprehensive sensory profiling, motor assessment, speech baseline, and emotional observation in an unhurried, gentle clinical atmosphere.',
    tagIcon: 'fa-stethoscope',
    tag: 'Initial Clinical Mapping',
    tagClassName: 'text-teal-800',
  },
  {
    badgeClassName: 'bg-teal-700',
    title: 'Individualized Plan (IEP)',
    text: "Formulating concrete short-term and long-term milestone goals tailored to the child's strengths, comfort zone, and sensory triggers.",
    tagIcon: 'fa-list-check',
    tag: 'Customized Milestone Roadmap',
    tagClassName: 'text-teal-800',
  },
  {
    badgeClassName: 'bg-teal-600',
    title: '1-on-1 Multi-Discipline Therapy',
    text: 'Weekly sensory gym sessions, speech rehabilitation, cognitive training, and playful socialization with dedicated specialists.',
    tagIcon: 'fa-dumbbell',
    tag: 'Active Sensory & Motor Work',
    tagClassName: 'text-teal-800',
  },
  {
    badgeClassName: 'bg-amber-600',
    title: 'Parent Guidance & Review',
    text: 'Bi-weekly milestone reviews with parents, practical home-care activity plans, and celebration of every breakthrough achieved.',
    tagIcon: 'fa-handshake-angle',
    tag: 'Continuous Family Partnership',
    tagClassName: 'text-amber-700',
  },
];

export default function Approach() {
  return (
    <section id="approach" className="py-12 sm:py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="mb-10 sm:mb-16"
          eyebrow="Our Clinical Methodology"
          title="A Compassionate, Step-by-Step Pathway to Milestones"
          description="We don't believe in one-size-fits-all treatments. Every child receives dedicated attention through a transparent 4-stage clinical pathway."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm ${step.badgeClassName}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{step.text}</p>
              </div>
              <div className={`text-[11px] font-semibold flex items-center gap-1 ${step.tagClassName}`}>
                <i className={`fa-solid ${step.tagIcon}`}></i>
                <span>{step.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
