(function () {
  const trustBar = document.querySelector(".trust-bar");

  if (!trustBar) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    trustBar.classList.add("is-visible");
    return;
  }

  trustBar.setAttribute("data-animate", "");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        trustBar.classList.add("is-visible");
        observer.unobserve(trustBar);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  observer.observe(trustBar);
})();
