/**
 * Footer Component (React)
 * Tailwind-first footer with scroll-to-top action
 */
import { useEffect, useState } from 'react';

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-auto bg-gradient-to-r from-slate-900 to-slate-800 py-8 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-white/70">
          © {currentYear} <span className="font-semibold text-white/80">Wykończenie wnętrz we Wrocławiu</span>
        </p>
      </div>

      <button
        type="button"
        className={`fixed right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${showScrollTop ? 'bottom-5 opacity-90' : '-bottom-20 opacity-0'}`}
        onClick={scrollToTop}
        aria-label="Wróć na górę"
      >
        <i className="material-icons text-xl">arrow_upward</i>
      </button>
    </footer>
  );
}

export default Footer;
