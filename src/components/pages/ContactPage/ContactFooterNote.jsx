/**
 * ContactFooterNote Component
 * Data privacy note and closing message
 */
import React from 'react';

function ContactFooterNote() {
  return (
    <div className="mx-auto mt-10 max-w-3xl text-center">
      {/* Privacy Note */}
      <p className="text-xs text-slate-400 mb-4">
        Twoje dane wykorzystamy wyłącznie do kontaktu w sprawie wyceny i realizacji prac wykończeniowych.
      </p>
      
      {/* Closing Message */}
      <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
        W <span className="font-semibold text-primary">AMF GROUP Remont</span> dbamy, żeby remont mieszkania był <span className="font-medium">przewidywalny</span>, a nie stresujący.{' '}
        Daj nam znać, czego potrzebuje Twoje mieszkanie we Wrocławiu – resztą zajmiemy się my. 🏡
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-row-reverse flex-wrap justify-center gap-3 pt-2">
        <a
          href="tel:+48796019986"
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-accent-orange to-accent-orange-light px-9 py-3.5 text-base font-semibold text-white shadow-[0_16px_32px_rgba(255,148,42,0.35)] transition-transform duration-200 hover:-translate-y-0.5 md:px-12 md:py-4"
        >
          <i className="material-icons text-base">call</i>
          <span>Zadzwoń teraz</span>
        </a>
        <a
          href="mailto:amfgroupremont@gmail.com"
          className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-3.5 text-base font-semibold text-primary shadow-[0_16px_32px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white md:px-12 md:py-4"
        >
          <i className="material-icons text-base">email</i>
          <span>Napisz e-mail</span>
        </a>
      </div>
    </div>
  );
}

export default ContactFooterNote;
