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
        background: url(/d/i/hbg.png) center bottom repeat-x var(--color-bg-dark);
        box-shadow: var(--shadow-md);
        z-index: 100;
        width: 100%;
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
      }
      .logo {
        position: absolute;
        justify-content: center;
        top: 0;
        left: calc(50% - 312px / 2);
        width: 312px;
        height: 180px;
        padding: 0;
      }
      .logo a {
        width: 160px;
        height: 130px;
        justify-content: center;
        display: flex;
        align-items: center;
      }
      .logo img {
        width: 100%;
        height: auto;
      }
      .phone {
        align-items: center;
        flex-wrap: nowrap;
        position: absolute;
        top: 50px;
        display: flex;
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
        opacity: 0.25;
      }
      .phoneIcon img {
        width: 102px;
        height: 55px;
      }
      .phoneDe .phoneIcon img {
        transform: scaleX(-1);
      }
      .phoneLink {
        font-size: 19px;
        font-weight: 400;
        color: var(--color-accent-orange-light);
        text-decoration: none;
        transition: var(--transition-base);
      }
      .phoneLink:hover {
        color: rgba(255, 255, 255, 0.9);
      }
      .nav {
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        position: absolute;
        top: 90px;
        height: 28px;
        display: flex;
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
        font-weight: 200;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.5);
        text-decoration: none;
        transition: var(--transition-base);
        padding: 0 var(--spacing-sm);
      }
      .navLink:hover {
        color: #fff;
      }
      .navSeparator {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
      }
      .navSeparator img {
        width: 100%;
        height: auto;
      }
      .menuTrigger {
        display: none;
        width: 48px;
        height: 48px;
        position: absolute;
        top: 6px;
        left: 8px;
        z-index: 99;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
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
          height: 4px;
          width: 36px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 1);
          transition: var(--transition-base);
        }
        .hamburgerLine:nth-child(1) {
          top: 0;
        }
        .hamburgerLine:nth-child(2) {
          top: 10px;
        }
        .hamburgerLine:nth-child(3) {
          top: 20px;
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

