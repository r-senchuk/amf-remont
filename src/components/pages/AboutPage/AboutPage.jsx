/**
 * About Page Component (React)
 * Tailwind-first layout for story, offering, and value props
 */
import services from '../../../data/services';

const strengths = [
  { icon: 'grade', title: 'Setki realizacji', copy: 'Doświadczenie, które przekłada się na sprawdzony proces i przewidywalne rezultaty.' },
  { icon: 'rule', title: 'Kontrola budżetu', copy: 'Pracujemy w ustalonym budżecie i harmonogramie – bez zaskoczeń.' },
  { icon: 'verified', title: 'Gwarancja 24 miesiące', copy: 'Pełny serwis gwarancyjny na wykonane prace.' }
];

function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">O nas</p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">Tworzymy Twoje wymarzone wnętrze</h1>
          <p className="text-base text-white/80 sm:text-lg">
            Od pomysłu do klucza – projektujemy, nadzorujemy i wykańczamy wnętrza we Wrocławiu i okolicach.
          </p>
        </div>
      </header>

      {/* Story */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:px-8">
          <div className="space-y-4 text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Kim jesteśmy</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Remonty pod klucz z pełną obsługą</h2>
            <p className="text-base leading-relaxed">
              Zaprojektujemy i wykończymy Twoje mieszkanie pod klucz. Zapewniamy kontrolę nad budżetem oraz stały nadzór kierownika projektu.
            </p>
            <p className="text-base leading-relaxed">
              Setki zrealizowanych projektów pozwoliły nam dopracować proces, dzięki czemu możemy zagwarantować terminowość i wysoką jakość prac.
            </p>
            <p className="text-base leading-relaxed">
              Pracujemy na terenie Wrocławia i okolic, a na całość prac udzielamy 24-miesięcznej gwarancji.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {strengths.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <i className="material-icons text-xl">{item.icon}</i>
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Zakres prac</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Co możemy zrobić dla Ciebie</h2>
            <p className="mt-2 text-base text-slate-600 sm:text-lg">
              Kompleksowe remonty mieszkań, domów i lokali użytkowych.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className={`flex h-full flex-col gap-3 rounded-2xl border border-slate-100 p-6 shadow-card ${service.muted ? 'bg-slate-50' : 'bg-white'}`}
              >
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ${service.accent ? 'text-accent-green' : 'text-primary'}`}>
                  <i className="material-icons text-xl">{service.icon}</i>
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
