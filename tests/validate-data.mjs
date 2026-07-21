import { slangs } from "../src/data/slangs.js";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const seen = new Set();
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
  if (!Array.isArray(item.examples) || item.examples.length < 2) {
    throw new Error(`${item.word} needs at least two examples`);
  }
  if (item.aiGrade < 1 || item.aiGrade > 5) {
    throw new Error(`${item.word} has invalid aiGrade`);
  }
}

function read(path) {
  return readFileSync(path, "utf8");
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
  '"dateModified":"2026-07-17"',
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

if (!sitemap.includes("https://ai-slang.com/terms/grok-build")) {
  throw new Error("Grok Build sitemap URL is missing");
}

const redirects = read("_redirects");
if (!redirects.includes("/terms/ai-generated-content-disclosure /terms/ai-content-disclosure 301") ||
    !redirects.includes("/terms/ai-generated-content-disclosure.html /terms/ai-content-disclosure 301") ||
    !redirects.includes("/terms/ai-content-disclosure.html /terms/ai-content-disclosure 301")) {
  throw new Error("Legacy AI content disclosure URL redirect is missing");
}

console.log(`Validated ${slangs.length} slang entries.`);
