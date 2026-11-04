import { CONCERN_OPTIONS, type ConcernId } from '../../data/concerns';

interface ConcernsFieldProps {
  selected: ConcernId[];
  highlighted: ConcernId | null;
  onToggle: (id: ConcernId, checked: boolean) => void;
  otherChecked: boolean;
  onOtherChange: (checked: boolean) => void;
  otherNotes: string;
  onOtherNotesChange: (notes: string) => void;
}

const OPTION_CLASS =
  'flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-teal-50/50 hover:border-teal-300 transition-colors cursor-pointer';
const CHECKBOX_CLASS = 'w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-600';

export default function ConcernsField({
  selected,
  highlighted,
  onToggle,
  otherChecked,
  onOtherChange,
  otherNotes,
  onOtherNotesChange,
}: ConcernsFieldProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-2">
        Child's Needs / Concerns <span className="text-slate-500 font-normal">(Select all that apply)</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {CONCERN_OPTIONS.map(({ id, value, label }) => (
          <label
            key={id}
            className={`${OPTION_CLASS} ${highlighted === id ? 'ring-2 ring-teal-600 bg-teal-50' : 'bg-slate-50'}`}
          >
            <input
              type="checkbox"
              name="concerns[]"
              value={value}
              id={`concern-${id}`}
              checked={selected.includes(id)}
              onChange={(e) => onToggle(id, e.target.checked)}
              className={CHECKBOX_CLASS}
            />
            <span className="text-slate-700 font-medium">{label}</span>
          </label>
        ))}
      </div>

      <div className="mt-2.5">
        <label className={`${OPTION_CLASS} bg-slate-50`}>
          <input
            type="checkbox"
            id="concern-other"
            checked={otherChecked}
            onChange={(e) => onOtherChange(e.target.checked)}
            className={CHECKBOX_CLASS}
          />
          <span className="text-slate-800 font-bold text-xs">Other / Specific Milestone Notes</span>
        </label>

        {otherChecked && (
          <div className="mt-2 transition-all">
            <textarea
              id="otherNotesInput"
              name="custom_notes"
              rows={2}
              maxLength={1000}
              autoFocus
              value={otherNotes}
              onChange={(e) => onOtherNotesChange(e.target.value)}
              placeholder="Please describe your child's specific developmental concerns or requirements..."
              className="w-full p-2.5 text-xs bg-white border border-teal-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 text-slate-800 placeholder:text-slate-400"
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
}
