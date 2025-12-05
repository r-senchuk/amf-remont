/**
 * ContactPage Component
 * Main contact section with intro, channels, and footer note
 * Part of the SPA - renders within the main App layout
 */
import React from 'react';
import ContactIntro from './ContactIntro';
import ContactChannels from './ContactChannels';
import ContactFooterNote from './ContactFooterNote';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contactPage">
      {/* Page Header with Gradient Background */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-slate-900 py-16 md:py-20 lg:py-24">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-accent-orange rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary-light rounded-full blur-2xl"></div>
        </div>
        
        {/* Header Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Kontakt
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Gotowy na zmianę? Skontaktuj się z nami – zajmiemy się resztą.
          </p>
        </div>
      </header>

      {/* Contact Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        {/* Decorative Wave Transition */}
        <div className="absolute -top-1 left-0 right-0 overflow-hidden">
          <svg className="w-full h-8 text-slate-50" viewBox="0 0 1440 32" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,32 L1440,32 L1440,0 C1200,24 960,32 720,24 C480,16 240,0 0,8 L0,32 Z"></path>
          </svg>
        </div>
        
        {/* Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactIntro />
          <ContactChannels />
          <ContactFooterNote />
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
