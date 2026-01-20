/**
 * Services Page Component (React)
 * Tailwind-first list of renovation services offered
 */
import { strengths, serviceCategories } from '../../../data/services';
import Section from '../../shared/Section/Section';

function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50">
      <header className="bg-gradient-to-r from-primary to-primary-dark py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Oferta</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">Zakres prac remontowych</h1>
          <p className="mt-3 text-base text-white/80 sm:text-lg">
            Kompleksowe usługi remontowe — od konstrukcji po detale wykończenia.
          </p>
        </div>
      </header>

      <Section>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/60">Nasze atuty</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Nasze atuty w skrócie</h2>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            Doświadczenie, podejście i lokalizacja we Wrocławiu i okolicach.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {strengths.map((strength) => (
            <div
              key={strength.title}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-left backdrop-blur-sm"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <i className="material-icons text-base">{strength.icon}</i>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900">{strength.title}</p>
                <p className="text-xs text-slate-600">{strength.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Oferta naszej firmy remontowej</h2>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            Specjalizujemy się w wykończeniach od konstrukcji po detale.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {serviceCategories.map((category) => (
            <details key={category.title} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <i className="material-icons text-lg">{category.icon}</i>
                  </span>
                  <span className="text-base font-semibold text-slate-900">{category.title}</span>
                </span>
                <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">▾</span>
              </summary>
              <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                <ul className="space-y-2 text-sm text-slate-700">
                  {category.items.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300" />
                      <div>
                        <p className="font-medium text-slate-900">{item.title}</p>
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
