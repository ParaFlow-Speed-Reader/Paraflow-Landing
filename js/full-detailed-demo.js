var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
export {
  DemoSandboxController,
  PASSAGES,
  ReadingToken,
  SlidingWindowSimulator
};
