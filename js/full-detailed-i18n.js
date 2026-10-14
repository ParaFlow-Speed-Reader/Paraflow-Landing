var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
var I18nService = I18nLandingController;
export {
  I18nLandingController,
  I18nService
};
