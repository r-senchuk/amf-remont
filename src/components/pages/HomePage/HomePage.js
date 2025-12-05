/**
 * Home Page Component
 * Main landing page with hero section and overview
 */
import { BaseComponent } from '../../../js/base-component.js';
import { loadDesignSystem } from '../../../js/design-system-loader.js';

class HomePage extends BaseComponent {
  constructor() {
    super();
  }

  async render() {
    try {
      // Try to load template - use relative path from src root
      let template = await this.loadTemplate('./components/pages/HomePage/HomePage.html');
      
      // Fallback: try absolute path
      if (!template) {
        template = await this.loadTemplate('/components/pages/HomePage/HomePage.html');
      }
      
      // Load design system CSS variables
      const designSystemStyles = await loadDesignSystem();

      if (!template) {
        console.error('HomePage: Failed to load template, using fallback content');
        // Fallback content if template fails to load
        template = `
          <div class="homePage">
            <section class="hero">
              <div class="heroContent">
                <h1 class="heroTitle">Tworzymy Twoje wymarzone wnętrze</h1>
                <p class="heroSubtitle">Od pomysłu do klucza - kompleksowe wykończenie wnętrz we Wrocławiu z 24-miesięczną gwarancją</p>
                <a href="/contact" class="heroCTA">
                  <span>Zadzwoń teraz</span>
                  <span>→</span>
                </a>
              </div>
            </section>
          </div>
        `;
      }

      this.shadowRoot.innerHTML = `
        <style>
          ${designSystemStyles}
          ${this.getComponentStyles()}
        </style>
        ${template}
      `;
      
      if (import.meta.env.DEV) {
        console.log('HomePage: Rendered successfully');
      }
    } catch (error) {
      console.error('HomePage: Error in render:', error);
      this.shadowRoot.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h2>Error loading page</h2>
          <p>${error.message}</p>
        </div>
      `;
    }
  }

  getComponentStyles() {
    return `
      :host {
        display: block;
        width: 100%;
      }
      .homePage {
        width: 100%;
      }
      .hero {
        background-color: #012001;
        background-image: url(/assets/backgrounds/backgr.jpg);
        min-height: 600px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .heroContent {
        max-width: var(--content-width-max);
        width: 100%;
        padding: var(--spacing-2xl) var(--spacing-md);
        text-align: center;
        color: #fff;
        z-index: 1;
      }
      .heroTitle {
        font-size: var(--font-size-h1-mobile);
        font-weight: 700;
        line-height: var(--line-height-tight);
        margin-bottom: var(--spacing-lg);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
      .heroSubtitle {
        font-size: var(--font-size-lg);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--spacing-xl);
        opacity: 0.95;
      }
      .heroCTA {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-xl);
        background: var(--color-accent-orange);
        color: #fff;
        text-decoration: none;
        border-radius: var(--radius-md);
        font-weight: 600;
        transition: var(--transition-base);
        box-shadow: var(--shadow-md);
      }
      .heroCTA:hover {
        background: var(--color-accent-orange-light);
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }
      @media (min-width: 768px) {
        .heroTitle {
          font-size: var(--font-size-h1-desktop);
        }
        .heroSubtitle {
          font-size: var(--font-size-xl);
        }
      }
      .section {
        padding: var(--section-padding-mobile) var(--spacing-md);
        max-width: var(--content-width-max);
        margin: 0 auto;
        width: 100%;
      }
      @media (min-width: 768px) {
        .section {
          padding: var(--section-padding-tablet) var(--spacing-lg);
        }
      }
      @media (min-width: 1024px) {
        .section {
          padding: var(--section-padding-desktop) var(--spacing-xl);
        }
      }
      .sectionTitle {
        font-size: var(--font-size-h2-mobile);
        font-weight: 700;
        line-height: var(--line-height-tight);
        margin-bottom: var(--spacing-lg);
        color: var(--color-text-primary);
        text-align: center;
      }
      @media (min-width: 768px) {
        .sectionTitle {
          font-size: var(--font-size-h2-desktop);
        }
      }
      .trustIndicators {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-lg);
        margin-top: var(--spacing-xl);
      }
      .trustCard {
        background: var(--color-bg-white);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        box-shadow: var(--shadow-md);
        text-align: center;
        transition: var(--transition-base);
      }
      .trustCard:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-4px);
      }
      .trustIcon {
        font-size: 48px;
        color: var(--color-accent-orange);
        margin-bottom: var(--spacing-md);
      }
      .trustTitle {
        font-size: var(--font-size-lg);
        font-weight: 700;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text-primary);
      }
      .trustDescription {
        font-size: var(--font-size-base);
        line-height: var(--line-height-body);
        color: var(--color-text-secondary);
      }
    `;
  }

  init() {
    // Initialize any page-specific functionality
    // For now, the page is mostly static
  }
}

customElements.define('amf-home-page', HomePage);
export default HomePage;

