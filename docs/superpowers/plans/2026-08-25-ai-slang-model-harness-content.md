# AI Slang Model and Harness Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate two source-backed model/harness term pages and one Anthropic model-selection article while leaving the LLM-from-scratch idea unpublished.

**Architecture:** Add the two glossary records to `src/data/slangs.js`, add the comparison article to the existing `articlePages` array in `scripts/build-static-pages.mjs`, and extend `tests/validate-data.mjs` with content-specific contracts. The existing generator will produce HTML, homepage links, and sitemap entries.

**Tech Stack:** JavaScript ES modules, Node.js static generator, HTML, JSON-LD.

**Spec:** `docs/superpowers/specs/2026-08-25-ai-slang-model-harness-content-design.md`

## Global Constraints

- Preserve existing dirty-worktree changes, especially the Workslop entry and generated page.
- Use first-party Anthropic and OpenAI sources for product facts.
- Keep `build llms from scratch` research-only.
- Do not commit, push, deploy, or change Cloudflare configuration.

---

### Task 1: Agent Harness glossary page

**Files:**
- Modify: `tests/validate-data.mjs`
- Modify: `src/data/slangs.js`
- Generate: `terms/agent-harness.html`, `index.html`, `sitemap.xml`

**Interfaces:**
- Consumes: existing `slangs` entry shape and `termPage(item)` generator.
- Produces: one `Agent Harness` record with `extraSections`, `faqItems`, and `furtherReading`.

- [ ] Add assertions for the data entry, canonical, definition boundaries, FAQ, official source, related links, and sitemap URL.
- [ ] Run `npm run validate` and confirm failure because `Agent Harness` is missing.
- [ ] Add the minimal provenance-complete `Agent Harness` record.
- [ ] Run `npm run build:static` and `npm run validate` and confirm the contract passes.

### Task 2: GPT-5.6 Sol glossary page

**Files:**
- Modify: `tests/validate-data.mjs`
- Modify: `src/data/slangs.js`
- Generate: `terms/gpt-5-6-sol.html`, `index.html`, `sitemap.xml`

**Interfaces:**
- Consumes: existing glossary schema and term generator.
- Produces: one `GPT-5.6 Sol` record with current promotional API pricing and release timeline.

- [ ] Add assertions for the entry, canonical, `$4/$0.40/$20` pricing, promotion date, long-context multiplier, model alias, family comparison, FAQ, and sitemap URL.
- [ ] Run `npm run validate` and confirm failure because `GPT-5.6 Sol` is missing.
- [ ] Add the minimal provenance-complete product-term record using official OpenAI sources.
- [ ] Run `npm run build:static` and `npm run validate` and confirm the contract passes.

### Task 3: Best Anthropic Model article

**Files:**
- Modify: `tests/validate-data.mjs`
- Modify: `scripts/build-static-pages.mjs`
- Generate: `articles/best-anthropic-model-by-task.html`, `sitemap.xml`

**Interfaces:**
- Consumes: the existing `articlePages` object format and `articlePage(article)` renderer.
- Produces: an Article + FAQ page with a task matrix, version/pricing table, selection framework, and first-party sources.

- [ ] Add assertions for canonical, Article/FAQ JSON-LD, Fable/Opus/Sonnet/Haiku, coding/writing/research/reasoning guidance, and the native-image-generation limitation.
- [ ] Run `npm run validate` and confirm failure because the article is missing.
- [ ] Add the article object with `checkedDate`, `schemaDate`, sections, FAQ, sources, and related terms.
- [ ] Run `npm run build:static` and `npm run validate` and confirm the contract passes.

### Task 4: Full regeneration and review

**Files:**
- Review all generated HTML and sitemap changes from Tasks 1-3.

**Interfaces:**
- Consumes: all three content additions.
- Produces: verified local static output only.

- [ ] Run `npm run build:static`.
- [ ] Run `npm run validate`.
- [ ] Run `git diff --check`.
- [ ] Confirm there is no page or sitemap URL for `build llms from scratch`.
- [ ] Inspect `git diff --stat`, the three generated pages, and touched source/test files; report separately from the pre-existing Workslop changes.
