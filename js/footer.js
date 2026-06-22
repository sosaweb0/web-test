(function () {
  const footer = document.querySelector(".site-footer");

  if (!footer) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    footer.classList.add("is-visible");
    return;
  }

  footer.setAttribute("data-animate", "");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        footer.classList.add("is-visible");
        observer.unobserve(footer);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  observer.observe(footer);
})();
