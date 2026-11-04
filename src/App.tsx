/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Approach from './components/Approach';
import Certification from './components/Certification';
import Conditions from './components/Conditions';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import InquiryDialog, { type InquiryDialogHandle } from './components/inquiry/InquiryDialog';
import Services from './components/Services';
import Visit from './components/Visit';
import WhatsAppBadge from './components/WhatsAppBadge';
import type { ConcernId } from './data/concerns';

export default function App() {
  // Every "Book Child Assessment" button opens the same booking dialog
  const inquiryRef = useRef<InquiryDialogHandle>(null);
  const openInquiry = (concern?: ConcernId) => inquiryRef.current?.open(concern);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header onBook={() => openInquiry()} />
      <main>
        <Hero onBook={() => openInquiry()} />
        <Certification />
        <Conditions onInquire={openInquiry} />
        <Services />
        <Approach />
        <Visit />
      </main>
      <Footer onBook={() => openInquiry()} />
      <WhatsAppBadge />
      <InquiryDialog ref={inquiryRef} />
    </div>
  );
}
