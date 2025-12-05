/**
 * Navigation Component (Mobile Sidebar)
 * Mobile navigation menu
 */
import { BaseComponent } from '../../../js/base-component.js';
import template from './Navigation.html?raw';

class Navigation extends BaseComponent {
  constructor() {
    super();
    this.sidenavInstance = null;
  }

  render() {
    const designSystemLink = document.querySelector('link[href*="design-system.css"])');
    const designSystemHref = designSystemLink ? designSystemLink.href : '/css/design-system.css';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('${designSystemHref}');
        ${this.getStyles()}
      </style>
      ${template}
    `;
  }

  getStyles() {
    let stylesString = '';
    for (const [key, value] of Object.entries(styles)) {
      stylesString += `.${key} { ${value} } `;
    }
    return stylesString || styles.toString() || '';
  }

  init() {
    // Initialize Materialize sidenav if available
    const sidenav = document.querySelector('#slide-out');
    if (sidenav && window.M && window.M.Sidenav) {
      this.sidenavInstance = window.M.Sidenav.init(sidenav, {
        edge: 'left',
        draggable: true
      });
    }

    // Setup navigation links
    const navLinks = this.shadowRoot.querySelectorAll('a[href]');
    navLinks.forEach(link => {
      this.addEventListener(link, 'click', (e) => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
          e.preventDefault();
          // Close sidenav
          if (this.sidenavInstance) {
            this.sidenavInstance.close();
          }
          // Navigate
          if (window.router) {
            window.router.navigate(href);
          } else {
            window.location.href = href;
          }
        }
      });
    });
  }

  cleanup() {
    if (this.sidenavInstance && this.sidenavInstance.destroy) {
      this.sidenavInstance.destroy();
    }
  }
}

customElements.define('amf-navigation', Navigation);
export default Navigation;

