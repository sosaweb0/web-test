const kitsSection = document.querySelector(".kits");

if (kitsSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    kitsSection.classList.add("is-visible");
  } else {
    kitsSection.setAttribute("data-animate", "");

    const kitsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          kitsSection.classList.add("is-visible");
          observer.unobserve(kitsSection);
        });
      },
      {
        threshold: window.matchMedia("(max-width: 760px)").matches ? 0.08 : 0.22,
        rootMargin: window.matchMedia("(max-width: 760px)").matches ? "0px 0px -2% 0px" : "0px 0px -10% 0px",
      }
    );

    kitsObserver.observe(kitsSection);
  }
}
