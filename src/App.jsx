/**
 * Root Application Component
 * Provides the main layout with Header and Footer
 */
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/shared/Header/Header.jsx';
import Footer from './components/shared/Footer/Footer.jsx';
import useSEO from './hooks/useSEO.js';
import useScrollRestoration from './hooks/useScrollRestoration.js';

function App() {
  useSEO();
  useScrollRestoration();
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '/contact';

  return (
    <>
      <Header />
      <main id="app-main" className={`flex-1 ${isHome ? '' : 'pt-16 lg:pt-12'}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
