/**
 * Services Page Component (React)
 * Tailwind-first list of renovation services offered
 */
import services from '../../../data/services';

function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50">
      <header className="bg-gradient-to-r from-primary to-primary-dark py-14 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Oferta</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">Nasza Oferta</h1>
          <p className="mt-3 text-base text-white/80 sm:text-lg">
            Kompleksowe usługi remontowe — od projektu po ostatnią pędzelkę.
          </p>
        </div>
      </header>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Specjalizujemy się w:</h2>
            <p className="mt-2 text-base text-slate-600 sm:text-lg">
              Pełne wsparcie w remoncie mieszkania, domu lub lokalu użytkowego.
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
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
