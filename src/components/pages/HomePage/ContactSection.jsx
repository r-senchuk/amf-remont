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
      style={{
        position: 'relative',
        padding: '4rem 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}
    >
      {/* Decorative Top Border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #1a49a7 0%, #ff942a 50%, #4caf50 100%)'
      }}></div>
      
      {/* Container */}
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <ContactIntro />
        <ContactChannels />
        <ContactFooterNote />
      </div>
    </section>
  );
}

export default ContactSection;
