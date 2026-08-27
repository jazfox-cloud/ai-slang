# AI Slang Model and Harness Content Design

## Goal

Add three source-backed, English-language pages to AI Slang without publishing or changing unrelated site behavior:

- `/terms/agent-harness`
- `/terms/gpt-5-6-sol`
- `/articles/best-anthropic-model-by-task`

`build llms from scratch` remains research-only and gets no page.

## Content boundaries

- Agent Harness is a glossary term centered on the runtime around a model: loop, tools, permissions, context, state, sandbox, and verification. It must distinguish an agent harness from a model, framework, and evaluation harness.
- GPT-5.6 Sol is a product-term explainer. It must distinguish Sol from Terra and Luna, API pricing from subscription or credit pricing, and current promotional pricing from launch pricing.
- Best Anthropic Model is an article, not another Claude Opus term page. It must use a task-by-task decision framework and state that Claude supports image input and text output rather than native image generation.
- Dynamic prices, availability, model IDs, and release dates need visible `Last checked` dates and first-party sources.
- Preserve all existing entries and the user's uncommitted Workslop changes.

## Verification

- Tests must fail before implementation when the two new term entries and article are absent.
- Generated pages must include canonical URLs, structured data, source links, internal links, and sitemap entries.
- `npm run build:static`, `npm run validate`, and `git diff --check` must pass.
- No commit, push, or deployment is part of this task.
