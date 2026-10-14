var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
var CognitiveTableSliderController = CognitiveSliderController;
export {
  CognitiveSliderController,
  CognitiveTableSliderController
};
