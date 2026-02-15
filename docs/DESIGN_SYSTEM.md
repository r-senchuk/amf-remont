# Design System

All design tokens are defined in `src/css/design-system.css`.

## CSS Variables

### Color Palette

- **Primary**: `--color-primary` (#1a49a7), `--color-primary-dark` (#19326b)
- **Accent**: `--color-accent-orange` (#ff942a), `--color-accent-purple` (#a70da9)
- **Text**: `--color-text-primary` (#37474f), `--color-text-secondary` (#546e7a)
- **Background**: `--color-bg-light` (#eceff1), `--color-bg-dark` (#486e71)

### Spacing Scale (8px base)

- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px
- `--spacing-4xl`: 96px

### Typography

- Font families: `--font-family-primary`, `--font-family-secondary`
- Font sizes: `--font-size-xs` through `--font-size-3xl`
- Line heights: `--line-height-tight`, `--line-height-normal`, `--line-height-body`

## Tailwind Integration

The project uses Tailwind CSS v4. Utility classes should be used for layout and spacing, referencing the design tokens where applicable.
