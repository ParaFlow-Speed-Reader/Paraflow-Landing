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

// src/landing/layout/MotionToggle/MotionToggleController.ts
function safeGetStorage(key) {
  try {
    return typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}
function safeSetStorage(key, val) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, val);
    }
  } catch {
  }
}
var _MotionToggleController = class _MotionToggleController {
  constructor() {
    __publicField(this, "motionBtn", null);
    __publicField(this, "jumpToTopBtn", null);
    __publicField(this, "host", null);
    __publicField(this, "isReduced", false);
    __publicField(this, "lastScrollY", 0);
    __publicField(this, "isScrollTicking", false);
    __publicField(this, "lengthyTimeout");
    _MotionToggleController.instance = this;
    this.motionBtn = document.getElementById("btn-motion-toggle");
    this.jumpToTopBtn = document.getElementById("btn-jump-to-top");
    this.host = document.querySelector(".accessibility-btns-host");
    if (typeof window !== "undefined") {
      window.__PARAFLOW_MOTION_CONTROLLER__ = this;
    }
    this.initMotionState();
    this.bindEvents();
    this.initScrollDynamics();
  }
  static getInstance() {
    return _MotionToggleController.instance;
  }
  /**
   * Static query to check current motion state anywhere in the application
   */
  static isReducedMotion() {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute(_MotionToggleController.ROOT_ATTR);
      if (attr === "true") return true;
      if (attr === "false") return false;
    }
    const saved = safeGetStorage(_MotionToggleController.STORAGE_KEY);
    if (saved === "disabled") return true;
    if (saved === "enabled") return false;
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const osReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return isTouch || osReduced;
    }
    return false;
  }
  /**
   * Register a listener callback for motion state mutations
   */
  static addMotionListener(callback) {
    _MotionToggleController.listeners.add(callback);
    return () => {
      _MotionToggleController.listeners.delete(callback);
    };
  }
  /**
   * Determine initial motion state based on localStorage, touch capabilities, or OS preferences
   */
  initMotionState() {
    const savedPref = safeGetStorage(_MotionToggleController.STORAGE_KEY);
    if (savedPref === "disabled") {
      this.isReduced = true;
    } else if (savedPref === "enabled") {
      this.isReduced = false;
    } else {
      const isTouch = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const osReduced = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.isReduced = isTouch || osReduced;
    }
    this.applyMotionState(this.isReduced, false);
  }
  /**
   * Bind click and keyboard toggle events
   */
  bindEvents() {
    if (!this.motionBtn) return;
    this.motionBtn.addEventListener("click", () => {
      this.toggleMotion();
    });
    if (this.jumpToTopBtn) {
      this.jumpToTopBtn.addEventListener("click", () => {
        if (typeof window !== "undefined") {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      });
    }
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener?.("change", (e) => {
        const hasSaved = safeGetStorage(_MotionToggleController.STORAGE_KEY) !== null;
        if (!hasSaved) {
          this.applyMotionState(e.matches, false);
        }
        if (this.lengthyTimeout) clearTimeout(this.lengthyTimeout);
        this.motionBtn?.classList.toggle("timed-out", false);
        this.lengthyTimeout = setTimeout(() => {
          this.motionBtn?.classList.add("timed-out");
        }, 1e4);
      });
      this.lengthyTimeout = setTimeout(() => {
        this.motionBtn?.classList.add("timed-out");
      }, 1e4);
    }
  }
  /**
   * Toggle between motion enabled and motion paused
   */
  toggleMotion() {
    const nextState = !this.isReduced;
    this.applyMotionState(nextState, true);
  }
  /**
   * Apply motion state to DOM, attributes, and notify listeners
   */
  applyMotionState(reduced, persist = true) {
    this.isReduced = reduced;
    if (typeof document !== "undefined") {
      if (reduced) {
        document.documentElement.setAttribute(_MotionToggleController.ROOT_ATTR, "true");
      } else {
        document.documentElement.removeAttribute(_MotionToggleController.ROOT_ATTR);
      }
    }
    if (persist) {
      safeSetStorage(
        _MotionToggleController.STORAGE_KEY,
        reduced ? "disabled" : "enabled"
      );
    }
    if (this.motionBtn) {
      if (reduced) {
        this.motionBtn.classList.add("is-paused");
        this.motionBtn.setAttribute("aria-pressed", "true");
        this.motionBtn.setAttribute("aria-label", "Resume page motion and animations");
        this.motionBtn.setAttribute("title", "Resume page motion");
      } else {
        this.motionBtn.classList.remove("is-paused");
        this.motionBtn.setAttribute("aria-pressed", "false");
        this.motionBtn.setAttribute("aria-label", "Pause page motion and animations");
        this.motionBtn.setAttribute("title", "Pause page motion");
      }
    }
    _MotionToggleController.listeners.forEach((cb) => {
      try {
        cb(reduced);
      } catch (err) {
        console.warn("[MotionToggleController] Listener error:", err);
      }
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("paraflow:motion-change", {
          detail: { isReduced: reduced }
        })
      );
    }
  }
  initScrollDynamics() {
    if (typeof window === "undefined" || !this.host) return;
    this.lastScrollY = window.scrollY || 0;
    this.handleScrollUpdate();
    window.addEventListener(
      "scroll",
      () => {
        if (!this.isScrollTicking) {
          this.isScrollTicking = true;
          const raf = typeof window.requestAnimationFrame === "function" ? (cb) => window.requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
          raf(() => {
            this.handleScrollUpdate();
            this.isScrollTicking = false;
          });
        }
      },
      { passive: true }
    );
  }
  handleScrollUpdate(customScrollY) {
    if (!this.host) return;
    const currentScrollY = customScrollY !== void 0 ? customScrollY : (typeof window !== "undefined" ? window.scrollY : 0) || 0;
    const delta = currentScrollY - this.lastScrollY;
    if (currentScrollY <= 60) {
      this.host.classList.add("is-top-scrolled");
      this.host.classList.remove("is-scrolled-down", "is-scrolling-down");
    } else {
      this.host.classList.remove("is-top-scrolled");
      this.host.classList.add("is-scrolled-down");
      if (delta > 8) {
        this.host.classList.add("is-scrolling-down");
        this.host.classList.remove("is-scrolling-up");
      } else if (delta < -8) {
        this.host.classList.remove("is-scrolling-down");
        this.host.classList.add("is-scrolling-up");
      }
    }
    this.lastScrollY = currentScrollY;
  }
};
__publicField(_MotionToggleController, "STORAGE_KEY", "paraflow_motion");
__publicField(_MotionToggleController, "ROOT_ATTR", "data-reduce-motion");
__publicField(_MotionToggleController, "listeners", /* @__PURE__ */ new Set());
__publicField(_MotionToggleController, "instance", null);
var MotionToggleController = _MotionToggleController;

