import { mkdirSync, writeFileSync } from "node:fs";
import { slangs } from "../src/data/slangs.js";

const siteUrl = process.env.SITE_URL || "https://ai-slang.com";
const today = "2026-07-11";

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanPath(file) {
  return `/${file.replace(/\.html$/, "")}`;
}

function termPath(item) {
  return `/terms/${slugify(item.word)}`;
}

function canonicalUrl(path) {
  return `${siteUrl}${path}`;
}

function pageShell({ title, description, canonical, body, jsonLd = "" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonical}">
    <link rel="stylesheet" href="/src/styles.css">
    ${jsonLd}
  </head>
  <body>
    <header class="site-header">
      <a class="logo" href="/"><span>AI</span> Slang</a>
      <div class="header-actions">
        <nav class="tabs" aria-label="Primary">
          <a class="tab is-active" href="/"><span aria-hidden="true">⌂</span> Dictionary</a>
          <a class="tab" href="/#humanizer"><span aria-hidden="true">✎</span> Humanizer</a>
          <a class="tab" href="/#about"><span aria-hidden="true">?</span> About</a>
        </nav>
        <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch color theme" aria-pressed="false">
          <span class="theme-swatch" aria-hidden="true"></span>
        </button>
      </div>
    </header>
    <main class="static-page">
      ${body}
    </main>
    <footer class="site-footer">
      <span>No legal, hiring, or investment advice. Just sharper words.</span>
      <span><a href="/about">About</a> / <a href="/contact">Contact</a> / <a href="/privacy">Privacy</a> / <a href="/terms-of-use">Terms</a> / <a href="/editorial-policy">Editorial</a></span>
    </footer>
    <script>
      const themeToggle = document.querySelector("#theme-toggle");
      document.body.dataset.theme = localStorage.getItem("theme") || "light";
      themeToggle.setAttribute("aria-pressed", String(document.body.dataset.theme === "light"));
      themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
        document.body.dataset.theme = nextTheme;
        themeToggle.setAttribute("aria-pressed", String(nextTheme === "light"));
        localStorage.setItem("theme", nextTheme);
      });
    </script>
  </body>
</html>
`;
}

function gradeBlocks(value) {
  return "█".repeat(value) + "░".repeat(5 - value);
}

function relatedTermsFor(item) {
  const related = item.relatedTerms?.length ? item.relatedTerms : slangs.filter((other) => other.word !== item.word).slice(0, 6).map((other) => other.word);
  return related
    .map((word) => slangs.find((other) => other.word === word))
    .filter(Boolean)
    .slice(0, 6);
}

function termPage(item) {
  const slug = slugify(item.word);
  const canonical = canonicalUrl(`/terms/${slug}`);
  const title = item.seoTitle || `${item.word} Meaning: AI Slang Definition, Origin, and Examples`;
  const description = item.seoDescription || `${item.word} meaning in AI slang: ${item.definition}`;
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: item.word,
    description: item.definition,
    inDefinedTermSet: `${siteUrl}/`,
    url: canonical
  })}</script>`;

  return pageShell({
    title,
    description,
    canonical,
    jsonLd,
    body: `<article class="seo-article">
        <p class="eyebrow">AI_SLANG_ENTRY</p>
        <h1>${escapeHtml(item.word)} Meaning</h1>
        <p class="article-lead">${escapeHtml(item.definition)}</p>
        <div class="vote-row">
          <span>AI_TASTE=${item.aiGrade}/5</span>
          <span>${gradeBlocks(item.aiGrade)}</span>
          <span>TREND=${escapeHtml(item.trend)}</span>
        </div>
        <section>
          <h2>What does ${escapeHtml(item.word)} mean?</h2>
          <p>${escapeHtml(item.definition)}</p>
          <p>${escapeHtml(item.plainEnglish || "In plain English, this term is useful when people are talking about AI culture, model behavior, GPT-style writing, or the weird social layer forming around new AI tools.")}</p>
        </section>
        <section>
          <h2>Origin and usage</h2>
          <p>${escapeHtml(item.origin)}</p>
          <p><strong>Source type:</strong> ${escapeHtml(item.sourceType)}. <strong>Last checked:</strong> ${escapeHtml(item.lastChecked)}.</p>
          <p>${escapeHtml(item.sourceNote)}</p>
          ${item.sourceUrl ? `<p><a class="source-link" href="${escapeHtml(item.sourceUrl)}" rel="noreferrer">Primary reference</a></p>` : ""}
        </section>
        <section>
          <h2>Examples</h2>
          <ul>
            ${item.examples.map((example) => `<li>${escapeHtml(example)}</li>`).join("\n")}
          </ul>
        </section>
        <section>
          <h2>Related AI slang</h2>
          <div class="related-grid">
            ${relatedTermsFor(item).map((other) => `<a href="${termPath(other)}">${escapeHtml(other.word)}</a>`).join("\n")}
          </div>
        </section>
      </article>`
  });
}

