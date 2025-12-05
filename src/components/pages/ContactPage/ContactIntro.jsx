/**
 * ContactIntro Component
 * Heading and lead paragraph for contact section
 */
import React from 'react';

function ContactIntro() {
  return (
    <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', marginBottom: '2.5rem' }}>
      {/* Badge */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '9999px',
        backgroundColor: 'rgba(26, 73, 167, 0.1)',
        color: '#1a49a7',
        padding: '0.375rem 0.75rem',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '1rem'
      }}>
        <span style={{
          width: '0.375rem',
          height: '0.375rem',
          backgroundColor: '#ff942a',
          borderRadius: '50%',
          marginRight: '0.5rem',
          animation: 'pulse 2s infinite'
        }}></span>
        Wycena gratis
      </span>
      
      {/* Heading */}
      <h2 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
        fontWeight: '700',
        letterSpacing: '-0.025em',
        color: '#1e293b',
        marginBottom: '0.75rem',
        lineHeight: '1.2'
      }}>
        Kontakt i <span style={{ color: '#1a49a7' }}>wycena remontu</span>
      </h2>
      
      {/* Lead paragraph */}
      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
        color: '#475569',
        lineHeight: '1.7',
        margin: 0
      }}>
        Planujesz wykończenie mieszkania od dewelopera albo remont generalny we Wrocławiu lub okolicach?{' '}
        <span style={{ fontWeight: '600', color: '#1e293b' }}>Zadzwoń lub napisz e-mail</span> – przygotujemy wstępną wycenę i możliwy termin rozpoczęcia prac.
      </p>
    </div>
  );
}

export default ContactIntro;
