# AI Slang & Humanizer Hub

Minimal MVP for an AI slang dictionary and AI-text humanizer.

## What is included

- Static dictionary UI with searchable slang entries.
- Humanizer UI with local rule-based fallback.
- Cloudflare Pages Function for `/api/humanize`.
- D1 schema draft for the later database-backed version.

## Local preview

```bash
npm run build:static
npm run dev
```

Open `http://localhost:8788`.

The local static server uses the browser fallback humanizer. On Cloudflare Pages, `/functions/api/humanize.js` can call DeepSeek when `DEEPSEEK_API_KEY` is configured.

## Static SEO pages

Run this whenever `src/data/slangs.js` changes:

```bash
npm run build:static
```

It generates:

- `/terms/*.html` dictionary article pages.
- `/articles/*.html` SEO guide pages.
- `/privacy.html`, `/terms.html`, and `/editorial-policy.html`.
- `/robots.txt` and `/sitemap.xml`.

The default production domain is `https://ai-slang.com`. Set `SITE_URL=https://your-domain.com` before running the build if the production domain changes.

## Cloudflare setup notes

1. Deploy this repo as a Cloudflare Pages project.
2. Build command: `npm run build:static`.
3. Build output directory: `/` (repository root).
4. Production branch: `main`.
5. Add custom domain: `ai-slang.com`.
6. Optional redirect domain: add `aislanghub.com` and keep `_redirects` so it points to `ai-slang.com`.
7. Set `DEEPSEEK_API_KEY` as an encrypted environment variable before enabling the live Humanizer API.
8. Optional later step: create a D1 database and apply `schema.sql`.
9. Optional later step: add KV binding `RATE_LIMIT` for durable daily limits.

## MVP scope

The first version deliberately avoids login, Stripe, X/Twitter monitoring, and automated content generation. Those are better added after the dictionary and humanizer pages prove they can attract clicks.
