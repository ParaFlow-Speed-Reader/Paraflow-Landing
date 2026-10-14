var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
var MissionParallaxController = SectionParallaxController;
export {
  MissionParallaxController,
  SectionParallaxController
};
