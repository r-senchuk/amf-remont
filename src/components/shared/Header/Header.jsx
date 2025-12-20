import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/about', label: 'O NAS' },
  { href: '/services', label: 'OFERTA' },
  { href: '/gallery', label: 'GALERIA' }
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
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
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

            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-white transition hover:bg-white/10"
              title="AMF GROUP – wykończenie wnętrz pod klucz na terenie Wrocławia i okolic | Główna"
            >
              <img
                src="/assets/logo/logo.svg"
                alt="AMF GROUP – wykończenie wnętrz pod klucz na terenie Wrocławia i okolic."
                className="h-12 w-auto"
              />
              <div className="hidden text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:block">
                Wykończenia <br /> Wrocław
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wider text-white/70 lg:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="rounded-md px-2 py-1 transition hover:text-white"
              >
                {label}
              </Link>
            ))}
            <a
              href="/contact"
              onClick={handleContactClick}
              className="rounded-full bg-primary px-4 py-2 text-white shadow-card transition hover:shadow-card-hover"
            >
              Kontakt
            </a>
          </nav>

          <div className="hidden items-center gap-4 text-sm font-medium text-white/80 sm:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
              <img src="/assets/icons/hummer.svg" alt="ремонт" className="h-7 w-auto opacity-70" />
              <a href="tel:+48796019986" className="hover:text-white">
                +48 796 019 986
              </a>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
              <img src="/assets/icons/painting.svg" alt="wykończenie" className="h-7 w-auto opacity-70" />
              <a href="tel:+48795621905" className="hover:text-white">
                +48 795 621 905
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isDrawerOpen}
      >
        <div
          className={`absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[80vw] bg-slate-900 text-white shadow-xl transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <Link to="/" onClick={() => handleNav('/')} className="flex items-center gap-3">
              <img src="/assets/logo/logo.svg" alt="AMF GROUP" className="h-10 w-auto" />
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">AMF Group</span>
            </Link>
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

          <nav className="flex flex-col gap-1 px-3 py-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white/5"
                onClick={() => handleNav(href)}
              >
                {label}
                <i className="material-icons text-base opacity-60">arrow_forward</i>
              </Link>
            ))}
            <button
              type="button"
              onClick={handleContactClick}
              className="mt-2 inline-flex items-center justify-between rounded-lg bg-primary px-3 py-3 text-sm font-semibold uppercase tracking-wider shadow-card transition hover:shadow-card-hover"
            >
              Kontakt
              <i className="material-icons text-base">phone_in_talk</i>
            </button>
          </nav>

          <div className="mt-auto border-t border-white/10 px-4 py-4 text-sm text-white/80">
            <p className="mb-2 font-semibold uppercase tracking-wide text-white">Zadzwoń:</p>
            <div className="flex flex-col gap-2">
              <a href="tel:+48796019986" className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:bg-white/10">
                <i className="material-icons text-base opacity-70">phone</i>
                +48 796 019 986
              </a>
              <a href="tel:+48795621905" className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:bg-white/10">
                <i className="material-icons text-base opacity-70">phone</i>
                +48 795 621 905
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
