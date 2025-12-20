/**
 * React Router Configuration
 * Defines all application routes with lazy loading
 */
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';

const HomePage = lazy(() => import('../components/pages/HomePage/HomePage.jsx'));
const AboutPage = lazy(() => import('../components/pages/AboutPage/AboutPage.jsx'));
const ServicesPage = lazy(() => import('../components/pages/ServicesPage/ServicesPage.jsx'));
const GalleryPage = lazy(() => import('../components/pages/GalleryPage/GalleryPage.jsx'));

// Route metadata for SEO
const routesMeta = {
  '/': {
    title: 'AMF GROUP - Wykończenie wnętrz we Wrocławiu',
    description: 'Profesjonalne wykończenie wnętrz we Wrocławiu. Remonty pod klucz, 24-miesięczna gwarancja. Setki zrealizowanych projektów. Zadzwoń już dziś!',
    ogTitle: 'AMF GROUP - Wykończenie wnętrz we Wrocławiu',
    ogDescription: 'Tworzymy Twoje wymarzone wnętrze - od pomysłu do klucza. Profesjonalne remonty pod klucz we Wrocławiu z 24-miesięczną gwarancją.',
    ogImage: '/assets/logo/logo.svg'
  },
  '/about': {
    title: 'O Nas - AMF GROUP | Wykończenie wnętrz we Wrocławiu',
    description: 'Poznaj AMF GROUP - firmę remontową z wieloletnim doświadczeniem. Setki zrealizowanych projektów, remonty pod klucz, 24-miesięczna gwarancja.',
    ogTitle: 'O Nas - AMF GROUP',
    ogDescription: 'Setki zrealizowanych projektów. Wieloletnie doświadczenie w branży remontowej. Tworzymy wnętrza, które zachwycają.',
    ogImage: '/assets/icons/key.jpg'
  },
  '/services': {
    title: 'Oferta - AMF GROUP | Usługi remontowe we Wrocławiu',
    description: 'Kompleksowe usługi remontowe: zabudowy g-k, gładź gipsowa, malowanie, tapetowanie, sufity podwieszane, glazura i terakota. Remonty pod klucz.',
    ogTitle: 'Oferta - AMF GROUP | Usługi remontowe',
    ogDescription: 'Specjalizujemy się w kompleksowych remontach: od zabudów g-k po wykończenie łazienek. Remonty pod klucz we Wrocławiu.',
    ogImage: '/assets/logo/logo.svg'
  },
  '/gallery': {
    title: 'Galeria - AMF GROUP | Zrealizowane projekty',
    description: 'Zobacz nasze zrealizowane projekty remontowe. Galeria zdjęć z remontów mieszkań, domów i lokali użytkowych we Wrocławiu.',
    ogTitle: 'Galeria - AMF GROUP | Zrealizowane projekty',
    ogDescription: 'Zobacz efekty naszej pracy. Setki zrealizowanych projektów remontowych we Wrocławiu.',
    ogImage: '/assets/logo/logo.svg'
  },
  '/contact': {
    title: 'Kontakt - AMF GROUP | Wycena wykończenia wnętrz',
    description: 'Skontaktuj się z AMF GROUP, aby otrzymać darmową wycenę remontu pod klucz we Wrocławiu i okolicach.',
    ogTitle: 'Kontakt - AMF GROUP',
    ogDescription: 'Zadzwoń lub napisz do nas i rozpocznij współpracę nad Twoim remontem pod klucz.',
    ogImage: '/assets/logo/logo.svg'
  }
};

// Export route metadata for use in useSEO hook
export { routesMeta };

const withSuspense = (element) => (
  <Suspense fallback={<div className="p-8 text-center text-slate-600">Ładowanie...</div>}>
    {element}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />)
      },
      {
        path: 'about',
        element: withSuspense(<AboutPage />)
      },
      {
        path: 'services',
        element: withSuspense(<ServicesPage />)
      },
      {
        path: 'gallery',
        element: withSuspense(<GalleryPage />)
      },
      {
        // Dedicated route that renders the home page and scrolls to the contact section
        path: 'contact',
        element: withSuspense(<HomePage scrollToContact />)
      },
      {
        path: '*',
        element: (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>404 - Strona nie znaleziona</h1>
            <p>Przepraszamy, strona której szukasz nie istnieje.</p>
            <a href="/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              Wróć do strony głównej
            </a>
          </div>
        )
      }
    ]
  }
]);

export default router;
