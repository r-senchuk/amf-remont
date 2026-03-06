/**
 * ContactIntro Component
 * Heading and lead paragraph for contact section
 */
import React from 'react';

function ContactIntro() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10">
      {/* Badge */}
      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse mr-2"></span>
        Wycena gratis
      </span>
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 leading-tight">
        Kontakt i <span className="text-primary">wycena remontu</span>
      </h2>
      
      {/* Lead paragraph */}
      <p className="text-base md:text-lg text-slate-600 leading-relaxed">
        Planujesz wykończenie mieszkania od dewelopera albo remont generalny we Wrocławiu lub okolicach?{' '}
        <span className="font-semibold text-slate-800">Zadzwoń lub napisz e-mail</span> – przygotujemy wstępną wycenę i możliwy termin rozpoczęcia prac.
      </p>
    </div>
  );
}

export default ContactIntro;