// src/landing/sections/Hero/HeroCarouselController.ts
var HeroCarouselController = class {
  constructor() {
    __publicField(this, "container");
    __publicField(this, "viewport");
    __publicField(this, "track");
    __publicField(this, "shardsBackdrop");
    __publicField(this, "shardsSvg");
    __publicField(this, "panels");
    __publicField(this, "cards");
    __publicField(this, "crumbs");
    __publicField(this, "btnPrev");
    __publicField(this, "btnNext");
    __publicField(this, "activeIndex", 0);
    // Swipe / gesture state
    __publicField(this, "touchStartX", 0);
    __publicField(this, "touchEndX", 0);
    __publicField(this, "isDragging", false);
    this.container = document.getElementById("hero-carousel");
    this.viewport = document.getElementById("carousel-viewport");
    this.track = document.getElementById("carousel-track");
    this.shardsBackdrop = document.getElementById("carousel-shards-backdrop");
    this.shardsSvg = this.shardsBackdrop?.querySelector(".carousel-shards-svg") || null;
    this.panels = Array.from(document.querySelectorAll(".carousel-panel"));
    this.cards = Array.from(document.querySelectorAll(".stacked-card, .carousel-card"));
    this.crumbs = Array.from(document.querySelectorAll(".stack-crumb"));
    this.btnPrev = document.getElementById("btn-stack-prev");
    this.btnNext = document.getElementById("btn-stack-next");
    if (this.panels.length === 0 && this.cards.length === 0) return;
    this.bindEvents();
    this.updateState();
    this.loadHdShards();
  }
  bindEvents() {
    this.crumbs.forEach((crumb, index) => {
      crumb.addEventListener("click", () => {
        this.goTo(index);
      });
      crumb.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIdx = (index + 1) % this.crumbs.length;
          this.goTo(nextIdx);
          this.crumbs[nextIdx]?.focus();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIdx = (index - 1 + this.crumbs.length) % this.crumbs.length;
          this.goTo(prevIdx);
          this.crumbs[prevIdx]?.focus();
        }
      });
    });
    this.cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (index === this.activeIndex) {
          this.cycle(1);
        } else {
          this.goTo(index);
        }
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          this.cycle(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          this.cycle(-1);
        } else if (e.key === "Home") {
          e.preventDefault();
          this.goTo(0);
        } else if (e.key === "End") {
          e.preventDefault();
          this.goTo(this.cards.length - 1);
        }
      });
    });
    this.btnPrev?.addEventListener("click", () => this.cycle(-1));
    this.btnNext?.addEventListener("click", () => this.cycle(1));
    if (this.viewport) {
      this.viewport.addEventListener("touchstart", (e) => {
        if (e.changedTouches[0]) {
          this.touchStartX = e.changedTouches[0].screenX;
        }
      }, { passive: true });
      this.viewport.addEventListener("touchend", (e) => {
        if (e.changedTouches[0]) {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe();
        }
      }, { passive: true });
      this.viewport.addEventListener("mousedown", (e) => {
        this.isDragging = true;
        this.touchStartX = e.screenX;
      });
      this.viewport.addEventListener("mouseup", (e) => {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.touchEndX = e.screenX;
        this.handleSwipe();
      });
      this.viewport.addEventListener("mouseleave", () => {
        this.isDragging = false;
      });
    }
  }
  handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const threshold = 45;
    if (swipeDistance < -threshold) {
      this.cycle(1);
    } else if (swipeDistance > threshold) {
      this.cycle(-1);
    }
  }
  cycle(direction) {
    const count = this.panels.length || this.cards.length;
    const nextIdx = (this.activeIndex + direction + count) % count;
    this.goTo(nextIdx);
  }
  goTo(index) {
    const count = this.panels.length || this.cards.length;
    if (index < 0 || index >= count) return;
    this.activeIndex = index;
    this.updateState();
  }
  updateState() {
    if (this.track) {
      this.track.style.transform = `translate3d(calc(-${this.activeIndex} * (100% + var(--carousel-gap, 2rem))), 0, 0)`;
    }
    if (this.shardsBackdrop) {
      const rawStep = getComputedStyle(this.shardsBackdrop).getPropertyValue("--carousel-shards-parallax-step").trim();
      const stepRate = parseFloat(rawStep) || 6;
      const bgShiftPercent = -stepRate * this.activeIndex;
      this.shardsBackdrop.style.transform = `translate3d(${bgShiftPercent}%, 0, 0)`;
      if (this.shardsSvg && this.shardsSvg !== this.shardsBackdrop) {
        const svgMicroShift = -(stepRate * 0.2) * this.activeIndex;
        this.shardsSvg.style.transform = `translate3d(${svgMicroShift}%, 0, 0)`;
      }
    }
    this.panels.forEach((panel, i) => {
      const isActive = i === this.activeIndex;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
    this.cards.forEach((card, i) => {
      const isActive = i === this.activeIndex;
      card.classList.toggle("is-card-active", isActive);
      card.setAttribute("tabindex", isActive ? "0" : "-1");
    });
    this.crumbs.forEach((crumb, i) => {
      const isActive = i === this.activeIndex;
      crumb.classList.toggle("is-active", isActive);
      crumb.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }
  getContainer() {
    return this.container;
  }
  loadHdShards() {
    if (!this.shardsBackdrop) return;
    const hdImg = this.shardsBackdrop.querySelector(".carousel-shards-hd");
    if (hdImg && hdImg.dataset.hdAsset) {
      hdImg.src = hdImg.dataset.hdAsset;
      hdImg.onload = () => {
        hdImg.classList.add("is-loaded");
        this.shardsBackdrop?.classList.add("has-hd-loaded");
      };
    }
  }
};

// src/landing/sections/CognitiveScience/CognitiveSliderController.ts
var CognitiveSliderController = class {
  constructor() {
    __publicField(this, "slider");
    __publicField(this, "sliderBar");
    __publicField(this, "handleGlyph");
    __publicField(this, "btnSci");
    __publicField(this, "btnEli10");
    __publicField(this, "btnJargonBuster");
    __publicField(this, "bubble");
    __publicField(this, "container");
    __publicField(this, "section");
    __publicField(this, "currentMode", "sci");
    __publicField(this, "hasUserInteracted", false);
    __publicField(this, "hasPeeked", false);
    __publicField(this, "isPeekRunning", false);
    __publicField(this, "peekAnimationFrame", null);
    __publicField(this, "peekTimeoutId", null);
    __publicField(this, "scrollObserver", null);
    this.slider = document.getElementById("cognitive-perspective-slider");
    this.sliderBar = document.querySelector(".cognitive-slider-bar");
    this.handleGlyph = document.getElementById("slider-handle-glyph");
    this.btnSci = document.getElementById("btn-mode-sci");
    this.btnEli10 = document.getElementById("btn-mode-eli10");
    this.btnJargonBuster = document.getElementById("btn-jargon-buster");
    this.bubble = document.getElementById("eli10-speech-bubble");
    this.container = document.getElementById("cognitive-comparison-container");
    this.section = document.getElementById("cognitive-science");
    if (!this.slider || !this.container) return;
    this.bindEvents();
    this.setMode("sci", 0);
    this.updateHandlePosition(0);
    this.initScrollPeek();
  }
  markUserInteracted() {
    this.hasUserInteracted = true;
    this.stopPeekAnimation();
    this.hideBubble();
  }
  hideBubble() {
    if (this.bubble) {
      this.bubble.classList.add("is-hidden");
    }
  }
  bindEvents() {
    if (!this.slider) return;
    const handleSliderInput = (e) => {
      this.markUserInteracted();
      const target = e.target;
      const val = parseInt(target.value, 10);
      this.updateHandlePosition(val);
      const targetMode = val >= 50 ? "eli10" : "sci";
      this.setMode(targetMode, val);
    };
    this.slider.addEventListener("input", handleSliderInput);
    this.slider.addEventListener("change", handleSliderInput);
    this.slider.addEventListener("pointerdown", () => this.markUserInteracted());
    this.btnSci?.addEventListener("click", () => {
      this.markUserInteracted();
      this.setMode("sci", 0);
      this.updateHandlePosition(0);
      this.slider?.focus();
    });
    this.btnEli10?.addEventListener("click", () => {
      this.markUserInteracted();
      this.setMode("eli10", 100);
      this.updateHandlePosition(100);
      this.slider?.focus();
    });
    this.bubble?.addEventListener("click", () => {
      this.markUserInteracted();
      this.setMode("eli10", 100);
      this.updateHandlePosition(100);
      this.slider?.focus();
    });
    this.btnJargonBuster?.addEventListener("click", () => {
      this.markUserInteracted();
      this.setMode("eli10", 100);
      this.updateHandlePosition(100);
      this.slider?.focus();
      const scrollTarget = this.sliderBar || this.slider;
      if (scrollTarget && typeof scrollTarget.scrollIntoView === "function") {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
  updateHandlePosition(val) {
    if (this.handleGlyph) {
      this.handleGlyph.style.left = `${val}%`;
    }
  }
  setMode(mode, value) {
    this.currentMode = mode;
    const numVal = value !== void 0 ? value : mode === "sci" ? 0 : 100;
    if (this.slider && this.slider.value !== String(numVal)) {
      this.slider.value = String(numVal);
    }
    if (mode === "sci") {
      this.container?.setAttribute("data-table-mode", "sci");
      this.section?.classList.remove("mode-eli10");
      this.btnSci?.classList.add("is-active");
      this.btnSci?.setAttribute("aria-pressed", "true");
      this.btnEli10?.classList.remove("is-active");
      this.btnEli10?.setAttribute("aria-pressed", "false");
      this.slider?.setAttribute("aria-valuenow", String(numVal));
      this.slider?.setAttribute("aria-valuetext", "Cognitive Science Mode");
      this.handleGlyph?.classList.add("is-sci");
      this.handleGlyph?.classList.remove("is-eli10");
    } else {
      if (!this.isPeekRunning) {
        this.hideBubble();
      }
      this.container?.setAttribute("data-table-mode", "eli10");
      this.section?.classList.add("mode-eli10");
      this.btnEli10?.classList.add("is-active");
      this.btnEli10?.setAttribute("aria-pressed", "true");
      this.btnSci?.classList.remove("is-active");
      this.btnSci?.setAttribute("aria-pressed", "false");
      this.slider?.setAttribute("aria-valuenow", String(numVal));
      this.slider?.setAttribute("aria-valuetext", "ELI10 Plain English Mode");
      this.handleGlyph?.classList.add("is-eli10");
      this.handleGlyph?.classList.remove("is-sci");
    }
  }
  initScrollPeek() {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const targetEl = this.sliderBar || this.section;
    if (!targetEl) return;
    const checkIfVisible = () => {
      if (typeof window === "undefined") return false;
      const rect = targetEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1;
    };
    const triggerPeek = () => {
      if (this.hasPeeked || this.hasUserInteracted) return;
      this.hasPeeked = true;
      this.scrollObserver?.disconnect();
      this.scrollObserver = null;
      this.peekTimeoutId = window.setTimeout(() => {
        if (!this.hasUserInteracted) {
          this.runPeekAnimation();
        }
      }, 500);
    };
    if (checkIfVisible()) {
      triggerPeek();
      return;
    }
    if (typeof IntersectionObserver !== "undefined") {
      this.scrollObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              triggerPeek();
              break;
            }
          }
        },
        { threshold: 0.2 }
      );
      this.scrollObserver.observe(targetEl);
    }
  }
  runPeekAnimation() {
    if (this.hasUserInteracted || this.isPeekRunning) return;
    if (typeof requestAnimationFrame === "undefined") return;
    this.isPeekRunning = true;
    const durationForward = 600;
    const holdDuration = 600;
    const durationBackward = 500;
    let startTime = null;
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    const step = (now) => {
      if (this.hasUserInteracted) {
        this.stopPeekAnimation();
        return;
      }
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      if (elapsed < durationForward) {
        const progress = easeInOutCubic(elapsed / durationForward);
        const val = Math.min(100, Math.max(0, Math.round(progress * 100)));
        this.updateHandlePosition(val);
        if (this.slider) this.slider.value = String(val);
        if (val >= 50 && this.currentMode !== "eli10") {
          this.setMode("eli10", val);
        }
        this.peekAnimationFrame = requestAnimationFrame(step);
      } else if (elapsed < durationForward + holdDuration) {
        this.updateHandlePosition(100);
        if (this.slider) this.slider.value = "100";
        if (this.currentMode !== "eli10") {
          this.setMode("eli10", 100);
        }
        this.peekAnimationFrame = requestAnimationFrame(step);
      } else if (elapsed < durationForward + holdDuration + durationBackward) {
        const returnElapsed = elapsed - (durationForward + holdDuration);
        const progress = 1 - easeInOutCubic(returnElapsed / durationBackward);
        const val = Math.min(100, Math.max(0, Math.round(progress * 100)));
        this.updateHandlePosition(val);
        if (this.slider) this.slider.value = String(val);
        if (val < 50 && this.currentMode !== "sci") {
          this.setMode("sci", val);
        }
        this.peekAnimationFrame = requestAnimationFrame(step);
      } else {
        this.updateHandlePosition(0);
        if (this.slider) this.slider.value = "0";
        this.setMode("sci", 0);
        this.isPeekRunning = false;
        this.peekAnimationFrame = null;
        if (!this.hasUserInteracted && this.bubble) {
          this.bubble.classList.remove("is-hidden");
        }
      }
    };
    this.peekAnimationFrame = requestAnimationFrame(step);
  }
  stopPeekAnimation() {
    if (this.peekTimeoutId !== null) {
      clearTimeout(this.peekTimeoutId);
      this.peekTimeoutId = null;
    }
    if (this.peekAnimationFrame !== null) {
      cancelAnimationFrame(this.peekAnimationFrame);
      this.peekAnimationFrame = null;
    }
    this.isPeekRunning = false;
  }
  destroy() {
    this.stopPeekAnimation();
    this.scrollObserver?.disconnect();
    this.scrollObserver = null;
  }
  getCurrentMode() {
    return this.currentMode;
  }
};

// src/landing/sections/DemoSandbox/DemoSandboxController.ts
var PASSAGES = {
  rayner: {
    title: "Cognitive Science of Reading (Keith Rayner, 1998)",
    text: `In alphabetical writing systems, reading is characterized by brief ocular fixations lasting approximately two hundred to two hundred and fifty milliseconds, separated by rapid ballistic movements termed saccades. During each fixation, visual acuity drops exponentially outside the fovea, which spans only one to two degrees of the visual angle. Crucially, research demonstrated that information processing is not strictly bounded by the fovea. Readers routinely obtain preview information from the parafoveal region, spanning up to fifteen character spaces to the right of fixation. When this parafoveal preview is experimentally masked, overall reading speed decreases by more than thirty percent, and regressive saccades increase dramatically. Traditional RSVP devices that flash isolated words at a single spatial coordinate inadvertently destroy this parafoveal mechanism, depriving the visual cortex of essential syntactic planning.`
  },
  microkernel: {
    title: "Microkernel Playback Architecture",
    text: `A resilient speed reading architecture separates playback scheduling from DOM mutation. In ParaFlow, the core engine functions as a decoupled microkernel operating on an immutable token stream. Tokens are pre-processed to identify punctuation weights, clause boundaries, and foveal coordinates. The playback loop uses high-precision monotonic clock scheduling, adjusting the delay dynamically between frames. Because browser layout engines can thrash under rapid updates, visual rendering is batched into dedicated presentation components mounted within an isolated Shadow Root. Ghost line and lookahead contexts are extracted as sliding slices, ensuring that cognitive anchors remain consistent across varying reading velocities.`
  },
  flowstate: {
    title: "Neurobiology of the Reading Flow State",
    text: `Deep reading engagement occurs when cognitive load matches visual processing capacity without exceeding working memory limits. Conventional reading induces friction through unintended lateral saccades and frequent regressive backtracking, which consumes roughly twenty percent of total cognitive energy. By anchoring eye position at the Optical Recognition Point, ocular motor fatigue is curtailed. As reading speed accelerates beyond three hundred and fifty words per minute, the acoustic phonological loop decouples, transitioning the brain from inner speech vocalization to direct lexical recognition. Punctuation-aware cadence acts as a cognitive buffer, providing brief micro-pauses at clause boundaries so sentence propositions are integrated into long-term recall before the working memory queue overflows.`
  },
  ergonomics: {
    title: "Parafoveal Ocular Ergonomics",
    text: `Ocular alignment during prolonged speed-reading sessions requires rigorous ergonomic calibration. Traditional computer interfaces position content in the geometric center of the display, which often forces an unnatural upward gaze or promotes neck strain. ParaFlow applies a normalized focal baseline at thirty-eight percent from the viewport ceiling, corresponding to the Golden Ratio and matching the human ocular resting angle of ten to fifteen degrees downward. At a viewing distance of sixty centimeters, the foveal zone encompasses approximately three to four letters. The active reticle guide centers directly over the optimal recognition character, eliminating the need for exploratory corrective micro-saccades.`
  }
};
var ReadingToken = class {
  constructor(rawWord) {
    __publicField(this, "raw");
    __publicField(this, "orpIndex");
    __publicField(this, "weight");
    this.raw = rawWord.trim();
    this.orpIndex = this.calculateORP(this.raw);
    this.weight = this.calculateWeight(this.raw);
  }
  /**
   * Compute Optical Recognition Point index (30-40% into word length)
   */
  calculateORP(word) {
    const clean = word.replace(/^[^\w\d]+/, "");
    const leadingOffset = word.length - clean.length;
    const len = clean.length;
    if (len <= 1) return leadingOffset;
    if (len <= 5) return leadingOffset + 1;
    if (len <= 9) return leadingOffset + 2;
    if (len <= 13) return leadingOffset + 3;
    return leadingOffset + 4;
  }
  /**
   * Punctuation-aware dynamic cadence weights
   */
  calculateWeight(word) {
    if (/[.!?]$/.test(word)) return 1.8;
    if (/[,;:]$/.test(word)) return 1.35;
    if (/[-—]$/.test(word)) return 1.25;
    return 1;
  }
};
var SlidingWindowSimulator = class {
  constructor(elements) {
    __publicField(this, "el");
    __publicField(this, "tokens", []);
    __publicField(this, "currentIndex", 0);
    __publicField(this, "chunkSize", 2);
    __publicField(this, "wpm", 350);
    __publicField(this, "isPlaying", false);
    __publicField(this, "timerId", null);
    this.el = elements;
    this.initPassage("rayner");
    this.bindEvents();
  }
  initPassage(passageKey) {
    const data = PASSAGES[passageKey] || PASSAGES.rayner;
    if (this.el.passageTitle) {
      this.el.passageTitle.textContent = `Passage: ${data.title}`;
    }
    const rawWords = data.text.split(/\s+/).filter((w) => w.length > 0);
    this.tokens = rawWords.map((w) => new ReadingToken(w));
    this.currentIndex = 0;
    this.updateView();
  }
  bindEvents() {
    this.el.btnPlayPause?.addEventListener("click", () => this.togglePlay());
    this.el.btnStepBack?.addEventListener("click", () => this.step(-1));
    this.el.btnStepFwd?.addEventListener("click", () => this.step(1));
    this.el.btnReset?.addEventListener("click", () => this.reset());
    this.el.wpmSlider?.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      this.setWpm(val);
    });
    this.el.chunkSelect?.addEventListener("change", (e) => {
      this.chunkSize = parseInt(e.target.value, 10) || 1;
      this.updateView();
    });
    this.el.textSelect?.addEventListener("change", (e) => {
      this.pause();
      this.initPassage(e.target.value);
    });
    window.addEventListener("keydown", (e) => {
      const targetTag = e.target?.tagName;
      if (targetTag === "INPUT" || targetTag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === "ArrowLeft" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        this.step(-1);
      } else if (e.code === "ArrowRight" || e.key === "l" || e.key === "L") {
        e.preventDefault();
        this.step(1);
      } else if (e.code === "ArrowUp" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        this.setWpm(Math.min(1e3, this.wpm + 25));
      } else if (e.code === "ArrowDown" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        this.setWpm(Math.max(100, this.wpm - 25));
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        this.reset();
      } else if (e.key === "[" && this.chunkSize > 1) {
        e.preventDefault();
        this.chunkSize--;
        if (this.el.chunkSelect) this.el.chunkSelect.value = String(this.chunkSize);
        this.updateView();
      } else if (e.key === "]" && this.chunkSize < 3) {
        e.preventDefault();
        this.chunkSize++;
        if (this.el.chunkSelect) this.el.chunkSelect.value = String(this.chunkSize);
        this.updateView();
      }
    });
  }
  setWpm(newWpm) {
    this.wpm = newWpm;
    if (this.el.wpmSlider) this.el.wpmSlider.value = String(newWpm);
    if (this.el.wpmDisplay) this.el.wpmDisplay.textContent = String(newWpm);
  }
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  play() {
    if (this.currentIndex >= this.tokens.length) {
      this.currentIndex = 0;
    }
    this.isPlaying = true;
    if (this.el.playPauseLabel) this.el.playPauseLabel.textContent = "PAUSE";
    if (this.el.statusBadge) {
      this.el.statusBadge.textContent = "READING";
      this.el.statusBadge.style.color = "var(--accent-emerald)";
      this.el.statusBadge.style.backgroundColor = "var(--accent-emerald-subtle)";
    }
    this.scheduleNextTick();
  }
  pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.el.playPauseLabel) this.el.playPauseLabel.textContent = "PLAY";
    if (this.el.statusBadge) {
      this.el.statusBadge.textContent = "PAUSED";
      this.el.statusBadge.style.color = "var(--accent-amber)";
      this.el.statusBadge.style.backgroundColor = "var(--accent-amber-subtle)";
    }
  }
  reset() {
    this.pause();
    this.currentIndex = 0;
    if (this.el.statusBadge) {
      this.el.statusBadge.textContent = "READY";
      this.el.statusBadge.style.color = "var(--accent-cyan)";
      this.el.statusBadge.style.backgroundColor = "var(--accent-cyan-subtle)";
    }
    this.updateView();
  }
  step(direction) {
    this.pause();
    const nextIdx = this.currentIndex + direction * this.chunkSize;
    this.currentIndex = Math.max(0, Math.min(this.tokens.length - 1, nextIdx));
    this.updateView();
  }
  scheduleNextTick() {
    if (!this.isPlaying) return;
    if (this.currentIndex >= this.tokens.length) {
      this.pause();
      if (this.el.statusBadge) this.el.statusBadge.textContent = "COMPLETED";
      return;
    }
    const msPerWord = 6e4 / this.wpm;
    const currentToken = this.tokens[this.currentIndex];
    const weight = currentToken ? currentToken.weight : 1;
    const tickDelay = Math.round(msPerWord * this.chunkSize * weight);
    this.timerId = setTimeout(() => {
      this.currentIndex = Math.min(this.tokens.length, this.currentIndex + this.chunkSize);
      this.updateView();
      this.scheduleNextTick();
    }, tickDelay);
  }
  /**
   * Render the Sliding-Window viewport (Law 1.1 & Law 3.2: Zero innerHTML)
   */
  updateView() {
    const idx = this.currentIndex;
    if (this.el.ghostLine) {
      while (this.el.ghostLine.firstChild) {
        this.el.ghostLine.removeChild(this.el.ghostLine.firstChild);
      }
      const ghostStart = Math.max(0, idx - 8);
      const ghostSlice = this.tokens.slice(ghostStart, idx);
      if (ghostSlice.length > 0) {
        const ghostText = ghostSlice.map((t) => t.raw).join(" ");
        this.el.ghostLine.textContent = ghostText;
      } else {
        this.el.ghostLine.textContent = "\u2014 Article Beginning \u2014";
      }
    }
    if (this.el.activeChunk) {
      while (this.el.activeChunk.firstChild) {
        this.el.activeChunk.removeChild(this.el.activeChunk.firstChild);
      }
      const activeSlice = this.tokens.slice(idx, idx + this.chunkSize);
      if (activeSlice.length > 0) {
        const focalWordIndex = Math.floor((activeSlice.length - 1) / 2);
        activeSlice.forEach((token, wordIndex) => {
          const wordContainer = document.createElement("span");
          wordContainer.style.display = "inline-block";
          wordContainer.style.marginRight = "0.35em";
          const word = token.raw;
          const orpIdx = token.orpIndex;
          if (wordIndex === focalWordIndex && orpIdx >= 0 && orpIdx < word.length) {
            const prefixText = word.substring(0, orpIdx);
            const orpChar = word.charAt(orpIdx);
            const suffixText = word.substring(orpIdx + 1);
            const prefixSpan = document.createElement("span");
            prefixSpan.className = "orp-prefix";
            prefixSpan.textContent = prefixText;
            const orpSpan = document.createElement("span");
            orpSpan.className = "orp-char";
            orpSpan.textContent = orpChar;
            const suffixSpan = document.createElement("span");
            suffixSpan.className = "orp-suffix";
            suffixSpan.textContent = suffixText;
            wordContainer.appendChild(prefixSpan);
            wordContainer.appendChild(orpSpan);
            wordContainer.appendChild(suffixSpan);
          } else {
            wordContainer.textContent = word;
          }
          this.el.activeChunk?.appendChild(wordContainer);
        });
      } else {
        const finSpan = document.createElement("span");
        finSpan.textContent = "\u2014 End of Passage \u2014";
        finSpan.style.color = "var(--accent-amber)";
        this.el.activeChunk.appendChild(finSpan);
      }
    }
    if (this.el.lookaheadLine) {
      while (this.el.lookaheadLine.firstChild) {
        this.el.lookaheadLine.removeChild(this.el.lookaheadLine.firstChild);
      }
      const lookaheadStart = idx + this.chunkSize;
      const lookaheadSlice = this.tokens.slice(lookaheadStart, lookaheadStart + 8);
      if (lookaheadSlice.length > 0) {
        const lookaheadText = lookaheadSlice.map((t) => t.raw).join(" ");
        this.el.lookaheadLine.textContent = lookaheadText;
      } else {
        this.el.lookaheadLine.textContent = "\u2014 Article Conclusion \u2014";
      }
    }
  }
};
var DemoSandboxController = SlidingWindowSimulator;

