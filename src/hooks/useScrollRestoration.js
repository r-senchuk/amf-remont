/**
 * useScrollRestoration Hook
 * Handles scroll position restoration on navigation
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const scrollPositions = new Map();

export function useScrollRestoration() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Save scroll position before navigation
    return () => {
      scrollPositions.set(prevPathname.current, window.scrollY);
    };
  }, []);

  useEffect(() => {
    // Restore scroll position or scroll to top
    const savedPosition = scrollPositions.get(location.pathname);
    
    if (savedPosition !== undefined) {
      // Restore saved position for back/forward navigation
      window.scrollTo(0, savedPosition);
    } else {
      // Scroll to top for new navigation
      window.scrollTo(0, 0);
    }

    prevPathname.current = location.pathname;
  }, [location.pathname]);
}

export default useScrollRestoration;

