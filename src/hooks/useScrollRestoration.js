/**
 * useScrollRestoration Hook
 * Handles scroll position restoration on navigation
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollPositions = new Map();

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
