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
      threshold: window.matchMedia("(max-width: 760px)").matches ? 0.08 : 0.14,
      rootMargin: window.matchMedia("(max-width: 760px)").matches ? "0px 0px -2% 0px" : "0px 0px -8% 0px",
    }
  );

  observer.observe(footer);
})();
