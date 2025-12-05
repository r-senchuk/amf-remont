/**
 * Header Component (React)
 * Site header with logo, navigation, and phone numbers
 */
import { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuTriggerRef = useRef(null);

  useEffect(() => {
    // Setup mobile menu toggle - connect to Navigation sidenav
    const handleMenuClick = () => {
      const sidenav = document.querySelector('#slide-out');
      if (sidenav && window.M && window.M.Sidenav) {
        const sidenavInstance = window.M.Sidenav.getInstance(sidenav);
        if (sidenavInstance) {
          sidenavInstance.open();
        } else {
          const instance = window.M.Sidenav.init(sidenav, {
            edge: 'left',
            draggable: true
          });
          instance.open();
        }
      }
    };

    const trigger = menuTriggerRef.current;
    if (trigger) {
      trigger.addEventListener('click', handleMenuClick);
      return () => trigger.removeEventListener('click', handleMenuClick);
    }
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    
    // If not on home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link 
            to="/" 
            title="AMF GROUP – wykończenie wnętrz pod klucz na terenie Wrocławia i okolic | Główna"
          >
            <img 
              src="/assets/logo/logo.svg" 
              alt="AMF GROUP – wykończenie wnętrz pod klucz na terenie Wrocławia i okolic." 
            />
          </Link>
        </div>

        <div className={`${styles.phone} ${styles.phoneUk}`}>
          <div className={styles.phoneIcon}>
            <img src="/assets/icons/hummer.svg" alt="ремонт квартир" />
          </div>
          <a href="tel:+48796019986" className={styles.phoneLink}>+48 (796) 019 986</a>
        </div>
        
        <div className={`${styles.phone} ${styles.phoneDe}`}>
          <div className={styles.phoneIcon}>
            <img src="/assets/icons/painting.svg" alt="wykończenie wnętrz malowania" />
          </div>
          <a href="tel:+48795621905" className={styles.phoneLink}>+48 (795) 621 905</a>
        </div>

        <nav className={`${styles.nav} ${styles.navLeft}`}>
          <Link to="/about" className={styles.navLink}>O NAS</Link>
          <div className={styles.navSeparator}>
            <img src="/assets/images/h_nav.png" alt="" />
          </div>
          <Link to="/services" className={styles.navLink}>OFERTA</Link>
        </nav>
        
        <nav className={`${styles.nav} ${styles.navRight}`}>
          <Link to="/gallery" className={styles.navLink}>GALERIA</Link>
          <div className={styles.navSeparator}>
            <img src="/assets/images/h_nav.png" alt="" />
          </div>
          <a 
            href="/#contact" 
            className={styles.navLink}
            onClick={handleContactClick}
          >
            KONTAKT
          </a>
        </nav>

        <button 
          ref={menuTriggerRef}
          className={styles.menuTrigger} 
          aria-label="Menu"
        >
          <div className={styles.hamburger}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