const articlePages = [
  {
    file: "articles/what-is-ai-slang.html",
    title: "What Is AI Slang? A Field Guide to the Words Around LLMs",
    description: "A concise guide to AI slang, GPT-ese, model memes, and the words people use around modern AI tools.",
    h1: "What Is AI Slang?",
    lead: "AI slang is the fast-moving vocabulary people use to describe model behavior, AI-written text, coding agents, synthetic content, and the culture forming around large language models.",
    sections: [
      ["Why AI slang moves fast", "AI tools change workflows quickly, and people invent shorthand before formal terminology catches up. Some words begin as research terms, some as product marketing, and some as jokes from developers trying to describe a new kind of annoyance."],
      ["The main categories", "The useful split is technical terms, cultural slang, and GPT-ese. Technical terms include RAG and context window. Cultural slang includes slop and vibe coding. GPT-ese covers words that make writing feel suspiciously machine-polished."],
      ["How to read this dictionary", "Treat each entry as an editorial definition, not legal or academic authority. When a term has a stable source, the entry links to it. When a term is community slang, the entry says so instead of pretending the origin is clean."]
    ]
  },
  {
    file: "articles/gpt-ese-words-to-avoid.html",
    title: "GPT-ese Words to Avoid: Delve, Tapestry, and Other AI Writing Tells",
    description: "A practical guide to common GPT-ese words and how to rewrite stiff AI-flavored prose into sharper human text.",
    h1: "GPT-ese Words to Avoid",
    lead: "GPT-ese is not one forbidden word. It is a pattern: polished transitions, inflated metaphors, and corporate softness that makes writing feel generated even when the facts are fine.",
    sections: [
      ["Common tells", "Words like delve, tapestry, moreover, furthermore, and game-changer are not always wrong. They become suspicious when they appear in clusters and replace specific thinking."],
      ["How to rewrite it", "Cut the ceremonial opening, name the concrete claim, and replace soft metaphors with plain verbs. If a sentence sounds like it is wearing a blazer to say nothing, make it shorter."],
      ["Use the humanizer carefully", "A humanizer should help you edit, not launder weak writing. The best result still needs a point of view, real examples, and facts you can defend."]
    ]
  },
  {
    file: "articles/ai-slang-for-indie-hackers.html",
    title: "AI Slang for Indie Hackers: Slop, Vibe Coding, RAG, and Agentic",
    description: "A short guide to AI slang indie hackers are likely to see in product launches, social feeds, and developer communities.",
    h1: "AI Slang for Indie Hackers",
    lead: "Indie hackers meet AI slang earlier than most people because they live inside launch posts, model docs, developer forums, and half-broken prototypes.",
    sections: [
      ["The words that matter first", "Start with slop, vibe coding, RAG, hallucination, agentic, and prompt engineer. These words explain a lot of modern AI product discourse without requiring a full machine learning syllabus."],
      ["Marketing words versus build words", "RAG and context window usually point to implementation details. Agentic and copilot may point to real features, but they are also easy to abuse in pitch copy."],
      ["The practical filter", "When you see a term, ask what behavior it names. If nobody can explain the behavior, it is probably just smoke from the launch deck."]
    ]
  },
  {
    file: "articles/gpt-live-vs-voice-mode.html",
    title: "GPT Live vs Voice Mode: What the AI Product Term Means",
    description: "A plain-English guide to GPT Live, live AI voice, full-duplex conversation, and how it differs from older turn-based voice assistants.",
    h1: "GPT Live vs Voice Mode",
    lead: "GPT Live is the product-shaped phrase people use when AI voice starts acting less like turn-based dictation and more like a continuous assistant conversation.",
    sections: [
      ["What changed", "Older voice assistants often waited for a clean pause before answering. GPT Live-style systems are discussed around full-duplex behavior: listening, acknowledging, speaking, translating, or working while the conversation continues."],
      ["Why builders care", "Live voice matters when the interface is the product. Translation, coaching, accessibility, support, and meeting workflows all feel different when the assistant can handle interruptions and recover from messy human timing."],
      ["What to compare it with", "Compare GPT Live with computer use, tool calling, agentic workflows, and reasoning models. The useful question is not whether the demo sounds human; it is what the system can reliably do while the user keeps talking."]
    ]
  },
  {
    file: "articles/llm-burnout-ai-cost-fatigue.html",
    title: "LLM Burnout: AI Bills, Tool Churn, and Model Fatigue",
    description: "A short guide to LLM burnout, AI cost fatigue, prompt babysitting, unreliable outputs, and when a simpler workflow beats another model subscription.",
    h1: "LLM Burnout",
    lead: "LLM burnout is what happens when the AI stack meant to save time becomes a second workload made of subscriptions, prompts, evals, context cleanup, and trust checks.",
    sections: [
      ["The cost side", "AI bills create a concrete version of fatigue. Teams notice the subscription stack, API usage, premium model limits, and the cost of running evals before they know whether the workflow pays for itself."],
      ["The work side", "The hidden work is prompt rewriting, checking hallucinations, switching tools, preserving context, and explaining why a demo failed in production. That overhead can turn enthusiasm into skepticism."],
      ["The practical alternative", "The answer is not always a bigger model. Sometimes it is prompt caching, narrower tool calling, local workflows, better evals, or deciding that a normal script is the cheaper and calmer interface."]
    ]
  }
];

