/**
 * Design System Loader
 * Centralized design system CSS variables for Web Components
 */
let designSystemCache = null;
let loadingPromise = null; // Prevent multiple simultaneous loads

/**
 * Load design system CSS variables
 * @returns {Promise<string>} CSS string with design system variables
 */
export async function loadDesignSystem() {
  // Return cached version immediately
  if (designSystemCache) {
    return designSystemCache;
  }

  // If already loading, wait for that promise
  if (loadingPromise) {
    return loadingPromise;
  }

  // Start loading
  loadingPromise = (async () => {
    try {
      // Try to load from CSS file
      const response = await fetch('/css/design-system.css');
      if (response.ok) {
        const css = await response.text();
        // Extract CSS variables
        const variables = extractCSSVariables(css);
        designSystemCache = formatDesignSystemCSS(variables);
        loadingPromise = null; // Clear loading promise
        return designSystemCache;
      }
    } catch (error) {
      // Only warn in development
      if (import.meta.env?.DEV) {
        console.warn('Could not load design-system.css, using fallback', error);
      }
    }

    // Fallback: return default design system
    designSystemCache = getDefaultDesignSystem();
    loadingPromise = null; // Clear loading promise
    return designSystemCache;
  })();

  return loadingPromise;
}

/**
 * Extract CSS variables from CSS text
 * @param {string} css - CSS text
 * @returns {Object} Object with variable names and values
 */
function extractCSSVariables(css) {
  const variables = {};
  const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
  
  if (rootMatch) {
    const rootContent = rootMatch[1];
    const varMatches = rootContent.matchAll(/--([^:]+):\s*([^;]+);/g);
    
    for (const match of varMatches) {
      const name = match[1].trim();
      const value = match[2].trim();
      variables[name] = value;
    }
  }
  
  return variables;
}

/**
 * Format design system variables as CSS for Shadow DOM
 * @param {Object} variables - CSS variables object
 * @returns {string} Formatted CSS string
 */
function formatDesignSystemCSS(variables) {
  let css = ':host {\n';
  for (const [name, value] of Object.entries(variables)) {
    css += `  --${name}: ${value};\n`;
  }
  css += '}\n';
  return css;
}

/**
 * Get default design system (fallback)
 * @returns {string} Default design system CSS
 */
function getDefaultDesignSystem() {
  return `
    :host {
      --color-primary: #1a49a7;
      --color-primary-dark: #19326b;
      --color-primary-light: #95b7fb;
      --color-accent-orange: #ff942a;
      --color-accent-orange-light: #f89f47;
      --color-accent-purple: #a70da9;
      --color-accent-green: #4caf50;
      --color-text-primary: #37474f;
      --color-text-secondary: #546e7a;
      --color-bg-light: #eceff1;
      --color-bg-lighter: #f4f7f9;
      --color-bg-dark: #486e71;
      --color-bg-white: #ffffff;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;
      --spacing-3xl: 64px;
      --spacing-4xl: 96px;
      --section-padding-mobile: 48px;
      --section-padding-tablet: 64px;
      --section-padding-desktop: 96px;
      --content-width-max: 1200px;
      --content-width-narrow: 800px;
      --font-size-xs: 12px;
      --font-size-sm: 14px;
      --font-size-base: 16px;
      --font-size-lg: 18px;
      --font-size-xl: 20px;
      --font-size-2xl: 24px;
      --font-size-3xl: 32px;
      --font-size-h1-mobile: 28px;
      --font-size-h1-desktop: 40px;
      --font-size-h2-mobile: 24px;
      --font-size-h2-desktop: 32px;
      --font-size-h3-mobile: 20px;
      --font-size-h3-desktop: 24px;
      --font-family-primary: "Geometria", "Open Sans", sans-serif;
      --font-family-secondary: "Open Sans", sans-serif;
      --line-height-tight: 1.2;
      --line-height-normal: 1.5;
      --line-height-body: 1.6;
      --line-height-relaxed: 1.75;
      --shadow-sm: 0 2px 4px rgba(38, 50, 56, 0.1);
      --shadow-md: 0 4px 8px rgba(38, 50, 56, 0.15);
      --shadow-lg: 0 8px 16px rgba(38, 50, 56, 0.2);
      --shadow-xl: 0 12px 24px rgba(38, 50, 56, 0.25);
      --transition-base: 0.3s ease-out;
      --transition-fast: 0.15s ease-out;
      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-lg: 12px;
      --radius-full: 9999px;
    }
  `;
}

/**
 * Clear design system cache (useful for development)
 */
export function clearDesignSystemCache() {
  designSystemCache = null;
}

