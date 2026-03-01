/**
 * Observes elements and runs a callback when each enters the viewport.
 * @param {Element[]} elements - DOM elements to observe
 * @param {(entry: IntersectionObserverEntry) => void} onEnter - Called when an element enters the viewport
 * @param {{ threshold?: number }} options - Optional. threshold (0–1) = fraction of element visible to trigger (default 0.2)
 * @returns {IntersectionObserver} The observer instance (e.g. to call unobserve later)
 */
export function observeViewport(elements, onEnter, options = {}) {
  const { threshold = 0.2 } = options;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onEnter(entry);
      });
    },
    { threshold }
  );
  elements.forEach((el) => observer.observe(el));
  return observer;
}