function articlePage(article) {
  const canonical = canonicalUrl(cleanPath(article.file));
  return pageShell({
    title: article.title,
    description: article.description,
    canonical,
    jsonLd: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: today,
      dateModified: today,
      author: { "@type": "Organization", name: "AI Slang Hub" },
      mainEntityOfPage: canonical
    })}</script>`,
    body: `<article class="seo-article">
        <p class="eyebrow">AI_SLANG_GUIDE</p>
        <h1>${escapeHtml(article.h1)}</h1>
        <p class="article-lead">${escapeHtml(article.lead)}</p>
        ${article.sections.map(([heading, text]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`).join("\n")}
        <section>
          <h2>Browse the dictionary</h2>
          <div class="related-grid">
            ${slangs.slice(0, 12).map((item) => `<a href="${termPath(item)}">${escapeHtml(item.word)}</a>`).join("\n")}
          </div>
        </section>
      </article>`
  });
}

const policyPages = [
  {
    file: "privacy.html",
    title: "Privacy Policy",
    description: "Privacy policy for AI Slang Hub.",
    h1: "Privacy Policy",
    lead: "AI Slang Hub is built as a lightweight dictionary and editing tool. The MVP is static-first and intentionally avoids account tracking.",
    sections: [
      ["Information we process", "If you use the Humanizer, the text you submit may be sent to the configured AI provider only to generate the requested response. Do not paste secrets, passwords, private documents, or sensitive personal data."],
      ["Analytics and hosting", "Our hosting, analytics, and security providers may process IP addresses, browser or device information, requested pages, timestamps, and referral data to operate, protect, and improve the site."],
      ["Advertising cookies", "AI Slang Hub may use third-party advertising services, including Google AdSense. Third-party vendors, including Google, may use cookies to serve and measure ads based on a visitor's prior visits to this website or other websites."],
      ["Advertising choices", "You can control or opt out of personalized Google advertising at https://adssettings.google.com/. Additional industry opt-out choices are available at https://www.aboutads.info/choices/."],
      ["Contact", "For privacy questions or deletion requests related to a message you sent, email hello@ai-slang.com."]
    ]
  },
  {
    file: "about.html",
    title: "About AI Slang Hub",
    description: "About AI Slang Hub, its editorial purpose, sourcing rules, and independent status.",
    h1: "About AI Slang Hub",
    lead: "AI Slang Hub is an independent dictionary and writing tool for the fast-moving language around AI products, research, developer culture, and generated text.",
    sections: [
      ["What we publish", "We explain technical terms, product language, community slang, and common AI writing tells in plain English. Entries include source type and last-checked information so readers can distinguish stable terminology from newer editorial or community usage."],
      ["How corrections work", "Definitions are reviewed against primary product documentation, research papers, or clearly identified community evidence where available. Readers can send corrections with the page URL and a reliable source to hello@ai-slang.com."],
      ["Independent status", "AI Slang Hub is independently operated and is not affiliated with, endorsed by, or sponsored by OpenAI, Google, Anthropic, Microsoft, or other companies mentioned in its entries."]
    ]
  },
  {
    file: "contact.html",
    title: "Contact AI Slang Hub",
    description: "Contact AI Slang Hub about definition corrections, sources, privacy, or accessibility.",
    h1: "Contact AI Slang Hub",
    lead: "Email hello@ai-slang.com for definition corrections, primary-source suggestions, privacy requests, accessibility reports, or general feedback.",
    sections: [
      ["Correction requests", "Include the page URL, the exact wording that needs review, and a primary or otherwise reliable source. Explain whether the issue concerns the definition, origin, example, category, or last-checked date."],
      ["What we cannot provide", "AI Slang Hub does not provide legal, hiring, investment, academic, or security advice. We also cannot provide account support for companies or products mentioned in the dictionary."],
      ["Response expectations", "Clear factual corrections and privacy or accessibility requests receive priority. Sending a suggestion does not guarantee that a term or submitted wording will be published."]
    ]
  },
  {
    file: "terms-of-use.html",
    title: "Terms of Use",
    description: "Terms of use for AI Slang Hub.",
    h1: "Terms of Use",
    lead: "Use AI Slang Hub as an editorial reference and writing aid, not as legal, academic, hiring, or safety advice.",
    sections: [
      ["Editorial content", "Definitions are written in a sharp editorial style. They may summarize cultural usage and should not be treated as official definitions."],
      ["Humanizer output", "Humanizer output may be inaccurate, awkward, or incomplete. You are responsible for reviewing text before publishing it."],
      ["Acceptable use", "Do not use the tool to impersonate others, hide misconduct, submit deceptive academic work, or process data you are not allowed to share."]
    ]
  },
  {
    file: "editorial-policy.html",
    title: "Editorial Policy",
    description: "How AI Slang Hub writes, sources, and updates slang definitions.",
    h1: "Editorial Policy",
    lead: "AI Slang Hub mixes culture-aware writing with source-aware editing. The voice can be spicy; the claims still need guardrails.",
    sections: [
      ["Review status", "Last reviewed July 11, 2026. Each entry labels its source type and last-checked date so readers can separate stable technical terms, product language, community slang, and editorial shorthand."],
      ["Source handling", "When a term has a stable reference, we link it. When a term is community slang with no clean origin, we say so instead of inventing certainty."],
      ["Verification labels", "Product-term and technical-term entries should point to primary documentation when available. Community entries may use credible reporting or research, but they must not turn a disputed origin into a confirmed fact. Editorial entries are interpretation, not historical claims."],
      ["Update policy", "AI slang changes fast. Entries should be revisited when usage shifts, a better source appears, or a definition starts sounding stale."],
      ["Corrections", "Corrections should prefer precise provenance over viral claims. A good correction explains what changed and why."]
    ]
  }
];

