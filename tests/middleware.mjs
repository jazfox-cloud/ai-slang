import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { onRequest } from "../functions/_middleware.js";

async function run(url) {
  return onRequest({
    request: new Request(url),
    next: () => new Response("next", { status: 200 })
  });
}

const oldTerm = await run("https://ai-slang.com/terms/agentic.html?source=gsc");
assert.equal(oldTerm.status, 301);
assert.equal(oldTerm.headers.get("location"), "https://ai-slang.com/terms/agentic?source=gsc");

const oldArticleOnWww = await run("https://www.ai-slang.com/articles/what-is-ai-slang.html");
assert.equal(oldArticleOnWww.status, 301);
assert.equal(oldArticleOnWww.headers.get("location"), "https://ai-slang.com/articles/what-is-ai-slang");

const oldHome = await run("https://ai-slang.com/index.html");
assert.equal(oldHome.status, 301);
assert.equal(oldHome.headers.get("location"), "https://ai-slang.com/");

for (const legacyDisclosure of [
  "https://ai-slang.com/terms/ai-generated-content-disclosure",
  "https://ai-slang.com/terms/ai-generated-content-disclosure.html",
  "https://ai-slang.com/terms/ai-content-disclosure.html"
]) {
  const response = await run(legacyDisclosure);
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://ai-slang.com/terms/ai-content-disclosure");
}

const legacyTermsPage = await run("https://ai-slang.com/terms.html");
assert.equal(legacyTermsPage.status, 301);
assert.equal(legacyTermsPage.headers.get("location"), "https://ai-slang.com/terms-of-use");

const canonical = await run("https://ai-slang.com/terms/agentic");
assert.equal(canonical.status, 200);

const redirects = readFileSync("_redirects", "utf8");
for (const rule of [
  "/index.html / 301",
  "/terms.html /terms-of-use 301",
  "/articles/:slug.html /articles/:slug 301",
  "/terms/:slug.html /terms/:slug 301"
]) {
  assert.ok(redirects.split("\n").includes(rule), `Missing redirect rule: ${rule}`);
}

console.log("Validated canonical host and legacy .html redirects.");
