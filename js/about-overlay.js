(function () {
  const overlay = document.querySelector("[data-about-overlay]");
  const openButtons = document.querySelectorAll("[data-about-open]");

  if (!overlay || !openButtons.length) {
    return;
  }

  const panel = overlay.querySelector(".about-overlay__panel");
  const closeButtons = overlay.querySelectorAll("[data-about-close]");
  const kitsButton = overlay.querySelector("[data-about-kits]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  let lastFocusedElement = null;
  let scrollPosition = 0;

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

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
    Array.from(overlay.querySelectorAll(focusableSelector)).filter(
      (element) => element.offsetParent !== null
    );

  const lockScroll = () => {
    scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add("about-overlay-open");
  };

  const unlockScroll = () => {
    document.body.classList.remove("about-overlay-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
  };

  const openOverlay = () => {
    lastFocusedElement = document.activeElement;
    closeMobileMenu();
    lockScroll();

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");

    window.requestAnimationFrame(() => {
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0] || panel;

      if (firstElement) {
        firstElement.focus({ preventScroll: true });
      }
    });
  };

  const closeOverlay = ({ restoreFocus = true } = {}) => {
    if (!overlay.classList.contains("is-open")) {
      return;
    }

    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    unlockScroll();

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openOverlay();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeOverlay();
    });
  });

  overlay.addEventListener("click", (event) => {
    if (event.target !== overlay) {
      return;
    }

    closeOverlay();
  });

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeOverlay();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();

    if (!focusableElements.length) {
      event.preventDefault();
      panel.focus({ preventScroll: true });
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

  if (kitsButton) {
    kitsButton.addEventListener("click", (event) => {
      const target = document.querySelector(kitsButton.getAttribute("href"));

      if (!target) {
        return;
      }

      event.preventDefault();
      closeOverlay({ restoreFocus: false });

      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }
})();