function policyPage(page) {
  const canonical = canonicalUrl(cleanPath(page.file));
  return pageShell({
    title: page.title,
    description: page.description,
    canonical,
    body: `<article class="seo-article">
        <p class="eyebrow">SITE_POLICY</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="article-lead">${escapeHtml(page.lead)}</p>
        ${page.sections.map(([heading, text]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`).join("\n")}
      </article>`
  });
}

mkdirSync("terms", { recursive: true });
mkdirSync("articles", { recursive: true });

for (const item of slangs) {
  writeFileSync(`terms/${slugify(item.word)}.html`, termPage(item));
}

for (const article of articlePages) {
  writeFileSync(article.file, articlePage(article));
}

for (const page of policyPages) {
  writeFileSync(page.file, policyPage(page));
}

const sitemapUrls = [
  `${siteUrl}/`,
  ...slangs.map((item) => canonicalUrl(termPath(item))),
  ...articlePages.map((article) => canonicalUrl(cleanPath(article.file))),
  ...policyPages.map((page) => canonicalUrl(cleanPath(page.file)))
];

writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);

writeFileSync("robots.txt", `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);

console.log(`Generated ${slangs.length} term pages, ${articlePages.length} articles, ${policyPages.length} policy pages, robots.txt, and sitemap.xml.`);
