import { useEffect, useImperativeHandle, useRef, useState, type FormEvent, type Ref } from 'react';
import { BRANCHES, EMAIL } from '../../config';
import { CONCERN_OPTIONS, type ConcernId } from '../../data/concerns';
import { usePhoneField } from '../../hooks/usePhoneField';
import { emailLink } from '../../lib/email';
import { whatsAppLink } from '../../lib/whatsapp';
import ConcernsField from './ConcernsField';
import PhoneField from './PhoneField';
import ResultCard from './ResultCard';

export interface InquiryFormHandle {
  /** Ticks a concern, briefly highlights it and scrolls it into view. */
  selectConcern: (id: ConcernId) => void;
}

type SubmitState = { status: 'idle' } | { status: 'opened'; phone: string; details: string; whatsAppHref: string };

const AGE_OPTIONS = [
  { value: '1.5 - 2 Years', label: '1.5 - 2 Years (Early Steps)' },
  { value: '3 - 4 Years', label: '3 - 4 Years (Preschool / Early Intervention)' },
  { value: '5 - 6 Years', label: '5 - 6 Years (School Prep)' },
  { value: '7 - 9 Years', label: '7 - 9 Years' },
  { value: '10 - 14 Years', label: '10 - 14 Years' },
  { value: '15+ Years', label: '15+ Years' },
];
const DEFAULT_AGE = '3 - 4 Years';
const DEFAULT_CENTRE = BRANCHES[0].name;
const HIGHLIGHT_DURATION_MS = 2000;

const FIELD_CLASS =
  'w-full py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all text-slate-900';

