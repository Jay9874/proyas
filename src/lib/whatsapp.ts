import { WHATSAPP_NUMBER } from '../config';

/** Builds a wa.me chat link to the centre, optionally with a pre-filled message. */
export function whatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
