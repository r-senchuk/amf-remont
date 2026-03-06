# AMF Group Website

## Project Overview

This is the source code for the [AMF Group website](https://www.amfgroup.pl), a renovation and interior finishing company based in Wrocław, Poland. The site is hosted on AWS S3 and served via CloudFront.

Previous version deployed to [https://www.amfgroup.pl/index.html](https://www.amfgroup.pl/index.html).

# AMF Group Website

## Project Overview

This is the source code for the [AMF Group website](https://www.amfgroup.pl), a renovation and interior finishing company based in Wrocław, Poland. The site is built as a modern React Single Page Application (SPA), hosted on AWS S3, and served via CloudFront.

## Quick Start

### Prerequisites
- Node.js 20.19+ (or 22.12+)
- npm
- Make

### Installation
```bash
make install
```

### Development
```bash
make dev
```
The site will be available at [http://localhost:3000](http://localhost:3000).

## Documentation

Comprehensive documentation has been split into specialized files for better maintainability:

- 🏗️ **[Architecture](docs/ARCHITECTURE.md)**: High-level overview, project structure, component architecture, and routing.
- 🎨 **[Design System](docs/DESIGN_SYSTEM.md)**: CSS variables, color palette, spacing scale, and typography.
- 🛠️ **[Development Guide](docs/DEVELOPMENT.md)**: Detailed setup, build commands, dev container usage, and deployment info.
- 📸 **[Gallery Management](docs/GALLERY_MANAGEMENT.md)**: Guide for managing project galleries and image optimization.

## Features

- **React 19 Architecture**: Modern functional components with hooks.
- **Tailwind CSS v4**: Utility-first styling with custom design tokens.
- **Dynamic SEO**: Optimized meta tags via custom hooks.
- **Photo Gallery**: JSON-based gallery with GLightbox integration.
- **Mobile Optimized**: Fully responsive design with mobile-specific navigation.

## License

Copyright © AMF GROUP. All rights reserved.

