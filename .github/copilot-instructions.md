# AI Coding Agent Instructions for AMF Remont

## Project Overview
**AMF Group** is a modern React 19 SPA built with Vite for a renovation/interior finishing company based in Wrocław, Poland. The site emphasizes SEO optimization, component modularity, and CSS-first styling with design tokens.

**Key URLs:** [amfgroup.pl](https://www.amfgroup.pl) | Hosted on AWS S3 + CloudFront | Branch: `dev` (→ `main`)

## Architecture & Data Flow

### Core SPA Structure
- **Root:** `src/App.jsx` provides layout shell (Header + `<Outlet>` + Footer)
- **Routing:** `src/routes/index.jsx` defines all routes with lazy loading and `routesMeta` for SEO
- **Pages:** HomePage, ServicesPage, GalleryPage, ContactPage (rendered within HomePage with scroll anchor)
- **Hooks:** Three custom hooks manage cross-cutting concerns:
  - `useSEO()` - dynamically updates meta tags per route (title, OG tags, canonical)
  - `useScrollRestoration()` - maintains scroll position across route changes
  - `useGalleryData()` - loads/caches gallery from `/public/data/gallery.json`

### Component Organization
```
src/components/
├── pages/         # Route-mapped full-page components
│   ├── HomePage   # Also handles scrollToContact prop
│   ├── ServicesPage
│   ├── GalleryPage
│   └── ContactPage (sub-components)
└── shared/        # Reusable layout components
    ├── Header     # Navigation and branding
    ├── Footer     # Site footer
    ├── Gallery    # Lightbox wrapper (uses GLightbox)
    └── Section    # Content section container
```

### Styling Architecture
- **CSS Variables:** `src/css/design-system.css` (colors, spacing, typography, shadows)
- **Global:** `src/css/global.css` (base/normalize styles)
- **Utilities:** Tailwind 4 via `@tailwindcss/vite` plugin + utility classes
- **Components:** Colocated CSS files or `.module.css` for scoped styles
- **Key Colors:** `--color-primary` (#1a49a7), `--color-accent-orange` (#ff942a), `--color-accent-purple` (#a70da9)

## Critical Workflows

### Development & Build
```bash
make help        # View all commands
make install     # npm ci (respects package-lock.json)
make dev         # Vite dev server @ http://localhost:3000 (HMR enabled)
make build       # Production build → dist/
make preview     # Serve built site locally
make clean-dist  # Remove artifacts (keep node_modules)
```

**Node Requirement:** ≥20.19.0 (check `package.json` engines field)

### Adding New Routes
1. Create page component in `src/components/pages/YourPage/`
2. Add lazy import + route definition in `src/routes/index.jsx`
3. Add entry to `routesMeta` object with SEO metadata (title, description, og:*)
4. Wrap in `withSuspense()` helper
5. Update `Header` navigation if user-facing

### Handling Gallery Data
- Source: `/public/data/gallery.json` (non-React JSON file)
- Hook: `useGalleryData()` caches via `useRef` + `useState`
- Display: `Gallery` component wraps with GLightbox lightbox integration
- Update: Regenerate gallery.json when adding images to `/public/gallery/`

### SEO Pattern
Every route **must** have `routesMeta` entry:
```javascript
'/route-name': {
  title: 'Page Title - AMF GROUP',
  description: 'Meta description (160 chars)',
  ogTitle: 'OG Title',
  ogDescription: 'OG Description',
  ogImage: '/assets/logo/logo.svg'
}
```
The `useSEO()` hook automatically applies these on mount.

### Contact Route Scroll Behavior
The `/contact` route has special handling:
- Route points to `HomePage` with `scrollToContact` prop: `{ path: 'contact', element: <HomePage scrollToContact /> }`
- HomePage receives this prop and triggers scroll to the ContactSection on mount
- Implementation: Check `HomePage.jsx` for `useEffect` that scrolls to `#contact-section` anchor
- **Key point:** Don't convert `/contact` to a standalone page component; keep it as a prop-driven behavior of HomePage

## Deployment

### AWS S3 + CloudFront
- **Hosting:** Static SPA deployed to S3 bucket
- **CDN:** CloudFront distribution serves the site (HTTPS, caching, invalidation)
- **Build Output:** `dist/` directory contains all files ready for S3 sync
- **Deployment:** Typically handled by CI/CD pipeline; manual sync: `aws s3 sync dist/ s3://bucket-name/`
- **Cache Invalidation:** After deployment, invalidate CloudFront: `aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"`
- **Environment:** Production builds from `main` branch; staging from `dev` if needed

### Pre-Deployment Checklist
1. Run `make build` and verify `dist/` contains all assets
2. Test locally with `make preview`
3. Verify no broken links or 404s
4. Check SEO meta tags in browser DevTools
5. Ensure `sitemap.xml` is up-to-date in `/public/`

## Local Development Gotchas

### Node Version
- **Requirement:** Node ≥20.19.0 (specified in `package.json` engines field)
- **Check:** `node --version` before running `make install`
- **Issue:** Older Node versions may fail on Tailwind 4 or PostCSS features
- **Fix:** Use nvm or upgrade Node globally

### Package Lock & Reinstall
- **Use `npm ci`** (via `make install`), not `npm install`, to respect exact `package-lock.json`
- **Issue:** `npm install` can create mismatches between local and deployed builds
- **Full Reset:** `make reinstall` removes node_modules and package-lock, then reinstalls

### HMR Not Updating
- **Symptom:** File changes don't reflect in browser during `make dev`
- **Cause:** Usually VSCode file watcher limit on macOS
- **Fix:** Run `launchctl limit maxfiles` and increase if low; restart dev server
- **Fallback:** Manual browser refresh if HMR stalls

### Gallery Images Not Loading
- **Symptom:** Gallery renders but images show as broken
- **Source:** Images must be in `/public/gallery/` (folder in static assets)
- **Config:** Entry path must match in `/public/data/gallery.json`
- **Debug:** Check browser Network tab; verify relative paths start with `/gallery/`

### Build Succeeds Locally but Fails on AWS
- **Cause:** Environment or asset path differences
- **Check:** Ensure all asset imports use absolute paths from `/public/` (e.g., `/logo.svg`)
- **Test:** Run `make build` + `make preview` to simulate production environment
- **Verify:** `dist/` contains all referenced assets before S3 sync

## Project-Specific Conventions

### File Naming & Structure
- **Components:** PascalCase folder with `ComponentName.jsx` + optional `ComponentName.css`
- **Hooks:** `useHookName.js` (lowercase, with `use` prefix)
- **Data:** Plain JS files exporting arrays/objects (e.g., `src/data/services.js`)
- **Routes:** Centralized in `src/routes/index.jsx` (not scattered)

### Polish Language Content
- Site content is **primarily Polish** (target audience: Wrocław, Poland)
- UI labels, descriptions, and meta tags use Polish text
- English reserved for code comments and technical docs

### Vite Build Configuration
- **Root:** `src/` (not project root)
- **Assets:** Static files in `/public/` copied as-is
- **Aliases:** `@` → `src/`, `@components`, `@hooks`, etc. (see vite.config.js)
- **CSS Modules:** kebab-case → camelCase auto-conversion
- **Output:** `dist/` directory with CSS code-splitting enabled

### React Patterns
- **No Class Components:** Functional components only with hooks
- **Lazy Loading:** All page routes use `React.lazy()` + `<Suspense>`
- **Prop Drilling:** Keep shallow; consider Context for global state if needed
- **Tailwind Usage:** Prefer utility classes over CSS files for layout/spacing

## Key Dependencies & Integrations

| Dependency | Version | Usage |
|------------|---------|-------|
| **React** | 19.2.1 | UI framework |
| **React Router DOM** | 7.10.1 | Client-side routing |
| **Vite** | 7.2.6 | Build tool + dev server |
| **Tailwind CSS** | 4.1.17 | Utility-first styling |
| **GLightbox** | 3.3.1 | Image lightbox/gallery modal |

**No Backend:** This is a static SPA—all data (gallery, services) is from JSON files in `/public/`.

## Common Tasks

### Add a New Service
1. Edit `src/data/services.js` - add object to `services` array with `{ icon, title, description, muted|accent }`
2. `ServicesPage` iterates this array automatically

### Create a Gallery Project
1. Place images in `/public/gallery/` or organized subfolders
2. Add entry to `/public/data/gallery.json` with image path, title, description
3. Update `useGalleryData()` if caching logic changes

### Fix SEO Issues
1. Check `src/routes/index.jsx` - verify `routesMeta` has complete entries
2. Verify `useSEO()` is called in `App.jsx`
3. Check `src/index.html` for base meta tags (og:url, canonical set dynamically)

### Update Styling System
1. Add new color/spacing token to `src/css/design-system.css` (`:root` block)
2. Reference via `var(--token-name)` in component CSS
3. Use Tailwind for one-off utility needs; centralize design tokens for reusable values

## External References
- **React 19 Docs:** https://react.dev
- **React Router v7:** https://reactrouter.com
- **Vite Docs:** https://vite.dev
- **Tailwind CSS 4:** https://tailwindcss.com
- **GLightbox:** https://www.lightboxjs.com
