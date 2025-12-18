/**
 * Footer Component (React)
 * Site footer with copyright and scroll-to-top button
 */
import { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footerContainer">
        <p className="copyright">
          © {currentYear} <strong>Wykończenie wnętrz we Wrocławiu</strong>
        </p>
      </div>
      
      <button 
        className={`scrollTop ${showScrollTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="material-icons">arrow_forward_ios</i>
      </button>
    </footer>
  );
}

export default Footer;

