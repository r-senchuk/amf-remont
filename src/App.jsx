/**
 * Root Application Component
 * Provides the main layout with Header, Navigation, Footer
 */
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/shared/Header/Header.jsx';
import Footer from './components/shared/Footer/Footer.jsx';
import Navigation from './components/shared/Navigation/Navigation.jsx';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Navigation />
      <main id="app-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

