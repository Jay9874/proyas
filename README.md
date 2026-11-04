<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f9bbd600-f8b4-4d7f-b2c3-46ed6dd403c3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Booking requests

"Book Child Assessment" opens the parent's own email app with their details filled in, addressed to `EMAIL` in `src/config.ts`; they press Send there. If no email app opens, the confirmation card lets them copy the details or send them on WhatsApp instead. There is no backend, database or API key.

## Deploy on Vercel

Import the project in Vercel. It's detected as Vite and needs no environment variables.

## Project structure

- `src/config.ts` – phone number, branch addresses, map links and ISO certificate details
- `src/data/concerns.ts` – concern options shared by the form and the condition cards
- `src/components/` – one component per page section (Header, Hero, Certification, Conditions, Services, Approach, Visit, Footer…)
- `src/components/HeroCarousel.tsx` – hero photo slideshow; to add or swap a photo, put it in `public/hero/` and edit `SLIDES` (`position` sets how it's cropped on phones and large screens)
- `public/proyas-logo.png` – logo used in the header, footer and browser tab
- `src/components/inquiry/` – the booking dialog, the assessment form, its phone field, concern checkboxes and result cards
- `public/proyas-iso-9001-certificate.pdf` – the certificate linked from the site
- `src/hooks/usePhoneField.ts` – 10-digit Indian mobile number validation
- `src/lib/` – WhatsApp and email (mailto) link helpers
- `src/index.css` – Tailwind theme (brand colours, fonts) and global styles
