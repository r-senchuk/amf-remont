/**
 * Root Application Component
 * Provides the main layout with Header, Navigation, Footer
 */
import { Outlet } from 'react-router-dom';
import Header from './components/shared/Header/Header.jsx';
import Footer from './components/shared/Footer/Footer.jsx';
import Navigation from './components/shared/Navigation/Navigation.jsx';
import useSEO from './hooks/useSEO.js';
import useScrollRestoration from './hooks/useScrollRestoration.js';

function App() {
  useSEO();
  useScrollRestoration();

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
