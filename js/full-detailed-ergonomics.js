var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
export {
  ErgoFoldController,
  ErgoStudioController
};
