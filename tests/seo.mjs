import { readFileSync, readdirSync } from "node:fs";
import { slangs } from "../src/data/slangs.js";

const siteUrl = "https://ai-slang.com";
const targetOrphans = [
  "/terms/a2a",
  "/terms/aeo",
  "/terms/ai-content-disclosure",
  "/terms/chatgpt-ads",
  "/terms/clanker",
  "/terms/geo",
  "/terms/gpt-live",
  "/terms/memory-poisoning",
  "/terms/open-weight-ai",
  "/terms/slopsquatting",
  "/terms/speculative-decoding",
  "/terms/synthetic-users",
  "/terms/tool-poisoning",
  "/terms/workspace-agent"
];

function pagePath(file) {
  return file === "index.html" ? "/" : `/${file.replace(/\.html$/, "")}`;
}

function internalPath(href) {
  if (href.startsWith(siteUrl)) href = new URL(href).pathname;
  if (!href.startsWith("/")) return null;
  const path = href.split("#")[0].split("?")[0].replace(/\.html$/, "");
  return path || "/";
}

function requireMatch(content, pattern, label, file) {
  const match = content.match(pattern);
  if (!match) throw new Error(`${file} is missing ${label}`);
  return match[1];
}

const htmlFiles = [
  "index.html",
  ...readdirSync("terms").filter((file) => file.endsWith(".html")).map((file) => `terms/${file}`),
  ...readdirSync("articles").filter((file) => file.endsWith(".html")).map((file) => `articles/${file}`),
  "privacy.html",
  "about.html",
  "contact.html",
  "terms-of-use.html",
  "editorial-policy.html"
];
const pages = new Map(htmlFiles.map((file) => [pagePath(file), { file, content: readFileSync(file, "utf8") }]));
const sitemap = readFileSync("sitemap.xml", "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/ai-slang\.com([^<]*)<\/loc>/g)].map((match) => match[1] || "/");

if (new Set(sitemapPaths).size !== sitemapPaths.length) throw new Error("Sitemap contains duplicate URLs");
if (sitemapPaths.length !== pages.size) throw new Error(`Sitemap has ${sitemapPaths.length} URLs but ${pages.size} indexable HTML pages exist`);

const incoming = new Map([...pages.keys()].map((path) => [path, new Set()]));
const titles = new Map();
const descriptions = new Map();
for (const [path, { file, content }] of pages) {
  if (!sitemapPaths.includes(path)) throw new Error(`${file} is indexable but missing from sitemap`);
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(content)) throw new Error(`${file} is in sitemap but has noindex`);

  const title = requireMatch(content, /<title>([^<]+)<\/title>/, "title", file);
  const description = requireMatch(content, /<meta name="description" content="([^"]+)">/, "meta description", file);
  const canonical = requireMatch(content, /<link rel="canonical" href="([^"]+)">/, "canonical", file);
  if (canonical !== `${siteUrl}${path}`) throw new Error(`${file} has incorrect canonical: ${canonical}`);

  const socialTags = {
    "og:title": /<meta property="og:title" content="([^"]+)">/,
    "og:description": /<meta property="og:description" content="([^"]+)">/,
    "og:url": /<meta property="og:url" content="([^"]+)">/,
    "og:type": /<meta property="og:type" content="([^"]+)">/,
    "og:image": /<meta property="og:image" content="([^"]+)">/,
    "twitter:card": /<meta name="twitter:card" content="([^"]+)">/,
    "twitter:title": /<meta name="twitter:title" content="([^"]+)">/,
    "twitter:description": /<meta name="twitter:description" content="([^"]+)">/,
    "twitter:image": /<meta name="twitter:image" content="([^"]+)">/
  };
  const values = Object.fromEntries(Object.entries(socialTags).map(([name, pattern]) => [name, requireMatch(content, pattern, name, file)]));
  if (values["og:url"] !== canonical) throw new Error(`${file} og:url does not match canonical`);
  for (const name of ["og:image", "twitter:image"]) {
    if (!values[name].startsWith("https://")) throw new Error(`${file} ${name} is not an absolute HTTPS URL`);
  }
  if (!title.trim() || !description.trim()) throw new Error(`${file} has empty search metadata`);
  if (titles.has(title)) throw new Error(`${file} duplicates the title from ${titles.get(title)}`);
  titles.set(title, file);
  if (descriptions.has(description)) throw new Error(`${file} duplicates the description from ${descriptions.get(description)}`);
  descriptions.set(description, file);

  for (const match of content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`${file} has invalid structured data JSON: ${error.message}`);
    }
  }

  for (const match of content.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const target = internalPath(match[1]);
    if (target && target !== path && incoming.has(target)) incoming.get(target).add(path);
  }
}

for (const path of sitemapPaths.filter((path) => path !== "/")) {
  if (incoming.get(path).size === 0) throw new Error(`${path} is an orphan page`);
}
for (const path of targetOrphans) {
  if (!pages.has(path)) throw new Error(`Target orphan is missing: ${path}`);
  if (incoming.get(path).size < 2) throw new Error(`${path} has only ${incoming.get(path).size} inbound internal link source(s)`);
}

const homepage = pages.get("/").content;
for (const item of slangs) {
  const slug = item.word.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (!homepage.includes(`href="/terms/${slug}"`)) throw new Error(`Homepage dictionary is missing a static link to ${item.word}`);
}

const redirects = readFileSync("_redirects", "utf8").split("\n").filter((line) => line.trim() && !line.startsWith("#"));
for (const line of redirects) {
  const [source, destination, status] = line.trim().split(/\s+/);
  if (status !== "301") throw new Error(`Unexpected redirect status in rule: ${line}`);
  if (sitemapPaths.includes(source)) throw new Error(`Redirect source is present in sitemap: ${source}`);
  if (!destination.includes(":") && !destination.includes("*") && !destination.includes(":slug") && !pages.has(destination)) {
    throw new Error(`Redirect target is not an indexable page: ${destination}`);
  }
}

console.log(`Validated SEO metadata and link graph for ${pages.size} indexable HTML pages; all ${targetOrphans.length} target pages have at least two inbound sources.`);
