/**
 * Gallery Page Component (React)
 * Project showcase and portfolio
 * Dynamically generates photo gallery from JSON configuration
 * Uses GLightbox for lightbox functionality
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import './GalleryPage.css';

function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lightboxRef = useRef(null);

  // Load gallery data
  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch('/data/gallery.json');
        if (!response.ok) {
          throw new Error('Failed to load gallery.json');
        }
        const data = await response.json();
        // Sort photos by order
        const sortedPhotos = data.photos.slice().sort((a, b) => a.order - b.order);
        setPhotos(sortedPhotos);
        setLoading(false);
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError('Wystąpił błąd podczas ładowania galerii.');
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Initialize GLightbox after photos are loaded
  useEffect(() => {
    if (photos.length === 0 || loading) return;

    const initLightbox = () => {
      if (typeof window.GLightbox !== 'undefined') {
        // Build lightbox items array
        const lightboxItems = photos.map(photo => ({
          href: '/gallery/' + photo.filename,
          type: 'image',
          title: photo.title || photo.alt || ''
        }));

        // Initialize GLightbox
        lightboxRef.current = window.GLightbox({
          elements: lightboxItems,
          touchNavigation: true,
          loop: true,
          autoplayVideos: false,
          openEffect: 'fade',
          closeEffect: 'fade'
        });
      }
    };

    // Wait a bit for GLightbox script to be available
    if (typeof window.GLightbox !== 'undefined') {
      initLightbox();
    } else {
      const timer = setTimeout(initLightbox, 100);
      return () => clearTimeout(timer);
    }

    return () => {
      if (lightboxRef.current) {
        try {
          lightboxRef.current.destroy();
        } catch (e) {
          // Ignore errors
        }
      }
    };
  }, [photos, loading]);

  const handlePhotoClick = useCallback((index) => {
    if (lightboxRef.current) {
      lightboxRef.current.openAt(index);
    }
  }, []);

  return (
    <div className="galleryPage">
      {/* Page Header */}
      <header className="pageHeader">
        <h1 className="pageTitle">Galeria</h1>
      </header>

      {/* Gallery Section */}
      <section className="gallerySection">
        <div className="galleryContainer">
          {loading && (
            <p className="loadingMessage">Ładowanie galerii...</p>
          )}
          {error && (
            <p className="errorMessage">{error}</p>
          )}
          {!loading && !error && photos.map((photo, index) => (
            <figure className="galleryItem" key={photo.id || index}>
              <a
                href={'/gallery/' + photo.filename}
                className="galleryLink"
                onClick={(e) => {
                  e.preventDefault();
                  handlePhotoClick(index);
                }}
              >
                <img
                  src={'/gallery/' + photo.thumbFilename}
                  alt={photo.alt || photo.title || ''}
                  loading="lazy"
                />
                <span className="zoomIcon">🔍</span>
              </a>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GalleryPage;

