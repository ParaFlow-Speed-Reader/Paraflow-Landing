var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/landing/layout/Navigation/NavigationController.ts
var NavigationController = class {
  constructor() {
    __publicField(this, "hamburgerBtn", null);
    __publicField(this, "closeBtn", null);
    __publicField(this, "backdrop", null);
    __publicField(this, "drawer", null);
    __publicField(this, "themeToggleBtn", null);
    __publicField(this, "mobileLinks", null);
    __publicField(this, "isOpen", false);
    __publicField(this, "boundOnHamburgerClick");
    __publicField(this, "boundOnCloseClick");
    __publicField(this, "boundOnBackdropClick");
    __publicField(this, "boundOnKeyDown");
    __publicField(this, "boundOnLinkClick");
    __publicField(this, "boundOnWindowResize");
    __publicField(this, "boundOnThemeToggleClick");
    this.boundOnHamburgerClick = () => this.toggleDrawer();
    this.boundOnCloseClick = () => this.closeDrawer();
    this.boundOnBackdropClick = () => this.closeDrawer();
    this.boundOnKeyDown = (e) => this.handleKeyDown(e);
    this.boundOnLinkClick = () => this.closeDrawer();
    this.boundOnWindowResize = () => this.handleResize();
    this.boundOnThemeToggleClick = () => this.toggleTheme();
    this.init();
  }
  init() {
    if (typeof document === "undefined") return;
    this.hamburgerBtn = document.getElementById("nav-hamburger");
    this.closeBtn = document.getElementById("nav-drawer-close");
    this.backdrop = document.getElementById("mobile-nav-backdrop");
    this.drawer = document.getElementById("mobile-nav-drawer");
    this.themeToggleBtn = document.getElementById("theme-toggle");
    this.mobileLinks = document.querySelectorAll(".mobile-nav-link");
    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener("click", this.boundOnHamburgerClick);
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", this.boundOnCloseClick);
    }
    if (this.backdrop) {
      this.backdrop.addEventListener("click", this.boundOnBackdropClick);
    }
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", this.boundOnThemeToggleClick);
    }
    if (this.mobileLinks) {
      this.mobileLinks.forEach((link) => {
        link.addEventListener("click", this.boundOnLinkClick);
      });
    }
    window.addEventListener("keydown", this.boundOnKeyDown);
    window.addEventListener("resize", this.boundOnWindowResize);
    this.syncThemeState();
    this.loadHdBrandIcons();
  }
  openDrawer() {
    if (this.isOpen || !this.drawer) return;
    this.isOpen = true;
    this.drawer.classList.add("is-active");
    this.drawer.setAttribute("aria-hidden", "false");
    if (this.backdrop) {
      this.backdrop.classList.add("is-active");
      this.backdrop.setAttribute("aria-hidden", "false");
    }
    if (this.hamburgerBtn) {
      this.hamburgerBtn.setAttribute("aria-expanded", "true");
    }
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.add("nav-drawer-open");
    }
    if (this.closeBtn) {
      try {
        this.closeBtn.focus({ preventScroll: true });
      } catch {
        this.closeBtn.focus();
      }
    }
  }
  closeDrawer() {
    if (!this.isOpen || !this.drawer) return;
    this.isOpen = false;
    this.drawer.classList.remove("is-active");
    this.drawer.setAttribute("aria-hidden", "true");
    if (this.backdrop) {
      this.backdrop.classList.remove("is-active");
      this.backdrop.setAttribute("aria-hidden", "true");
    }
    if (this.hamburgerBtn) {
      this.hamburgerBtn.setAttribute("aria-expanded", "false");
      try {
        this.hamburgerBtn.focus({ preventScroll: true });
      } catch {
        this.hamburgerBtn.focus();
      }
    }
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.remove("nav-drawer-open");
    }
  }
  toggleDrawer() {
    if (this.isOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }
  getIsOpen() {
    return this.isOpen;
  }
  handleKeyDown(e) {
    if (e.key === "Escape" && this.isOpen) {
      e.preventDefault();
      this.closeDrawer();
    }
  }
  loadHdBrandIcons() {
    if (typeof document === "undefined") return;
    const hdImgs = document.querySelectorAll(".brand-icon-hd");
    hdImgs.forEach((hdImg) => {
      if (hdImg.dataset.hdAsset) {
        hdImg.src = hdImg.dataset.hdAsset;
        if (hdImg.complete && hdImg.naturalWidth > 0) {
          hdImg.classList.add("is-loaded");
          hdImg.parentElement?.classList.add("has-hd-loaded");
        } else {
          hdImg.onload = () => {
            hdImg.classList.add("is-loaded");
            hdImg.parentElement?.classList.add("has-hd-loaded");
          };
        }
      }
    });
  }
  handleResize() {
    if (typeof window !== "undefined" && window.innerWidth >= 850 && this.isOpen) {
      this.closeDrawer();
    }
  }
  syncThemeState() {
    if (typeof document === "undefined") return;
    try {
      const savedTheme = localStorage.getItem("paraflow_theme");
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        this.updateColorSchemeMeta("light");
      } else if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        this.updateColorSchemeMeta("dark");
      }
    } catch {
    }
  }
  toggleTheme() {
    if (typeof document === "undefined") return;
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    this.updateColorSchemeMeta(next);
    try {
      localStorage.setItem("paraflow_theme", next);
    } catch {
    }
  }
  updateColorSchemeMeta(theme) {
    if (typeof document === "undefined") return;
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme === "light" ? "light" : "dark light";
    }
  }
  destroy() {
    if (this.hamburgerBtn) {
      this.hamburgerBtn.removeEventListener("click", this.boundOnHamburgerClick);
    }
    if (this.closeBtn) {
      this.closeBtn.removeEventListener("click", this.boundOnCloseClick);
    }
    if (this.backdrop) {
      this.backdrop.removeEventListener("click", this.boundOnBackdropClick);
    }
    if (this.themeToggleBtn) {
      this.themeToggleBtn.removeEventListener("click", this.boundOnThemeToggleClick);
    }
    if (this.mobileLinks) {
      this.mobileLinks.forEach((link) => {
        link.removeEventListener("click", this.boundOnLinkClick);
      });
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.boundOnKeyDown);
      window.removeEventListener("resize", this.boundOnWindowResize);
    }
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.remove("nav-drawer-open");
    }
  }
};
export {
  NavigationController
};
