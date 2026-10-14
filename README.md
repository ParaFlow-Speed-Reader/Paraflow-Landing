# ParaFlow Speed Reader — Official Landing Page & Interactive Sandbox

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Telemetry](https://img.shields.io/badge/Privacy-100%25%20Local%20%7C%20Zero%20Tracking-brightgreen.svg)](#privacy--security-guarantee)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-success.svg)](#accessibility--motion-controls)
[![Precompressed Assets](https://img.shields.io/badge/Compression-Gzip%20%2B%20Brotli-orange.svg)](#performance-optimization--precompression)
[![Browser Support](https://img.shields.io/badge/Browsers-Firefox%20%7C%20Chrome%20%7C%20Safari%20%7C%20Edge-purple.svg)](#browser-compatibility)

**High-performance, cognitive-science-grounded showcase and interactive web portal for the ParaFlow Speed Reader browser extension.**

[Live Demonstration](#live-demonstration--preview) • [Key Features](#key-features--highlights) • [Quick Start](#zero-configuration-local-preview) • [Project Structure](#repository-structure) • [Deployment](#deployment-guide) • [Privacy Pledge](#privacy--security-guarantee)

---

</div>

## Overview

Traditional RSVP (Rapid Serial Visual Presentation) speed-reading applications flash isolated, single words in place. While this eliminates saccadic eye movements, cognitive reading research demonstrates that it severely disrupts comprehension by depriving the brain of **parafoveal preview context**, degrading clause-boundary processing, and inducing mental disorientation.

**ParaFlow** solves this cognitive bottleneck with a multi-tiered sliding-window viewport featuring:
- **Stationary Reticle Fixation:** Anchors the eye at the Optical Recognition Point (ORP, 30–40% into word length), eliminating fatigue and micro-saccades.
- **Parafoveal Preview Lines:** Ghost lines and collapsing past-context buffers retain natural syntactic flow.
- **Dynamic Cadence Pacing:** Punctuation weights (commas 1.3×, periods 1.6×, paragraph resets 2.0×) match the brain’s natural cognitive cadence.

This repository hosts the **production-ready static landing page**, interactive simulation sandbox, and download distribution hub for the extension.

---

## Live Demonstration & Preview

- **Official Web Portal:** [https://paraflow-speed-reader.github.io/Paraflow-Landing](https://paraflow-speed-reader.github.io/Paraflow-Landing)
- **Extension Repository:** [ParaFlow-Speed-Reader](https://github.com/ParaFlow-Speed-Reader)
- **Issue Tracker:** [Bug Reports & Feedback](https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/issues)
- **Community RFCs:** [Feature Ideas & Discussions](https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/discussions)

---

## Key Features & Highlights

### 1. Interactive Speed Reading Simulator
An in-page interactive workbench allowing users to experience the difference between traditional single-word flashers and ParaFlow's sliding-window ORP technology:
- **Chunk Size Selection:** Toggle dynamically between 1-word, 2-word, and 3-word focal fields.
- **Real-Time Reticle Highlighting:** High-contrast character fixation highlights anchored to the optimal optical recognition point.
- **Zero CLS Dynamic Text Replacement:** Smooth, zero Cumulative Layout Shift sentence progression.

### 2. Dual Cognitive Science Matrix
A comparative matrix contrasting conventional reading challenges against ParaFlow's neuro-ergonomic design:
- **Scientific Mode:** Complete citations, optical physics, and psychological theory (Keith Rayner, Just & Carpenter, McConkie).
- **ELI10 Mode ("Explain Like I'm 10"):** Jargon-free, accessible plain English explanations with interactive slider threshold controls.
- **Zero-CLS Dual Cell Hydration:** Pre-rendered dual text sets ensure zero layout shift when toggling reading modes.

### 3. Multi-Strata Fluid Wave Parallax
- **3-Layer Parallax Architecture:** Far, mid, and near wave contours moving in subtle harmonic ratios.
- **Passive Sine-Wave Dynamics:** Butter-smooth 60fps hardware-accelerated animations using CSS transforms and RAF loops.

### 4. Accessibility & Motion Controls
- **Floating Motion Toggle:** Dedicated control allowing visitors to instantly freeze all background animations and parallax effects.
- **OS Reduced Motion Respect:** Automatically honors the visitor's `prefers-reduced-motion: reduce` system preference.
- **Keyboard Navigation & High Contrast:** Complete ARIA attributes, semantic landmarks, and WCAG 2.1 AA compliant color ratios across all themes.

### 5. Dual Visual Theme Engine
- **Obsidian Dark & Crisp Light Modes:** Hand-tailored CSS custom property tokens tailored for reading comfort in any lighting environment.
- **Non-Invasive System Sync:** Detects browser dark/light mode preference with instant local manual toggle override.

### 6. Multi-Browser Distribution Hub
- **Direct Downloads:** One-click links for direct extension package releases (`.xpi` for Firefox, `.zip` for Chromium).
- **Browser Store Links:** Direct pathways for Mozilla Firefox AMO, Google Chrome Web Store, and Apple Safari.
- **Integrated Feedback Slingshot Cards:** Direct, accessible channels to submit feature ideas to GitHub Discussions and report defects to GitHub Issues.

---

## Repository Structure

```
landing-page-dist/
├── index.html                   # Primary production HTML (minified, critical CSS inlined)
├── index.html.gz / .br          # Precompressed Gzip and Brotli variants
├── index.standalone.html        # 100% self-contained offline single-file edition
├── index.standalone.html.gz/.br # Precompressed standalone variants
├── full-detailed-index.html     # Expanded diagnostic HTML with inline comments
├── favicon.svg                  # High-density SVG brand vector icon
├── js/
│   ├── front-end-public.js      # Production bundled client interaction engine
│   └── full-detailed-parallax.js# Standalone parallax coordinate controller
├── style/
│   └── style.css                # Production minified stylesheet and design tokens
├── static/
│   ├── svg/                     # Vector icons, wave contours, and illustration shards
│   ├── img/                     # High-resolution demonstration media
│   └── sized-images/            # Responsive WebP picture sets with JPG fallbacks
├── _locales/
│   └── en/landing.json          # Complete i18n localization dictionary
└── README.md                    # Project documentation and deployment guide
```

---

## Zero-Configuration Local Preview

Because this distribution is entirely pre-compiled and self-contained, no build tools, Node.js packages, or compilers are needed to preview the site locally.

### Option 1: Python HTTP Server (Built-in)
```bash
# Python 3
python -m http.server 8080

# Then open: http://localhost:8080
```

### Option 2: Node / npx serve
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` inside VS Code and select **"Open with Live Server"**.

### Option 4: Standalone Offline File (No Web Server Required)
Simply double-click `index.standalone.html` in your file explorer. All stylesheets, scripts, and SVG vectors are inlined directly into a single file with zero external network requests.

---

## Deployment Guide

### Deploying to GitHub Pages

1. Ensure this distribution branch (`main`) is pushed to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Navigate to your repository on GitHub:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the **`main`** branch and the **`/ (root)`** folder.
   - Click **Save**.
3. Within 1–2 minutes, your landing page will be live at:
   `https://<organization>.github.io/<repository-name>/`

### Deploying to Cloudflare Pages / Vercel / Netlify

- **Framework Preset:** None / Static HTML
- **Root Directory:** `/` (or `landing-page-dist` if deploying from a monorepo root)
- **Build Command:** *(None required — assets are pre-built)*
- **Output Directory:** `.`

### Nginx / Caddy Precompression Optimization

Every asset in this distribution is pre-packaged with precompressed `.br` (Brotli Quality 11) and `.gz` (Gzip Level 9) sidecars. Configure your web server to serve these static files directly for near-zero TTFB (Time to First Byte):

```nginx
# Nginx sample configuration
server {
    listen 80;
    server_name reading.example.com;
    root /var/www/landing-page-dist;
    index index.html;

    # Enable precompressed static asset delivery
    gzip_static on;
    brotli_static on;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(webp|svg|jpg|png|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## Performance, Optimization & Precompression

| Metric | Target / Achievement | Technical Implementation |
| :--- | :--- | :--- |
| **Lighthouse Performance** | **98–100** | Critical CSS inlined in `<head>`, deferred script execution, zero render-blocking requests |
| **Lighthouse Accessibility** | **100** | Semantic landmarks, explicit ARIA controls, contrast ratios $\ge 4.5:1$ |
| **Lighthouse Best Practices**| **100** | Strict CSP, modern image formats, modern doctype |
| **Lighthouse SEO** | **100** | Schema.org JSON-LD `SoftwareApplication` metadata, OpenGraph tags, semantic headers |
| **Cumulative Layout Shift** | **0.000** | Explicit dimensions on media, reserved height containers for interactive cards |
| **Asset Compression** | **Gzip (L9) & Brotli (Q11)** | Dual precompressed artifacts generated during build pipeline |

---

## Privacy & Security Guarantee

- **100% Client-Side Execution:** The entire interactive reading sandbox and theme engines operate purely inside the visitor's local browser memory.
- **Zero Third-Party Telemetry:** Zero analytics trackers, zero advertising beacons, and zero external font or script CDNs.
- **Zero Cookie Overhead:** No cookies, local session storage tracking, or digital fingerprinting of any kind.
- **Hardened Content Security Policy (CSP):** All scripts are locally bundled; zero `eval()`, zero `new Function()`, and zero remote script execution.

---

## Browser Compatibility

| Browser | Minimum Version | Status |
| :--- | :--- | :--- |
| **Mozilla Firefox** | 115.0 ESR+ | Full Support (Primary reference target) |
| **Google Chrome / Chromium** | 110.0+ | Full Support |
| **Microsoft Edge** | 110.0+ | Full Support |
| **Apple Safari** | 16.4+ | Full Support |
| **Mobile Browsers** | Safari iOS 16+, Chrome Android | Full Responsive Touch Support |

---

## Community & Feedback

We welcome feedback, issues, and ideas from readers, developers, and researchers:

- 🐛 **Encountered an issue or defect?** Open a report in [GitHub Issues](https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/issues).
- 💡 **Have an idea or architectural suggestion?** Start a thread in [GitHub Discussions](https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/discussions).
- 📦 **Download Releases:** View packaged builds on the [Releases Page](https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/releases).

---

## Academic References & Literature

1. **Rayner, K. (1998).** *Eye movements in reading and information processing: 20 years of research.* Psychological Bulletin, 124(3), 372–422. [doi:10.1037/0033-2909.124.3.372](https://doi.org/10.1037/0033-2909.124.3.372)
2. **Just, M. A., & Carpenter, P. A. (1980).** *A theory of reading: From eye fixations to comprehension.* Psychological Review, 87(4), 329–354. [doi:10.1037/0033-295X.87.4.329](https://doi.org/10.1037/0033-295X.87.4.329)
3. **McConkie, G. W., & Rayner, K. (1975).** *The span of the effective stimulus during a fixation in reading.* Perception & Psychophysics, 17(6), 578–586. [doi:10.1016/0010-0285(79)90009-8](https://doi.org/10.1016/0010-0285(79)90009-8)

---

## License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
