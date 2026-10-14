var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
var StackedDeckController = HeroCarouselController;
export {
  HeroCarouselController,
  StackedDeckController
};
