import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Gallery Component
 * Displays a grid of images with GLightbox support.
 * 
 * @param {Object} props
 * @param {Array} props.photos - Array of photo objects {id, thumbFilename, filename, title, alt, order}
 * @param {string} props.variant - 'small' (preview) or 'full' (all images)
 * @param {boolean} props.showLink - Whether to show "See full gallery" link
 * @param {string} props.className - Additional classes
 */
function Gallery({ photos, variant = 'full', showLink = false, className = '' }) {
  const [displayPhotos, setDisplayPhotos] = useState([]);
  const lightboxRef = useRef(null);
  
  // Handle responsive image limit for 'small' variant
  useEffect(() => {
    if (variant === 'full') {
      setDisplayPhotos(photos);
      return;
    }

    const updateLimit = () => {
      let limit = 4; // Default mobile
      if (window.innerWidth >= 1536) limit = 12; // 2xl (4k-ish)
      else if (window.innerWidth >= 1024) limit = 8; // lg (desktop) - 2 rows, 4 columns
      else if (window.innerWidth >= 640) limit = 6; // sm (tablet)
      
      setDisplayPhotos(photos.slice(0, limit));
    };

    updateLimit();
    window.addEventListener('resize', updateLimit);
    return () => window.removeEventListener('resize', updateLimit);
  }, [photos, variant]);

  // Initialize GLightbox
  useEffect(() => {
    if (displayPhotos.length === 0) return;

    const initLightbox = () => {
      if (typeof window.GLightbox !== 'undefined') {
        // Destroy previous instance if exists
        if (lightboxRef.current) {
          try {
            lightboxRef.current.destroy();
          } catch (e) {
            // Ignore errors during destroy
          }
        }

        // Build lightbox items for ALL photos (so even in small view, lightbox shows everything if desired? 
        // User said "link to see more referencing to the full view", so maybe lightbox in small view should only show preview images? 
        // Usually lightbox should show what's clicked + siblings. Let's stick to displayed photos for now to be safe, 
        // or all photos if we want "click one, scroll through all".
        // Let's use displayPhotos to match the DOM elements.
        
        const lightboxItems = displayPhotos.map(photo => ({
          href: '/gallery/' + photo.filename,
          type: 'image',
          title: photo.title || photo.alt || ''
        }));

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

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initLightbox, 100);

    return () => {
      clearTimeout(timer);
      if (lightboxRef.current) {
        try {
          lightboxRef.current.destroy();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [displayPhotos]);

  const handlePhotoClick = useCallback((index) => {
    if (lightboxRef.current) {
      lightboxRef.current.openAt(index);
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-5 md:gap-6">
        {displayPhotos.map((photo, index) => {
          const thumbPath = `/gallery/${photo.thumbFilename}`;
          const fullPath = `/gallery/${photo.filename}`;
          
          return (
            <figure
              key={photo.id || index}
              className="group relative overflow-hidden rounded-xl bg-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10"
            >
              <a
                href={fullPath}
                className="block cursor-pointer aspect-[4/3] relative overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  handlePhotoClick(index);
                }}
              >
                <img
                  src={thumbPath}
                  alt={photo.alt || photo.title || ''}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.opacity = '0.3';
                    e.target.alt = `Błąd ładowania`;
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 px-4">
                  <span className="inline-flex items-center gap-2 text-gray-300/60 text-sm font-semibold whitespace-nowrap" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    <i className="material-icons text-lg text-gray-300/60 opacity-60" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>zoom_in</i>
                    <span>Powiększ</span>
                  </span>
                </div>
              </a>
            </figure>
          );
        })}
      </div>

      {showLink && (
        <div className="mt-8 text-center">
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-2 text-white/80 text-sm font-medium hover:text-white/100 hover:underline transition-all duration-200"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
          >
            <span>Zobacz pełną galerię</span>
            <i className="material-icons text-base opacity-80">arrow_forward</i>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Gallery;

