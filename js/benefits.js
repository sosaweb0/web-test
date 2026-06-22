const benefitsSection = document.querySelector(".benefits-section");

if (benefitsSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    benefitsSection.classList.add("is-visible");
  } else {
    benefitsSection.setAttribute("data-animate", "");

    const benefitsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          benefitsSection.classList.add("is-visible");
          observer.unobserve(benefitsSection);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    benefitsObserver.observe(benefitsSection);
  }
}
