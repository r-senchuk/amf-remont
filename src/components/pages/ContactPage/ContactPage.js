/**
 * Contact Page Component
 * Contact form and information
 */
import { BaseComponent } from '../../../js/base-component.js';
import { loadDesignSystem } from '../../../js/design-system-loader.js';
import template from './ContactPage.html?raw';

class ContactPage extends BaseComponent {
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
      .contactPage {
        width: 100%;
      }
      .pageHeader {
        background: var(--color-bg-dark);
        color: #fff;
        padding: var(--section-padding-mobile) var(--spacing-md);
        text-align: center;
      }
      .pageTitle {
        font-size: var(--font-size-h1-mobile);
        font-weight: 700;
        line-height: var(--line-height-tight);
        margin: 0 0 var(--spacing-md) 0;
        color: #fff;
      }
      .pageSubtitle {
        font-size: var(--font-size-lg);
        color: rgba(255, 255, 255, 0.9);
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
      .contactSection {
        padding: var(--section-padding-mobile) var(--spacing-md);
        max-width: var(--content-width-max);
        margin: 0 auto;
        width: 100%;
      }
      @media (min-width: 768px) {
        .contactSection {
          padding: var(--section-padding-tablet) var(--spacing-lg);
        }
      }
      @media (min-width: 1024px) {
        .contactSection {
          padding: var(--section-padding-desktop) var(--spacing-xl);
        }
      }
      .contactIntro {
        text-align: center;
        margin-bottom: var(--spacing-2xl);
        font-size: var(--font-size-lg);
        line-height: var(--line-height-body);
        color: var(--color-text-primary);
      }
      .contactIntro strong {
        font-weight: 700;
        color: var(--color-text-primary);
      }
      .contactGrid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
        margin-top: var(--spacing-xl);
      }
      @media (min-width: 768px) {
        .contactGrid {
          grid-template-columns: 1fr 1fr;
        }
      }
      .contactCard {
        background: var(--color-bg-white);
        border-radius: var(--radius-md);
        padding: var(--spacing-xl);
        box-shadow: var(--shadow-md);
      }
      .contactCardTitle {
        font-size: var(--font-size-xl);
        font-weight: 700;
        margin-bottom: var(--spacing-lg);
        color: var(--color-text-primary);
      }
      .phoneNumber {
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--color-accent-orange);
        text-decoration: none;
        display: inline-block;
        margin: var(--spacing-sm) 0;
        transition: var(--transition-base);
      }
      .phoneNumber:hover {
        color: var(--color-accent-orange-light);
        transform: translateX(4px);
      }
      .messengerLinks {
        display: flex;
        gap: var(--spacing-md);
        margin-top: var(--spacing-md);
      }
      .messengerLink {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition-base);
      }
      .messengerLink:hover {
        transform: scale(1.1);
      }
      .messengerLink img {
        width: 100%;
        height: 100%;
        filter: grayscale(70%) opacity(70%);
        transition: var(--transition-base);
      }
      .messengerLink:hover img {
        filter: grayscale(0%) opacity(100%);
      }
      .emailLink {
        font-size: var(--font-size-lg);
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 600;
        transition: var(--transition-base);
      }
      .emailLink:hover {
        color: var(--color-primary-dark);
        text-decoration: underline;
      }
    `;
  }

  init() {
    // Page-specific initialization
  }
}

customElements.define('amf-contact-page', ContactPage);
export default ContactPage;

