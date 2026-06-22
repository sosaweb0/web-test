const finalCtaSection = document.querySelector(".final-cta");

if (finalCtaSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    finalCtaSection.classList.add("is-visible");
  } else {
    finalCtaSection.setAttribute("data-animate", "");

    const finalCtaObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          finalCtaSection.classList.add("is-visible");
          observer.unobserve(finalCtaSection);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    finalCtaObserver.observe(finalCtaSection);
  }
}
