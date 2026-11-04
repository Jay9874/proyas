import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type Ref } from 'react';

const COPIED_DURATION_MS = 2000;

/** Older copy method for browsers (often in-app ones) that refuse the Clipboard API. */
function copyBySelecting(text: string, host: HTMLElement): boolean {
  const field = document.createElement('textarea');
  field.value = text;
  field.readOnly = true;
  field.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
  // Placed inside the card because everything outside an open modal dialog can't be selected
  host.append(field);
  field.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

interface ResultCardProps {
  title: string;
  children: ReactNode;
  whatsAppHref: string;
  whatsAppLabel: string;
  /** The request as plain text, for visitors whose email app didn't open to paste into webmail */
  copyText: string;
  ref?: Ref<HTMLDivElement>;
}

/** The card shown above the form once the visitor's email app has been opened, with copy and WhatsApp fallbacks. */
export default function ResultCard({ title, children, whatsAppHref, whatsAppLabel, copyText, ref }: ResultCardProps) {
  const [copy, setCopy] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyDetails = async (e: MouseEvent<HTMLButtonElement>) => {
    const host = e.currentTarget.parentElement!;
    let copied: boolean;
    try {
      await navigator.clipboard.writeText(copyText);
      copied = true;
    } catch {
      copied = copyBySelecting(copyText, host);
    }

    clearTimeout(copyTimer.current);
    if (copied) {
      setCopy('copied');
      copyTimer.current = setTimeout(() => setCopy('idle'), COPIED_DURATION_MS);
    } else {
      // Last resort: show the details so they can be selected and copied by hand
      setCopy('failed');
    }
  };

  return (
    <div ref={ref} role="status" className="mb-4 p-5 rounded-2xl border transition-all bg-teal-50 border-teal-200 text-teal-950">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full text-white flex items-center justify-center shrink-0 bg-teal-700">
          <i className="fa-solid fa-envelope-open-text"></i>
        </div>
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <div className="text-xs leading-relaxed mb-3 text-teal-900 space-y-2">{children}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          type="button"
          onClick={copyDetails}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-teal-300 text-slate-800 hover:text-teal-800 font-bold text-xs rounded-xl transition-colors"
        >
          <i className={`fa-solid ${copy === 'copied' ? 'fa-check text-emerald-600' : 'fa-copy'} text-sm`}></i>
          <span>{copy === 'copied' ? 'Copied!' : 'Copy My Details'}</span>
        </button>
        <a
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
        >
          <i className="fa-brands fa-whatsapp text-sm"></i>
          <span>{whatsAppLabel}</span>
        </a>
      </div>
      {copy === 'failed' && (
        <div className="mt-3">
          <label htmlFor="copyFallback" className="block text-[11px] font-semibold text-teal-900 mb-1">
            Your browser blocked copying. Select this text and copy it:
          </label>
          <textarea
            id="copyFallback"
            readOnly
            rows={6}
            value={copyText}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full p-2.5 text-xs bg-white border border-teal-300 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
          ></textarea>
        </div>
      )}
    </div>
  );
}
