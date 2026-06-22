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
        threshold: window.matchMedia("(max-width: 760px)").matches ? 0.08 : 0.22,
        rootMargin: window.matchMedia("(max-width: 760px)").matches ? "0px 0px -2% 0px" : "0px 0px -10% 0px",
      }
    );

    testimonialObserver.observe(testimonialSection);
  }
}
