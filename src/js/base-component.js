/**
 * Base Component Class
 * Provides foundation for all Web Components
 */
export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._initialized = false;
  }

  /**
   * Load HTML template
   * @param {string} path - Path to template file
   * @returns {Promise<string>} Template content
   */
  async loadTemplate(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${path}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading template:', error);
      return '';
    }
  }

  /**
   * Load CSS Module styles
   * @param {string} path - Path to CSS Module file
   * @returns {Promise<Object>} CSS Module object
   */
  async loadStyles(path) {
    try {
      return await import(path);
    } catch (error) {
      console.error('Error loading styles:', error);
      return {};
    }
  }

  /**
   * Render component
   * Override in child classes
   */
  render() {
    // Override in child classes
  }

  /**
   * Initialize component
   * Override in child classes
   */
  init() {
    // Override in child classes
  }

  /**
   * Cleanup when component is removed
   * Override in child classes
   */
  cleanup() {
    // Remove event listeners
    if (this._eventListeners) {
      this._eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
      this._eventListeners = [];
    }
  }

  /**
   * Add event listener with automatic cleanup
   * @param {Element} element - Element to attach listener to
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  addEventListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    
    // Store for cleanup
    if (!this._eventListeners) {
      this._eventListeners = [];
    }
    this._eventListeners.push({ element, event, handler, options });
  }

  /**
   * Get attribute value with default
   * @param {string} name - Attribute name
   * @param {*} defaultValue - Default value
   * @returns {*}
   */
  getAttr(name, defaultValue = null) {
    const value = this.getAttribute(name);
    return value !== null ? value : defaultValue;
  }

  /**
   * Emit custom event
   * @param {string} eventName - Event name
   * @param {*} detail - Event detail data
   * @param {boolean} bubbles - Whether event bubbles
   */
  emit(eventName, detail = {}, bubbles = true) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles,
      composed: true
    });
    this.dispatchEvent(event);
  }

  /**
   * Query selector within shadow DOM
   * @param {string} selector - CSS selector
   * @returns {Element|null}
   */
  $q(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  /**
   * Query selector all within shadow DOM
   * @param {string} selector - CSS selector
   * @returns {NodeList}
   */
  $qa(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  async connectedCallback() {
    if (!this._initialized) {
      try {
        // Handle async render
        const renderResult = this.render();
        if (renderResult instanceof Promise) {
          await renderResult;
        }
        this.init();
        this._initialized = true;
        
        if (import.meta.env.DEV) {
          console.log(`${this.constructor.name}: Initialized and rendered`);
        }
      } catch (error) {
        console.error(`${this.constructor.name}: Error in connectedCallback:`, error);
        if (this.shadowRoot) {
          this.shadowRoot.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: red;">
              <h2>Error loading component</h2>
              <p>${error.message}</p>
            </div>
          `;
        }
      }
    }
  }

  disconnectedCallback() {
    this.cleanup();
  }

  /**
   * Observe attribute changes
   * Override in child classes if needed
   */
  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._initialized) {
      this.onAttributeChange(name, oldValue, newValue);
    }
  }

  /**
   * Handle attribute changes
   * Override in child classes
   */
  onAttributeChange(name, oldValue, newValue) {
    // Override in child classes
  }
}