export default function InquiryForm({ ref }: { ref?: Ref<InquiryFormHandle> }) {
  const resultRef = useRef<HTMLDivElement>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const phoneField = usePhoneField();
  const [parentName, setParentName] = useState('');
  const [childAge, setChildAge] = useState(DEFAULT_AGE);
  const [centre, setCentre] = useState(DEFAULT_CENTRE);
  const [concerns, setConcerns] = useState<ConcernId[]>([]);
  const [highlighted, setHighlighted] = useState<ConcernId | null>(null);
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherNotes, setOtherNotes] = useState('');
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' });

  useImperativeHandle(
    ref,
    () => ({
      selectConcern(id) {
        setConcerns((current) => (current.includes(id) ? current : [...current, id]));
        setHighlighted(id);
        clearTimeout(highlightTimer.current);
        highlightTimer.current = setTimeout(() => setHighlighted(null), HIGHLIGHT_DURATION_MS);
        document.getElementById(`concern-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      },
    }),
    [],
  );

  useEffect(() => () => clearTimeout(highlightTimer.current), []);

  // Bring the "press Send" card into view once it appears
  useEffect(() => {
    if (submit.status === 'opened') resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [submit]);

  const toggleConcern = (id: ConcernId, checked: boolean) =>
    setConcerns((current) => (checked ? [...current, id] : current.filter((c) => c !== id)));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phoneField.status !== 'valid') {
      phoneField.showAlert('⚠️ Please enter a complete 10-digit valid Indian mobile number starting with 6-9.');
      phoneField.focus();
      return;
    }

    // Selected concerns in the order they appear on the form, then any free-text notes on their own line
    const phone = phoneField.phone;
    const concernValues: string[] = CONCERN_OPTIONS.filter((o) => concerns.includes(o.id)).map((o) => o.value);
    const notes = otherChecked ? otherNotes.trim() : '';
    const details = [
      `Parent: ${parentName.trim()}`,
      `Phone: +91 ${phone}`,
      `Child Age: ${childAge}`,
      `Preferred Centre: ${centre}`,
      `Concerns: ${concernValues.join(', ') || 'Initial Developmental Evaluation'}`,
      ...(notes ? [`Notes: ${notes}`] : []),
    ].join('\n');

    // Hand the request to the parent's own email app, addressed to the centre; they press Send there.
    // The form stays filled in so they can try again, or use the fallbacks on the card.
    window.location.href = emailLink(
      `Child Assessment Request - ${parentName.trim()}`,
      `Hello PROYAS Team,\n\nI'd like to book a Child Assessment session.\n\n${details}\n\nThank you.`,
    );
    setSubmit({
      status: 'opened',
      phone,
      details,
      whatsAppHref: whatsAppLink(`Hello PROYAS Team! I'd like to book a Child Assessment session.\n${details}`),
    });
  };


  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-teal-950/5 relative">
      <div className="mb-6 pr-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 mb-1">
          <i className="fa-solid fa-user-doctor"></i>
          <span>Direct Clinical Inquiry</span>
        </div>
        <h2 id="inquiry-title" className="font-display text-2xl font-bold text-slate-900">
          Consult Our Specialists
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Book an initial clinical evaluation and child developmental screening session.
        </p>
      </div>

      {phoneField.alert && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 transition-all"
        >
          <i className="fa-solid fa-circle-exclamation text-rose-500 text-sm shrink-0"></i>
          <span className="font-semibold">{phoneField.alert}</span>
        </div>
      )}

      {submit.status === 'opened' && (
        <ResultCard
          ref={resultRef}
          title="Almost Done! Press Send in Your Email App"
          whatsAppHref={submit.whatsAppHref}
          whatsAppLabel="Send via WhatsApp Instead"
          copyText={submit.details}
        >
          <p>
            We've opened your email app with your details filled in, addressed to{' '}
            <span className="font-bold break-words">{EMAIL}</span>. Once you send it, our senior therapist will call you
            back on <span className="font-bold underline">+91 {submit.phone}</span>.
          </p>
          <p>Email app didn't open? Copy your details into an email to us, or send them on WhatsApp.</p>
        </ResultCard>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="parentName" className="block text-xs font-bold text-slate-700 mb-1.5">
            Parent's Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i className="fa-regular fa-user text-xs"></i>
            </div>
            <input
              type="text"
              id="parentName"
              name="parent_name"
              required
              maxLength={100}
              placeholder="e.g. Suman Sen"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className={`${FIELD_CLASS} pl-10 pr-3.5 placeholder:text-slate-400`}
            />
          </div>
        </div>

        <PhoneField status={phoneField.status} inputProps={phoneField.inputProps} />

        <div>
          <label htmlFor="childAge" className="block text-xs font-bold text-slate-700 mb-1.5">
            Child's Age <span className="text-slate-400 font-normal">(Select or specify)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i className="fa-solid fa-cake-candles text-xs"></i>
            </div>
            <select
              id="childAge"
              name="child_age"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className={`${FIELD_CLASS} pl-10 pr-8`}
            >
              {AGE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="preferredCentre" className="block text-xs font-bold text-slate-700 mb-1.5">
            Preferred Centre
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i className="fa-solid fa-location-dot text-xs"></i>
            </div>
            <select
              id="preferredCentre"
              name="preferred_centre"
              value={centre}
              onChange={(e) => setCentre(e.target.value)}
              className={`${FIELD_CLASS} pl-10 pr-8`}
            >
              {BRANCHES.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name} ({branch.landmark})
                </option>
              ))}
            </select>
          </div>
        </div>

        <ConcernsField
          selected={concerns}
          highlighted={highlighted}
          onToggle={toggleConcern}
          otherChecked={otherChecked}
          onOtherChange={setOtherChecked}
          otherNotes={otherNotes}
          onOtherNotesChange={setOtherNotes}
        />

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 hover:from-teal-800 hover:to-teal-950 text-white font-bold text-sm tracking-wide shadow-lg shadow-teal-900/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Book Child Assessment Session</span>
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

        <div className="text-center pt-1 space-y-1">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <i className="fa-regular fa-envelope text-teal-700"></i>
            <span>Opens your email app with these details filled in. Just press Send.</span>
          </p>
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <i className="fa-solid fa-lock text-emerald-600"></i>
            <span>100% Confidential · We respect your family's privacy. No spam.</span>
          </p>
        </div>
      </form>
    </div>
  );
}
