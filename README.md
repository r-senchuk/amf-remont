# AMF Group Website

## Project Overview

This is the source code for the AMF Group website (https://www.amfgroup.pl) - a renovation and interior finishing company based in Wrocław, Poland. The site is hosted on AWS S3 and served via CloudFront.

## Architecture

### React Single Page Application (SPA)

The website is built as a modern **Single Page Application (SPA)** using **React 19** with the following architecture:

- **React 19**: Latest React with functional components and hooks
- **React Router v7**: Client-side routing with React Router DOM
- **Component-Based**: Modular architecture with shared and page-specific components
- **Design System**: Centralized CSS variables for consistent styling
- **CSS Modules**: Scoped CSS for Header component
- **SEO Optimized**: Dynamic meta tags and proper URL handling

### Technology Stack

- **Build Tool**: Vite 7.2.6 with @vitejs/plugin-react (fast HMR, optimized builds)
- **UI Framework**: React 19.2
- **Routing**: React Router DOM 7.10
- **Styling**: CSS Custom Properties, CSS Modules
- **Lightbox**: GLightbox for gallery functionality

## Project Structure

```
amf-remont/
├── src/                          # Source files (processed by Vite)
│   ├── index.html                # Main HTML entry point (SPA shell)
│   ├── main.jsx                  # React entry point
│   ├── App.jsx                   # Root React component
│   ├── css/                      # Global CSS files
│   │   ├── design-system.css     # CSS variables and design tokens
│   │   ├── global.css            # Global styles
│   │   ├── main.css              # Main styles
│   │   ├── project.css           # Component styles
│   │   ├── types.css             # Gallery & content styles
│   │   └── ol-article.css        # Article styles
│   ├── routes/                   # React Router configuration
│   │   └── index.jsx             # Route definitions and SEO metadata
│   ├── hooks/                    # Custom React hooks
│   │   ├── useSEO.js             # SEO meta tag management
│   │   └── useScrollRestoration.js # Scroll position restoration
│   └── components/               # React Components
│       ├── shared/               # Shared components
│       │   ├── Header/           # Site header component
│       │   ├── Footer/           # Site footer component
│       │   └── Navigation/       # Mobile navigation component
│       └── pages/                # Page components
│           ├── HomePage/         # Home page
│           ├── AboutPage/        # About page
│           ├── ServicesPage/     # Services page
│           ├── GalleryPage/      # Gallery page
│           └── ContactPage/      # Contact page
├── public/                       # Static assets (copied as-is)
│   ├── assets/                   # Images, icons, backgrounds
│   ├── gallery/                  # Gallery images
│   ├── i/                        # Gallery images (organized by ID)
│   ├── libs/                     # External libraries (Materialize, fonts)
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

## React Components Architecture

### Component Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.jsx     # React component
├── ComponentName.css     # Component styles
└── ComponentName.module.css  # (optional) CSS Module for scoped styles
```

### Example Component

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyComponent.css';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Component initialization
  }, []);

  return (
    <div className="myComponent">
      <h1>My Component</h1>
      <Link to="/about">About</Link>
    </div>
  );
}

export default MyComponent;
```

## Routing

### React Router Configuration

Routes are defined in `src/routes/index.jsx`:

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'contact', element: <ContactPage /> }
    ]
  }
]);
```

### Route Metadata

SEO metadata is defined per route in `routesMeta`:

```jsx
const routesMeta = {
  '/': {
    title: 'Page Title',
    description: 'Page description',
    ogTitle: 'OG Title',
    ogDescription: 'OG Description',
    ogImage: '/assets/logo/logo.svg'
  }
};
```

### Custom Hooks

- **useSEO**: Updates document meta tags based on current route
- **useScrollRestoration**: Saves and restores scroll positions

## Design System

### CSS Variables

All design tokens are defined in `src/css/design-system.css`.

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
make dev

# Build for production
make build

# Preview production build (http://localhost:8080)
make preview

# Deploy to S3 (builds first, then deploys)
make deploy

# Clean build artifacts
make clean
```

## Features

### Implemented

- **React 19 Architecture**: Modern functional components with hooks
- **React Router v7**: Client-side routing with nested routes
- **Design System**: Centralized CSS variables
- **SEO Optimization**: Dynamic meta tags via useSEO hook
- **Scroll Restoration**: Saves/restores scroll positions
- **Photo Gallery**: JSON-based gallery with GLightbox
- **Material Icons**: Google Material Icons integration
- **Mobile Navigation**: Materialize sidenav for mobile
- **Scroll to Top**: Button to scroll to top of page

### Future Enhancements

- **PWA Support**: Service worker, offline support
- **Analytics Integration**: Google Analytics, custom events
- **Image Optimization**: WebP format, responsive images
- **Testing**: Unit tests, E2E tests

## Performance Optimizations

### Implemented

1. **Code Splitting**: CSS code splitting enabled
2. **Lazy Loading**: Images use `loading="lazy"`
3. **Optimized Builds**: Vite optimizes and minifies production builds
4. **Fast Refresh**: React Fast Refresh for development

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
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

## Dependencies

### Runtime Dependencies
- **react**: ^19.2.1
- **react-dom**: ^19.2.1
- **react-router-dom**: ^7.10.1

### Dev Dependencies
- **vite**: ^7.2.6
- **@vitejs/plugin-react**: ^5.1.1

### External Libraries (CDN)
- **Materialize CSS**: UI component library (sidenav)
- **GLightbox**: Modern lightbox library
- **Material Icons**: Google Material Icons

## License

Copyright © AMF GROUP. All rights reserved.

## Contact

For questions about this project, refer to this README or contact the development team.