// src/landing/sections/Ergonomics/ErgoFoldController.ts
var ErgoFoldController = class {
  constructor() {
    __publicField(this, "wrapper");
    __publicField(this, "btn");
    __publicField(this, "btnText");
    __publicField(this, "showMoreText");
    __publicField(this, "collapseText");
    this.wrapper = document.getElementById("ergoFoldWrapper");
    this.btn = document.getElementById("ergoFoldBtn");
    this.btnText = this.btn?.querySelector(".ergo-fold-btn-text") || null;
    this.showMoreText = this.btnText?.textContent || "Show Full Ergonomics Guide";
    this.collapseText = "Collapse Ergonomics Guide";
    if (!this.wrapper || !this.btn) return;
    this.bindEvents();
  }
  bindEvents() {
    if (!this.btn || !this.wrapper) return;
    this.btn.addEventListener("click", () => {
      if (!this.wrapper || !this.btn) return;
      const isCollapsed = this.wrapper.classList.contains("is-collapsed");
      if (isCollapsed) {
        this.wrapper.classList.remove("is-collapsed");
        this.wrapper.classList.add("is-expanded");
        this.btn.setAttribute("aria-expanded", "true");
        if (this.btnText) {
          this.btnText.textContent = this.collapseText;
          this.btnText.setAttribute("data-i18n", "ergoFoldCollapse");
        }
      } else {
        this.wrapper.classList.remove("is-expanded");
        this.wrapper.classList.add("is-collapsed");
        this.btn.setAttribute("aria-expanded", "false");
        if (this.btnText) {
          this.btnText.textContent = this.showMoreText;
          this.btnText.setAttribute("data-i18n", "ergoFoldShowMore");
        }
        const rect = this.wrapper.getBoundingClientRect();
        if (rect.top < 80) {
          this.wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }
};

// src/landing/sections/Ergonomics/ErgoStudioController.ts
var ErgoStudioController = class {
  constructor() {
    __publicField(this, "nav");
    __publicField(this, "tabs");
    __publicField(this, "panels");
    this.nav = document.querySelector(".ergo-switcher-nav");
    this.tabs = Array.from(document.querySelectorAll(".ergo-pill-btn"));
    this.panels = Array.from(document.querySelectorAll(".ergo-protocol-panel"));
    if (!this.nav || this.tabs.length === 0 || this.panels.length === 0) return;
    this.bindEvents();
  }
  bindEvents() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        this.activateTab(index);
      });
      tab.addEventListener("keydown", (e) => {
        let targetIndex = index;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          targetIndex = (index + 1) % this.tabs.length;
          this.tabs[targetIndex]?.focus();
          this.activateTab(targetIndex);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          targetIndex = (index - 1 + this.tabs.length) % this.tabs.length;
          this.tabs[targetIndex]?.focus();
          this.activateTab(targetIndex);
        } else if (e.key === "Home") {
          e.preventDefault();
          this.tabs[0]?.focus();
          this.activateTab(0);
        } else if (e.key === "End") {
          e.preventDefault();
          this.tabs[this.tabs.length - 1]?.focus();
          this.activateTab(this.tabs.length - 1);
        }
      });
    });
  }
  activateTab(index) {
    this.tabs.forEach((t, i) => {
      const isActive = i === index;
      t.classList.toggle("is-active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    this.panels.forEach((p, i) => {
      const isActive = i === index;
      p.classList.toggle("is-active", isActive);
      if (isActive) {
        p.removeAttribute("hidden");
      } else {
        p.setAttribute("hidden", "");
      }
    });
  }
};

