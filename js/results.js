const resultsSection = document.querySelector(".results");
const resultValues = document.querySelectorAll("[data-results-value]");

const setFinalResultValues = () => {
  resultValues.forEach((valueElement) => {
    const target = Number(valueElement.dataset.resultsValue || 0);
    valueElement.textContent = `+${target}%`;
  });
};

const animateResultValues = () => {
  const duration = window.matchMedia("(max-width: 760px)").matches ? 650 : 1500;
  const startTime = performance.now();

  const tick = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    resultValues.forEach((valueElement) => {
      const target = Number(valueElement.dataset.resultsValue || 0);
      const currentValue = Math.round(target * easedProgress);
      valueElement.textContent = `+${currentValue}%`;
    });

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setFinalResultValues();
    }
  };

  requestAnimationFrame(tick);
};

if (resultsSection) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    resultsSection.classList.add("is-visible");
    setFinalResultValues();
  } else {
    resultsSection.setAttribute("data-animate", "");

    const resultsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          resultsSection.classList.add("is-visible");
          animateResultValues();
          observer.unobserve(resultsSection);
        });
      },
      {
        threshold: window.matchMedia("(max-width: 760px)").matches ? 0.08 : 0.22,
        rootMargin: window.matchMedia("(max-width: 760px)").matches ? "0px 0px -2% 0px" : "0px 0px -10% 0px",
      }
    );

    resultsObserver.observe(resultsSection);
  }
}
