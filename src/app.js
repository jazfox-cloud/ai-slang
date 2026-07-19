import { slangs } from "./data/slangs.js";

const highRiskWords = [
  "delve",
  "tapestry",
  "testament",
  "furthermore",
  "moreover",
  "game-changer",
  "agentic",
  "vertical",
  "paradigm shift",
  "spearhead",
  "unlock",
  "seamless",
  "leverage"
];

const state = {
  selected: slangs[0],
  query: ""
};

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".view");
const termList = document.querySelector("#term-list");
const wordOfDay = document.querySelector("#word-of-day");
const termDetail = document.querySelector("#term-detail");
const termCount = document.querySelector("#term-count");
const searchInput = document.querySelector("#slang-search");
const rawText = document.querySelector("#raw-text");
const rawCount = document.querySelector("#raw-count");
const humanizeBtn = document.querySelector("#humanize-btn");
const output = document.querySelector("#humanized-output");
const scoreBox = document.querySelector("#score-box");
const detectedBar = document.querySelector("#detected-words");
const copyBtn = document.querySelector("#copy-btn");
const themeToggle = document.querySelector("#theme-toggle");

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getTermUrl(item) {
  return `${location.origin}/terms/${slugify(item.word)}`;
}

function setView(view) {
  tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === view));
  panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === view));
  history.replaceState(null, "", `#${view}`);
}

function gradeStars(value) {
  return "█".repeat(value) + "░".repeat(5 - value);
}

function relatedTermsFor(item) {
  const related = item.relatedTerms?.length ? item.relatedTerms : slangs.filter((other) => other.word !== item.word).slice(0, 6).map((other) => other.word);
  return related
    .map((word) => slangs.find((other) => other.word === word))
    .filter(Boolean)
    .slice(0, 6);
}

function filteredSlangs() {
  const q = state.query.trim().toLowerCase();
  if (!q) return slangs;
  return slangs.filter((item) => {
    return [item.word, item.definition, item.origin, item.trend].some((value) => value.toLowerCase().includes(q));
  });
}

function renderList() {
  const items = filteredSlangs();
  termCount.textContent = `${items.length}_TERMS`;
  wordOfDay.innerHTML = `
    <button class="term-card featured" type="button" data-word="${slangs[0].word}">
      <b>★</b>
      <span>${slangs[0].word}</span>
      <small>${slangs[0].definition}</small>
    </button>
  `;
  termList.innerHTML = items.map((item, index) => `
    <a class="term-card ${state.selected.word === item.word ? "is-selected" : ""}" href="/terms/${slugify(item.word)}" data-word="${item.word}">
      <b>${String(index + 1).padStart(2, "0")}</b>
      <span>${item.word}</span>
      <small>${item.trend} / AI_GRADE ${item.aiGrade}</small>
    </a>
  `).join("");
}

