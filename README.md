# AMF Group Website

## Project Overview

This is the source code for the [AMF Group website](https://www.amfgroup.pl), a renovation and interior finishing company based in Wrocław, Poland. The site is hosted on AWS S3 and served via CloudFront.

Previous version deployed to https://www.amfgroup.pl/index.html.

## Architecture

### React Single Page Application (SPA)

The website is built as a modern **Single Page Application (SPA)** using **React 19** with the following architecture:

- **React 19**: Latest React with functional components and hooks
- **React Router v7**: Client-side routing with React Router DOM
- **Component-Based**: Modular architecture with shared and page-specific components
- **Design System**: Centralized CSS variables and Tailwind theme tokens for consistent styling
- **Tailwind-first**: Utility classes for layout and spacing
- **SEO Optimized**: Dynamic meta tags and proper URL handling

### Technology Stack

- **Build Tool**: Vite 7.2.6 with @vitejs/plugin-react (fast HMR, optimized builds)
- **UI Framework**: React 19.2
- **Routing**: React Router DOM 7.10
- **Styling**: CSS Custom Properties plus Tailwind utility classes
- **UI Libraries**: GLightbox bundled via npm

## Project Structure

```text
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
│   │   ├── useSEO.js             # SEO meta tag management (hooked into App)
│   │   ├── useScrollRestoration.js # Scroll position restoration across routes
│   │   └── useGalleryData.js     # Shared gallery data loader with caching
│   └── components/               # React Components
│       ├── shared/               # Shared components
│       │   ├── Header/           # Site header component
│       │   ├── Footer/           # Site footer component
│       └── pages/                # Page components
│           ├── HomePage/         # Home page
│           ├── AboutPage/        # About page
│           ├── ServicesPage/     # Services page
│           ├── GalleryPage/      # Gallery page
│           └── ContactPage/      # Contact section building blocks (used within HomePage)
├── public/                       # Static assets (copied as-is)
│   ├── assets/                   # Images, icons, backgrounds
│   ├── gallery/                  # Gallery images
│   ├── i/                        # Gallery images (organized by ID)
│   ├── libs/                     # Legacy font assets (Geometria), kept for compatibility
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

```text
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
      // /contact renders HomePage and scrolls to the embedded contact section
      { path: 'contact', element: <HomePage scrollToContact /> }
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
- **useGalleryData**: Loads and caches `/data/gallery.json` once, shared by Home and Gallery pages

## Key Behaviors

- **Contact CTA**: All links point to `/contact`. The route renders `HomePage` and programmatically scrolls to `ContactSection`, so there is a single canonical contact entry point.
- **Bundled UI Libraries**: GLightbox is lazy-loaded in the gallery component to avoid render-blocking assets.
- **Gallery Data Flow**: `useGalleryData` fetches and caches the gallery JSON exactly once, so the homepage preview and the gallery page reuse the same sorted data without duplicate network requests.
- **Global SEO & Scroll State**: `App.jsx` wires `useSEO` and `useScrollRestoration` to ensure route-level metadata stays in sync with navigation while keeping back/forward scroll behavior predictable.

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

- Node.js 20.19+ (or 22.12+) and npm
- Make (for build commands)

### Dev Container

- Ready-to-use VS Code Dev Container config in `.devcontainer/devcontainer.json`.
- Base image: `mcr.microsoft.com/devcontainers/javascript-node:22` with non-root `node` user and UID sync enabled.
- Post-create installs dependencies with `make install` (runs `npm install`).
- Forwarded ports: `3000` (Vite dev) and `8080` (Vite preview) with auto-forward set to notify.
- VS Code extensions baked in: ESLint, Prettier, Tailwind CSS IntelliSense, OpenAI ChatGPT.
- Usage: open with the Dev Containers extension (or Codespaces), “Reopen in Container”, then `make dev` for HMR or `make preview` for a production build run.

#### Best practices inside the dev container

- Prefer `make install` for consistent installs across local/dev container workflows.
- Use `make` targets (`dev`, `build`, `preview`) instead of raw npm commands for consistency.
- Keep terminals inside the container to ensure file ownership stays with the `node` user.
- If you need to expose a different port, pass `--port` to Vite or edit `vite.config.js` (ports will auto-forward).
- Run `make clean` sparingly; keeping `node_modules` cached in the workspace speeds up rebuilds.

#### Suggested dev container upgrades

1. Add an npm cache mount for faster reinstalls: `"mounts": ["source=${localEnv:HOME}/.npm,target=/home/node/.npm,type=bind,consistency=cached"]`.
2. Include features for any optional tooling you need (e.g., linting or testing CLIs).

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
- **Contact Section Blocks**: Reusable intro, channels, and footer components styled with Tailwind classes inside `HomePage`

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

Deployment is handled via CI (GitHub Actions) and is no longer triggered from local `make` targets. Build locally with `make build` to verify output before pushing changes.

## Dependencies & Assets

- **Runtime**: `react`, `react-dom`, `react-router-dom`, `materialize-css`, `glightbox`
- **Tooling**: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `typescript`
- **Static assets**: Materialize theme overrides (`public/libs/materialize_cvu.css`), custom fonts (`public/libs/fonts/**`), Google Fonts / Material Icons via `<link>` tags

## License

Copyright © AMF GROUP. All rights reserved.

## Contact

For questions about this project, refer to this README or contact the development team.
