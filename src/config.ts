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
  /** The centre's name on its Google Maps listing */
  mapsName: string;
  landmark: string;
  address: string;
  shortAddress: string;
  /** The centre's Google Maps listing */
  mapUrl: string;
  /** The listing's id and pin, copied from the "1s", "3d" and "4d" parts of mapUrl */
  mapsPin: { id: string; lat: number; lng: number };
}

export const BRANCHES: Branch[] = [
  {
    id: 'dum-dum',
    name: 'Dum Dum',
    mapsName: 'PROYAS',
    landmark: '1 No. Airport Gate, opposite Stay Hotel',
    address:
      '1 no, Airport Gate, 72, Ramkrishna Rd, opposite of Stay hotel, Italgacha, Motilal Colony, Rajbari, Dum Dum, Kolkata, West Bengal 700079',
    shortAddress: '1 no, Airport Gate, 72, Ramkrishna Rd, opposite Stay hotel, Italgacha, Dum Dum, Kolkata 700079',
    mapUrl:
      'https://www.google.com/maps/place/PROYAS/@22.6433347,88.4251694,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89f1e0f47869d:0x62e1456ea517cded!8m2!3d22.6433298!4d88.4300403!16s%2Fg%2F11zz85zgqm',
    mapsPin: { id: '0x39f89f1e0f47869d:0x62e1456ea517cded', lat: 22.6433298, lng: 88.4300403 },
  },
  {
    id: 'barrackpore',
    name: 'Barrackpore',
    mapsName: 'PROYAS (Child Development Centre)',
    landmark: 'S.N. Banerjee Road',
    address: 'Balaji Apartment, S.N. Banerjee Road, Barrackpore, West Bengal 700120',
    shortAddress: 'Balaji Apartment, S.N. Banerjee Road, Barrackpore, West Bengal 700120',
    mapUrl:
      'https://www.google.com/maps/place/PROYAS+(child+development+centre)/@22.7597972,88.3662429,17z/data=!4m6!3m5!1s0x39f89b158fa3556b:0x4c72587246ed40a3!8m2!3d22.7597923!4d88.3688178!16s%2Fg%2F11yhtvc4nx',
    mapsPin: { id: '0x39f89b158fa3556b:0x4c72587246ed40a3', lat: 22.7597923, lng: 88.3688178 },
  },
];

// Google's "Embed a map" format, pinned to the centre's own listing. Searching the street address instead
// pins whatever else Google finds there, such as the apartment building
export const mapEmbedUrl = ({ mapsName, mapsPin: { id, lat, lng } }: Branch) =>
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1800!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1` +
  `!3m3!1m2!1s${encodeURIComponent(id)}!2s${encodeURIComponent(mapsName)}!5e0!3m2!1sen!2sin!4v1730000000000!5m2!1sen!2sin`;
// Directions to the listing's pin, which Google resolves to the listing itself. Its name alone matches other
// places called PROYAS, and its address matches the building
export const mapDirectionsUrl = ({ mapsPin: { lat, lng } }: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

// ISO certificate details, copied from the certificate in public/
export const CERTIFICATE = {
  standard: 'ISO 9001:2015',
  number: '711135/2026/R',
  issuer: 'Robust Certifications Pvt. Ltd.',
  validUntil: '25 Oct 2029',
  pdfUrl: '/proyas-iso-9001-certificate.pdf',
};
