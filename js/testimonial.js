const testimonialSection = document.querySelector(".testimonial");

if (testimonialSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    testimonialSection.classList.add("is-visible");
  } else {
    testimonialSection.setAttribute("data-animate", "");

    const testimonialObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          testimonialSection.classList.add("is-visible");
          observer.unobserve(testimonialSection);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    testimonialObserver.observe(testimonialSection);
  }
}
