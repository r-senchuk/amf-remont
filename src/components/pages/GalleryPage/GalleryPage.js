/**
 * Gallery Page Component
 * Project showcase and portfolio
 * Dynamically generates photo gallery from JSON configuration
 * Uses GLightbox for lightbox functionality
 */
import { BaseComponent } from '../../../js/base-component.js';
import { loadDesignSystem } from '../../../js/design-system-loader.js';
import template from './GalleryPage.html?raw';

class GalleryPage extends BaseComponent {
  constructor() {
    super();
    this.config = null;
    this.lightbox = null;
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
      .galleryPage {
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
        margin: 0;
        color: #fff;
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
      .gallerySection {
        padding: var(--section-padding-mobile) var(--spacing-md);
        max-width: var(--content-width-max);
        margin: 0 auto;
        width: 100%;
      }
      @media (min-width: 768px) {
        .gallerySection {
          padding: var(--section-padding-tablet) var(--spacing-lg);
        }
      }
      @media (min-width: 1024px) {
        .gallerySection {
          padding: var(--section-padding-desktop) var(--spacing-xl);
        }
      }
      .galleryContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--spacing-sm);
      }
      .tag_by_width {
        flex: 0 0 auto;
        margin: 0;
        position: relative;
      }
      .gallery-item {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        transition: opacity 0.3s ease;
      }
      .gallery-item:hover {
        opacity: 0.9;
      }
      .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .zoom-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s;
        font-size: 2em;
        pointer-events: none;
        z-index: 1;
      }
      .gallery-item:hover .zoom-icon {
        opacity: 0.7;
      }
    `;
  }

  init() {
    // Load gallery data and render
    this.loadGallery();
  }

  /**
   * Load gallery configuration from JSON
   */
  async loadGallery() {
    const galleryContainer = this.$q('.galleryContainer');
    if (!galleryContainer) {
      console.warn('Gallery container not found');
      return;
    }

    try {
      const response = await fetch('/data/gallery.json');
      if (!response.ok) {
        throw new Error('Failed to load gallery.json');
      }
      
      const data = await response.json();
      this.config = data;
      this.renderGallery();
    } catch (error) {
      console.error('Error loading gallery:', error);
      galleryContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">Wystąpił błąd podczas ładowania galerii.</p>';
    }
  }

  /**
   * Render gallery HTML
   */
  renderGallery() {
    if (!this.config || !this.config.photos) {
      return;
    }

    const galleryContainer = this.$q('.galleryContainer');
    if (!galleryContainer) return;

    // Sort photos by order
    const photos = this.config.photos.slice().sort((a, b) => {
      return a.order - b.order;
    });

    // Clear existing content
    galleryContainer.innerHTML = '';

    // Generate gallery items
    photos.forEach((photo, index) => {
      const figure = this.createGalleryItem(photo, index);
      galleryContainer.appendChild(figure);
    });

    // Initialize GLightbox
    this.initLightbox();
  }

  /**
   * Create a single gallery item
   */
  createGalleryItem(photo, index) {
    const figure = document.createElement('figure');
    figure.className = 'tag_by_width';

    // Build image paths (both absolute for consistency)
    const fullImagePath = '/i/' + photo.folder + '/' + photo.filename;
    const thumbImagePath = '/i/' + photo.folder + '/' + photo.thumbFilename;

    // Create link wrapper for lightbox
    const link = document.createElement('a');
    link.href = fullImagePath;
    link.className = 'gallery-item';
    
    // Escape title for safe JavaScript string insertion into attribute
    // Escape quotes and backslashes for JavaScript string context
    const title = (photo.title || photo.alt || '').toString();
    const escapedTitle = title.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
    link.setAttribute('data-glightbox', 'title: ' + escapedTitle);
    link.setAttribute('data-glightbox-index', index);

    // Create image element
    const img = document.createElement('img');
    img.src = thumbImagePath;
    img.alt = photo.alt || photo.title || '';
    img.loading = 'lazy';

    // Add zoom icon overlay
    const zoomIcon = document.createElement('span');
    zoomIcon.className = 'zoom-icon';
    zoomIcon.innerHTML = '🔍';

    // Append image and zoom icon to link
    link.appendChild(img);
    link.appendChild(zoomIcon);
    figure.appendChild(link);
    
    return figure;
  }

  /**
   * Initialize GLightbox
   */
  initLightbox() {
    // Destroy existing lightbox if any
    if (this.lightbox) {
      try {
        this.lightbox.destroy();
      } catch (e) {
        // Ignore errors
      }
    }

    // Query gallery items from shadow DOM
    const galleryItems = this.$qa('.gallery-item');
    if (!galleryItems || galleryItems.length === 0) {
      return;
    }

    // Wait for GLightbox to be available
    const initializeLightbox = () => {
      if (typeof GLightbox !== 'undefined') {
        // Build lightbox items array from gallery items
        const lightboxItems = Array.from(galleryItems).map(link => ({
          href: link.getAttribute('href'),
          type: 'image',
          title: link.getAttribute('data-glightbox')?.replace('title: ', '') || ''
        }));

        // Initialize GLightbox with elements array
        this.lightbox = GLightbox({
          elements: lightboxItems,
          touchNavigation: true,
          loop: true,
          autoplayVideos: false,
          openEffect: 'fade',
          closeEffect: 'fade'
        });

        // Manually attach click handlers since selector won't work in Shadow DOM
        galleryItems.forEach((link, index) => {
          this.addEventListener(link, 'click', (e) => {
            e.preventDefault();
            if (this.lightbox) {
              this.lightbox.openAt(index);
            }
          });
        });
      } else {
        console.error('GLightbox library not loaded');
      }
    };

    if (typeof GLightbox !== 'undefined') {
      initializeLightbox();
    } else {
      // Wait a bit for script to load
      setTimeout(() => {
        initializeLightbox();
      }, 100);
    }
  }

  /**
   * Cleanup when component is removed
   */
  cleanup() {
    // Destroy lightbox instance
    if (this.lightbox) {
      try {
        this.lightbox.destroy();
        this.lightbox = null;
      } catch (e) {
        // Ignore errors
      }
    }
    super.cleanup();
  }

  /**
   * Refresh gallery (reload from JSON)
   */
  refresh() {
    this.loadGallery();
  }
}

customElements.define('amf-gallery-page', GalleryPage);
export default GalleryPage;

