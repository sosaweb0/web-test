const skinNeedsSection = document.querySelector(".skin-needs");

if (skinNeedsSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    skinNeedsSection.classList.add("is-visible");
  } else {
    skinNeedsSection.setAttribute("data-animate", "");

    const skinNeedsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          skinNeedsSection.classList.add("is-visible");
          observer.unobserve(skinNeedsSection);
        });
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    skinNeedsObserver.observe(skinNeedsSection);
  }
}
