const editorialSoapsSection = document.querySelector(".editorial-soaps");

if (editorialSoapsSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    editorialSoapsSection.classList.add("is-visible");
  } else {
    editorialSoapsSection.setAttribute("data-animate", "");

    const editorialSoapsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          editorialSoapsSection.classList.add("is-visible");
          observer.unobserve(editorialSoapsSection);
        });
      },
      {
        threshold: window.matchMedia("(max-width: 760px)").matches ? 0.08 : 0.24,
        rootMargin: window.matchMedia("(max-width: 760px)").matches ? "0px 0px -2% 0px" : "0px 0px -10% 0px",
      }
    );

    editorialSoapsObserver.observe(editorialSoapsSection);
  }
}
