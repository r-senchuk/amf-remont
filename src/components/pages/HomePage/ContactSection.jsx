/**
 * ContactSection Component
 * Contact section embedded in the main SPA view
 */
import React from 'react';
import ContactIntro from '../ContactPage/ContactIntro';
import ContactChannels from '../ContactPage/ContactChannels';
import ContactFooterNote from '../ContactPage/ContactFooterNote';
import Section from '../../shared/Section/Section';

function ContactSection() {
  return (
    <Section
      id="contact"
      className="relative bg-gradient-to-b from-slate-50 to-white"
      width="narrow"
      before={<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent-orange to-accent-green" />}
    >
      <ContactIntro />
      <ContactChannels />
      <ContactFooterNote />
    </Section>
  );
}

export default ContactSection;
