/**
 * Main Application Entry Point
 * Initializes the application and sets up routing
 */
import { router } from './router.js';

class App {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize application
   */
  async init() {
    if (this.initialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Register routes BEFORE initializing router
    // Router.init() immediately handles the initial route, so routes must be registered first
    this.registerRoutes();

    // Initialize router with main container
    // This will handle the initial route now that routes are registered
    const mainContainer = document.querySelector('#app-main') || document.querySelector('main') || document.body;
    router.init(mainContainer);

    // Handle link clicks for client-side navigation
    this.setupLinkHandling();

    // Make router available globally for components
    window.router = router;

    this.initialized = true;
    // Log only in development
    if (import.meta.env.DEV) {
      console.log('App initialized');
    }
  }

  /**
   * Register all routes
   */
  async registerRoutes() {
    // Home page
    router.register('/', async () => {
      await import('../components/pages/HomePage/HomePage.js');
      return document.createElement('amf-home-page');
    }, {
      title: 'AMF GROUP - Wykończenie wnętrz we Wrocławiu',
      description: 'Profesjonalne wykończenie wnętrz we Wrocławiu. Remonty pod klucz, 24-miesięczna gwarancja. Setki zrealizowanych projektów. Zadzwoń już dziś!',
      ogTitle: 'AMF GROUP - Wykończenie wnętrz we Wrocławiu',
      ogDescription: 'Tworzymy Twoje wymarzone wnętrze - od pomysłu do klucza. Profesjonalne remonty pod klucz we Wrocławiu z 24-miesięczną gwarancją.',
      ogImage: 'https://www.amfgroup.pl/d/logo.svg'
    });

    // About page
    router.register('/about', async () => {
      await import('../components/pages/AboutPage/AboutPage.js');
      return document.createElement('amf-about-page');
    }, {
      title: 'O Nas - AMF GROUP | Wykończenie wnętrz we Wrocławiu',
      description: 'Poznaj AMF GROUP - firmę remontową z wieloletnim doświadczeniem. Setki zrealizowanych projektów, remonty pod klucz, 24-miesięczna gwarancja.',
      ogTitle: 'O Nas - AMF GROUP',
      ogDescription: 'Setki zrealizowanych projektów. Wieloletnie doświadczenie w branży remontowej. Tworzymy wnętrza, które zachwycają.',
      ogImage: 'https://www.amfgroup.pl/d/i/key.jpg'
    });

    // Services page
    router.register('/services', async () => {
      await import('../components/pages/ServicesPage/ServicesPage.js');
      return document.createElement('amf-services-page');
    }, {
      title: 'Oferta - AMF GROUP | Usługi remontowe we Wrocławiu',
      description: 'Kompleksowe usługi remontowe: zabudowy g-k, gładź gipsowa, malowanie, tapetowanie, sufity podwieszane, glazura i terakota. Remonty pod klucz.',
      ogTitle: 'Oferta - AMF GROUP | Usługi remontowe',
      ogDescription: 'Specjalizujemy się w kompleksowych remontach: od zabudów g-k po wykończenie łazienek. Remonty pod klucz we Wrocławiu.',
      ogImage: 'https://www.amfgroup.pl/d/logo.svg'
    });

    // Gallery page
    router.register('/gallery', async () => {
      await import('../components/pages/GalleryPage/GalleryPage.js');
      return document.createElement('amf-gallery-page');
    }, {
      title: 'Galeria - AMF GROUP | Zrealizowane projekty',
      description: 'Zobacz nasze zrealizowane projekty remontowe. Galeria zdjęć z remontów mieszkań, domów i lokali użytkowych we Wrocławiu.',
      ogTitle: 'Galeria - AMF GROUP | Zrealizowane projekty',
      ogDescription: 'Zobacz efekty naszej pracy. Setki zrealizowanych projektów remontowych we Wrocławiu.',
      ogImage: 'https://www.amfgroup.pl/d/logo.svg'
    });

    // Contact page
    router.register('/contact', async () => {
      await import('../components/pages/ContactPage/ContactPage.js');
      return document.createElement('amf-contact-page');
    }, {
      title: 'Kontakt - AMF GROUP | Wykończenie wnętrz we Wrocławiu',
      description: 'Skontaktuj się z AMF GROUP. Zadzwoń: +48 (796) 019-986 lub +48 (795) 621-905. Email: amfgroupremont@gmail.com',
      ogTitle: 'Kontakt - AMF GROUP',
      ogDescription: 'Gotowy na zmianę? Dzwonisz, a my zajmiemy się resztą. Kontakt z AMF GROUP - wykończenie wnętrz we Wrocławiu.',
      ogImage: 'https://www.amfgroup.pl/d/logo.svg'
    });
  }

  /**
   * Setup link handling for client-side navigation
   */
  setupLinkHandling() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      
      // Skip external links, mailto, tel, etc.
      if (href.startsWith('http') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') ||
          href.startsWith('whatsapp:') ||
          href.startsWith('viber:') ||
          href.startsWith('https://t.me/')) {
        return;
      }

      // Skip anchor links (hash links)
      if (href.startsWith('#')) {
        return;
      }

      // Skip if target is _blank
      if (link.getAttribute('target') === '_blank') {
        return;
      }

      // Handle internal navigation
      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin) {
        e.preventDefault();
        router.navigate(url.pathname);
      }
    });
  }

  /**
   * Create placeholder element
   * @param {string} title - Placeholder title
   * @param {string} message - Placeholder message
   * @returns {HTMLElement} Placeholder element
   */
  createPlaceholder(title, message) {
    const div = document.createElement('div');
    div.className = 'page-placeholder';
    div.innerHTML = `
      <div style="padding: 4rem 2rem; text-align: center; max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem; color: var(--color-text-primary);">${title}</h1>
        <p style="font-size: 1.2rem; color: var(--color-text-secondary);">${message}</p>
        <p style="margin-top: 2rem; color: var(--color-text-secondary);">
          This page is being migrated to a Web Component. Coming soon!
        </p>
      </div>
    `;
    return div;
  }
}

// Initialize app when DOM is ready
const app = new App();
app.init();

// Export for use in other modules
export default app;

