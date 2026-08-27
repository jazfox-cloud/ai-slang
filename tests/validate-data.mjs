import { slangs } from "../src/data/slangs.js";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const seen = new Set();
const seenSlugs = new Map();
const sourceTypes = new Set(["paper", "wiki", "community", "product-term", "technical-term", "editorial", "unknown"]);

for (const item of slangs) {
  const required = ["word", "definition", "origin", "examples", "aiGrade", "trend", "sourceType", "sourceNote", "sourceUrl", "lastChecked"];
  for (const key of required) {
    if (item[key] === undefined || (key !== "sourceUrl" && item[key] === "")) {
      throw new Error(`${item.word || "unknown"} is missing ${key}`);
    }
  }
  if (!sourceTypes.has(item.sourceType)) {
    throw new Error(`${item.word} has invalid sourceType: ${item.sourceType}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.lastChecked)) {
    throw new Error(`${item.word} has invalid lastChecked: ${item.lastChecked}`);
  }
  if (seen.has(item.word.toLowerCase())) {
    throw new Error(`Duplicate word: ${item.word}`);
  }
  seen.add(item.word.toLowerCase());
  const slug = item.word.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (seenSlugs.has(slug)) {
    throw new Error(`Duplicate slug: ${item.word} and ${seenSlugs.get(slug)} both produce ${slug}`);
  }
  seenSlugs.set(slug, item.word);
  if (!Array.isArray(item.examples) || item.examples.length < 2) {
    throw new Error(`${item.word} needs at least two examples`);
  }
  if (item.aiGrade < 1 || item.aiGrade > 5) {
    throw new Error(`${item.word} has invalid aiGrade`);
  }
  for (const relatedTerm of item.relatedTerms || []) {
    if (!slangs.some((candidate) => candidate.word === relatedTerm)) {
      throw new Error(`${item.word} links to missing related term: ${relatedTerm}`);
    }
  }
}

function read(path) {
  return readFileSync(path, "utf8");
}

function jsonLdObjects(path) {
  const content = read(path);
  return [...content.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match, index) => {
      try {
        return JSON.parse(match[1]);
      } catch (error) {
        throw new Error(`${path} has invalid JSON-LD script ${index}: ${error.message}`);
      }
    });
}

function assertDefinedTermHasNoDateModified(path) {
  const definedTerm = jsonLdObjects(path).find((object) => object["@type"] === "DefinedTerm");
  if (!definedTerm) {
    throw new Error(`${path} is missing DefinedTerm JSON-LD`);
  }
  if (Object.hasOwn(definedTerm, "dateModified")) {
    throw new Error(`${path} DefinedTerm JSON-LD must not include dateModified`);
  }
}

function assertNoPublicHtmlUrls(path, content) {
  const patterns = [
    /<loc>[^<]+\.html<\/loc>/,
    /<link rel="canonical" href="[^"]+\.html">/,
    /href="\/[^"]+\.html"/,
    /href="\.\/[^"]+\.html"/,
    /"url":"https:\/\/ai-slang\.com\/[^"]+\.html"/,
    /"mainEntityOfPage":"https:\/\/ai-slang\.com\/[^"]+\.html"/
  ];

  for (const pattern of patterns) {
    if (pattern.test(content)) {
      throw new Error(`${path} contains a public .html URL that can trigger GSC Page with redirect issues`);
    }
  }
}

const generatedFiles = [
  ...readdirSync(".").filter((file) => file.endsWith(".html")),
  "sitemap.xml",
  ...readdirSync("terms").map((file) => `terms/${file}`),
  ...readdirSync("articles").map((file) => `articles/${file}`)
].filter((file) => file.endsWith(".html") || file.endsWith(".xml"));

if (existsSync("terms.html")) {
  throw new Error("terms.html conflicts with the /terms/ dictionary directory; use terms-of-use.html instead");
}

for (const file of generatedFiles) {
  const content = read(file);
  assertNoPublicHtmlUrls(file, content);
  if (/hello@ai-slang\.com|cdn-cgi\/l\/email-protection/.test(content)) {
    throw new Error(`${file} exposes an email address to Cloudflare Email Protection`);
  }
}

const disclosureTerms = slangs.filter((item) => /ai(?:-generated)? content disclosure/i.test(item.word));
if (disclosureTerms.length !== 1 || disclosureTerms[0].word !== "AI Content Disclosure") {
  throw new Error(`Expected exactly one canonical AI content disclosure data entry, found ${disclosureTerms.length}`);
}

const disclosureFiles = readdirSync("terms").filter((file) => /ai(?:-generated)?-content-disclosure\.html$/.test(file));
if (disclosureFiles.length !== 1 || disclosureFiles[0] !== "ai-content-disclosure.html") {
  throw new Error(`Expected exactly one indexable AI content disclosure page, found: ${disclosureFiles.join(", ") || "none"}`);
}

const disclosurePage = read("terms/ai-content-disclosure.html");
const disclosureRequirements = [
  '<link rel="canonical" href="https://ai-slang.com/terms/ai-content-disclosure">',
  '"@type":"DefinedTerm"',
  '"@type":"FAQPage"',
  "Made with AI",
  "AI-generated content",
  "Flag, label, and disclosure do not always mean the same thing",
  "A moderation flag or report is a signal sent for review",
  "Disclosure is not the same as AI detection",
  "How machine-readable signals can become visible labels",
  "creator declaration / provenance signal / platform detection → policy decision → visible disclosure",
  "c2pa.ai-disclosure",
  "TrainedAlgorithmicMedia",
  "Is “AI-generated flag” a standard metadata field?",
  "Further reading",
  "Related AI slang"
];

for (const requirement of disclosureRequirements) {
  if (!disclosurePage.includes(requirement)) {
    throw new Error(`AI Content Disclosure page is missing: ${requirement}`);
  }
}

if (disclosurePage.includes("usually means the same basic thing as an AI-generated label")) {
  throw new Error("AI-generated content flag is incorrectly defined as equivalent to an AI-generated label");
}

const sitemap = read("sitemap.xml");
const disclosureSitemapUrls = sitemap.match(/<loc>https:\/\/ai-slang\.com\/terms\/ai(?:-generated)?-content-disclosure<\/loc>/g) || [];
if (disclosureSitemapUrls.length !== 1 || !disclosureSitemapUrls[0].includes("/terms/ai-content-disclosure")) {
  throw new Error("AI Content Disclosure sitemap URL is incorrect");
}

for (const file of generatedFiles.filter((file) => file.endsWith(".html"))) {
  if (read(file).includes('href="/terms/ai-generated-content-disclosure"')) {
    throw new Error(`${file} links internally to the obsolete AI content disclosure URL`);
  }
}

const grokBuildTerm = slangs.find((item) => item.word === "Grok Build");
if (!grokBuildTerm) {
  throw new Error("Grok Build entry is missing");
}

const grokBuildPage = read("terms/grok-build.html");
const grokBuildRequirements = [
  "<title>What Is Grok Build? xAI's Coding Agent Explained</title>",
  '<link rel="canonical" href="https://ai-slang.com/terms/grok-build">',
  '"@type":"DefinedTerm"',
  '"@type":"FAQPage"',
  "Grok Build is xAI's coding agent and terminal-based development tool",
  "Grok Build versus the standard Grok assistant",
  "Is Grok Build a model, CLI, or coding agent?",
  "Agents are the running, tool-using sessions",
  "Subagents are delegated agent sessions",
  "Claude Code",
  "OpenAI's Codex",
  "Is Grok Build open source?",
  "does not mean the entire Grok Build technology stack is open source",
  "does not publish the weights of the hosted Grok models",
  "Features, models, pricing, and access conditions may change as Grok Build evolves.",
  "Verified facts and changing beta details",
  "Further reading",
  "Related AI slang"
];

for (const requirement of grokBuildRequirements) {
  if (!grokBuildPage.includes(requirement)) {
    throw new Error(`Grok Build page is missing: ${requirement}`);
  }
}

for (const file of [
  "terms/geo.html",
  "terms/aeo.html",
  "terms/chatgpt-ads.html",
  "terms/claude-opus-5.html",
  "terms/llm-discoverability.html",
  "terms/grok-build.html",
  "terms/ai-content-disclosure.html"
]) {
  assertDefinedTermHasNoDateModified(file);
  if (!read(file).includes("<strong>Last checked:</strong>")) {
    throw new Error(`${file} is missing its visible Last checked date`);
  }
}

if (!sitemap.includes("https://ai-slang.com/terms/grok-build")) {
  throw new Error("Grok Build sitemap URL is missing");
}

const opportunityTerms = [
  {
    word: "GEO",
    file: "terms/geo.html",
    requirements: [
      "What Is Generative Engine Optimization (GEO)?",
      "GEO versus SEO",
      "GEO versus AEO",
      "Where AI referral traffic fits",
      "Common misconceptions",
      "no universal GEO standard",
      "Can GEO guarantee an AI citation or recommendation?"
    ]
  },
  {
    word: "AEO",
    file: "terms/aeo.html",
    requirements: [
      "What Is Answer Engine Optimization (AEO)?",
      "AEO versus SEO",
      "AEO versus GEO",
      "AI referral traffic is an outcome, not the definition",
      "no single standards-body definition",
      "Can AEO guarantee that ChatGPT or Google cites a page?"
    ]
  },
  {
    word: "ChatGPT Ads",
    file: "terms/chatgpt-ads.html",
    requirements: [
      "What Are ChatGPT Ads?",
      "ChatGPT Ads versus GEO or AEO",
      "How ChatGPT ads pricing works",
      "paid placements",
      "not one universal public price",
      "Do ChatGPT Ads influence ChatGPT's answers?"
    ]
  },
  {
    word: "Claude Opus 5",
    file: "terms/claude-opus-5.html",
    requirements: [
      "What Is Claude Opus 5?",
      "officially announced Claude Opus 5 on July 24, 2026",
      "Claude Opus 5 versus Opus 4.8",
      "Pricing and availability",
      "Last checked: 2026-07-26",
      "$5 per million input tokens and $25 per million output tokens",
      "claude-opus-5",
      "Is Claude Opus 5 the same as Claude 5?",
      "Is Claude Opus 5 better than GPT-5?"
    ]
  },
  {
    word: "LLM Discoverability",
    file: "terms/llm-discoverability.html",
    requirements: [
      "What Is LLM Discoverability?",
      "industry usage rather than a unified technical standard",
      "How it relates to SEO, GEO, and AEO",
      "get listed by ChatGPT",
      "There is no universal public ChatGPT submission directory",
      "Being discoverable does not guarantee being cited",
      "Does ranking on Google guarantee ChatGPT citations?"
    ]
  },
  {
    word: "Agent Harness",
    file: "terms/agent-harness.html",
    requirements: [
      "What Is an Agent Harness?",
      "the runtime layer around a model",
      "Model vs agent vs harness",
      "Agent harness vs agent framework",
      "Coding agent harness",
      "Evaluation harness is a different meaning",
      "Last checked:</strong> 2026-08-25",
      "Is an agent harness the same as an AI model?",
      "Claude Managed Agents overview"
    ]
  },
  {
    word: "GPT-5.6 Sol",
    file: "terms/gpt-5-6-sol.html",
    requirements: [
      "What Is GPT-5.6 Sol?",
      "flagship capability tier",
      "Preview, general availability, and price changes",
      "June 26, 2026",
      "July 9, 2026",
      "$4 per million input tokens",
      "$0.40 per million cached input tokens",
      "$20 per million output tokens",
      "November 21, 2026",
      "272K input tokens",
      "Sol vs Terra vs Luna",
      "the `gpt-5.6` alias routes to `gpt-5.6-sol`",
      "API pricing is not a ChatGPT subscription price",
      "Is GPT-5.6 Sol the same as GPT-5.6?",
      "OpenAI API: GPT-5.6 Sol model"
    ]
  }
];

for (const term of opportunityTerms) {
  if (slangs.filter((item) => item.word === term.word).length !== 1) {
    throw new Error(`Expected exactly one ${term.word} data entry`);
  }
  const page = read(term.file);
  for (const requirement of [
    `"@type":"DefinedTerm"`,
    `"@type":"FAQPage"`,
    "Further reading",
    "Related AI slang",
    ...term.requirements
  ]) {
    if (!page.includes(requirement)) {
      throw new Error(`${term.word} page is missing: ${requirement}`);
    }
  }
  const slug = term.file.replace(/^terms\//, "").replace(/\.html$/, "");
  if (!sitemap.includes(`https://ai-slang.com/terms/${slug}`)) {
    throw new Error(`${term.word} sitemap URL is missing`);
  }
}

const performanceTermSpecs = [
  { word: "Slop", file: "terms/slop.html" },
  { word: "Vibe Coding", file: "terms/vibe-coding.html" },
  { word: "GPU Rich / GPU Poor", file: "terms/gpu-rich-gpu-poor.html" },
  { word: "A2A", file: "terms/a2a.html" }
];

for (const spec of performanceTermSpecs) {
  const item = slangs.find((candidate) => candidate.word === spec.word);
  if (!item) throw new Error(`${spec.word} performance term is missing`);
  if (!item.pageHeading) throw new Error(`${spec.word} performance term is missing pageHeading`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.dateModified || "")) {
    throw new Error(`${spec.word} performance term is missing dateModified`);
  }
  if (!item.sourceUrl || item.sourceUrl.includes("wikipedia.org")) {
    throw new Error(`${spec.word} performance term needs a non-Wikipedia primary or authoritative source`);
  }
  if (!Array.isArray(item.extraSections) || item.extraSections.length < 3) {
    throw new Error(`${spec.word} performance term needs at least three explanatory sections`);
  }
  if (!Array.isArray(item.faqItems) || item.faqItems.length < 3) {
    throw new Error(`${spec.word} performance term needs at least three FAQs`);
  }
  if (!Array.isArray(item.furtherReading) || item.furtherReading.length < 2) {
    throw new Error(`${spec.word} performance term needs at least two further-reading sources`);
  }

  const page = read(spec.file);
  if (!page.includes('"@type":"FAQPage"')) {
    throw new Error(`${spec.word} performance page is missing FAQ structured data`);
  }
  if (!page.includes("Further reading")) {
    throw new Error(`${spec.word} performance page is missing further-reading links`);
  }
}

