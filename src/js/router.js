/**
 * Client-Side Router
 * Handles navigation between pages
 */
export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentComponent = null;
    this.container = null;
    this.history = [];
    this.scrollPositions = new Map();
    this.loadingElement = null;
    this._currentLoading = null; // Track current loading promise to prevent race conditions
  }

  /**
   * Initialize router
   * @param {Element} container - Container element for page content
   */
  init(container) {
    this.container = container || document.querySelector('main') || document.body;
    
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      const path = e.state?.path || window.location.pathname;
      this.handleRoute(path, true); // true = is back/forward navigation
    });

    // Handle initial route
    this.handleRoute(window.location.pathname, false);
  }

  /**
   * Register a route
   * @param {string} path - Route path
   * @param {Function|string} component - Component class or HTML file path
   * @param {Object} options - Route options
   */
  register(path, component, options = {}) {
    this.routes.set(path, {
      component,
      options,
      path
    });
  }

  /**
   * Navigate to a route
   * @param {string} path - Route path
   * @param {boolean} pushState - Whether to push to history
   */
  navigate(path, pushState = true) {
    // Prevent navigation to same route
    const normalizedPath = this.normalizePath(path);
    if (normalizedPath === this.currentRoute) {
      return;
    }

    if (pushState) {
      window.history.pushState({ path: normalizedPath }, '', normalizedPath);
    }
    this.handleRoute(normalizedPath, !pushState); // !pushState means it's back/forward
  }

  /**
   * Handle route change
   * @param {string} path - Route path
   * @param {boolean} pushState - Whether this was a navigation
   */
  async handleRoute(path, pushState = true) {
    // Normalize path
    const normalizedPath = this.normalizePath(path);
    
    // Prevent duplicate navigation
    if (normalizedPath === this.currentRoute && this.currentComponent) {
      return;
    }

    // Find matching route
    const route = this.findRoute(normalizedPath);
    
    if (!route) {
      // 404 - route not found
      if (import.meta.env.DEV) {
        console.warn('Router: Route not found:', normalizedPath, 'Available routes:', Array.from(this.routes.keys()));
      }
      this.handle404(normalizedPath);
      return;
    }
    
    if (import.meta.env.DEV) {
      console.log('Router: Handling route:', normalizedPath);
    }

    // Save current scroll position
    if (this.currentRoute) {
      this.scrollPositions.set(this.currentRoute, window.scrollY || window.pageYOffset);
    }

    // Show loading indicator
    this.showLoading();

    // Track loading promise to prevent race conditions
    const loadingPromise = this._loadRoute(route, normalizedPath, pushState);
    this._currentLoading = loadingPromise;
    
    try {
      await loadingPromise;
    } finally {
      // Clear loading promise if it's still the current one
      if (this._currentLoading === loadingPromise) {
        this._currentLoading = null;
      }
      this.hideLoading();
    }
  }

  /**
   * Internal method to load route (separated for race condition handling)
   * @param {Object} route - Route object
   * @param {string} normalizedPath - Normalized path
   * @param {boolean} pushState - Whether this was a navigation
   */
  async _loadRoute(route, normalizedPath, pushState) {
    const currentLoading = this._currentLoading;

    // Cleanup current component
    if (this.currentComponent) {
      if (typeof this.currentComponent.cleanup === 'function') {
        try {
          this.currentComponent.cleanup();
        } catch (error) {
          console.error('Error in component cleanup:', error);
        }
      }
      if (this.currentComponent.parentNode) {
        this.currentComponent.remove();
      }
    }

    // Load and render new component
    try {
      this.currentRoute = normalizedPath;
      this.currentComponent = await this.loadComponent(route);
      
      // Check if another navigation started while loading
      if (this._currentLoading !== currentLoading) {
        return; // Abort, another navigation is in progress
      }
      
      if (this.currentComponent) {
        // Clear container
        this.container.innerHTML = '';
        
        // Append component to container
        this.container.appendChild(this.currentComponent);
        
        if (import.meta.env.DEV) {
          console.log('Router: Component appended to container:', this.container.id || this.container.tagName);
          console.log('Router: Component element:', this.currentComponent);
          console.log('Router: Component shadowRoot:', this.currentComponent.shadowRoot);
        }
        
        // Wait a bit for component to render (connectedCallback is async)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Update SEO meta tags
        this.updateMetaTags(route, normalizedPath);
        
        // Restore or reset scroll position
        this.restoreScrollPosition(normalizedPath, pushState);
        
        // Focus management for accessibility
        this.focusMainContent();
        
        // Emit route change event
        window.dispatchEvent(new CustomEvent('routechange', {
          detail: { path: normalizedPath, route }
        }));

        // Track page view for analytics
        this.trackPageView(normalizedPath);
      }
    } catch (error) {
      console.error('Error loading route:', error);
      this.handleError(normalizedPath, error);
    }
  }

  /**
   * Normalize path
   * @param {string} path - Path to normalize
   * @returns {string} Normalized path
   */
  normalizePath(path) {
    // Remove query string and hash
    path = path.split('?')[0].split('#')[0];
    
    // Ensure leading slash
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    // Remove trailing slash (except root)
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    return path;
  }

  /**
   * Find matching route
   * @param {string} path - Path to match
   * @returns {Object|null} Route object or null
   */
  findRoute(path) {
    // Exact match
    if (this.routes.has(path)) {
      return this.routes.get(path);
    }
    
    // Try to find dynamic route (e.g., /page/:id)
    for (const [routePath, route] of this.routes.entries()) {
      const pattern = this.pathToRegex(routePath);
      if (pattern.test(path)) {
        return route;
      }
    }
    
    return null;
  }

  /**
   * Convert path pattern to regex
   * @param {string} path - Path pattern
   * @returns {RegExp} Regular expression
   */
  pathToRegex(path) {
    const pattern = path
      .replace(/\//g, '\\/')
      .replace(/:(\w+)/g, '([^/]+)');
    return new RegExp(`^${pattern}$`);
  }

  /**
   * Load component for route
   * @param {Object} route - Route object
   * @returns {Promise<Element>} Component element
   */
  async loadComponent(route) {
    if (typeof route.component === 'function') {
      // Component function that returns element (can be async)
      try {
        const element = await route.component();
        if (element instanceof HTMLElement) {
          if (import.meta.env.DEV) {
            console.log('Router: Component loaded:', element.tagName || element.constructor.name);
          }
          return element;
        } else {
          console.error('Router: Component function did not return HTMLElement:', element);
        }
      } catch (error) {
        console.error('Error loading component:', error);
        throw error; // Re-throw to be caught by handleError
      }
      // Fallback
      return document.createElement('div');
    } else if (typeof route.component === 'string') {
      // HTML file path - load and inject
      try {
        const response = await fetch(route.component);
        const html = await response.text();
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.firstElementChild || temp;
      } catch (error) {
        console.error('Error loading HTML component:', error);
        return null;
      }
    }
    
    return null;
  }

  /**
   * Handle 404 - route not found
   * @param {string} path - Path that was not found
   */
  handle404(path) {
    console.warn('Route not found:', path);
    // Default to home page or show 404 component
    if (this.routes.has('/')) {
      this.navigate('/', false);
    } else {
      this.container.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h1>404 - Page Not Found</h1>
          <p>The page "${path}" could not be found.</p>
          <a href="/">Go to Home</a>
        </div>
      `;
    }
  }

  /**
   * Get current route
   * @returns {string} Current route path
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Convert relative path to absolute URL
   * @param {string} url - URL or path to convert
   * @returns {string} Absolute URL
   */
  toAbsoluteUrl(url) {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url; // Already absolute
    }
    if (url.startsWith('/')) {
      return window.location.origin + url; // Relative path
    }
    return url; // Fallback
  }

  /**
   * Update SEO meta tags for current route
   * @param {Object} route - Route object
   * @param {string} path - Route path
   */
  updateMetaTags(route, path) {
    const options = route.options || {};
    const baseUrl = window.location.origin;

    // Update document title
    if (options.title) {
      document.title = options.title;
    }

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (options.description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', options.description);
    }

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', options.ogTitle || options.title);
    updateOGTag('og:description', options.ogDescription || options.description);
    updateOGTag('og:url', this.toAbsoluteUrl(`${baseUrl}${path}`));
    if (options.ogImage) {
      updateOGTag('og:image', this.toAbsoluteUrl(options.ogImage));
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', this.toAbsoluteUrl(`${baseUrl}${path}`));

    // Update structured data (JSON-LD)
    this.updateStructuredData(route, path);
  }

  /**
   * Update structured data (JSON-LD) for SEO
   * @param {Object} route - Route object
   * @param {string} path - Route path
   */
  updateStructuredData(route, path) {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-route]');
    if (existingScript) {
      existingScript.remove();
    }

    const options = route.options || {};
    const baseUrl = window.location.origin;

    // Create basic structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': options.title || document.title,
      'description': options.description || '',
      'url': `${baseUrl}${path}`,
      'inLanguage': 'pl-PL'
    };

    // Add organization data for all pages
    structuredData.publisher = {
      '@type': 'Organization',
      'name': 'AMF GROUP',
      'url': baseUrl
    };

    // Add specific schema based on page type
    if (path === '/') {
      structuredData['@type'] = 'WebSite';
      structuredData.potentialAction = {
        '@type': 'SearchAction',
        'target': `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      };
    } else if (path === '/contact') {
      structuredData['@type'] = 'ContactPage';
    } else if (path === '/services') {
      structuredData['@type'] = 'Service';
    }

    // Inject structured data
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-route', path);
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  /**
   * Show loading indicator
   */
  showLoading() {
    if (!this.loadingElement) {
      this.loadingElement = document.createElement('div');
      this.loadingElement.id = 'router-loading';
      this.loadingElement.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.3s ease;
        ">
          <div style="
            text-align: center;
            color: var(--color-primary, #1a49a7);
          ">
            <div style="
              width: 48px;
              height: 48px;
              border: 4px solid rgba(26, 73, 167, 0.2);
              border-top-color: var(--color-primary, #1a49a7);
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
              margin: 0 auto 16px;
            "></div>
            <p style="font-size: 16px; margin: 0;">Ładowanie...</p>
          </div>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(this.loadingElement);
    } else {
      this.loadingElement.style.display = 'flex';
    }
  }

  /**
   * Hide loading indicator
   */
  hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.style.opacity = '0';
      setTimeout(() => {
        if (this.loadingElement && this.loadingElement.parentNode) {
          this.loadingElement.style.display = 'none';
        }
      }, 300);
    }
  }

  /**
   * Restore scroll position or scroll to top
   * @param {string} path - Route path
   * @param {boolean} isBackForward - Whether this is a back/forward navigation
   */
  restoreScrollPosition(path, isBackForward = false) {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (isBackForward && this.scrollPositions.has(path)) {
        // Restore saved scroll position for back/forward
        const savedPosition = this.scrollPositions.get(path);
        window.scrollTo({
          top: savedPosition,
          behavior: 'auto' // Instant scroll for back/forward
        });
      } else {
        // Scroll to top for new navigation
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  /**
   * Focus main content for accessibility
   */
  focusMainContent() {
    requestAnimationFrame(() => {
      const main = document.querySelector('main') || this.container;
      if (main) {
        // Make main focusable temporarily
        if (!main.hasAttribute('tabindex')) {
          main.setAttribute('tabindex', '-1');
        }
        main.focus();
        // Remove tabindex after focus to avoid tab navigation issues
        setTimeout(() => {
          main.removeAttribute('tabindex');
        }, 100);
      }
    });
  }

  /**
   * Track page view for analytics
   * @param {string} path - Route path
   */
  trackPageView(path) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path
      });
    }

    // Universal Analytics (legacy)
    if (window.ga) {
      window.ga('send', 'pageview', path);
    }

    // Custom analytics event
    window.dispatchEvent(new CustomEvent('pageview', {
      detail: { path, timestamp: Date.now() }
    }));
  }

  /**
   * Handle errors with user-friendly display
   * @param {string} path - Route path that failed
   * @param {Error} error - Error object
   */
  handleError(path, error) {
    console.error('Route error:', error);
    
    // Show error message to user
    this.container.innerHTML = `
      <div style="
        padding: 4rem 2rem;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      ">
        <h1 style="
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary, #37474f);
        ">Wystąpił błąd</h1>
        <p style="
          font-size: 1.1rem;
          color: var(--color-text-secondary, #546e7a);
          margin-bottom: 2rem;
        ">Nie udało się załadować strony. Spróbuj ponownie.</p>
        <button onclick="window.router.navigate('${path}')" style="
          padding: 12px 24px;
          background: var(--color-primary, #1a49a7);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        " onmouseover="this.style.background='#19326b'" onmouseout="this.style.background='var(--color-primary, #1a49a7)'">
          Spróbuj ponownie
        </button>
        <p style="margin-top: 2rem;">
          <a href="/" style="color: var(--color-primary, #1a49a7); text-decoration: none;">
            ← Wróć do strony głównej
          </a>
        </p>
      </div>
    `;

    // Emit error event
    window.dispatchEvent(new CustomEvent('routeerror', {
      detail: { path, error: error.message }
    }));
  }
}

// Export singleton instance
export const router = new Router();

