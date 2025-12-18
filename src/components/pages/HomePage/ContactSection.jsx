/**
 * ContactSection Component
 * Contact section embedded in the main SPA view
 */
import React from 'react';
import ContactIntro from '../ContactPage/ContactIntro';
import ContactChannels from '../ContactPage/ContactChannels';
import ContactFooterNote from '../ContactPage/ContactFooterNote';

function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent-orange to-accent-green"></div>
      
      {/* Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactIntro />
        <ContactChannels />
        <ContactFooterNote />
      </div>
    </section>
  );
}

export default ContactSection;
