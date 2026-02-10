/**
 * Root Application Component
 * Provides the main layout with Header and Footer
 * 
 * @typedef {Object} AppProps
 * @property {Object} children - Child components (not used directly, but for type completeness)
 * 
 * @typedef {Object} AppState
 * @property {boolean} isLoading - Loading state (not currently used but available for future)
 */
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/shared/Header/Header.jsx';
import Footer from './components/shared/Footer/Footer.jsx';
import ErrorBoundary from './components/shared/ErrorBoundary/ErrorBoundary.jsx';
import useSEO from './hooks/useSEO.js';
import useScrollRestoration from './hooks/useScrollRestoration.js';

/**
 * Main Application Component
 * 
 * @param {AppProps} props - Component props
 * @returns {JSX.Element} The application layout with header, main content, and footer
 */
function App() {
  useSEO();
  useScrollRestoration();
  const location = useLocation();

  /**
   * Determine if current route is home or contact (which uses home layout)
   * @type {boolean}
   */
  const isHome = location.pathname === '/' || location.pathname === '/contact';

  return (
    <>
      <Header />
      <main id="app-main" className={`flex-1 ${isHome ? '' : 'pt-16 lg:pt-12'}`}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

export default App;
