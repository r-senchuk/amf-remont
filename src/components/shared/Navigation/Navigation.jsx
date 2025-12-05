/**
 * Navigation Component (React)
 * Mobile sidebar navigation using Materialize
 */
import { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const sidenavRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    // Initialize Materialize sidenav
    if (sidenavRef.current && window.M && window.M.Sidenav) {
      instanceRef.current = window.M.Sidenav.init(sidenavRef.current, {
        edge: 'left',
        draggable: true
      });
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, []);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (instanceRef.current) {
      instanceRef.current.close();
    }
    navigate(path);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (instanceRef.current) {
      instanceRef.current.close();
    }
    
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
    <ul id="slide-out" className="sidenav" ref={sidenavRef}>
      <li id="sidenav_head">
        <div id="sn_logo">
          <Link to="/" onClick={(e) => handleLinkClick(e, '/')}>
            <img src="/assets/logo/logo.svg" alt="AMF GROUP" />
          </Link>
        </div>
      </li>
      <li>
        <a 
          className="waves-effect waves-light" 
          href="/about"
          onClick={(e) => handleLinkClick(e, '/about')}
        >
          <i className="material-icons">person</i>O NAS
        </a>
      </li>
      <li>
        <a 
          className="waves-effect waves-light" 
          href="/services"
          onClick={(e) => handleLinkClick(e, '/services')}
        >
          <i className="material-icons">list</i>OFERTA
        </a>
      </li>
      <li>
        <a 
          className="waves-effect waves-light" 
          href="/gallery"
          onClick={(e) => handleLinkClick(e, '/gallery')}
        >
          <i className="material-icons">image</i>GALERIA
        </a>
      </li>
      <li>
        <a 
          className="waves-effect waves-light" 
          href="/#contact"
          onClick={handleContactClick}
        >
          <i className="material-icons">phone_in_talk</i>KONTAKT
        </a>
      </li>
      <li className="booking"></li>
      <li id="sn_phones">
        <p className="sn_title">
          <i className="material-icons">phone_in_talk</i>Zadzwoń do nas:
        </p>
        <a href="tel:+48796019986">
          <p>+48 (796)</p>
          <p>019-986</p>
        </a>
        <a href="tel:+48795621905">
          <p>+48 (795)</p>
          <p>621-905</p>
        </a>
      </li>
      <li id="sn_langs">
        <p className="sn_title">
          <i className="material-icons">language</i>Język:
        </p>
        <div><span>PL</span></div>
      </li>
    </ul>
  );
}

export default Navigation;
