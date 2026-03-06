import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { id: 'about', label: 'O NAS' },
  { id: 'services', label: 'OFERTA' },
  { id: 'gallery', label: 'GALERIA' }
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Close drawer on route change
    setIsDrawerOpen(false);
  }, [location.pathname]);

  const handleContactClick = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    setIsDrawerOpen(false);

    if (location.pathname !== '/contact') {
      navigate('/contact');
      return;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionNav = (sectionId) => {
    setIsDrawerOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNav = (href) => {
    if (href === '/contact') {
      handleContactClick();
      return;
    }
    setIsDrawerOpen(false);
    navigate(href);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-md"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(26,73,167,0.16), rgba(15,23,42,0)), repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 10px)'
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-24 -top-24 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-16 top-10 h-48 w-48 rounded-full bg-accent-orange/20 blur-3xl" />
        </div>

        <div className="hidden border-b border-white/10 lg:block">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-white/60">
            <div className="flex flex-1 items-center gap-3">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
                Remonty pod klucz
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Wrocław i okolice</span>
            </div>

            <nav className="flex flex-1 items-center justify-center gap-5 text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-white/70">
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSectionNav(id);
                  }}
                  className="rounded-md px-2 py-1 transition hover:text-white"
                >
                  {label}
                </a>
              ))}

            </nav>

            <div className="flex flex-1 items-center justify-end gap-3 text-white/70">
              <i className="material-icons text-sm text-accent-orange">phone_in_talk</i>
              <a href="tel:+48796019986" className="transition hover:text-white">
                +48 796 019 986
              </a>
              <span className="text-white/30">•</span>
              <a href="tel:+48795621905" className="transition hover:text-white">
                +48 795 621 905
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:hidden">
          <div className="flex min-w-0 items-center gap-3 lg:flex-1 lg:justify-start">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10 lg:hidden"
              onClick={() => setIsDrawerOpen((open) => !open)}
              aria-label="Otwórz menu"
            >
              <span className="sr-only">Otwórz menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-card transition hover:shadow-card-hover"
          >
            <i className="material-icons text-base">phone_in_talk</i>
            Kontakt
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transition ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isDrawerOpen}
      >
        <div
          className={`absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div
          className={`absolute left-0 top-16 h-[calc(100%-4rem)] w-80 max-w-[85vw] overflow-y-auto bg-slate-900 text-white shadow-xl transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Menu</span>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:border-white/30 hover:bg-white/10"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Zamknij menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex h-full flex-col gap-6 px-4 py-5">
            <div className="flex flex-col gap-2" role="navigation" aria-label="Menu">
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/90 hover:bg-white/10"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSectionNav(id);
                  }}
                >
                  {label}
                  <i className="material-icons text-base opacity-60">arrow_forward</i>
                </a>
              ))}
              <a
                href="/contact"
                onClick={handleContactClick}
                className="mt-2 inline-flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] shadow-card transition hover:shadow-card-hover"
              >
                Kontakt
                <i className="material-icons text-base">phone_in_talk</i>
              </a>
            </div>

            <div className="border-t border-white/10 pt-4 text-sm text-white/80">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Zadzwoń</p>
              <div className="flex flex-col gap-3">
                <a href="tel:+48796019986" className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10">
                  <i className="material-icons text-base text-accent-orange">phone</i>
                  <span className="text-sm font-semibold text-white">+48 796 019 986</span>
                </a>
                <a href="tel:+48795621905" className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10">
                  <i className="material-icons text-base text-accent-orange">phone</i>
                  <span className="text-sm font-semibold text-white">+48 795 621 905</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
