// Trigger the scatter → lattice settle.
// Respect reduced-motion: set joined state immediately; CSS handles the rest.
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;

  let joined = false;
  const join = () => {
    if (joined) return;
    joined = true;
    body.classList.add("is-joined");
  };

  if (prefersReduced) {
    join();
    return;
  }

  // Wait for fonts so the wordmark doesn't shift during the reveal,
  // but never let a slow / blocked font request hide the page.
  const whenFontsReady = document.fonts && document.fonts.ready
    ? document.fonts.ready
    : Promise.resolve();

  whenFontsReady.then(() => {
    requestAnimationFrame(() => {
      setTimeout(join, 80);
    });
  });

  // Fallback: reveal after 1.5s regardless of font state.
  setTimeout(join, 1500);
})();
