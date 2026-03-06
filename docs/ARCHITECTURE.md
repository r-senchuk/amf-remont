# Architecture Documentation

## React Single Page Application (SPA)

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
│           ├── HomePage/         # Home page (includes About section)
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

### Section Wrapper (Layout Consistency)

Use the shared `Section` component to keep spacing and widths consistent across pages:

```jsx
import Section from './components/shared/Section/Section';

function ExamplePageSection() {
  return (
    <Section className="bg-white" width="base" padding="normal">
      <h2 className="text-3xl font-bold text-slate-900">Tytul sekcji</h2>
      <p className="mt-3 text-slate-600">Zawartosc sekcji z jednolitym rytmem.</p>
    </Section>
  );
}
```

## Routing

### React Router Configuration

Routes are defined in `src/routes/index.jsx`.

### Route Metadata

SEO metadata is defined per route in `routesMeta` within `src/routes/index.jsx`.

### Custom Hooks

- **useSEO**: Updates document meta tags based on current route
- **useScrollRestoration**: Saves and restores scroll positions
- **useGalleryData**: Loads and caches `/data/gallery.json` once, shared by Home and Gallery pages

## Key Behaviors

- **Contact CTA**: All links point to `/contact`. The route renders `HomePage` and programmatically scrolls to `ContactSection`.
- **Bundled UI Libraries**: GLightbox is lazy-loaded in the gallery component.
- **Gallery Data Flow**: `useGalleryData` fetches and caches the gallery JSON exactly once.
- **Global SEO & Scroll State**: `App.jsx` wires `useSEO` and `useScrollRestoration`.
