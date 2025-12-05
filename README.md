# AMF Group Website Redesign

## Project Overview

This is the source code for the AMF Group website (https://www.amfgroup.pl) - a renovation and interior finishing company based in Wrocław, Poland. The site is hosted on AWS S3 and served via CloudFront.

## Current Issues

1. **Design Problems:**
   - Outdated color scheme and typography
   - Inconsistent spacing and layout
   - Complex nested div structure with custom attributes
   - Poor mobile responsiveness
   - Mixed styling approaches (inline styles, multiple CSS files)

2. **Content Structure Issues:**
   - Poor semantic HTML structure
   - Content not optimized for SEO
   - Hardcoded content mixed with structure
   - No clear content hierarchy

3. **Photo Gallery Issues:**
   - ~~Photos hardcoded in HTML (20+ manual entries)~~ ✅ Fixed
   - ~~Inconsistent naming (some with `_313` suffix, some without)~~ ✅ Standardized
   - ~~No easy way to add/remove/replace photos~~ ✅ JSON-based system
   - ~~Poor user experience for browsing~~ ✅ GLightbox implementation

## Implementation Plan: Progressive Enhancement

### Architecture Decision: Option B - Progressive Enhancement

We will keep the existing HTML structure and progressively enhance it with:
- Modern CSS refactoring
- JavaScript improvements for gallery and interactions
- Simple folder-based photo management
- Better content organization
- Improved SEO and accessibility

**Benefits:**
- Less disruptive to existing deployment
- Faster initial delivery
- Maintains current AWS S3/CloudFront setup
- Gradual migration approach
- No need for build tools initially

### Phase 1: Design System & Styling

#### 1.1 Color Palette
- **Primary:** Professional blue (#1a49a7, #19326b)
- **Accent:** Creative orange (#ff942a, #f89f47)
- **Neutral:** Modern grays (#37474f, #546e7a, #eceff1)
- **Background:** Clean whites and light grays

#### 1.2 Typography
- Keep Geometria font family (already loaded)
- Improve font hierarchy and sizing
- Better line-height and spacing
- Responsive font sizes

#### 1.3 Layout System
- Refactor CSS grid system
- Consistent spacing scale (8px base)
- Better responsive breakpoints
- Clean component-based styling

#### 1.4 Files to Modify
- `css/main.css` - Refactor and modernize
- `css/project.css` - Update component styles
- `css/types.css` - Improve gallery and content styles
- Remove inline styles from `index.html`

### Phase 2: Content Structure & SEO

#### 2.1 Semantic HTML
- Replace custom `otype` attributes with semantic HTML5 elements
- Use proper `<section>`, `<article>`, `<header>`, `<nav>`, `<footer>`
- Improve heading hierarchy (h1, h2, h3)
- Add proper ARIA labels for accessibility

#### 2.2 SEO Optimization
- Improve meta tags in `<head>`
- Add structured data (JSON-LD)
- Optimize image alt texts
- Better internal linking
- Improve page titles and descriptions

#### 2.3 Content Organization
- Extract hardcoded content to data structure (optional JSON)
- Separate content from presentation
- Create reusable content blocks

#### 2.4 Files to Modify
- `index.html` - Restructure with semantic HTML
- Add `data/content.json` (optional) for content management

### Phase 3: Photo Gallery System

#### 3.1 Folder Structure
```
images/
  gallery/
    full/          # Full-size images
      01_bathroom.jpg
      02_kitchen.jpg
      03_living_room.jpg
      ...
    thumbs/        # Thumbnails (auto-generated or manual)
      01_bathroom_thumb.jpg
      02_kitchen_thumb.jpg
      ...
```

#### 3.2 Gallery Configuration
Create `data/gallery.json`:
```json
{
  "photos": [
    {
      "id": "01",
      "filename": "01_bathroom.jpg",
      "title": "Modern Bathroom",
      "category": "bathroom",
      "order": 1
    },
    {
      "id": "02",
      "filename": "02_kitchen.jpg",
      "title": "Kitchen Renovation",
      "category": "kitchen",
      "order": 2
    }
  ]
}
```

#### 3.3 Gallery Features
- Auto-generate gallery from JSON config
- **GLightbox** library for lightbox/modal view (modern, lightweight, works with dynamic content)
- Responsive grid layout
- Lazy loading for performance
- Touch navigation and keyboard controls
- Easy to add/remove photos (just update JSON and add files)

#### 3.4 Files to Create/Modify
- `data/gallery.json` - Gallery configuration
- `js/gallery.js` - Gallery functionality (new file)
- `index.html` - Replace hardcoded gallery with dynamic generation, add GLightbox library
- `css/types.css` - Update gallery styles (if needed)

### Phase 4: JavaScript Enhancements

#### 4.1 Gallery Module
- Load gallery from JSON
- Generate gallery HTML dynamically
- Implement lightbox functionality
- Handle image lazy loading

#### 4.2 Form Improvements
- Better form validation
- Improved UX for contact forms
- Loading states and feedback

#### 4.3 Interactive Elements
- Smooth scrolling
- Mobile menu improvements
- Scroll animations (optional)

#### 4.4 Files to Create/Modify
- `js/gallery.js` - New gallery module
- `js/main.end.js` - Enhance existing functionality
- `js/main.start.js` - Keep minimal, move logic to modules

### Phase 5: Image Optimization

#### 5.1 Image Processing
- Optimize existing images
- Generate thumbnails automatically (or provide script)
- Use WebP format where possible (with fallbacks)
- Implement proper lazy loading

#### 5.2 Files to Create
- `scripts/generate-thumbnails.js` - Optional script for thumbnail generation
- Update image paths in gallery config

### Phase 6: Mobile Responsiveness

#### 6.1 Mobile-First Approach
- Improve mobile navigation
- Better touch targets
- Optimize images for mobile
- Improve form usability on mobile

#### 6.2 Files to Modify
- All CSS files - Add/improve mobile breakpoints
- `index.html` - Improve mobile structure

## Implementation Steps

### Step 1: Setup & Preparation
1. Create backup of current site
2. Set up new folder structure for images
3. Create `data/gallery.json` with current photos
4. Document current photo locations

### Step 2: Design System
1. Define color palette and typography
2. Create spacing system
3. Refactor `css/main.css` with new design system
4. Update component styles in `css/project.css`

### Step 3: Content Restructure
1. Update `index.html` with semantic HTML
2. Improve SEO meta tags
3. Extract hardcoded content (optional JSON)
4. Add structured data

### Step 4: Gallery Implementation ✅ COMPLETED
1. Create `data/gallery.json` ✅
2. Implement `js/gallery.js` with GLightbox integration ✅
3. Update gallery HTML generation ✅
4. Add GLightbox library to `index.html` ✅
5. Test lightbox functionality ✅
6. Implement lazy loading ✅

**Library Used:** GLightbox (https://github.com/biati-digital/glightbox)
- Modern, lightweight lightbox library
- Works perfectly with dynamically created content
- Touch navigation, keyboard controls, smooth animations

### Step 5: Image Migration
1. Move images to new folder structure
2. Optimize images
3. Generate thumbnails
4. Update gallery.json with new paths

### Step 6: Testing & Refinement
1. Test on multiple devices
2. Check browser compatibility
3. Performance optimization
4. Accessibility audit
5. SEO validation

### Step 7: Deployment
1. Test on staging (if available)
2. Deploy to S3 using Makefile
3. Invalidate CloudFront cache
4. Monitor for issues

## File Structure

```
amf-remont/
├── css/
│   ├── main.css              # Main styles (refactor)
│   ├── project.css           # Component styles (update)
│   ├── types.css             # Gallery & content styles (update)
│   ├── ol-article.css        # Article styles
│   └── cvu_olymp.css         # Form styles
├── js/
│   ├── main.start.js         # Initialization (minimal)
│   ├── main.end.js           # Main functionality (enhance)
│   ├── type.end.js           # Type-specific JS
│   ├── gallery.js            # NEW: Gallery module (uses GLightbox)
│   └── reserve.js            # Form handling
├── data/
│   ├── gallery.json          # NEW: Gallery configuration
│   └── content.json          # NEW: Optional content data
├── images/
│   └── gallery/
│       ├── full/             # NEW: Full-size images
│       └── thumbs/           # NEW: Thumbnails
├── i/                        # Current image folders (migrate)
├── include/                  # External libraries
├── index.html                # Main HTML (restructure)
├── Makefile                  # Deployment script
└── README.md                 # This file
```

## Development Guidelines

### CSS
- Use consistent spacing scale (8px base)
- Mobile-first responsive design
- Use CSS variables for colors
- Keep specificity low
- Comment complex sections

### JavaScript
- Modular approach
- Keep jQuery for compatibility
- Add modern JS where appropriate
- Comment code clearly
- Handle errors gracefully

### HTML
- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels for accessibility
- Clean, readable structure

### Images
- Optimize all images
- Use descriptive filenames
- Provide alt text
- Implement lazy loading

## Deployment

### Current Setup
- AWS S3 bucket: `amfgroup.pl`
- CloudFront distribution
- Deploy using: `make deploy`

### Deployment Process
1. Test changes locally
2. Run `make deploy` to upload to S3
3. Invalidate CloudFront cache if needed
4. Verify on live site

## Implementation Status

### ✅ Completed
- **STEP 1: Photo Gallery System** - JSON-based gallery with GLightbox
  - Dynamic gallery generation from `data/gallery.json`
  - GLightbox integration for lightbox functionality
  - Easy photo management (add/remove/reorder via JSON)
  - Touch and keyboard navigation support

- **STEP 2: Design System Foundation** - Modern CSS design system
  - CSS custom properties (variables) for colors, spacing, typography
  - Centralized color palette and design tokens
  - Utility classes for common styling needs
  - Removed all inline styles from HTML
  - Consistent typography scale and spacing system
  - Improved maintainability and consistency

### 🚧 In Progress
- STEP 3: Content Structure & SEO
- STEP 4: Mobile Responsiveness
- STEP 5: Image Optimization
- STEP 6: JavaScript Enhancements
- STEP 7: Deployment Optimization

## Future Enhancements (Post-MVP)

1. **React Integration (Optional)**
   - Convert gallery to React component
   - Add React for interactive sections
   - Keep HTML structure, enhance with React

2. **Build Tools**
   - Add Webpack/Vite for bundling
   - CSS preprocessing (SASS/PostCSS)
   - Image optimization pipeline

3. **Content Management**
   - Simple CMS integration
   - Admin panel for content updates
   - Photo upload interface

4. **Performance**
   - Service worker for offline support
   - Advanced caching strategies
   - CDN optimization

## Dependencies

### External Libraries (CDN)
- **jQuery 3.4.1** - Already included
- **Materialize CSS** - Already included
- **GLightbox** - Modern lightbox library (added in STEP 1)
  - CSS: `https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css`
  - JS: `https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js`
- **AMP Runtime** - Still included for other components (forms, etc.)

## Design System

### CSS Variables

The design system uses CSS custom properties (variables) defined in `css/design-system.css`. All colors, spacing, typography, shadows, and transitions are centralized here.

#### Color Palette
- **Primary Colors**: `--color-primary` (#1a49a7), `--color-primary-dark` (#19326b), `--color-primary-light` (#95b7fb)
- **Accent Colors**: `--color-accent-orange` (#ff942a), `--color-accent-purple` (#a70da9), `--color-accent-green` (#4caf50)
- **Neutral Colors**: `--color-text-primary` (#37474f), `--color-text-secondary` (#546e7a), `--color-bg-light` (#eceff1), `--color-bg-lighter` (#f4f7f9), `--color-bg-dark` (#486e71)

#### Spacing Scale (8px base unit)
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px

#### Typography
- Font families: `--font-family-primary` (Geometria, Open Sans), `--font-family-secondary` (Open Sans)
- Font sizes: `--font-size-xs` (12px) through `--font-size-3xl` (32px)
- Line heights: `--line-height-tight` (1.2), `--line-height-normal` (1.5), `--line-height-relaxed` (1.75)

#### Utility Classes

Common utility classes available:
- **Background**: `.bg-light`, `.bg-lighter`, `.bg-primary`, `.bg-accent-light`
- **Text Colors**: `.text-primary`, `.text-accent-orange`, `.text-accent-green`, `.text-accent-purple`
- **Spacing**: `.mt-*`, `.mb-*`, `.pt-*`, `.pb-*` (xs, sm, md, lg, xl)

### Usage Guidelines

1. **Always use CSS variables** instead of hardcoded colors or spacing values
2. **Use utility classes** for common styling needs (backgrounds, text colors)
3. **Maintain consistency** by using the design system tokens
4. **No inline styles** - use utility classes or add styles to appropriate CSS files

## Notes

- GLightbox is used for gallery lightbox functionality (replaces AMP lightbox-gallery for dynamic content)
- AMP components still used for other features (forms, etc.)
- Design system variables are defined in `css/design-system.css` and used throughout all CSS files
- Maintain backward compatibility during migration
- Test thoroughly before each deployment
- Document any breaking changes

## Contact

For questions about this project, refer to the implementation plan above or contact the development team.
