/**
 * useSEO Hook
 * Updates document meta tags based on current route
 * 
 * @typedef {Object} RouteMeta
 * @property {string} title - Page title
 * @property {string} description - Meta description
 * @property {string} ogTitle - Open Graph title
 * @property {string} ogDescription - Open Graph description
 * @property {string} ogImage - Open Graph image URL
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routesMeta } from '../routes';

/**
 * Hook that updates SEO meta tags based on current route
 * 
 * @returns {void}
 */
export function useSEO() {
  const location = useLocation();

  useEffect(() => {
    /** @type {RouteMeta} */
    const meta = routesMeta[location.pathname] || routesMeta['/'];
    
    // Update title
    document.title = meta.title;

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', meta.ogDescription);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', meta.ogImage);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.origin + location.pathname);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + location.pathname);

  }, [location.pathname]);
}

export default useSEO;

