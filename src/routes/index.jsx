/**
 * React Router Configuration
 * Defines all application routes
 */
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import HomePage from '../components/pages/HomePage/HomePage.jsx';
import AboutPage from '../components/pages/AboutPage/AboutPage.jsx';
import ServicesPage from '../components/pages/ServicesPage/ServicesPage.jsx';
import GalleryPage from '../components/pages/GalleryPage/GalleryPage.jsx';
import ContactPage from '../components/pages/ContactPage/ContactPage.jsx';

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
    title: 'Kontakt - AMF GROUP | Wykończenie wnętrz we Wrocławiu',
    description: 'Skontaktuj się z AMF GROUP. Zadzwoń: +48 (796) 019-986 lub +48 (795) 621-905. Email: amfgroupremont@gmail.com',
    ogTitle: 'Kontakt - AMF GROUP',
    ogDescription: 'Gotowy na zmianę? Dzwonisz, a my zajmiemy się resztą. Kontakt z AMF GROUP - wykończenie wnętrz we Wrocławiu.',
    ogImage: '/assets/logo/logo.svg'
  }
};

// Export route metadata for use in useSEO hook
export { routesMeta };

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'services',
        element: <ServicesPage />
      },
      {
        path: 'gallery',
        element: <GalleryPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      }
    ]
  }
]);

export default router;

