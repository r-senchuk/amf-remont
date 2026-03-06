/**
 * useScrollRestoration Hook
 * Handles scroll position restoration on navigation
 * 
 * @typedef {Object} ScrollRestorationHook
 * @property {() => void} restoreScroll - Restores scroll position for current route
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Map to store scroll positions for each route
 * @type {Map<string, number>}
 */
const scrollPositions = new Map();

/**
 * Hook that saves and restores scroll positions when navigating between routes
 * 
 * @returns {void}
 */
export function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    return () => {
      // Save scroll position for the route we are leaving.
      scrollPositions.set(location.pathname, window.scrollY);
    };
  }, [location.pathname]);

  useEffect(() => {
    const savedPosition = scrollPositions.get(location.pathname);

    if (savedPosition !== undefined) {
      window.scrollTo(0, savedPosition);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
}

export default useScrollRestoration;
