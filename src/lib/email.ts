import { EMAIL } from '../config';

/** Builds a mailto link that opens the visitor's email app with a message to the centre already filled in. */
export function emailLink(subject?: string, body?: string, to = EMAIL): string {
  // encodeURIComponent rather than URLSearchParams, whose '+' for spaces some mail apps show literally.
  // Line breaks become CRLF, as mailto links expect.
  const query = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body.replace(/\r?\n/g, '\r\n'))}`,
  ]
    .filter(Boolean)
    .join('&');
  return query ? `mailto:${to}?${query}` : `mailto:${to}`;
}
