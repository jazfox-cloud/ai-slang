import { copyFileSync, cpSync, mkdirSync, rmSync } from "node:fs";

const outputDir = "dist";
const rootFiles = [
  "_headers",
  "_redirects",
  "404.html",
  "about.html",
  "contact.html",
  "editorial-policy.html",
  "index.html",
  "privacy.html",
  "robots.txt",
  "sitemap.xml",
  "terms-of-use.html"
];

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(`${outputDir}/src`, { recursive: true });

for (const file of rootFiles) copyFileSync(file, `${outputDir}/${file}`);
for (const directory of ["articles", "assets", "terms"]) {
  cpSync(directory, `${outputDir}/${directory}`, { recursive: true });
}
for (const file of ["analytics.js", "app.js", "styles.css"]) {
  copyFileSync(`src/${file}`, `${outputDir}/src/${file}`);
}

console.log("Built the public Cloudflare Pages artifact in dist/.");
