import type { usePhoneField } from '../../hooks/usePhoneField';

type PhoneFieldState = ReturnType<typeof usePhoneField>;

interface PhoneFieldProps {
  status: PhoneFieldState['status'];
  inputProps: PhoneFieldState['inputProps'];
}

const BORDER_BY_STATUS = {
  empty: 'border-slate-200 bg-slate-50',
  incomplete: 'border-slate-200 bg-slate-50',
  'invalid-prefix': 'border-rose-500 bg-rose-50/30',
  valid: 'border-emerald-500 bg-emerald-50/30',
};

export default function PhoneField({ status, inputProps }: PhoneFieldProps) {
  const valid = status === 'valid';

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor="parentPhone" className="block text-xs font-bold text-slate-700">
          Phone Number (10 Digits) <span className="text-rose-500">*</span>
        </label>
        <span className={`text-[11px] font-semibold ${valid ? 'text-emerald-600' : 'text-slate-400'}`}>
          {valid ? '✓ Valid 10-digit number' : `${inputProps.value.length}/10 digits`}
        </span>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-slate-500">
          <span className="mr-1">🇮🇳</span> +91
        </div>
        <input
          type="tel"
          id="parentPhone"
          name="phone_number"
          required
          maxLength={10}
          placeholder="9876543210"
          {...inputProps}
          className={`w-full pl-16 pr-10 py-2.5 text-sm font-semibold tracking-wider border rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all text-slate-900 placeholder:text-slate-400 ${BORDER_BY_STATUS[status]}`}
        />
        {valid && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-600">
            <i className="fa-solid fa-circle-check text-sm"></i>
          </div>
        )}
      </div>
      <p className="text-[11px] text-slate-500 mt-1">Must be an active Indian mobile number starting with 6, 7, 8, or 9.</p>
    </div>
  );
}
