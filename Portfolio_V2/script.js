// ────────────────────────────────────────────────────────────
//   Kirubel Esayas — Portfolio
//   Minimal interactions: mobile nav + reveal-on-scroll
// ────────────────────────────────────────────────────────────

(() => {
  "use strict";

  // ─── Mobile nav ─────────────────────────────────────────────
  const navToggle = document.getElementById("nav-toggle");
  const navLinks  = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    const closeNav = () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    };

    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close on link tap
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeNav);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeNav();
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeNav();
      }
    });
  }

  // ─── Reveal on scroll ───────────────────────────────────────
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  targets.forEach(el => io.observe(el));
})();