// src/landing/sections/Download/DownloadSlingshotController.ts
var DownloadSlingshotController = class {
  constructor() {
    __publicField(this, "featureCard");
    __publicField(this, "issueCard");
    __publicField(this, "actionRow");
    __publicField(this, "prefersReducedMotion", false);
    this.featureCard = document.getElementById("btn-feature-idea");
    this.issueCard = document.getElementById("btn-issue-report");
    this.actionRow = document.getElementById("download-action-row");
    if (!this.featureCard || !this.issueCard || !this.actionRow) {
      return;
    }
    this.prefersReducedMotion = MotionToggleController.isReducedMotion();
    MotionToggleController.addMotionListener((reduced) => {
      this.prefersReducedMotion = reduced;
      if (reduced) {
        this.handleLeave();
      }
    });
    this.init();
  }
  init() {
    if (!this.featureCard || !this.issueCard || !this.actionRow) return;
    this.featureCard.addEventListener("pointerenter", () => this.handleFeatureEnter(), { passive: true });
    this.featureCard.addEventListener("pointerleave", () => this.handleLeave(), { passive: true });
    this.featureCard.addEventListener("focus", () => this.handleFeatureEnter(), { passive: true });
    this.featureCard.addEventListener("blur", () => this.handleLeave(), { passive: true });
    this.issueCard.addEventListener("pointerenter", () => this.handleIssueEnter(), { passive: true });
    this.issueCard.addEventListener("pointerleave", () => this.handleLeave(), { passive: true });
    this.issueCard.addEventListener("focus", () => this.handleIssueEnter(), { passive: true });
    this.issueCard.addEventListener("blur", () => this.handleLeave(), { passive: true });
  }
  handleFeatureEnter() {
    if (!this.actionRow || !this.featureCard || this.prefersReducedMotion) return;
    this.actionRow.classList.remove("pulling-right");
    this.actionRow.classList.add("pulling-left");
    this.featureCard.classList.add("is-active-hover");
    this.retriggerAnimation(this.featureCard);
  }
  handleIssueEnter() {
    if (!this.actionRow || !this.issueCard || this.prefersReducedMotion) return;
    this.actionRow.classList.remove("pulling-left");
    this.actionRow.classList.add("pulling-right");
    this.issueCard.classList.add("is-active-hover");
    this.retriggerAnimation(this.issueCard);
  }
  handleLeave() {
    if (!this.actionRow) return;
    this.actionRow.classList.remove("pulling-left", "pulling-right");
    if (this.featureCard) this.featureCard.classList.remove("is-active-hover");
    if (this.issueCard) this.issueCard.classList.remove("is-active-hover");
  }
  retriggerAnimation(card) {
    const iconWrapper = card.querySelector(".slingshot-icon-wrapper");
    if (!iconWrapper) return;
    iconWrapper.style.animation = "none";
    void iconWrapper.offsetWidth;
    iconWrapper.style.animation = "";
  }
};

