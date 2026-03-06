/**
 * Home Page Component (React)
 * Tailwind-first landing page with hero, highlights, gallery, and services
 */
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactSection from './ContactSection';
import Gallery from '../../shared/Gallery/Gallery';
import Section from '../../shared/Section/Section';
import useGalleryData from '../../../hooks/useGalleryData';
import services, { strengths, serviceCategories } from '../../../data/services';

const featureList = [
  { icon: 'grade', title: 'Doświadczenie', copy: 'Setki zrealizowanych projektów – tworzymy wnętrza, które zachwycają.' },
  { icon: 'house', title: 'Remonty pod klucz', copy: 'Od planu po ostatnią pędzelkę, a Ty tylko cieszysz się efektem.' },
  { icon: 'emoji_objects', title: 'Kreatywne rozwiązania', copy: 'Innowacyjne podejście do remontów – Twoje mieszkanie będzie unikatowe.' },
  { icon: 'handshake', title: 'Osobiste podejście', copy: 'Dopasowujemy się do Twoich potrzeb, nie odwrotnie.' },
  { icon: 'alarm', title: 'Terminowość', copy: 'Harmonogram to dla nas zobowiązanie, nie sugestia.' },
  { icon: 'location_on', title: 'Lokalizacja', copy: 'Działamy na terenie Wrocławia i okolic.' }
];

const aboutHighlights = [
  { icon: 'grade', title: 'Setki realizacji', copy: 'Doświadczenie, które przekłada się na sprawdzony proces i przewidywalne rezultaty.' },
  { icon: 'rule', title: 'Kontrola budżetu', copy: 'Pracujemy w ustalonym budżecie i harmonogramie – bez zaskoczeń.' },
  { icon: 'verified', title: 'Opieka i gwarancja', copy: 'Stały nadzór kierownika projektu i pełny serwis gwarancyjny.' }
];