function renderDetail() {
  const item = state.selected;
  const termUrl = getTermUrl(item);
  const encodedUrl = encodeURIComponent(termUrl);
  const encodedText = encodeURIComponent(`${item.word}: ${item.definition}`);
  termDetail.innerHTML = `
    <div class="detail-top">
      <p class="eyebrow">AI_SLANG_ENTRY</p>
      <span class="grade" title="AI taste score">${gradeStars(item.aiGrade)}</span>
    </div>
    <h1>${item.word}</h1>
    <div class="entry-meta">
      <span>by <strong>AI Slang Hub</strong></span>
      <span>checked ${item.lastChecked}</span>
      <span>source ${item.sourceType}</span>
      <a href="/terms/${slugify(item.word)}">permalink</a>
    </div>
    <p class="definition">${item.definition}</p>
    <div class="entry-actions">
      <button class="mini-action icon-action" type="button" data-share-link="${termUrl}" aria-label="Copy link"><span aria-hidden="true">↗</span><em>Copy</em></button>
      <a class="mini-action icon-action" href="https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}" target="_blank" rel="noreferrer" aria-label="Share on X"><span aria-hidden="true">𝕏</span><em>X</em></a>
      <a class="mini-action icon-action" href="https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}" target="_blank" rel="noreferrer" aria-label="Share on Reddit"><span aria-hidden="true">r/</span><em>Reddit</em></a>
      <button class="mini-action icon-action" type="button" aria-label="Flag entry"><span aria-hidden="true">!</span><em>Flag</em></button>
    </div>
    <section>
      <h2>ORIGIN</h2>
      <p>${item.origin}</p>
    </section>
    <section>
      <h2>EXAMPLES</h2>
      <ul>
        ${item.examples.map((example) => `<li>${example}</li>`).join("")}
      </ul>
    </section>
    <section>
      <h2>PROVENANCE</h2>
      <p><strong>SOURCE_TYPE:</strong> ${item.sourceType || "unknown"} / <strong>LAST_CHECKED:</strong> ${item.lastChecked || "pending"}</p>
      <p>${item.sourceNote || "Editorial note pending."}</p>
      ${item.sourceUrl ? `<a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noreferrer">OPEN_SOURCE</a>` : ""}
    </section>
    <section>
      <h2>RELATED TERMS</h2>
      <div class="related-grid">
        ${relatedTermsFor(item).map((other) => `<a href="/terms/${slugify(other.word)}">${other.word}</a>`).join("")}
      </div>
    </section>
    <div class="vote-row">
      <button class="vote-button vote-up" type="button" aria-label="Upvote"><span>▲</span><strong>Based</strong></button>
      <button class="vote-button vote-down" type="button" aria-label="Downvote"><span>▼</span><strong>Slop</strong></button>
      <span class="vote-meta">TREND=${item.trend} / AI_TASTE=${item.aiGrade}/5</span>
    </div>
  `;
}

function selectTerm(word) {
  const found = slangs.find((item) => item.word === word);
  if (!found) return;
  state.selected = found;
  renderList();
  renderDetail();
}

function localHumanize(text) {
  const clean = text.trim();
  if (!clean) {
    return { score: 0, detected_words: [], humanized_text: "No readable input. Paste a real paragraph first." };
  }
  if (!/[a-zA-Z]{3,}/.test(clean)) {
    return { score: 0, detected_words: [], humanized_text: "This does not look like readable English prose, so I will not guess." };
  }

  const detected = highRiskWords.filter((word) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(clean));
  let rewritten = clean
    .replace(/\bFurthermore,\s*/gi, "")
    .replace(/\bMoreover,\s*/gi, "")
    .replace(/\bdelve into\b/gi, "look at")
    .replace(/\btapestry of\b/gi, "mix of")
    .replace(/\btestament to\b/gi, "proof of")
    .replace(/\bgame-changer\b/gi, "useful shift")
    .replace(/\bparadigm shift\b/gi, "real change")
    .replace(/\bspearhead\b/gi, "lead")
    .replace(/\bleverage\b/gi, "use")
    .replace(/\bseamless\b/gi, "simple")
    .replace(/\bunlock\b/gi, "get");

  rewritten = rewritten.replace(/\s+/g, " ").trim();
  const stiffness = Math.min(95, 25 + detected.length * 12 + Math.max(0, clean.length - 500) / 18);
  return {
    score: Math.round(stiffness),
    detected_words: detected,
    humanized_text: rewritten || clean
  };
}

async function humanize() {
  const text = rawText.value;
  rawCount.textContent = `${text.length}_CHARS`;
  humanizeBtn.disabled = true;
  humanizeBtn.textContent = "RUNNING";

  try {
    const response = await fetch("/api/humanize", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error("api_unavailable");
    const result = await response.json();
    applyHumanizerResult(result);
  } catch {
    applyHumanizerResult(localHumanize(text));
  } finally {
    humanizeBtn.disabled = false;
    humanizeBtn.textContent = "EXECUTE_HUMANIZE";
  }
}

function applyHumanizerResult(result) {
  output.textContent = result.humanized_text || "No output.";
  scoreBox.textContent = `SCORE: ${result.score ?? "--"}`;
  const detected = result.detected_words?.length ? result.detected_words.join(", ") : "none";
  detectedBar.textContent = `DETECTED: ${detected}`;
}

tabs.forEach((tab) => tab.addEventListener("click", () => setView(tab.dataset.view)));
searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  const first = filteredSlangs()[0];
  if (first) state.selected = first;
  renderList();
  renderDetail();
});
document.addEventListener("click", (event) => {
  const shareButton = event.target.closest("[data-share-link]");
  if (shareButton) {
    navigator.clipboard.writeText(shareButton.dataset.shareLink);
    shareButton.textContent = "COPIED";
    setTimeout(() => { shareButton.textContent = "COPY_LINK"; }, 900);
    return;
  }

  const card = event.target.closest("[data-word]");
  if (card) {
    event.preventDefault();
    selectTerm(card.dataset.word);
  }
});
rawText.addEventListener("input", () => {
  rawCount.textContent = `${rawText.value.length}_CHARS`;
});
humanizeBtn.addEventListener("click", humanize);
copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.textContent);
  copyBtn.textContent = "COPIED";
  setTimeout(() => { copyBtn.textContent = "COPY"; }, 900);
});
themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;
  themeToggle.setAttribute("aria-pressed", String(nextTheme === "light"));
  localStorage.setItem("theme", nextTheme);
});

renderList();
renderDetail();
document.body.dataset.theme = localStorage.getItem("theme") || "light";
themeToggle.setAttribute("aria-pressed", String(document.body.dataset.theme === "light"));
setView(location.hash.replace("#", "") || "dictionary");
