/**
 * Home Page Component (React)
 * Tailwind-first landing page with hero, highlights, gallery, and services
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactSection from './ContactSection';
import Gallery from '../../shared/Gallery/Gallery';
import Section from '../../shared/Section/Section';
import useGalleryData from '../../../hooks/useGalleryData';
import services from '../../../data/services';

const featureList = [
  { icon: 'grade', title: 'Doświadczenie', copy: 'Setki zrealizowanych projektów – tworzymy wnętrza, które zachwycają.' },
  { icon: 'house', title: 'Remonty pod klucz', copy: 'Od planu po ostatnią pędzelkę, a Ty tylko cieszysz się efektem.' },
  { icon: 'emoji_objects', title: 'Kreatywne rozwiązania', copy: 'Innowacyjne podejście do remontów – Twoje mieszkanie będzie unikatowe.' },
  { icon: 'handshake', title: 'Osobiste podejście', copy: 'Dopasowujemy się do Twoich potrzeb, nie odwrotnie.' },
  { icon: 'alarm', title: 'Terminowość', copy: 'Harmonogram to dla nas zobowiązanie, nie sugestia.' },
  { icon: 'location_on', title: 'Lokalizacja', copy: 'Działamy na terenie Wrocławia i okolic.' }
];

function HomePage({ scrollToContact = false }) {
  const { photos } = useGalleryData();
  const galleryPhotos = photos.slice(0, 12);

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{ backgroundImage: 'url(/assets/backgrounds/backgr.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-slate-900/70" />

        <img src="/assets/images/kut2.png" alt="" className="hero-corner hero-corner--tl" aria-hidden="true" />
        <img src="/assets/images/kut1.png" alt="" className="hero-corner hero-corner--br" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
          <div className="hero-card w-full max-w-4xl space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-orange animate-pulse" />
              Wrocław i okolice
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Wykończenie wnętrz we <span className="text-primary">Wrocławiu</span>
            </h1>
            <p className="max-w-3xl text-lg text-white/85 sm:text-xl">
              AMF GROUP Remont – zmiana, którą możesz rozpocząć już dziś. Kompleksowe projekty, nadzór i 24-miesięczna gwarancja.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+48796019986"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <i className="material-icons text-base">call</i>
                Zadzwoń do nas
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                Dowiedz się więcej
                <i className="material-icons text-base">arrow_forward</i>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
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
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 shadow-sm backdrop-blur">
                <img src="/assets/icons/key.jpg" alt="" className="h-10 w-10 rounded-md object-cover opacity-80" />
                <div className="text-left text-sm font-semibold leading-tight text-white/80">24-miesięczna gwarancja</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="grid items-center gap-10 lg:grid-cols-[320px,1fr]">
          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            <img src="/assets/icons/key.jpg" alt="Klucz - remont pod klucz" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-4 text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">O nas</p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Kompleksowe <span className="text-primary">wykończenie wnętrz</span> od pomysłu do klucza
            </h2>
            <p className="text-base leading-relaxed">
              Czy marzysz o nowym, świeżym wnętrzu? Zadzwoń już teraz, a razem zespolimy Twoje pomysły z naszą ekspertyzą.
            </p>
            <p className="text-base leading-relaxed">
              Zaprojektujemy i wykończymy Twoje mieszkanie pod klucz. Jeśli chcesz mieć niebanalnie wykończone mieszkanie oraz kontrolę nad budżetem
              i nie masz czasu na pilnowanie ekipy budowlanej to dobrze trafiłeś! Zrobimy wszystko za Ciebie oraz zapewnimy 24-miesięczny serwis gwarancyjny.
            </p>
            <p className="text-base leading-relaxed">
              Wszystkie prace nadzoruje kierownik projektu. Wykończymy pod klucz na terenie Wrocławia i okolic.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
            >
              Dowiedz się więcej
              <i className="material-icons text-base">arrow_forward</i>
            </Link>
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <i className="material-icons text-xl">{feature.icon}</i>
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{feature.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery Section */}
      <Section
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

      {/* Services Section */}
      <Section className="bg-white">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Oferta</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Specjalizujemy się w:</h2>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            Kompleksowe usługi remontowe – od konstrukcji po detale wykończenia.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className={`flex h-full flex-col gap-3 rounded-2xl border border-slate-100 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover ${service.muted ? 'bg-slate-50' : 'bg-white'}`}
            >
              <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ${service.accent ? 'text-accent-green' : 'text-primary'}`}>
                <i className="material-icons text-xl">{service.icon}</i>
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

export default HomePage;
