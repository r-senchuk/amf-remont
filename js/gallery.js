/**
 * AMF Group Gallery Module
 * Dynamically generates photo gallery from JSON configuration
 * Uses GLightbox for lightbox functionality
 */

(function() {
    'use strict';

    var Gallery = {
        config: null,
        container: null,
        lightbox: null,

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
            var lightboxItems = [];
            
            photos.forEach(function(photo) {
                var figure = self.createGalleryItem(photo, lightboxItems.length);
                self.container.appendChild(figure);
                
                // Add to lightbox items array
                lightboxItems.push({
                    href: '/i/' + photo.folder + '/' + photo.filename,
                    type: 'image',
                    title: photo.title || photo.alt
                });
            });

            // Initialize GLightbox
            this.initLightbox(lightboxItems);
        },

        /**
         * Initialize GLightbox
         */
        initLightbox: function(items) {
            // Destroy existing lightbox if any
            if (this.lightbox) {
                try {
                    this.lightbox.destroy();
                } catch (e) {
                    // Ignore errors
                }
            }

            // Wait for GLightbox to be available
            if (typeof GLightbox !== 'undefined') {
                this.lightbox = GLightbox({
                    selector: '.gallery-item',
                    touchNavigation: true,
                    loop: true,
                    autoplayVideos: false,
                    openEffect: 'fade',
                    closeEffect: 'fade'
                });
            } else {
                // Wait a bit for script to load
                var self = this;
                setTimeout(function() {
                    if (typeof GLightbox !== 'undefined') {
                        self.lightbox = GLightbox({
                            selector: '.gallery-item',
                            touchNavigation: true,
                            loop: true,
                            autoplayVideos: false,
                            openEffect: 'fade',
                            closeEffect: 'fade'
                        });
                    } else {
                        console.error('GLightbox library not loaded');
                    }
                }, 100);
            }
        },

        /**
         * Create a single gallery item
         */
        createGalleryItem: function(photo, index) {
            var figure = document.createElement('figure');
            figure.className = 'tag_by_width';

            // Build image paths (both absolute for consistency)
            var fullImagePath = '/i/' + photo.folder + '/' + photo.filename;
            var thumbImagePath = '/i/' + photo.folder + '/' + photo.thumbFilename;

            // Create link wrapper for lightbox
            var link = document.createElement('a');
            link.href = fullImagePath;
            link.className = 'gallery-item';
            
            // Escape title for safe HTML attribute insertion
            var title = (photo.title || photo.alt || '').toString();
            title = title.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            link.setAttribute('data-glightbox', 'title: ' + title);
            link.setAttribute('data-glightbox-index', index);

            // Create image element (regular img, not amp-img)
            var img = document.createElement('img');
            img.src = thumbImagePath;
            img.alt = photo.alt;
            img.loading = 'lazy';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';
            
            // Set link styles
            link.style.display = 'block';
            link.style.width = '100%';
            link.style.height = '100%';
            link.style.cursor = 'pointer';
            link.style.overflow = 'hidden';

            // Add hover effect
            link.addEventListener('mouseenter', function() {
                this.style.opacity = '0.9';
            });
            link.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });

            // Add zoom icon overlay (optional visual indicator)
            var zoomIcon = document.createElement('span');
            zoomIcon.innerHTML = '🔍';
            zoomIcon.style.position = 'absolute';
            zoomIcon.style.top = '50%';
            zoomIcon.style.left = '50%';
            zoomIcon.style.transform = 'translate(-50%, -50%)';
            zoomIcon.style.opacity = '0';
            zoomIcon.style.transition = 'opacity 0.3s';
            zoomIcon.style.fontSize = '2em';
            zoomIcon.style.pointerEvents = 'none';
            link.style.position = 'relative';
            
            link.addEventListener('mouseenter', function() {
                zoomIcon.style.opacity = '0.7';
            });
            link.addEventListener('mouseleave', function() {
                zoomIcon.style.opacity = '0';
            });

            // Append image and zoom icon to link
            link.appendChild(img);
            link.appendChild(zoomIcon);
            figure.appendChild(link);
            
            return figure;
        },

        /**
         * Refresh gallery (reload from JSON)
         */
        refresh: function() {
            this.loadGallery();
        }
    };

    /**
     * Initialize gallery when ready
     */
    function initGallery() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Wait a bit for GLightbox script to load
                setTimeout(function() {
                    Gallery.init();
                }, 200);
            });
        } else {
            // DOM already loaded
            setTimeout(function() {
                Gallery.init();
            }, 200);
        }
    }

    // Initialize
    initGallery();

    // Expose Gallery to global scope for manual refresh if needed
    window.AMFGallery = Gallery;

})();