// src/landing/controllers/SectionParallaxController.ts
var SectionParallaxController = class {
  constructor(options) {
    __publicField(this, "section");
    __publicField(this, "layer");
    __publicField(this, "scrollYRate");
    __publicField(this, "scrollXRate");
    __publicField(this, "mouseXRate");
    __publicField(this, "mouseYRate");
    __publicField(this, "parallaxType");
    __publicField(this, "waveSpeed");
    __publicField(this, "waveFrequency");
    __publicField(this, "wavePhase");
    __publicField(this, "isTicking", false);
    __publicField(this, "isLooping", false);
    __publicField(this, "isInView", false);
    __publicField(this, "rafId", null);
    __publicField(this, "observer", null);
    __publicField(this, "cleanupListeners", []);
    // gyroscope / pointer (normalized -1 to +1)
    __publicField(this, "targetMouseX", 0);
    __publicField(this, "targetMouseY", 0);
    __publicField(this, "currentMouseX", 0);
    __publicField(this, "currentMouseY", 0);
    __publicField(this, "prefersReducedMotion", false);
    const {
      sectionId,
      layerId,
      type,
      parallaxType,
      scrollYRate = -100,
      scrollXRate = 0,
      mouseXRate = 20,
      mouseYRate = 15,
      waveSpeed = 0.3,
      waveFrequency = 1.05,
      wavePhase = 0
    } = options;
    this.section = document.getElementById(sectionId);
    this.layer = document.getElementById(layerId);
    this.scrollYRate = scrollYRate;
    this.scrollXRate = scrollXRate;
    this.mouseXRate = mouseXRate;
    this.mouseYRate = mouseYRate;
    this.waveSpeed = waveSpeed;
    this.waveFrequency = waveFrequency;
    this.wavePhase = wavePhase;
    const requestedType = parallaxType || type;
    if (requestedType) {
      this.parallaxType = requestedType;
    } else if (sectionId === "download" || this.section?.classList.contains("section-download")) {
      this.parallaxType = "sine-wave";
    } else {
      this.parallaxType = "pointer";
    }
    if (!this.section || !this.layer) return;
    this.prefersReducedMotion = MotionToggleController.isReducedMotion();
    this.init();
  }
  isSineWave() {
    return this.parallaxType === "sine-wave" || this.parallaxType === "wave" || this.parallaxType === "passive-wave" || this.parallaxType === "passive";
  }
  getParallaxType() {
    return this.parallaxType;
  }
  init() {
    if (!this.section) return;
    if (this.isSineWave() && this.layer) {
      this.layer.style.transition = "none";
    }
    if (typeof IntersectionObserver !== "undefined") {
      this.observer = new IntersectionObserver((entries) => {
        this.isInView = entries[0]?.isIntersecting ?? true;
        if (this.isInView) {
          if (this.isSineWave()) {
            this.startPassiveLoop();
          } else {
            this.requestUpdate();
          }
        } else {
          if (this.isSineWave()) {
            this.stopPassiveLoop();
          }
        }
      }, { rootMargin: "120px 0px 120px 0px" });
      this.observer.observe(this.section);
    } else {
      this.isInView = true;
    }
    const onScroll = () => {
      if (!this.isSineWave()) {
        this.requestUpdate();
      }
    };
    const onResize = () => {
      if (!this.isSineWave()) {
        this.requestUpdate();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    this.cleanupListeners.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });
    if (!this.isSineWave()) {
      const onPointerMove = (e) => {
        if (!this.isInView || this.prefersReducedMotion || !this.section) return;
        const rect = this.section.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          this.targetMouseX = (e.clientX - rect.left) / rect.width * 2 - 1;
          this.targetMouseY = (e.clientY - rect.top) / rect.height * 2 - 1;
          this.requestUpdate();
        }
      };
      const onPointerLeave = () => {
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.requestUpdate();
      };
      this.section.addEventListener("pointermove", onPointerMove, { passive: true });
      this.section.addEventListener("pointerleave", onPointerLeave, { passive: true });
      this.cleanupListeners.push(() => {
        this.section?.removeEventListener("pointermove", onPointerMove);
        this.section?.removeEventListener("pointerleave", onPointerLeave);
      });
    }
    const unlistenMotion = MotionToggleController.addMotionListener((reduced) => {
      this.prefersReducedMotion = reduced;
      if (reduced) {
        if (this.isSineWave()) {
          this.stopPassiveLoop();
        }
        if (this.layer) {
          this.layer.style.transform = "translate3d(0, 0, 0)";
        }
      } else {
        if (this.isSineWave()) {
          this.startPassiveLoop();
        } else {
          this.requestUpdate();
        }
      }
    });
    this.cleanupListeners.push(unlistenMotion);
    if (typeof window !== "undefined") {
      const onMotionChange = (e) => {
        const customEvent = e;
        if (customEvent.detail && typeof customEvent.detail.isReduced === "boolean") {
          this.prefersReducedMotion = customEvent.detail.isReduced;
          if (this.prefersReducedMotion) {
            if (this.isSineWave()) {
              this.stopPassiveLoop();
            }
            if (this.layer) this.layer.style.transform = "translate3d(0, 0, 0)";
          } else {
            if (this.isSineWave()) {
              this.startPassiveLoop();
            } else {
              this.requestUpdate();
            }
          }
        }
      };
      window.addEventListener("paraflow:motion-change", onMotionChange);
      this.cleanupListeners.push(() => {
        window.removeEventListener("paraflow:motion-change", onMotionChange);
      });
    }
    if (this.isSineWave()) {
      this.startPassiveLoop();
    } else {
      this.updateParallax();
    }
  }
  startPassiveLoop() {
    if (this.isLooping || !this.isInView || this.prefersReducedMotion) return;
    this.isLooping = true;
    const loop = (timestamp) => {
      if (!this.isLooping || !this.isInView || this.prefersReducedMotion) {
        this.isLooping = false;
        this.rafId = null;
        return;
      }
      this.updateParallax(timestamp);
      const raf2 = typeof window.requestAnimationFrame === "function" ? (cb) => window.requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
      this.rafId = raf2(loop);
    };
    const raf = typeof window.requestAnimationFrame === "function" ? (cb) => window.requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
    this.rafId = raf(loop);
  }
  stopPassiveLoop() {
    this.isLooping = false;
    if (this.rafId !== null) {
      if (typeof window !== "undefined" && typeof window.cancelAnimationFrame === "function") {
        window.cancelAnimationFrame(this.rafId);
      } else {
        clearTimeout(this.rafId);
      }
      this.rafId = null;
    }
  }
  requestUpdate() {
    if (this.isSineWave()) {
      this.startPassiveLoop();
      return;
    }
    if (!this.isTicking && this.isInView) {
      this.isTicking = true;
      const raf = typeof window.requestAnimationFrame === "function" ? (cb) => window.requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
      raf(() => {
        this.updateParallax();
        this.isTicking = false;
      });
    }
  }
  updateParallax(timestamp) {
    const isReduced = this.prefersReducedMotion || MotionToggleController.isReducedMotion();
    if (!this.section || !this.layer) return;
    if (isReduced) {
      this.layer.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    const rect = this.section.getBoundingClientRect();
    const winHeight = window.innerHeight || 800;
    if (rect.bottom < -60 || rect.top > winHeight + 60) return;
    const totalRange = winHeight + rect.height;
    const progress = (winHeight - rect.top) / totalRange;
    const centeredProgress = Math.max(0, Math.min(1, progress)) - 0.5;
    const scrollY = centeredProgress * this.scrollYRate;
    const scrollX = centeredProgress * this.scrollXRate;
    let dynamicX = 0;
    let dynamicY = 0;
    if (this.isSineWave()) {
      const now = timestamp ?? (typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now());
      const angle = now * 1e-3 * this.waveFrequency * this.waveSpeed + this.wavePhase;
      const waveX = Math.sin(angle);
      const waveY = Math.cos(angle * 0.85);
      dynamicX = waveX * this.mouseXRate;
      dynamicY = waveY * this.mouseYRate;
    } else {
      this.currentMouseX += (this.targetMouseX - this.currentMouseX) * 0.12;
      this.currentMouseY += (this.targetMouseY - this.currentMouseY) * 0.12;
      if (Math.abs(this.targetMouseX - this.currentMouseX) > 2e-3 || Math.abs(this.targetMouseY - this.currentMouseY) > 2e-3) {
        this.requestUpdate();
      }
      dynamicX = this.currentMouseX * this.mouseXRate;
      dynamicY = this.currentMouseY * this.mouseYRate;
    }
    const totalX = scrollX + dynamicX;
    const totalY = scrollY + dynamicY;
    this.layer.style.transform = `translate3d(${totalX.toFixed(1)}px, ${totalY.toFixed(1)}px, 0)`;
  }
  destroy() {
    this.stopPassiveLoop();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.cleanupListeners.forEach((cleanup) => cleanup());
    this.cleanupListeners = [];
  }
};

