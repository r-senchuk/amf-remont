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

  const crewBravoUrl =
    'https://crewbravo.com/?utm_source=amf-group&utm_medium=website_footer&utm_campaign=portfolio_link';

  return (
    <footer className="relative mt-auto bg-gradient-to-r from-slate-900 to-slate-800 py-8 text-white z-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <p className="text-center text-sm font-medium text-white/70 md:text-left">
          © {currentYear}{' '}
          <span className="font-semibold text-white/80">
            Wykończenie wnętrz we Wrocławiu
          </span>
        </p>

        <p className="flex items-center gap-1.5 text-sm text-white/50">
          Developed by
          <a
            href={crewBravoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 transition-all duration-200 hover:text-white"
          >
            <img
              src="/assets/images/crewbravo-logo.svg"
              alt="CrewBravo Logo"
              className="h-5 w-auto"
            />
          </a>
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