const aiSlangHub = read("articles/what-is-ai-slang.html");
for (const target of [
  "/terms/geo",
  "/terms/slop",
  "/terms/vibe-coding",
  "/terms/a2a",
  "/terms/gpu-rich-gpu-poor"
]) {
  if (!aiSlangHub.includes(`href="${target}"`)) {
    throw new Error(`AI Slang hub is missing the performance-term link: ${target}`);
  }
}

const anthropicArticlePath = "articles/best-anthropic-model-by-task.html";
if (!existsSync(anthropicArticlePath)) {
  throw new Error("Best Anthropic Model article is missing");
}

const anthropicArticle = read(anthropicArticlePath);
for (const requirement of [
  "<title>Best Anthropic Model by Task: Coding, Writing, Research, and Reasoning</title>",
  '<link rel="canonical" href="https://ai-slang.com/articles/best-anthropic-model-by-task">',
  '"@type":"Article"',
  '"@type":"FAQPage"',
  "Best Anthropic Model by Task",
  "Last checked:</strong> August 25, 2026",
  "Quick recommendation",
  "Claude Fable 5",
  "Claude Opus 5",
  "Claude Sonnet 5",
  "Claude Haiku 4.5",
  "Best Claude model for coding",
  "Best Claude model for writing",
  "Best Claude model for research",
  "Best Claude model for reasoning",
  "Claude does not natively generate images",
  "How to choose a Claude model",
  "$2 / $10 through August 31, 2026",
  "/terms/claude-opus-5",
  "Official sources"
]) {
  if (!anthropicArticle.includes(requirement)) {
    throw new Error(`Best Anthropic Model article is missing: ${requirement}`);
  }
}

if (!sitemap.includes("https://ai-slang.com/articles/best-anthropic-model-by-task")) {
  throw new Error("Best Anthropic Model sitemap URL is missing");
}

const redirects = read("_redirects");
if (!redirects.includes("/terms/ai-generated-content-disclosure /terms/ai-content-disclosure 301") ||
    !redirects.includes("/terms/ai-generated-content-disclosure.html /terms/ai-content-disclosure 301") ||
    !redirects.includes("/terms/ai-content-disclosure.html /terms/ai-content-disclosure 301")) {
  throw new Error("Legacy AI content disclosure URL redirect is missing");
}

console.log(`Validated ${slangs.length} slang entries.`);
