# Development Guide

## Prerequisites

- Node.js 20.19+ (or 22.12+) and npm
- Make (for build commands)

## Setup

```bash
# Install dependencies
make install
```

## Development Commands

```bash
# Start development server (http://localhost:3000)
make dev

# Build for production
make build

# Preview production build (http://localhost:8080)
make preview

# Clean build artifacts
make clean
```

## Development Workflow

1. **Edit Components**: Modify files in `src/components//`
2. **Edit Styles**: Modify CSS in `src/css//`
3. **Hot Reload**: Changes are reflected immediately (HMR)
4. **Test**: Navigate between pages to test routing

## Dev Container

- VS Code Dev Container config in `.devcontainer/devcontainer.json`.
- Base image: `mcr.microsoft.com/devcontainers/javascript-node:22`.
- Post-create installs dependencies with `make install`.
- Forwarded ports: `3000` (Vite dev) and `8080` (Vite preview).

### Best practices inside the dev container

- Prefer `make install` for consistent installs.
- Use `make` targets (`dev`, `build`, `preview`) instead of raw npm commands.
- Keep terminals inside the container.

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **ES6 Modules**: Native support
- **History API**: Native support

## Deployment

Deployment is handled via CI (GitHub Actions). Build locally with `make build` to verify output before pushing changes.