// src/landing/controllers/I18nLandingController.ts
var I18nLandingController = class {
  constructor() {
    __publicField(this, "messages", {});
  }
  async init() {
    try {
      if (typeof chrome !== "undefined" && chrome.i18n && typeof chrome.i18n.getMessage === "function") {
        this.applyLocalization((key) => chrome.i18n.getMessage(key));
        return;
      }
      const res = await fetch("_locales/en/landing.json");
      if (res.ok) {
        this.messages = await res.json();
        this.applyLocalization((key) => this.messages[key]?.message);
      }
    } catch {
    }
  }
  applyLocalization(getMessage) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) {
        const msg = getMessage(key);
        if (msg) {
          el.textContent = msg;
        }
      }
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key) {
        const msg = getMessage(key);
        if (msg) {
          el.setAttribute("title", msg);
        }
      }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key) {
        const msg = getMessage(key);
        if (msg) {
          el.setAttribute("aria-label", msg);
        }
      }
    });
    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      if (key) {
        const msg = getMessage(key);
        if (msg) {
          el.setAttribute("content", msg);
        }
      }
    });
  }
};

// src/landing/client.ts
function hydrateIsland(sectionId, factory, rootMargin = "250px") {
  const section = document.getElementById(sectionId);
  if (!section) return;
  if (typeof IntersectionObserver === "undefined") {
    factory();
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          obs.disconnect();
          factory();
          break;
        }
      }
    },
    { rootMargin }
  );
  observer.observe(section);
}
function initApp() {
  if (typeof document !== "undefined" && document.body) {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document.body.classList.add("page-ready");
      }).catch(() => {
        document.body.classList.add("page-ready");
      });
    } else {
      document.body.classList.add("page-ready");
    }
  }
  const i18n = new I18nLandingController();
  i18n.init();
  new NavigationController();
  new MotionToggleController();
  new HeroCarouselController();
  hydrateIsland("mission", () => {
    new SectionParallaxController({
      sectionId: "mission",
      layerId: "parallax-layer-land",
      scrollYRate: -65,
      scrollXRate: 20,
      mouseXRate: 15,
      mouseYRate: 10
    });
    new SectionParallaxController({
      sectionId: "mission",
      layerId: "parallax-layer-dust-far",
      scrollYRate: -35,
      scrollXRate: 10,
      mouseXRate: 8,
      mouseYRate: 6
    });
    new SectionParallaxController({
      sectionId: "mission",
      layerId: "parallax-layer-dust-mid",
      scrollYRate: -110,
      scrollXRate: -30,
      mouseXRate: 28,
      mouseYRate: 20
    });
    new SectionParallaxController({
      sectionId: "mission",
      layerId: "parallax-layer-dust-near",
      scrollYRate: -200,
      scrollXRate: 55,
      mouseXRate: 48,
      mouseYRate: 35
    });
  });
  hydrateIsland("cognitive-science", () => {
    new SectionParallaxController({
      sectionId: "cognitive-science",
      layerId: "parallax-layer-grid-station",
      scrollYRate: 0,
      scrollXRate: 0,
      mouseXRate: 0,
      mouseYRate: 0
    });
    new SectionParallaxController({
      sectionId: "cognitive-science",
      layerId: "parallax-layer-grid-window",
      scrollYRate: -45,
      scrollXRate: -15,
      mouseXRate: -10,
      mouseYRate: -8
    });
    new SectionParallaxController({
      sectionId: "cognitive-science",
      layerId: "parallax-layer-grid-far",
      scrollYRate: -95,
      scrollXRate: 25,
      mouseXRate: 20,
      mouseYRate: 14
    });
    new SectionParallaxController({
      sectionId: "cognitive-science",
      layerId: "parallax-layer-grid-near",
      scrollYRate: -175,
      scrollXRate: -45,
      mouseXRate: -35,
      mouseYRate: -25
    });
    new SectionParallaxController({
      sectionId: "cognitive-science",
      layerId: "parallax-layer-grid-dust",
      scrollYRate: -245,
      scrollXRate: 60,
      mouseXRate: 48,
      mouseYRate: 32
    });
    new CognitiveSliderController();
  });
  hydrateIsland("demo", () => {
    const elements = {
      passageTitle: document.getElementById("demo-passage-title"),
      statusBadge: document.getElementById("demo-status"),
      textSelect: document.getElementById("text-selector"),
      ghostLine: document.getElementById("ghost-line"),
      activeChunk: document.getElementById("active-chunk"),
      lookaheadLine: document.getElementById("lookahead-line"),
      btnPlayPause: document.getElementById("btn-play-pause"),
      playPauseLabel: document.getElementById("play-pause-label"),
      btnStepBack: document.getElementById("btn-step-back"),
      btnStepFwd: document.getElementById("btn-step-fwd"),
      btnReset: document.getElementById("btn-reset"),
      wpmSlider: document.getElementById("wpm-slider"),
      wpmDisplay: document.getElementById("wpm-display"),
      chunkSelect: document.getElementById("chunk-select")
    };
    if (elements.activeChunk && elements.btnPlayPause) {
      new DemoSandboxController(elements);
    }
  });
  hydrateIsland("practice", () => {
    new SectionParallaxController({
      sectionId: "practice",
      layerId: "parallax-layer-dots-dispersed",
      scrollYRate: -65,
      scrollXRate: 20,
      mouseXRate: 15,
      mouseYRate: 10
    });
    new SectionParallaxController({
      sectionId: "practice",
      layerId: "parallax-layer-dots-top-bot",
      scrollYRate: -130,
      scrollXRate: -25,
      mouseXRate: -20,
      mouseYRate: 16
    });
    new SectionParallaxController({
      sectionId: "practice",
      layerId: "parallax-layer-dots-topleft-botright",
      scrollYRate: -195,
      scrollXRate: 40,
      mouseXRate: 32,
      mouseYRate: 24
    });
    new SectionParallaxController({
      sectionId: "practice",
      layerId: "parallax-layer-dots-left-right",
      scrollYRate: -260,
      scrollXRate: -50,
      mouseXRate: -42,
      mouseYRate: 32
    });
  });
  hydrateIsland("ergonomics", () => {
    new ErgoFoldController();
    new ErgoStudioController();
  });
  hydrateIsland("download", () => {
    new SectionParallaxController({
      sectionId: "download",
      layerId: "parallax-layer-waves-far",
      parallaxType: "sine-wave",
      scrollYRate: -40,
      scrollXRate: 15,
      mouseXRate: 12,
      mouseYRate: 8,
      wavePhase: 0
    });
    new SectionParallaxController({
      sectionId: "download",
      layerId: "parallax-layer-waves-mid",
      parallaxType: "sine-wave",
      scrollYRate: -95,
      scrollXRate: -25,
      mouseXRate: -22,
      mouseYRate: 16,
      wavePhase: 2.1
    });
    new SectionParallaxController({
      sectionId: "download",
      layerId: "parallax-layer-waves-near",
      parallaxType: "sine-wave",
      scrollYRate: -180,
      scrollXRate: 45,
      mouseXRate: 38,
      mouseYRate: 28,
      wavePhase: 4.2
    });
    new DownloadSlingshotController();
  });
  if (typeof window !== "undefined" && window.location.hash) {
    const hash = window.location.hash;
    const target = document.querySelector(hash);
    if (target && typeof target.scrollIntoView === "function") {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
}
export {
  initApp
};
