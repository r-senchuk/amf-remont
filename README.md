# AMF Group Website

## Project Overview

This is the source code for the AMF Group website (https://www.amfgroup.pl) - a renovation and interior finishing company based in Wrocław, Poland. The site is hosted on AWS S3 and served via CloudFront.

## Architecture

### Web Components Single Page Application (SPA)

The website is built as a modern **Single Page Application (SPA)** using **Web Components** with the following architecture:

- **Web Components**: Custom elements using Shadow DOM for style encapsulation
- **Client-Side Routing**: Custom router using History API for navigation
- **Component-Based**: Modular architecture with shared and page-specific components
- **Design System**: Centralized CSS variables for consistent styling
- **Lazy Loading**: Components loaded on-demand for optimal performance
- **SEO Optimized**: Dynamic meta tags, structured data, and proper URL handling

### Technology Stack

- **Build Tool**: Vite 7.2.6 (fast HMR, optimized builds)
- **JavaScript**: ES6+ modules, vanilla JavaScript (no jQuery)
- **Styling**: CSS Custom Properties, CSS Modules support
- **Components**: Native Web Components (Custom Elements API)
- **Routing**: Custom client-side router
- **Lightbox**: GLightbox for gallery functionality

## Project Structure

```
amf-remont/
├── src/                          # Source files (processed by Vite)
│   ├── index.html                # Main HTML entry point (SPA shell)
│   ├── css/                      # Global CSS files
│   │   ├── design-system.css     # CSS variables and design tokens
│   │   ├── global.css            # Global styles
│   │   ├── main.css              # Main styles
│   │   ├── project.css           # Component styles
│   │   ├── types.css             # Gallery & content styles
│   │   ├── ol-article.css        # Article styles
│   │   └── cvu_olymp.css         # Form styles
│   ├── js/                       # Application JavaScript (ES modules)
│   │   ├── app.js                # Main application entry point
│   │   ├── router.js             # Client-side router
│   │   ├── base-component.js     # Base class for Web Components
│   │   └── design-system-loader.js # Design system CSS loader
│   └── components/               # Web Components
│       ├── shared/               # Shared components
│       │   ├── Header/           # Site header component
│       │   ├── Footer/           # Site footer component
│       │   └── Navigation/      # Navigation component
│       └── pages/                # Page components
│           ├── HomePage/         # Home page
│           ├── AboutPage/        # About page
│           ├── ServicesPage/      # Services page
│           ├── GalleryPage/      # Gallery page
│           └── ContactPage/     # Contact page
├── public/                       # Static assets (copied as-is)
│   ├── js/                       # Legacy JavaScript (non-module)
│   │   ├── utils.js              # Utility functions
│   │   ├── main.start.js         # Initialization
│   │   ├── main.end.js           # Main functionality
│   │   ├── type.end.js           # Form handling
│   │   ├── gallery.js            # Gallery module (GLightbox)
│   │   └── reserve.js            # Form handling
│   ├── i/                        # Gallery images
│   ├── d/                        # Design assets (logo, icons)
│   ├── include/                 # External libraries (Materialize, fonts)
│   ├── data/                     # JSON data files
│   │   └── gallery.json          # Gallery configuration
│   ├── favicon.ico
│   └── sitemap.xml
├── dist/                         # Build output (gitignored)
├── package.json                  # Node.js dependencies
├── vite.config.js                # Vite configuration
├── Makefile                      # Build and deployment scripts
└── README.md                     # This file
```

## Web Components Architecture

### Component Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.js      # Component class (extends BaseComponent)
├── ComponentName.html    # HTML template
└── ComponentName.module.css  # Scoped styles (CSS Module)
```

### Base Component

All components extend `BaseComponent` which provides:

- **Shadow DOM**: Automatic style encapsulation
- **Lifecycle Methods**: `render()`, `init()`, `cleanup()`
- **Event Management**: Automatic event listener cleanup
- **Design System**: Automatic design system CSS injection
- **Utilities**: `$q()`, `$qa()`, `getAttr()`, `emit()`

### Example Component

```javascript
import { BaseComponent } from '../../../js/base-component.js';
import { loadDesignSystem } from '../../../js/design-system-loader.js';
import template from './MyComponent.html?raw';

class MyComponent extends BaseComponent {
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
      }
      .myClass {
        color: var(--color-primary);
      }
    `;
  }

  init() {
    // Component initialization
    const button = this.$q('.myButton');
    if (button) {
      this.addEventListener(button, 'click', () => {
        // Handle click
      });
    }
  }

  cleanup() {
    // Cleanup is automatic via BaseComponent
    // Override if needed
  }
}

customElements.define('my-component', MyComponent);
export default MyComponent;
```

## Routing

### Client-Side Router

The application uses a custom router (`src/js/router.js`) that:

- **Handles Navigation**: Client-side routing without page reloads
- **History API**: Uses browser History API for proper back/forward support
- **Lazy Loading**: Components loaded on-demand
- **SEO Support**: Dynamic meta tags and structured data
- **Scroll Management**: Saves/restores scroll positions
- **Loading States**: Shows loading indicator during navigation
- **Error Handling**: Graceful error handling with user feedback

### Route Registration

Routes are registered in `src/js/app.js`:

```javascript
router.register('/', async () => {
  await import('../components/pages/HomePage/HomePage.js');
  return document.createElement('amf-home-page');
}, {
  title: 'Page Title',
  description: 'Page description',
  ogTitle: 'OG Title',
  ogDescription: 'OG Description',
  ogImage: 'https://example.com/image.jpg'
});
```

### Navigation

Internal links automatically use the router. External links, mailto, tel, and hash links are ignored.

## Design System

### CSS Variables

All design tokens are defined in `src/css/design-system.css` and automatically injected into Web Components via `design-system-loader.js`.

#### Color Palette
- **Primary**: `--color-primary` (#1a49a7), `--color-primary-dark` (#19326b)
- **Accent**: `--color-accent-orange` (#ff942a), `--color-accent-purple` (#a70da9)
- **Text**: `--color-text-primary` (#37474f), `--color-text-secondary` (#546e7a)
- **Background**: `--color-bg-light` (#eceff1), `--color-bg-dark` (#486e71)

#### Spacing Scale (8px base)
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px
- `--spacing-4xl`: 96px

#### Typography
- Font families: `--font-family-primary`, `--font-family-secondary`
- Font sizes: `--font-size-xs` through `--font-size-3xl`
- Line heights: `--line-height-tight`, `--line-height-normal`, `--line-height-body`

## Development

### Prerequisites

- Node.js 18+ and npm
- Make (for build commands)

### Setup

```bash
# Install dependencies
make install

# Start development server (http://localhost:3000)
make dev
```

### Development Workflow

1. **Edit Components**: Modify files in `src/components/`
2. **Edit Styles**: Modify CSS in `src/css/`
3. **Hot Reload**: Changes are reflected immediately (HMR)
4. **Test**: Navigate between pages to test routing

### Build Commands

```bash
# Install dependencies
make install

# Start development server (http://localhost:3000)
# - Hot module replacement (HMR)
# - Fast refresh on changes
make dev

# Build for production
# - Optimizes and minifies assets
# - Outputs to dist/ directory
make build

# Preview production build (http://localhost:8080)
make preview

# Deploy to S3 (builds first, then deploys)
make deploy

# Clean build artifacts
make clean
```

## Features

### ✅ Implemented

- **Web Components Architecture**: Modular, reusable components
- **Client-Side Routing**: SPA navigation with History API
- **Design System**: Centralized CSS variables
- **SEO Optimization**: Dynamic meta tags, structured data
- **Loading States**: Visual feedback during navigation
- **Scroll Restoration**: Saves/restores scroll positions
- **Error Handling**: User-friendly error messages
- **Accessibility**: Focus management, keyboard navigation
- **Performance**: Lazy loading, code splitting
- **Photo Gallery**: JSON-based gallery with GLightbox
- **Modern JavaScript**: ES6+ modules, no jQuery

### 🚧 Future Enhancements

- **PWA Support**: Service worker, offline support
- **Analytics Integration**: Google Analytics, custom events
- **Prefetching**: Preload next page on hover
- **State Management**: Global state management (if needed)
- **Image Optimization**: WebP format, responsive images
- **Testing**: Unit tests, E2E tests

## Performance Optimizations

### Implemented

1. **Lazy Loading**: Components loaded on-demand
2. **Code Splitting**: CSS code splitting enabled
3. **Design System Caching**: CSS variables cached after first load
4. **Race Condition Prevention**: Router prevents duplicate navigations
5. **Event Listener Cleanup**: Automatic cleanup prevents memory leaks
6. **Optimized Builds**: Vite optimizes and minifies production builds

### Best Practices

- **Use Design System Variables**: Always use CSS variables, never hardcode values
- **Cleanup Event Listeners**: Use `this.addEventListener()` for automatic cleanup
- **Async Rendering**: Components can use async `render()` methods
- **Error Handling**: Always handle errors gracefully
- **SEO**: Provide proper meta tags for each route

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Web Components**: Native support (no polyfills needed for modern browsers)
- **ES6 Modules**: Native support
- **History API**: Native support

## Deployment

### Current Setup

- **Hosting**: AWS S3 bucket `amfgroup.pl`
- **CDN**: CloudFront distribution
- **Build Tool**: Vite
- **Deploy Command**: `make deploy`

### Deployment Process

1. Test changes locally: `make dev`
2. Build production version: `make build`
3. Deploy to S3: `make deploy`
4. Invalidate CloudFront cache (if needed)
5. Verify on live site

## SEO Features

### Dynamic Meta Tags

Each route can define:
- `title`: Page title
- `description`: Meta description
- `ogTitle`: Open Graph title
- `ogDescription`: Open Graph description
- `ogImage`: Open Graph image

### Structured Data

JSON-LD structured data is automatically generated for each page:
- WebPage schema
- Organization schema
- Page-specific schemas (ContactPage, Service, etc.)

### URL Management

- Clean URLs (no hash routing)
- Proper canonical URLs
- Browser history support
- Shareable URLs

## Troubleshooting

### Component Not Rendering

1. Check browser console for errors
2. Verify component is registered: `customElements.define()`
3. Check if `render()` method is async and awaited
4. Verify design system is loading correctly

### Routing Issues

1. Check route registration in `app.js`
2. Verify component import path
3. Check browser console for navigation errors
4. Verify link handling in `setupLinkHandling()`

### Styling Issues

1. Check if design system CSS is loaded
2. Verify CSS variables are used correctly
3. Check Shadow DOM styles (use `:host` selector)
4. Verify component styles are injected

## Dependencies

### Build Tools
- **Vite 7.2.6**: Build tool with HMR

### External Libraries (CDN)
- **Materialize CSS**: UI component library
- **GLightbox**: Modern lightbox library
- **AMP Components**: Form components (legacy)

### No Runtime Dependencies
- Pure Web Components (no framework)
- Vanilla JavaScript (no jQuery)
- Native browser APIs

## License

Copyright © AMF GROUP. All rights reserved.

## Contact

For questions about this project, refer to this README or contact the development team.
