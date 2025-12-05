/**
 * AMF Group Utility Functions
 * Modern JavaScript utilities to replace jQuery patterns
 */

(function() {
    'use strict';

    /**
     * DOM Ready handler
     * @param {Function} callback - Function to execute when DOM is ready
     */
    function $ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    /**
     * Query selector (single element)
     * @param {string|Element} selector - CSS selector or element
     * @param {Element} context - Optional context element
     * @returns {Element|null}
     */
    function $q(selector, context) {
        if (typeof selector === 'string') {
            return (context || document).querySelector(selector);
        }
        return selector || null;
    }

    /**
     * Query selector all (NodeList)
     * @param {string} selector - CSS selector
     * @param {Element} context - Optional context element
     * @returns {NodeList}
     */
    function $qa(selector, context) {
        return (context || document).querySelectorAll(selector);
    }

    /**
     * Get element offset (position relative to document)
     * @param {Element} element - Element to get offset for
     * @returns {Object} Object with top and left properties
     */
    function getOffset(element) {
        if (!element) return { top: 0, left: 0 };
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }

    /**
     * Smooth scroll to element
     * @param {Element|number} target - Element to scroll to or scroll position
     * @param {number} offset - Optional offset from top
     * @param {number} duration - Animation duration in ms
     */
    function smoothScrollTo(target, offset, duration) {
        offset = offset || 0;
        duration = duration || 500;

        let targetPosition;
        if (typeof target === 'number') {
            targetPosition = target;
        } else {
            const elementOffset = getOffset(target);
            targetPosition = elementOffset.top + offset;
        }

        const startPosition = window.scrollY || window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing function (easeInOutCubic)
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /**
     * Event delegation helper
     * @param {Element} element - Element to attach listener to
     * @param {string} event - Event type
     * @param {string} selector - CSS selector for target elements
     * @param {Function} handler - Event handler function
     */
    function on(element, event, selector, handler) {
        if (typeof selector === 'function') {
            // No selector provided, direct event handler
            handler = selector;
            element.addEventListener(event, handler);
            return function() {
                element.removeEventListener(event, handler);
            };
        }

        // Event delegation
        element.addEventListener(event, function(e) {
            const target = e.target.closest(selector);
            if (target && element.contains(target)) {
                handler.call(target, e);
            }
        });
    }

    /**
     * Check if element exists and has content
     * @param {Element} element - Element to check
     * @returns {boolean}
     */
    function exists(element) {
        return element !== null && element !== undefined;
    }

    /**
     * Get closest parent matching selector
     * @param {Element} element - Starting element
     * @param {string} selector - CSS selector
     * @returns {Element|null}
     */
    function closest(element, selector) {
        if (!element) return null;
        if (element.closest) {
            return element.closest(selector);
        }
        // Fallback for older browsers
        let current = element;
        while (current && current.nodeType === 1) {
            if (current.matches && current.matches(selector)) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    }

    // Export utilities to global scope
    window.AMFUtils = {
        ready: $ready,
        $q: $q,
        $qa: $qa,
        getOffset: getOffset,
        smoothScrollTo: smoothScrollTo,
        on: on,
        exists: exists,
        closest: closest
    };

})();

