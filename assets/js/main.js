// Trigger the scatter → lattice settle.
// Respect reduced-motion: set joined state immediately; CSS handles the rest.
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;

  const join = () => body.classList.add("is-joined");

  if (prefersReduced) {
    join();
    return;
  }

  // Wait for fonts so the wordmark doesn't shift during the reveal.
  const whenFontsReady = document.fonts && document.fonts.ready
    ? document.fonts.ready
    : Promise.resolve();

  whenFontsReady.then(() => {
    // One frame after fonts resolve, then a short hold before settling.
    requestAnimationFrame(() => {
      setTimeout(join, 80);
    });
  });
})();
