/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import OrderForm from './components/OrderForm';
import Reviews from './components/Reviews';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-dark font-sans select-none antialiased">
      {/* Dynamic Navigation Bar */}
      <Header />

      {/* Hero Segment */}
      <Hero />

      {/* Menu / Catalog Structure Segment */}
      <MenuSection />

      {/* Main Order Builder Form with Live Totals & WhatsApp Submission */}
      <OrderForm />

      {/* About Segment (Story placeholder) */}
      <About />

      {/* Testimonials Segment */}
      <Reviews />

      {/* Interactive Location, Times and Contacts Segment */}
      <LocationSection />

      {/* Dynamic Legal and Social Footer */}
      <Footer />

      {/* Persistent WhatsApp Speed Dial */}
      <FloatingWhatsApp />
    </div>
  );
}

