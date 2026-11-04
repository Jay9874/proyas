// Contact details used across the site. Change them here and every section follows.

export const PHONE_DISPLAY = '+91 70013 54678';
export const PHONE_HREF = 'tel:7001354678';
export const WHATSAPP_NUMBER = '917001354678';
// Booking requests are addressed here, sent from the parent's own email app
export const EMAIL = 'paritoshitta@gmail.com';
export const LOGO_URL = '/proyas-logo.png';

export interface Branch {
  id: string;
  name: string;
  landmark: string;
  address: string;
  shortAddress: string;
}

export const BRANCHES: Branch[] = [
  {
    id: 'dum-dum',
    name: 'Dum Dum',
    landmark: '1 No. Airport Gate, opposite Stay Hotel',
    address:
      '1 no, Airport Gate, 72, Ramkrishna Rd, opposite of Stay hotel, Italgacha, Motilal Colony, Rajbari, Dum Dum, Kolkata, West Bengal 700079',
    shortAddress: '1 no, Airport Gate, 72, Ramkrishna Rd, opposite Stay hotel, Italgacha, Dum Dum, Kolkata 700079',
  },
  {
    id: 'barrackpore',
    name: 'Barrackpore',
    landmark: 'S.N. Banerjee Road',
    address: 'Balaji Apartment, S.N. Banerjee Road, Barrackpore, West Bengal 700120',
    shortAddress: 'Balaji Apartment, S.N. Banerjee Road, Barrackpore, West Bengal 700120',
  },
];

export const mapEmbedUrl = (branch: Branch) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
export const mapLinkUrl = (branch: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;

// ISO certificate details, copied from the certificate in public/
export const CERTIFICATE = {
  standard: 'ISO 9001:2015',
  number: '711135/2026/R',
  issuer: 'Robust Certifications Pvt. Ltd.',
  validUntil: '25 Oct 2029',
  pdfUrl: '/proyas-iso-9001-certificate.pdf',
};
