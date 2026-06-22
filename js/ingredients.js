const ingredientsSection = document.querySelector(".ingredients");

if (ingredientsSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    ingredientsSection.classList.add("is-visible");
  } else {
    ingredientsSection.setAttribute("data-animate", "");

    const ingredientsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          ingredientsSection.classList.add("is-visible");
          observer.unobserve(ingredientsSection);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    ingredientsObserver.observe(ingredientsSection);
  }
}
