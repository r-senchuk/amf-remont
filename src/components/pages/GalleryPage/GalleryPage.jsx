import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../../shared/Gallery/Gallery';

function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load gallery data
  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch('/data/gallery.json');
        if (!response.ok) {
          throw new Error(`Failed to load gallery.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Sort photos by order
        const sortedPhotos = data.photos.slice().sort((a, b) => a.order - b.order);
        setPhotos(sortedPhotos);
        setLoading(false);
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError(`Wystąpił błąd podczas ładowania galerii: ${err.message}`);
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600 relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-green-900/20 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        {/* Top Navigation / Back Button */}
        <div className="mb-8 flex items-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
              <i className="material-icons text-xl">arrow_back</i>
            </span>
            <span className="text-lg font-medium">Wróć</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          
          {error && (
            <div className="text-center py-20 text-red-200 bg-red-900/20 rounded-xl border border-red-500/30">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && photos.length === 0 && (
            <p className="text-center text-white/70 py-20">Brak zdjęć w galerii.</p>
          )}

          {!loading && !error && photos.length > 0 && (
            <Gallery 
              photos={photos} 
              variant="full" 
              showLink={false} 
            />
          )}
        </div>

        {/* Footer placeholder/spacer if needed, though main App footer should be visible */}
      </div>
    </div>
  );
}

export default GalleryPage;
