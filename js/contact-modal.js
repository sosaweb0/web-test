(function () {
  const modal = document.querySelector("[data-contact-modal]");
  const openButtons = document.querySelectorAll("[data-contact-open]");

  if (!modal || !openButtons.length) {
    return;
  }

  const dialog = modal.querySelector(".contact-modal__dialog");
  const closeButtons = modal.querySelectorAll("[data-contact-close]");
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
    Array.from(modal.querySelectorAll(focusableSelector)).filter(
      (element) => element.offsetParent !== null
    );

  const lockScroll = () => {
    scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add("contact-modal-open");
  };

  const unlockScroll = () => {
    document.body.classList.remove("contact-modal-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
  };

  const openModal = () => {
    if (modal.classList.contains("is-open")) {
      return;
    }

    lastFocusedElement = document.activeElement;
    closeMobileMenu();
    lockScroll();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    window.requestAnimationFrame(() => {
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0] || dialog;

      if (firstElement) {
        firstElement.focus({ preventScroll: true });
      }
    });
  };

  const closeModal = ({ restoreFocus = true } = {}) => {
    if (!modal.classList.contains("is-open")) {
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    unlockScroll();

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal();
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target !== modal) {
      return;
    }

    closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();

    if (!focusableElements.length) {
      event.preventDefault();
      dialog.focus({ preventScroll: true });
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