/**
 * Footer Component
 * Site footer with copyright and navigation
 */
import { BaseComponent } from '../../../js/base-component.js';
import { loadDesignSystem } from '../../../js/design-system-loader.js';
import template from './Footer.html?raw';

class Footer extends BaseComponent {
  constructor() {
    super();
  }

  async render() {
    // Load design system CSS variables
    const designSystemStyles = await loadDesignSystem();

    this.shadowRoot.innerHTML = `
      <style>
        ${designSystemStyles}
        ${this.getComponentStyles()}
      </style>
      ${template}
    `;
  }

  getComponentStyles() {
    return `
      .footer {
        background: var(--color-bg-dark);
        width: 100%;
        padding: var(--spacing-lg) 0;
        margin-top: auto;
      }
      .footerContainer {
        width: calc(100% - 48px);
        padding: 0 24px;
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .copyright {
        width: 100%;
        font-size: var(--font-size-sm);
        font-weight: 300;
        color: rgba(255, 255, 255, 0.3);
        text-align: center;
        margin: 0;
      }
      .copyright strong {
        font-weight: 300;
        color: rgba(255, 255, 255, 0.5);
      }
      .scrollTop {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 100;
        opacity: 0;
        bottom: -4rem;
        right: 1.8rem;
        cursor: pointer;
        transition: all var(--transition-base);
        border: none;
        color: var(--color-primary-light);
        font-size: 24px;
      }
      .scrollTop.show {
        bottom: 2rem;
        opacity: 0.7;
      }
      .scrollTop:hover {
        opacity: 1;
        background: var(--color-primary-light);
        color: #fff;
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
      }
      .scrollTopIcon {
        transform: rotate(-90deg);
        display: inline-block;
      }
    `;
  }

  init() {
    // Setup scroll to top button
    const scrollTopBtn = this.$q('.scrollTop');
    if (scrollTopBtn) {
      this.addEventListener(scrollTopBtn, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Show/hide button on scroll
      const handleScroll = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 300) {
          scrollTopBtn.classList.add('show');
        } else {
          scrollTopBtn.classList.remove('show');
        }
      };

      this.addEventListener(window, 'scroll', handleScroll);
    }

    // Update copyright year
    const yearElement = this.$q('.copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

customElements.define('amf-footer', Footer);
export default Footer;

