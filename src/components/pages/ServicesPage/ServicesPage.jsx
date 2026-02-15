/**
 * Services Page Component (React)
 * Tailwind-first list of renovation services offered
 */
import { strengths, serviceCategories } from '../../../data/services';
import Section from '../../shared/Section/Section';

function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 font-sans text-slate-600 antialiased">
      <header className="bg-gradient-to-r from-primary to-primary-dark py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Oferta</p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">Zakres prac remontowych</h1>
          <p className="mx-auto max-w-2xl text-base text-white/80 sm:text-lg">
            Kompleksowe usługi remontowe — od konstrukcji po detale wykończenia.
          </p>
        </div>
      </header>

      <Section className="bg-slate-50/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Dlaczego my</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Nasze atuty</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600">
              Konkretne wartości, na których opieramy każdą realizację.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:gap-x-12">
            {strengths.map((strength) => (
              <div key={strength.title} className="relative pl-16">
                <dt className="text-lg font-bold leading-7 text-slate-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-icons text-2xl leading-none" aria-hidden="true">{strength.icon}</span>
                  </div>
                  {strength.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">
                  {strength.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section>
        <div className="mt-20 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">Oferta naszej firmy remontowej</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
            Specjalizujemy się w wykończeniach od konstrukcji po detale.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {serviceCategories.map((category) => (
            <details key={category.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <span className="material-icons text-xl leading-none">{category.icon}</span>
                  </span>
                  <span className="text-lg font-bold text-slate-900">{category.title}</span>
                </span>
                <span className="material-icons text-slate-400 transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="border-t border-slate-100 bg-slate-50/50 px-6 pb-6 pt-4">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        {item.description ? <p className="mt-0.5 text-xs text-slate-500">{item.description}</p> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default ServicesPage;
