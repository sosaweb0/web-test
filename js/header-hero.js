const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const search = document.querySelector("[data-search]");
const searchToggle = document.querySelector("[data-search-toggle]");
const searchInput = document.querySelector("[data-search-input]");
const kitsMenu = document.querySelector("[data-kits-menu]");
const kitsMenuToggle = document.querySelector("[data-kits-menu-toggle]");
const kitsMenuPanel = document.querySelector("[data-kits-menu-panel]");
const canHoverKitsMenu = window.matchMedia("(hover: hover) and (pointer: fine)");

let kitsMenuCloseTimer;

const closeSearch = () => {
  if (!search || !searchToggle || !searchInput) {
    return;
  }

  search.classList.remove("is-open");
  searchToggle.setAttribute("aria-expanded", "false");
};

const openKitsMenu = () => {
  if (!kitsMenu || !kitsMenuToggle || !kitsMenuPanel) {
    return;
  }

  window.clearTimeout(kitsMenuCloseTimer);
  closeSearch();
  kitsMenu.classList.add("is-open");
  kitsMenuToggle.setAttribute("aria-expanded", "true");
  kitsMenuPanel.setAttribute("aria-hidden", "false");
};

const closeKitsMenu = () => {
  if (!kitsMenu || !kitsMenuToggle || !kitsMenuPanel) {
    return;
  }

  window.clearTimeout(kitsMenuCloseTimer);
  kitsMenu.classList.remove("is-open");
  kitsMenuToggle.setAttribute("aria-expanded", "false");
  kitsMenuPanel.setAttribute("aria-hidden", "true");
};

const scheduleKitsMenuClose = () => {
  window.clearTimeout(kitsMenuCloseTimer);
  kitsMenuCloseTimer = window.setTimeout(closeKitsMenu, 120);
};

const closeMenu = () => {
  if (!menuToggle || !nav) {
    return;
  }

  closeKitsMenu();
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
};

if (kitsMenu && kitsMenuToggle && kitsMenuPanel) {
  kitsMenuToggle.addEventListener("click", () => {
    const isOpen = kitsMenu.classList.contains("is-open");

    if (isOpen) {
      closeKitsMenu();
      return;
    }

    openKitsMenu();
  });

  kitsMenu.addEventListener("mouseenter", () => {
    if (canHoverKitsMenu.matches) {
      openKitsMenu();
    }
  });

  kitsMenu.addEventListener("mouseleave", () => {
    if (canHoverKitsMenu.matches) {
      scheduleKitsMenuClose();
    }
  });

  kitsMenuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeKitsMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!kitsMenu.classList.contains("is-open") || kitsMenu.contains(event.target)) {
      return;
    }

    closeKitsMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !kitsMenu.classList.contains("is-open")) {
      return;
    }

    closeKitsMenu();
    kitsMenuToggle.focus();
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    closeSearch();
    if (!isOpen) {
      closeKitsMenu();
    }
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !nav.classList.contains("is-open")) {
      return;
    }

    closeMenu();
    menuToggle.focus();
  });
}

if (search && searchToggle && searchInput) {
  searchToggle.addEventListener("click", () => {
    const isOpen = search.classList.contains("is-open");

    closeKitsMenu();

    if (!isOpen) {
      search.classList.add("is-open");
      searchToggle.setAttribute("aria-expanded", "true");
      window.requestAnimationFrame(() => searchInput.focus());
      return;
    }

    if (!searchInput.value.trim()) {
      closeSearch();
      searchToggle.focus();
      return;
    }

    searchInput.focus();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    searchInput.value = "";
    closeSearch();
    searchToggle.focus();
  });

  search.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (search.contains(document.activeElement) || searchInput.value.trim()) {
        return;
      }

      closeSearch();
    }, 80);
  });

  document.addEventListener("click", (event) => {
    if (search.contains(event.target) || searchInput.value.trim()) {
      return;
    }

    closeSearch();
  });
}
