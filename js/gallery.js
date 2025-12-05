/**
 * AMF Group Gallery Module
 * Dynamically generates photo gallery from JSON configuration
 */

(function() {
    'use strict';

    var Gallery = {
        config: null,
        container: null,

        /**
         * Initialize the gallery
         */
        init: function() {
            this.container = document.getElementById('cid58');
            if (!this.container) {
                console.warn('Gallery container not found');
                return;
            }

            this.loadGallery();
        },

        /**
         * Load gallery configuration from JSON
         */
        loadGallery: function() {
            var self = this;
            fetch('data/gallery.json')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Failed to load gallery.json');
                    }
                    return response.json();
                })
                .then(function(data) {
                    self.config = data;
                    self.renderGallery();
                })
                .catch(function(error) {
                    console.error('Error loading gallery:', error);
                    // Fallback: show error message or keep existing gallery
                });
        },

        /**
         * Render gallery HTML
         */
        renderGallery: function() {
            if (!this.config || !this.config.photos) {
                return;
            }

            // Sort photos by order
            var photos = this.config.photos.slice().sort(function(a, b) {
                return a.order - b.order;
            });

            // Clear existing content
            this.container.innerHTML = '';

            // Generate gallery items
            var self = this;
            photos.forEach(function(photo) {
                var figure = self.createGalleryItem(photo);
                self.container.appendChild(figure);
            });

            // Upgrade AMP components if AMP runtime is available
            if (window.AMP && window.AMP.upgradeElement) {
                var ampImages = this.container.querySelectorAll('amp-img');
                ampImages.forEach(function(img) {
                    window.AMP.upgradeElement(img);
                });
            }
        },

        /**
         * Create a single gallery item
         */
        createGalleryItem: function(photo) {
            var figure = document.createElement('figure');
            figure.className = 'tag_by_width';

            // Build image paths
            var fullImagePath = '/i/' + photo.folder + '/' + photo.filename;
            var thumbImagePath = 'i/' + photo.folder + '/' + photo.thumbFilename;

            // Create AMP image element
            var ampImg = document.createElement('amp-img');
            ampImg.setAttribute('lightbox', '');
            ampImg.setAttribute('src', fullImagePath);
            ampImg.setAttribute('style', 'background-image: url(\'' + thumbImagePath + '\')');
            ampImg.setAttribute('width', photo.width.toString());
            ampImg.setAttribute('height', photo.height.toString());
            ampImg.setAttribute('alt', photo.alt);
            ampImg.setAttribute('loading', 'lazy');

            figure.appendChild(ampImg);
            return figure;
        },

        /**
         * Add a new photo to the gallery
         * Call this method after updating gallery.json
         */
        refresh: function() {
            this.loadGallery();
        }
    };

    /**
     * Initialize gallery when ready
     */
    function initGallery() {
        // Wait for DOM and AMP to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Wait a bit for AMP to initialize
                setTimeout(function() {
                    Gallery.init();
                }, 100);
            });
        } else {
            // DOM already loaded, wait for AMP
            setTimeout(function() {
                Gallery.init();
            }, 100);
        }
    }

    // Initialize
    initGallery();

    // Expose Gallery to global scope for manual refresh if needed
    window.AMFGallery = Gallery;

})();

