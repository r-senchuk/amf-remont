/**
 * Services Page Component
 * Detailed service offerings
 */
import { BaseComponent } from '../../../js/base-component.js';
import { loadDesignSystem } from '../../../js/design-system-loader.js';
import template from './ServicesPage.html?raw';

class ServicesPage extends BaseComponent {
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
      :host {
        display: block;
        width: 100%;
      }
      .servicesPage {
        width: 100%;
      }
      .pageHeader {
        background: var(--color-bg-lighter);
        padding: var(--section-padding-mobile) var(--spacing-md);
        text-align: center;
      }
      .pageTitle {
        font-size: var(--font-size-h1-mobile);
        font-weight: 700;
        line-height: var(--line-height-tight);
        margin: 0 0 var(--spacing-md) 0;
        color: var(--color-text-primary);
      }
      .pageSubtitle {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        margin: 0;
      }
      @media (min-width: 768px) {
        .pageTitle {
          font-size: var(--font-size-h1-desktop);
        }
        .pageHeader {
          padding: var(--section-padding-tablet) var(--spacing-lg);
        }
      }
      @media (min-width: 1024px) {
        .pageHeader {
          padding: var(--section-padding-desktop) var(--spacing-xl);
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
        margin-bottom: var(--spacing-xl);
        color: var(--color-text-primary);
        text-align: center;
      }
      @media (min-width: 768px) {
        .sectionTitle {
          font-size: var(--font-size-h2-desktop);
        }
      }
      .servicesGrid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--spacing-lg);
      }
      .serviceCard {
        background: var(--color-bg-white);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        box-shadow: var(--shadow-md);
        transition: var(--transition-base);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-height: 180px;
        position: relative;
        overflow: hidden;
      }
      .serviceCard::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-orange) 100%);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform var(--transition-base);
      }
      .serviceCard:hover::before {
        transform: scaleX(1);
      }
      .serviceCard:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-4px);
      }
      .serviceIcon {
        font-size: 48px;
        margin-bottom: var(--spacing-md);
        color: var(--color-accent-orange);
        transition: transform var(--transition-base);
      }
      .serviceCard:hover .serviceIcon {
        transform: scale(1.1);
      }
      .serviceTitle {
        font-size: var(--font-size-lg);
        font-weight: 700;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text-primary);
      }
      .serviceDescription {
        font-size: var(--font-size-base);
        line-height: var(--line-height-body);
        color: var(--color-text-secondary);
        flex: 1;
      }
      @media (max-width: 767px) {
        .servicesGrid {
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  init() {
    // Page-specific initialization
  }
}

customElements.define('amf-services-page', ServicesPage);
export default ServicesPage;