function HomePage({ scrollToContact = false }) {
  const { photos } = useGalleryData();
  const galleryPhotos = photos.slice(0, 12);
  const location = useLocation();

  // Scroll to contact section when the route is /contact
  useEffect(() => {
    if (!scrollToContact) return;

    const timer = setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [scrollToContact]);

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace('#', '');
    const timer = setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="flex flex-col">
      {/* Design Fix: Fixed background for gap behind header */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-slate-900 z-0" aria-hidden="true" />
      
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative isolate bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'url(/assets/backgrounds/backgr.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />

        {/* Decorative corner images */}
        <img 
          src="/assets/images/kut2.png" 
          alt="" 
          className="absolute top-0 left-0 w-[140px] sm:w-[170px] lg:w-[220px] -translate-x-[8%] translate-y-[12%] sm:-translate-x-[6%] sm:translate-y-[8%] lg:-translate-x-[5%] lg:translate-y-[6%] drop-shadow-2xl z-10 pointer-events-none" 
          aria-hidden="true" 
        />
        <img 
          src="/assets/images/kut1.png" 
          alt="" 
          className="absolute bottom-0 right-0 w-[140px] sm:w-[170px] lg:w-[220px] translate-x-[8%] translate-y-[40%] sm:translate-x-[6%] sm:translate-y-[35%] lg:translate-x-[5%] lg:translate-y-[30%] drop-shadow-2xl z-10 pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
          {/* Hero Card */}
          <div className="relative z-20 mx-auto w-full max-w-4xl space-y-8 rounded-3xl border border-white/10 bg-slate-900/55 p-8 px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-12 lg:p-14">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <img src="/assets/logo/logo.svg" alt="AMF GROUP" className="h-12 w-auto" />
              </span>
              <div className="text-white">
                <div className="text-base font-semibold uppercase tracking-[0.3em] sm:text-lg">AMF GROUP</div>
                <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60 sm:text-sm">
                  Wykończenia wnętrz
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Wykończenie wnętrz we <span className="text-primary">Wrocławiu</span>
            </h1>
            <p className="max-w-3xl text-lg text-white/85 sm:text-xl">
              AMF GROUP Remont – zmiana, którą możesz rozpocząć już dziś. Kompleksowe projekty i nadzór.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+48796019986"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_16px_32px_rgba(26,73,167,0.35)] transition hover:-translate-y-0.5 md:px-12"
              >
                <i className="material-icons text-base">call</i>
                Zadzwoń do nas
              </a>
              <Link
                to="/#about"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-9 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_16px_32px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-white/20 md:px-12"
              >
                Dowiedz się więcej
                <i className="material-icons text-base">arrow_forward</i>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 shadow-sm backdrop-blur">
                <img src="/assets/icons/kitchen.svg" alt="" className="h-10 w-10 opacity-80" />
                <div className="text-left text-sm font-semibold leading-tight text-white/80">Kuchnie i łazienki pod klucz</div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 shadow-sm backdrop-blur">
                <img src="/assets/icons/painting.svg" alt="" className="h-10 w-10 opacity-80" />
                <div className="text-left text-sm font-semibold leading-tight text-white/80">Malowanie i dekoracje</div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 shadow-sm backdrop-blur">
                <img src="/assets/icons/hummer.svg" alt="" className="h-10 w-10 opacity-80" />
                <div className="text-left text-sm font-semibold leading-tight text-white/80">Nadzór kierownika projektu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-gradient-to-b from-white to-slate-50">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-4 text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">O nas</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Remonty pod klucz z <span className="text-primary">pełną obsługą</span>
            </h2>
            <p className="text-base leading-relaxed">
              Zaprojektujemy i wykończymy Twoje mieszkanie pod klucz. Zapewniamy kontrolę nad budżetem oraz stały nadzór kierownika projektu.
            </p>
            <div className="overflow-hidden rounded-2xl shadow-card sm:hidden">
              <img
                src="/assets/images/image.A.webp"
                alt="Nowoczesne wykończenie wnętrza"
                className="h-full w-full object-cover"
              />
              <p className="bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Styl i jakość wykończenia
              </p>
            </div>
            <p className="text-base leading-relaxed">
              Setki zrealizowanych projektów pozwoliły nam dopracować proces, dzięki czemu gwarantujemy terminowość i wysoką jakość prac.
            </p>
            <div className="overflow-hidden rounded-2xl shadow-card sm:hidden">
              <img
                src="/assets/icons/key.jpg"
                alt="Wykończenie pod klucz"
                className="h-full w-full object-cover"
              />
              <p className="bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Wykończenie pod klucz
              </p>
            </div>
            <p className="text-base leading-relaxed">
              Działamy na terenie Wrocławia i okolic, a na całość prac zapewniamy pełny serwis gwarancyjny.
            </p>
            <div className="overflow-hidden rounded-2xl shadow-card sm:hidden">
              <img
                src="/assets/images/image.C.webp"
                alt="Prace wykończeniowe w toku"
                className="h-full w-full object-cover"
              />
              <p className="bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Nadzór i realizacja
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {aboutHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white p-4 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <i className="material-icons text-lg">{item.icon}</i>
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-5">
            <div className="overflow-hidden rounded-2xl shadow-card sm:row-span-2">
              <img
                src="/assets/images/image.A.webp"
                alt="Nowoczesne wykończenie wnętrza"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-card">
              <img
                src="/assets/icons/key.jpg"
                alt="Wykończenie pod klucz"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img
                src="/assets/images/image.C.webp"
                alt="Prace wykończeniowe w toku"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Intro Copy */}
      <Section className="bg-white" width="narrow" innerClassName="text-center text-slate-700">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Wykończenie wnętrz we Wrocławiu</h2>
          <p className="text-base leading-relaxed sm:text-lg">
            Wieloletnia działalność w branży pozwoliła nam zdobyć kwalifikacje niezbędne do świadczenia usług na najwyższym poziomie.
            Realizujemy kompleksowe remonty mieszkań, domów oraz lokali użytkowych.
          </p>
          <p className="text-base leading-relaxed sm:text-lg">
            Zapewniamy trzymanie budżetu i harmonogramu prac ustalonego przed podpisaniem umowy. Oznacza to spokój i pewność terminowego ukończenia prac.
          </p>
          <p className="text-base leading-relaxed sm:text-lg">
            Jeśli szukasz firmy, która stawia na jakość, estetykę oraz ścisłą współpracę z Klientem, zapraszamy do kontaktu.
          </p>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-slate-50">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Dlaczego my</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Nasze atuty</h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <dl className="-my-4 divide-y divide-slate-200">
            {featureList.map((feature) => (
              <div key={feature.title} className="flex gap-4 py-4 sm:gap-5">
                <div className="flex shrink-0 items-center justify-center rounded-lg">
                  <span className="material-icons text-3xl text-primary" aria-hidden="true">{feature.icon}</span>
                </div>
                <div>
                  <dt className="text-base font-bold leading-6 text-slate-900">
                    {feature.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-600">
                    {feature.copy}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section
        id="gallery"
        className="relative overflow-hidden bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600"
        innerClassName="relative z-10"
        before={<div className="absolute inset-0 bg-green-900/20 pointer-events-none mix-blend-overlay" />}
      >
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">Galeria</h2>
        <p className="mt-3 text-center text-sm text-white/80 sm:text-base">
          Zobacz wybrane realizacje – od konceptu po finalne wykończenie.
        </p>
        <div className="mt-10">
          <Gallery photos={galleryPhotos} variant="small" showLink />
        </div>
      </Section>

      <Section id="services" className="bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Oferta</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Specjalizujemy się w:</h2>
            <p className="mt-2 text-base text-slate-600 sm:text-lg">
              Kompleksowe usługi remontowe – od konstrukcji po detale wykończenia.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {serviceCategories.map((category) => (
              <div key={category.title} className="overflow-hidden rounded-2xl border-t-4 border-primary bg-white shadow-md ring-1 ring-slate-200">
                <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
                  <h3 className="flex items-center gap-3 font-bold text-slate-900">
                    <span className="material-icons text-primary" aria-hidden="true">{category.icon}</span>
                    {category.title}
                  </h3>
                </div>
                <ul className="divide-y divide-slate-100">
                  {category.items.map((item) => (
                    <li key={item.title} className="group flex items-start gap-4 px-6 py-4 hover:bg-slate-50 even:bg-slate-50/30">
                      <span className="material-icons mt-0.5 text-2xl text-slate-400 transition-colors group-hover:text-primary" aria-hidden="true">{item.icon}</span>
                      <div>
                        <strong className="block text-sm font-semibold text-slate-900">{item.title}</strong>
                        <span className="block text-sm text-slate-500">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

export default HomePage;
