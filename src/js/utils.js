/**
 * Shared Utility Functions
 * Modern JavaScript utilities for use across components
 */

/**
 * Get element offset (position relative to document)
 * @param {Element} element - Element to get offset for
 * @returns {Object} Object with top and left properties
 */
export function getOffset(element) {
  if (!element) return { top: 0, left: 0 };
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
}

/**
 * Smooth scroll to element or position
 * @param {Element|number} target - Element to scroll to or scroll position
 * @param {number} offset - Optional offset from top
 * @param {number} duration - Animation duration in ms
 */
export function smoothScrollTo(target, offset = 0, duration = 500) {
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
 * Check if element exists and has content
 * @param {Element} element - Element to check
 * @returns {boolean}
 */
export function exists(element) {
  return element !== null && element !== undefined;
}

/**
 * Get closest parent matching selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export function closest(element, selector) {
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

