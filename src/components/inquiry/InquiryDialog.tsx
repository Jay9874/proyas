import { useImperativeHandle, useRef, type Ref } from 'react';
import type { ConcernId } from '../../data/concerns';
import InquiryForm, { type InquiryFormHandle } from './InquiryForm';

export interface InquiryDialogHandle {
  /** Opens the booking form, optionally with a concern already ticked. */
  open: (concern?: ConcernId) => void;
}

/** The assessment form in a modal dialog, opened from the "Book Child Assessment" buttons. */
export default function InquiryDialog({ ref }: { ref?: Ref<InquiryDialogHandle> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<InquiryFormHandle>(null);
  // Only close on a click that both starts and ends on the backdrop, not a text selection dragged out of the form
  const pressStartedOnBackdrop = useRef(false);

  useImperativeHandle(
    ref,
    () => ({
      open(concern) {
        dialogRef.current?.showModal();
        if (concern) formRef.current?.selectConcern(concern);
      },
    }),
    [],
  );

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      id="assessment-form"
      aria-labelledby="inquiry-title"
      onPointerDown={(e) => {
        pressStartedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        // Clicks on the dimmed backdrop land on the dialog element itself
        if (pressStartedOnBackdrop.current && e.target === e.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-3xl bg-transparent p-0 backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm open:animate-dialog-in motion-reduce:animate-none"
    >
      <div className="relative">
        <InquiryForm ref={formRef} />
        {/* After the form in the DOM so the dialog focuses the first form field, not this button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close booking form"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </dialog>
  );
}
