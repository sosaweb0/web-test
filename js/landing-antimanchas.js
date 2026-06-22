(function () {
  const landing = document.querySelector("[data-landing-antimanchas]");
  const openButtons = document.querySelectorAll("[data-landing-antimanchas-open]");

  if (!landing || !openButtons.length) {
    return;
  }

  const WHATSAPP_NUMBER = "18090000000";
  const WHATSAPP_MESSAGE =
    "Hola, quiero pedir el Kit Aclarante. \u00bfMe pueden dar m\u00e1s informaci\u00f3n?";

  const surface = landing.querySelector(".landing-antimanchas__surface");
  const scrollRoot = landing.querySelector("[data-landing-antimanchas-scroll]");
  const closeButtons = landing.querySelectorAll("[data-landing-antimanchas-close]");
  const whatsappLinks = landing.querySelectorAll("[data-antimanchas-whatsapp]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const kitsTitle = document.querySelector("#kits-title");
  let lastFocusedElement = null;
  let scrollPosition = 0;
  let revealObserver = null;

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  whatsappLinks.forEach((link) => {
    link.setAttribute("href", whatsappUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  const closeMobileMenu = () => {
    if (!menuToggle || !nav) {
      return;
    }

    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  };

  const getFocusableElements = () =>
    Array.from(landing.querySelectorAll(focusableSelector)).filter(
      (element) => element.offsetParent !== null
    );

  const lockScroll = () => {
    scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add("landing-antimanchas-open");
  };

  const unlockScroll = () => {
    document.body.classList.remove("landing-antimanchas-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
  };

  const revealElements = () => {
    const elements = landing.querySelectorAll("[data-antimanchas-reveal]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    elements.forEach((element) => {
      element.classList.remove("is-visible");
    });

    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        root: scrollRoot,
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
      revealObserver.observe(element);
    });
  };

  const openLanding = () => {
    lastFocusedElement = document.activeElement;
    closeMobileMenu();
    lockScroll();

    landing.classList.add("is-open");
    landing.setAttribute("aria-hidden", "false");

    if (scrollRoot) {
      scrollRoot.scrollTop = 0;
    }

    window.requestAnimationFrame(() => {
      revealElements();

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0] || surface;

      if (firstElement) {
        firstElement.focus({ preventScroll: true });
      }
    });
  };

  const closeLanding = ({ restoreFocus = true, scrollToKits = true } = {}) => {
    if (!landing.classList.contains("is-open")) {
      return;
    }

    landing.classList.remove("is-open");
    landing.setAttribute("aria-hidden", "true");
    unlockScroll();

    if (scrollToKits && kitsTitle) {
      window.requestAnimationFrame(() => {
        kitsTitle.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openLanding();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeLanding();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!landing.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLanding();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();

    if (!focusableElements.length) {
      event.preventDefault();
      surface.focus({ preventScroll: true });
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus({ preventScroll: true });
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus({ preventScroll: true });
    }
  });
})();

