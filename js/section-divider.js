(function () {
  const dividers = document.querySelectorAll(".section-divider");

  if (!dividers.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    dividers.forEach((divider) => {
      divider.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  dividers.forEach((divider) => {
    divider.setAttribute("data-animate", "");
    observer.observe(divider);
  });
})();
