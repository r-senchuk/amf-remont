/**
 * ContactFooterNote Component
 * Data privacy note and closing message
 */
import React from 'react';

function ContactFooterNote() {
  return (
    <div style={{ 
      marginTop: '2.5rem', 
      maxWidth: '48rem', 
      margin: '2.5rem auto 0',
      textAlign: 'center'
    }}>
      {/* Privacy Note */}
      <p style={{ 
        fontSize: '0.8125rem', 
        color: '#94a3b8',
        marginBottom: '1rem'
      }}>
        Twoje dane wykorzystamy wyłącznie do kontaktu w sprawie wyceny i realizacji prac wykończeniowych.
      </p>
      
      {/* Closing Message */}
      <p style={{ 
        fontSize: '0.9375rem', 
        color: '#475569', 
        lineHeight: '1.7',
        marginBottom: '1.5rem'
      }}>
        W <span style={{ fontWeight: '600', color: '#1a49a7' }}>AMF GROUP Remont</span> dbamy, żeby remont mieszkania był <span style={{ fontWeight: '500' }}>przewidywalny</span>, a nie stresujący.{' '}
        Daj nam znać, czego potrzebuje Twoje mieszkanie we Wrocławiu – resztą zajmiemy się my. 🏡
      </p>
      
      {/* CTA Buttons */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '0.75rem',
        paddingTop: '0.5rem'
      }}>
        <a 
          href="tel:+48796019986" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #ff942a 0%, #f89f47 100%)',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9375rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 12px rgba(255,148,42,0.35)',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(255,148,42,0.45)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(255,148,42,0.35)';
          }}
        >
          <i className="material-icons" style={{ fontSize: '1.125rem' }}>call</i>
          <span>Zadzwoń teraz</span>
        </a>
        <a 
          href="mailto:amfgroupremont@gmail.com" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            backgroundColor: 'white',
            border: '2px solid #1a49a7',
            color: '#1a49a7',
            fontWeight: '600',
            fontSize: '0.9375rem',
            borderRadius: '9999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#1a49a7';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#1a49a7';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <i className="material-icons" style={{ fontSize: '1.125rem' }}>email</i>
          <span>Napisz e-mail</span>
        </a>
      </div>
    </div>
  );
}

export default ContactFooterNote;
