/**
 * useGalleryData Hook
 * Provides cached access to gallery photos stored in /data/gallery.json
 */
import { useEffect, useState } from 'react';

let cachedPhotos = null;
let inflightRequest = null;

async function loadGalleryPhotos() {
  const response = await fetch('/data/gallery.json');
  if (!response.ok) {
    throw new Error(`Failed to load gallery.json: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.photos.slice().sort((a, b) => a.order - b.order);
}

export default function useGalleryData() {
  const [state, setState] = useState({
    photos: cachedPhotos || [],
    loading: !cachedPhotos,
    error: null
  });

  useEffect(() => {
    let isActive = true;

    if (cachedPhotos) {
      setState({ photos: cachedPhotos, loading: false, error: null });
      return () => {
        isActive = false;
      };
    }

    if (!inflightRequest) {
      inflightRequest = loadGalleryPhotos()
        .then((photos) => {
          cachedPhotos = photos;
          return photos;
        })
        .catch((error) => {
          inflightRequest = null;
          throw error;
        });
    }

    inflightRequest
      .then((photos) => {
        if (!isActive) return;
        setState({ photos, loading: false, error: null });
      })
      .catch((error) => {
        if (!isActive) return;
        console.error('Error loading gallery data:', error);
        setState({ photos: [], loading: false, error });
      });

    return () => {
      isActive = false;
    };
  }, []);

  return state;
}
