import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const build = spawnSync("npm", ["run", "build:deploy"], {
  cwd: process.cwd(),
  encoding: "utf8"
});

assert.equal(
  build.status,
  0,
  `Deploy build failed.\n${build.stdout}${build.stderr}`
);

for (const file of [
  "dist/index.html",
  "dist/404.html",
  "dist/robots.txt",
  "dist/sitemap.xml",
  "dist/_headers",
  "dist/_redirects",
  "dist/assets/favicon.ico",
  "dist/articles/what-is-ai-slang.html",
  "dist/terms/slop.html",
  "dist/src/app.js",
  "dist/src/analytics.js",
  "dist/src/styles.css"
]) {
  assert.ok(existsSync(file), `Deploy artifact is missing ${file}`);
}

for (const path of [
  "dist/docs",
  "dist/reports",
  "dist/functions",
  "dist/scripts",
  "dist/tests",
  "dist/schema.sql",
  "dist/package.json",
  "dist/src/data"
]) {
  assert.ok(!existsSync(path), `Private repository path leaked into deploy artifact: ${path}`);
}

assert.equal(
  readdirSync("dist/terms").filter((file) => file.endsWith(".html")).length,
  70,
  "Deploy artifact should contain all 70 generated term pages"
);

assert.match(
  readFileSync("dist/404.html", "utf8"),
  /<meta name="robots" content="noindex, follow">/,
  "The 404 page must not be indexable"
);

console.log("Validated the public dist artifact and private-path exclusions.");
