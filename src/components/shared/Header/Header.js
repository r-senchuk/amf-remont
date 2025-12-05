/**
 * Header Component
 * Site header with logo, navigation, and phone numbers
 */
import { BaseComponent } from '../../../js/base-component.js';
import { loadDesignSystem } from '../../../js/design-system-loader.js';
import template from './Header.html?raw';

class Header extends BaseComponent {
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
    // CSS Modules returns an object, we need to convert it to CSS string
    // For now, we'll read the actual CSS file content
    // In production, Vite will handle this, but for Shadow DOM we need the raw CSS
    return `
      .header {
        position: relative;
        background: linear-gradient(
          180deg,
          var(--color-bg-dark) 0%,
          var(--color-bg-dark) 85%,
          rgba(72, 110, 113, 0.95) 100%
        );
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        width: 100%;
        isolation: isolate;
      }
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          180deg,
          rgba(26, 73, 167, 0.08) 0%,
          transparent 40%,
          rgba(72, 110, 113, 0.1) 100%
        );
        pointer-events: none;
        z-index: 1;
      }
      .header::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.1) 50%,
          transparent 100%
        );
        pointer-events: none;
        z-index: 1;
      }
      @media (min-width: 1024px) {
        .header {
          position: sticky;
          top: 0;
        }
      }
      .headerContainer {
        width: calc(100% - 40px);
        padding: 0 20px;
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
        height: 133px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
        z-index: 2;
      }
      .logo {
        position: absolute;
        justify-content: center;
        top: 0;
        left: calc(50% - 312px / 2);
        width: 312px;
        height: 180px;
        padding: 0;
        z-index: 3;
        transition: transform var(--transition-base);
      }
      .logo:hover {
        transform: translateY(-2px);
      }
      .logo a {
        width: 160px;
        height: 130px;
        justify-content: center;
        display: flex;
        align-items: center;
        transition: opacity var(--transition-base);
      }
      .logo a:hover {
        opacity: 0.9;
      }
      .logo img {
        width: 100%;
        height: auto;
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
      }
      .phone {
        align-items: center;
        flex-wrap: nowrap;
        position: absolute;
        top: 50px;
        display: flex;
        z-index: 3;
        gap: var(--spacing-sm);
      }
      .phoneUk {
        flex-direction: row-reverse;
        justify-content: flex-end;
        right: calc(50% + 134px);
      }
      .phoneDe {
        flex-direction: row;
        justify-content: flex-start;
        left: calc(50% + 134px);
      }
      .phoneIcon {
        height: 32px;
        display: flex;
        align-items: center;
        opacity: 0.3;
        transition: opacity var(--transition-base), transform var(--transition-base);
      }
      .phone:hover .phoneIcon {
        opacity: 0.5;
        transform: scale(1.05);
      }
      .phoneIcon img {
        width: 102px;
        height: 55px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }
      .phoneDe .phoneIcon img {
        transform: scaleX(-1);
      }
      .phoneLink {
        font-size: 19px;
        font-weight: 500;
        color: var(--color-accent-orange-light);
        text-decoration: none;
        transition: all var(--transition-base);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        position: relative;
      }
      .phoneLink::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-sm);
        opacity: 0;
        transition: opacity var(--transition-base);
      }
      .phoneLink:hover {
        color: #fff;
        transform: translateY(-1px);
      }
      .phoneLink:hover::before {
        opacity: 1;
      }
      .nav {
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        position: absolute;
        top: 90px;
        height: 28px;
        display: flex;
        z-index: 3;
        gap: var(--spacing-xs);
      }
      .navLeft {
        justify-content: flex-end;
        right: calc(50% + 148px);
      }
      .navRight {
        justify-content: flex-start;
        left: calc(50% + 148px);
      }
      .navLink {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: var(--font-size-base);
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: all var(--transition-base);
        padding: var(--spacing-xs) var(--spacing-md);
        border-radius: var(--radius-sm);
        position: relative;
      }
      .navLink::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 60%;
        height: 2px;
        background: var(--color-accent-orange);
        transition: transform var(--transition-base);
      }
      .navLink:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-1px);
      }
      .navLink:hover::after {
        transform: translateX(-50%) scaleX(1);
      }
      .navSeparator {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        opacity: 0.6;
        transition: opacity var(--transition-base);
      }
      .nav:hover .navSeparator {
        opacity: 0.8;
      }
      .navSeparator img {
        width: 100%;
        height: auto;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
      }
      .menuTrigger {
        display: none;
        width: 48px;
        height: 48px;
        position: absolute;
        top: 6px;
        left: 8px;
        z-index: 1001;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-md);
        cursor: pointer;
        padding: 0;
        transition: all var(--transition-base);
        backdrop-filter: blur(4px);
      }
      .menuTrigger:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
      }
      .menuTrigger:active {
        transform: scale(0.95);
      }
      @media (max-width: 1099px) {
        .nav {
          display: none;
        }
        .menuTrigger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .hamburger {
          width: 36px;
          height: 24px;
          position: relative;
        }
        .hamburgerLine {
          display: block;
          position: absolute;
          height: 3px;
          width: 28px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 1);
          transition: all var(--transition-base);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        .hamburgerLine:nth-child(1) {
          top: 0;
          left: 4px;
        }
        .hamburgerLine:nth-child(2) {
          top: 10px;
          left: 4px;
        }
        .hamburgerLine:nth-child(3) {
          top: 20px;
          left: 4px;
        }
        .menuTrigger:hover .hamburgerLine {
          background: var(--color-accent-orange-light);
        }
      }
      @media (max-width: 1279px) {
        .phone {
          flex-wrap: wrap;
          top: 30px;
          width: 300px;
        }
        .phoneUk {
          justify-content: flex-start;
        }
      }
      @media (max-width: 879px) {
        .header {
          background-size: auto 120%;
        }
        .logo {
          left: calc(50% - 220px / 2);
          width: 220px;
          height: 153px;
        }
        .logo a {
          width: 104px;
          height: 104px;
          margin: 10px 0 0 0;
        }
        .phone {
          top: 44px;
          width: 166px;
          flex-direction: column !important;
          justify-content: flex-start !important;
          align-items: flex-start !important;
        }
        .phoneUk {
          align-items: flex-end !important;
        }
        .phoneLink {
          font-size: 16px;
        }
      }
      @media (max-width: 600px) {
        .headerContainer {
          padding: 0 12px;
          width: calc(100% - 24px);
        }
        .phone {
          width: 140px;
        }
        .phoneLink {
          font-size: 14px;
          padding: 2px 6px;
        }
      }
    `;
  }

  init() {
    // Setup mobile menu toggle - use existing nav element
    const menuTrigger = this.$q('.menuTrigger');
    const existingNav = document.querySelector('nav .menu.sidenav-trigger');
    
    if (menuTrigger && existingNav) {
      this.addEventListener(menuTrigger, 'click', () => {
        existingNav.click();
      });
    }

    // Setup navigation links
    const navLinks = this.$qa('a[href]');
    navLinks.forEach(link => {
      this.addEventListener(link, 'click', (e) => {
        const href = link.getAttribute('href');
        // Handle internal navigation (skip tel, mailto, etc.)
        if (href && 
            !href.startsWith('http') && 
            !href.startsWith('#') &&
            !href.startsWith('tel:') &&
            !href.startsWith('mailto:')) {
          // Let router handle it
          e.preventDefault();
          if (window.router) {
            window.router.navigate(href);
          } else {
            window.location.href = href;
          }
        }
      });
    });
  }
}

customElements.define('amf-header', Header);
export default Header;

