import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Gallery Component
 * Displays a grid of images with GLightbox support and WebP optimization.
 * 
 * @param {Object} props
 * @param {Array} props.photos - Array of photo objects {id, thumbFilename, thumbWebpFilename, filename, webpFilename, title, alt, order}
 * @param {string} props.variant - 'small' (preview) or 'full' (all images)
 * @param {boolean} props.showLink - Whether to show "See full gallery" link
 * @param {string} props.className - Additional classes
 */
const toGalleryPath = (filename) => `/gallery/${encodeURIComponent(filename)}`;
const toWebpPath = (filename) => {
  if (!filename) return '';
  return filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
};

function Gallery({ photos, variant = 'full', showLink = false, className = '' }) {
  const [displayPhotos, setDisplayPhotos] = useState([]);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const lightboxRef = useRef(null);
  
  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = async () => {
      if (!window.createImageBitmap) {
        setSupportsWebP(false);
        return;
      }

      try {
        const webPData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        const blob = await fetch(webPData).then(r => r.blob());
        const result = await createImageBitmap(blob);
        setSupportsWebP(true);
      } catch (error) {
        setSupportsWebP(false);
      }
    };

    checkWebPSupport();
  }, []);

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

  // Preload WebP images for better perceived performance
  useEffect(() => {
    if (!supportsWebP || displayPhotos.length === 0) return;

    // Preload first few WebP images
    const preloadImages = displayPhotos.slice(0, 4);
    preloadImages.forEach(photo => {
      if (photo.webpFilename) {
        const img = new Image();
        img.src = toGalleryPath(photo.webpFilename);
      }
      if (photo.thumbWebpFilename) {
        const thumbImg = new Image();
        thumbImg.src = toGalleryPath(photo.thumbWebpFilename);
      }
    });
  }, [displayPhotos, supportsWebP]);

  // Initialize GLightbox lazily
  useEffect(() => {
    if (displayPhotos.length === 0) return;

    let isCancelled = false;

    async function setupLightbox() {
      const [{ default: GLightbox }] = await Promise.all([
        import('glightbox'),
        import('glightbox/dist/css/glightbox.css'),
        // Must load after glightbox.css so our overrides win in the cascade
        import('../../../css/glightbox-overrides.css')
      ]);

      const lightboxItems = displayPhotos.map((photo) => ({
        href: supportsWebP && photo.webpFilename
          ? toGalleryPath(photo.webpFilename)
          : toGalleryPath(photo.filename),
        type: 'image',
        // Show caption in the bottom-left corner (styled via glightbox-overrides.css)
        title: photo.title || photo.alt || ''
      }));

      if (isCancelled) return;

      if (lightboxRef.current) {
        try {
          lightboxRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
      }

      lightboxRef.current = GLightbox({
        elements: lightboxItems,
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        openEffect: 'fade',
        closeEffect: 'fade'
      });
    }

    setupLightbox();

    return () => {
      isCancelled = true;
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
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
        {displayPhotos.map((photo, index) => {
          const thumbPath = toGalleryPath(photo.thumbFilename);
          const thumbWebpPath = supportsWebP && photo.thumbWebpFilename
            ? toGalleryPath(photo.thumbWebpFilename)
            : toWebpPath(photo.thumbFilename);
          const fullPath = toGalleryPath(photo.filename);
          const fullWebpPath = supportsWebP && photo.webpFilename
            ? toGalleryPath(photo.webpFilename)
            : toWebpPath(photo.filename);
          
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
                <picture>
                  {/* WebP source (preferred) */}
                  <source srcSet={thumbWebpPath} type="image/webp" />
                  
                  {/* Fallback to original format */}
                  <source 
                    srcSet={thumbPath} 
                    type={photo.thumbFilename?.match(/\.([^.]+)$/)?.[1] || 'image/jpeg'}
                  />
                  
                  {/* Final fallback img tag */}
                  <img
                    src={photo.thumbnail || photo.filename}
                    alt={photo.alt || `Realizacja ${photo.title || index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.opacity = '0.3';
                      e.target.alt = `Błąd ładowania`;
                    }}
                  />
                </picture>
                
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
