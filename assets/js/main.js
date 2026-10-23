import { initDemo } from "./demo.js";
import { initTabs } from "./tabs.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  document.querySelectorAll("[data-demo]").forEach(initDemo);
}

document.querySelectorAll("[data-tabs]").forEach(initTabs);

// Copy-to-clipboard for install commands.
document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  const src = btn.parentElement.querySelector("[data-copy-src]");
  try {
    await navigator.clipboard.writeText(src.textContent.trim());
  } catch {
    return;
  }
  btn.classList.add("is-copied");
  btn.setAttribute("aria-label", "Copied");
  clearTimeout(btn._t);
  btn._t = setTimeout(() => {
    btn.classList.remove("is-copied");
    btn.setAttribute("aria-label", "Copy install command");
  }, 1600);
});
