import { readFileSync, readdirSync } from "node:fs";

const measurementId = "G-HPH0NTQVX8";
const productionHost = "ai-slang.com";
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

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const analytics = readFileSync("src/analytics.js", "utf8");
const htmlContents = htmlFiles.map((file) => readFileSync(file, "utf8"));
const privacy = readFileSync("privacy.html", "utf8");
const terms = readFileSync("terms-of-use.html", "utf8");
const measurementIds = [...new Set([analytics, ...htmlContents].join("\n").match(/G-[A-Z0-9]+/g) || [])];

assert(measurementIds.length === 1 && measurementIds[0] === measurementId, `Unexpected GA4 Measurement IDs: ${measurementIds.join(", ")}`);
assert(analytics.includes(`const productionHost = "${productionHost}"`), "Analytics production host guard is missing");
assert(analytics.includes("window.location.hostname === productionHost"), "Analytics host guard must use exact production hostname");
assert(analytics.includes("window.dataLayer.push(arguments)"), "gtag queue must use dataLayer.push(arguments)");
assert(!analytics.includes("dataLayer.push(args)") && !analytics.includes("dataLayer.push(_args)"), "gtag queue must not push args arrays");

for (const key of ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"]) {
  assert(analytics.includes(key), `Consent Mode v2 key is missing: ${key}`);
}

assert(analytics.includes("googletagmanager.com/gtag/js?id="), "gtag.js loader is missing");
assert(analytics.includes("readConsent() !== consentGranted"), "Events must be gated behind accepted analytics consent");
assert(analytics.includes("allow_google_signals: false"), "Google signals must be disabled");
assert(analytics.includes("allow_ad_personalization_signals: false"), "Ad personalization signals must be disabled");
assert(!analytics.includes("outbound_click"), "Enhanced Measurement handles outbound clicks; do not add duplicate custom outbound_click events");

for (const [index, html] of htmlContents.entries()) {
  const file = htmlFiles[index];
  assert(html.includes("src/analytics.js"), `${file} does not load the shared analytics module`);
  assert(html.includes("data-privacy-choices"), `${file} is missing footer Privacy Choices`);
}

assert(privacy.includes("does not currently load Google AdSense ads"), "Privacy policy must not claim AdSense is active");
assert(privacy.includes("does not currently load Google AdSense ads or a Google-certified advertising CMP"), "Privacy policy must state certified CMP is not configured");
assert(terms.includes("does not currently load AdSense ads or a Google-certified advertising CMP"), "Terms must match current AdSense/CMP status");
assert(!privacy.includes("Google-certified CMP is configured"), "Privacy policy must not claim a certified CMP is configured");
assert(readFileSync("index.html", "utf8").includes('data-analytics-placement="home_index"'), "Homepage term-card analytics placement is missing");
assert(readFileSync("terms/slop.html", "utf8").includes('data-analytics-placement="related_terms"'), "Term related-link analytics placement is missing");

console.log(`Validated GA4 consent integration for ${htmlFiles.length} HTML pages.`);
