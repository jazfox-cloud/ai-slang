import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { slangs } from "../src/data/slangs.js";

const siteUrl = process.env.SITE_URL || "https://ai-slang.com";
const defaultSocialImage = `${siteUrl}/assets/ai-slang-social.png`;
const articleSchemaDate = "2026-07-27";
const exportClusterCheckedDate = "July 28, 2026";
const sitemapLastmodDate = new Date().toISOString().slice(0, 10);

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderText(value) {
  return escapeHtml(value).replaceAll(
    "hello@ai-slang.com",
    '<a class="email-link" data-email-user="hello" data-email-domain="ai-slang.com" href="#contact-email">contact email</a>'
  );
}

function renderInline(value) {
  const placeholders = [];
  const protectedValue = String(value).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
    const token = `__LINK_${placeholders.length}__`;
    placeholders.push(`<a class="source-link" href="${escapeHtml(url)}" rel="noreferrer">${escapeHtml(label)}</a>`);
    return token;
  });
  let output = escapeHtml(protectedValue).replace(/`([^`]+)`/g, "<code>$1</code>");
  placeholders.forEach((link, index) => {
    output = output.replace(`__LINK_${index}__`, link);
  });
  return output;
}

function cleanPath(file) {
  return `/${file.replace(/\.html$/, "")}`;
}

function termPath(item) {
  return `/terms/${slugify(item.word)}`;
}

function canonicalUrl(path) {
  return `${siteUrl}${path}`;
}

function pageShell({ title, description, canonical, body, jsonLd = "" }) {
  const emailScript = body.includes("data-email-user") ? `
      document.querySelectorAll("[data-email-user][data-email-domain]").forEach((link) => {
        const address = link.dataset.emailUser + "@" + link.dataset.emailDomain;
        link.textContent = address;
        link.href = "mailto:" + address;
      });` : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${defaultSocialImage}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${defaultSocialImage}">
    <link rel="stylesheet" href="/src/styles.css">
    ${jsonLd}
    <script type="module" src="/src/analytics.js"></script>
  </head>
  <body>
    <header class="site-header">
      <a class="logo" href="/"><span>AI</span> Slang</a>
      <div class="header-actions">
        <nav class="tabs" aria-label="Primary">
          <a class="tab is-active" href="/"><span aria-hidden="true">⌂</span> Dictionary</a>
          <a class="tab" href="/#humanizer"><span aria-hidden="true">✎</span> Humanizer</a>
          <a class="tab" href="/#about"><span aria-hidden="true">?</span> About</a>
        </nav>
        <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch color theme" aria-pressed="false">
          <span class="theme-swatch" aria-hidden="true"></span>
        </button>
      </div>
    </header>
    <main class="static-page">
      ${body}
    </main>
    <footer class="site-footer">
      <span>No legal, hiring, or investment advice. Just sharper words.</span>
      <span><a href="/about">About</a> / <a href="/contact">Contact</a> / <a href="/privacy">Privacy</a> / <a href="#" data-privacy-choices>Privacy Choices</a> / <a href="/terms-of-use">Terms</a> / <a href="/editorial-policy">Editorial</a></span>
    </footer>
    <script>
      const themeToggle = document.querySelector("#theme-toggle");
      document.body.dataset.theme = localStorage.getItem("theme") || "light";
      themeToggle.setAttribute("aria-pressed", String(document.body.dataset.theme === "light"));
      themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
        document.body.dataset.theme = nextTheme;
        themeToggle.setAttribute("aria-pressed", String(nextTheme === "light"));
        localStorage.setItem("theme", nextTheme);
      });${emailScript}
    </script>
  </body>
</html>
`;
}

function gradeBlocks(value) {
  return "█".repeat(value) + "░".repeat(5 - value);
}

function relatedTermsFor(item) {
  const related = item.relatedTerms?.length ? item.relatedTerms : slangs.filter((other) => other.word !== item.word).slice(0, 6).map((other) => other.word);
  return related
    .map((word) => slangs.find((other) => other.word === word))
    .filter(Boolean)
    .slice(0, 6);
}

function termPage(item) {
  const slug = slugify(item.word);
  const canonical = canonicalUrl(`/terms/${slug}`);
  const title = item.seoTitle || `${item.word} Meaning: AI Slang Definition, Origin, and Examples`;
  const description = item.seoDescription || `${item.word} meaning in AI slang: ${item.definition}`;
  const jsonLdObjects = [{
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: item.word,
    description: item.definition,
    inDefinedTermSet: `${siteUrl}/`,
    url: canonical
  }];

  if (item.faqItems?.length) {
    jsonLdObjects.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: item.faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    });
  }

  const jsonLd = jsonLdObjects.map((object) => `<script type="application/ld+json">${JSON.stringify(object)}</script>`).join("");
  const extraSections = (item.extraSections || []).map((section) => {
    const sectionBody = [
      section.paragraphs?.length ? section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n") : "",
      section.bullets?.length ? `<ul>
            ${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("\n")}
          </ul>` : ""
    ].filter(Boolean).join("\n");

    return `<section>
          <h2>${escapeHtml(section.heading)}</h2>
          ${sectionBody}
        </section>`;
  }).join("\n");
  const faqSection = item.faqItems?.length ? `<section>
          <h2>FAQ</h2>
          ${item.faqItems.map((faq) => `<div class="faq-item">
            <h3>${escapeHtml(faq.question)}</h3>
            <p>${escapeHtml(faq.answer)}</p>
          </div>`).join("\n")}
        </section>` : "";
  const furtherReadingSection = item.furtherReading?.length ? `<section>
          <h2>Further reading</h2>
          <ul>
            ${item.furtherReading.map((source) => `<li><a class="source-link" href="${escapeHtml(source.url)}" rel="noreferrer">${escapeHtml(source.label)}</a></li>`).join("\n")}
          </ul>
        </section>` : "";

  return pageShell({
    title,
    description,
    canonical,
    jsonLd,
    body: `<article class="seo-article">
        <p class="eyebrow">AI_SLANG_ENTRY</p>
        <h1>${escapeHtml(item.pageHeading || `${item.word} Meaning`)}</h1>
        <p class="article-lead">${escapeHtml(item.definition)}</p>
        <div class="vote-row">
          <span>AI_TASTE=${item.aiGrade}/5</span>
          <span>${gradeBlocks(item.aiGrade)}</span>
          <span>TREND=${escapeHtml(item.trend)}</span>
        </div>
        <section>
          <h2>What does ${escapeHtml(item.word)} mean?</h2>
          <p>${escapeHtml(item.definition)}</p>
          <p>${escapeHtml(item.plainEnglish || "In plain English, this term is useful when people are talking about AI culture, model behavior, GPT-style writing, or the weird social layer forming around new AI tools.")}</p>
        </section>
        <section>
          <h2>Origin and usage</h2>
          <p>${escapeHtml(item.origin)}</p>
          <p><strong>Source type:</strong> ${escapeHtml(item.sourceType)}. <strong>Last checked:</strong> ${escapeHtml(item.lastChecked)}.</p>
          <p>${escapeHtml(item.sourceNote)}</p>
          ${item.sourceUrl ? `<p><a class="source-link" href="${escapeHtml(item.sourceUrl)}" rel="noreferrer">Primary reference</a></p>` : ""}
        </section>${extraSections}
        <section>
          <h2>Examples</h2>
          <ul>
            ${item.examples.map((example) => `<li>${escapeHtml(example)}</li>`).join("\n")}
          </ul>
        </section>${faqSection}${furtherReadingSection}
        <section>
          <h2>Related AI slang</h2>
          <div class="related-grid">
            ${relatedTermsFor(item).map((other) => `<a href="${termPath(other)}" data-slug="${slugify(other.word)}" data-analytics-placement="related_terms">${escapeHtml(other.word)}</a>`).join("\n")}
          </div>
        </section>
      </article>`
  });
}

const articlePages = [
  {
    file: "articles/what-is-ai-slang.html",
    title: "What Is AI Slang? A Field Guide to the Words Around LLMs",
    description: "Learn what AI slang means, where terms like GPT-ese and model memes come from, and how to use this source-aware dictionary of modern AI language.",
    h1: "What Is AI Slang?",
    lead: "AI slang is the fast-moving vocabulary people use to describe model behavior, AI-written text, coding agents, synthetic content, and the culture forming around large language models.",
    sections: [
      ["Why AI slang moves fast", "AI tools change workflows quickly, and people invent shorthand before formal terminology catches up. Some words begin as research terms, some as product marketing, and some as jokes from developers trying to describe a new kind of annoyance."],
      ["The main categories", "The useful split is technical terms, cultural slang, and GPT-ese. Technical terms include RAG and context window. Cultural slang includes slop and vibe coding. GPT-ese covers words that make writing feel suspiciously machine-polished."],
      ["How to read this dictionary", "Treat each entry as an editorial definition, not legal or academic authority. When a term has a stable source, the entry links to it. When a term is community slang, the entry says so instead of pretending the origin is clean."]
    ]
  },
  {
    file: "articles/gpt-ese-words-to-avoid.html",
    title: "GPT-ese Words to Avoid: Delve, Tapestry, and Other AI Writing Tells",
    description: "A practical guide to common GPT-ese words and how to rewrite stiff AI-flavored prose into sharper human text.",
    h1: "GPT-ese Words to Avoid",
    lead: "GPT-ese is not one forbidden word. It is a pattern: polished transitions, inflated metaphors, and corporate softness that makes writing feel generated even when the facts are fine.",
    sections: [
      ["Common tells", "Words like delve, tapestry, moreover, furthermore, and game-changer are not always wrong. They become suspicious when they appear in clusters and replace specific thinking."],
      ["How to rewrite it", "Cut the ceremonial opening, name the concrete claim, and replace soft metaphors with plain verbs. If a sentence sounds like it is wearing a blazer to say nothing, make it shorter."],
      ["Use the humanizer carefully", "A humanizer should help you edit, not launder weak writing. The best result still needs a point of view, real examples, and facts you can defend."]
    ]
  },
  {
    file: "articles/ai-slang-for-indie-hackers.html",
    title: "AI Slang for Indie Hackers: Slop, Vibe Coding, RAG, and Agentic",
    description: "A short guide to AI slang indie hackers are likely to see in product launches, social feeds, and developer communities.",
    h1: "AI Slang for Indie Hackers",
    lead: "Indie hackers meet AI slang earlier than most people because they live inside launch posts, model docs, developer forums, and half-broken prototypes.",
    sections: [
      ["The words that matter first", "Start with slop, vibe coding, RAG, hallucination, agentic, and prompt engineer. These words explain a lot of modern AI product discourse without requiring a full machine learning syllabus."],
      ["Marketing words versus build words", "RAG and context window usually point to implementation details. Agentic and copilot may point to real features, but they are also easy to abuse in pitch copy."],
      ["The practical filter", "When you see a term, ask what behavior it names. If nobody can explain the behavior, it is probably just smoke from the launch deck."],
      { heading: "Builder ownership claims", paragraphs: [
        "AI website builders now sell phrases like own your code, export, GitHub sync, and no lock-in. Those words are worth unpacking before you build a customer project, so we keep a separate [AI website builder code export guide](/articles/ai-website-builder-code-export) for the practical ownership matrix."
      ] }
    ]
  },
  {
    file: "articles/gpt-live-vs-voice-mode.html",
    title: "GPT Live vs Voice Mode: What the AI Product Term Means",
    description: "A plain-English guide to GPT Live, live AI voice, full-duplex conversation, and how it differs from older turn-based voice assistants.",
    h1: "GPT Live vs Voice Mode",
    lead: "GPT Live is the product-shaped phrase people use when AI voice starts acting less like turn-based dictation and more like a continuous assistant conversation.",
    sections: [
      ["What changed", "Older voice assistants often waited for a clean pause before answering. GPT Live-style systems are discussed around full-duplex behavior: listening, acknowledging, speaking, translating, or working while the conversation continues."],
      ["Why builders care", "Live voice matters when the interface is the product. Translation, coaching, accessibility, support, and meeting workflows all feel different when the assistant can handle interruptions and recover from messy human timing."],
      ["What to compare it with", "Compare GPT Live with computer use, tool calling, agentic workflows, and reasoning models. The useful question is not whether the demo sounds human; it is what the system can reliably do while the user keeps talking."]
    ]
  },
  {
    file: "articles/llm-burnout-ai-cost-fatigue.html",
    title: "LLM Burnout: AI Bills, Tool Churn, and Model Fatigue",
    description: "A short guide to LLM burnout, AI cost fatigue, prompt babysitting, unreliable outputs, and when a simpler workflow beats another model subscription.",
    h1: "LLM Burnout",
    lead: "LLM burnout is what happens when the AI stack meant to save time becomes a second workload made of subscriptions, prompts, evals, context cleanup, and trust checks.",
    sections: [
      ["The cost side", "AI bills create a concrete version of fatigue. Teams notice the subscription stack, API usage, premium model limits, and the cost of running evals before they know whether the workflow pays for itself."],
      ["The work side", "The hidden work is prompt rewriting, checking hallucinations, switching tools, preserving context, and explaining why a demo failed in production. That overhead can turn enthusiasm into skepticism."],
      ["The practical alternative", "The answer is not always a bigger model. Sometimes it is prompt caching, narrower tool calling, local workflows, better evals, or deciding that a normal script is the cheaper and calmer interface."]
    ]
  },
  {
    file: "articles/ai-website-builder-code-export.html",
    title: "Best AI Website Builders With Code Export: What You Actually Own",
    description: "Compare AI website builders by code export, GitHub sync, independent deployment, data portability, lock-in, and what remains after cancellation.",
    h1: "Best AI Website Builders With Code Export",
    lead: "Short answer: Lovable, Bolt, v0, and Webflow offer useful ways to get code or files out, but they do not all give you the same kind of ownership. GitHub sync is not the same as a full exit, and static HTML export is not the same as moving an app, database, authentication, forms, and secrets.",
    checkedDate: exportClusterCheckedDate,
    schemaDate: "2026-07-28",
    sections: [
      { heading: "The ownership test", paragraphs: [
        "Use this guide as a pre-purchase filter for AI website builders and AI app builders. The question is not only whether a button says export. The better question is what still depends on the vendor after you leave.",
        "Best means best fit for a specific portability need, not an objective award. This page uses official docs and help-center pages available on July 28, 2026; items not clearly documented are labeled Unknown or Not clearly documented."
      ] },
      { heading: "Definitions", bullets: [
        "Full source-code export: you can keep the project source in a normal codebase, usually with package files and editable application code.",
        "Static HTML/CSS export: you get rendered pages, styles, scripts, and assets, but not necessarily CMS records, accounts, ecommerce, forms, or app backends.",
        "GitHub sync/export: the builder can create or update a GitHub repository. This helps ownership, but external services, secrets, databases, and hosting may still need migration.",
        "Ownership: the practical ability to keep, edit, deploy, and maintain the project without the original builder.",
        "Portability: how much of the site, app, data, identity, forms, and configuration can move to another stack.",
        "Lock-in: the parts that keep working only through the builder's hosting, runtime, CMS, billing, or managed integrations."
      ] },
      { heading: "Quick comparison", table: {
        headers: ["Builder", "Full source-code export", "Static HTML/CSS export", "GitHub sync/export", "Independent deployment", "Data/auth/env portability", "After cancellation or disconnect"],
        rows: [
          ["Lovable", "Yes via GitHub transfer/sync; paid code editor can download ZIP", "Not the main model", "Yes; two-way sync on `main` per docs", "Yes for code projects; Lovable Cloud/Supabase pieces need separate handling", "Supabase, env vars, auth, and cloud usage need review per project", "GitHub repo remains when disconnected; future Lovable changes stay in Lovable"],
          ["Bolt", "Yes/partial: project download ZIP and Open in StackBlitz documented", "Depends on generated project", "Yes; GitHub integration can create/import repos", "Yes for code projects once dependencies and secrets are managed elsewhere", "Database restores, secrets, external services, and hosting are project-specific", "Downloaded/GitHub code remains; Bolt account/project specifics not fully documented"],
          ["v0", "Yes for generated code/components; local export and bidirectional Git are documented", "Not positioned as a static-site exporter", "Yes per docs/pricing language", "Yes when code is moved into a deployable app", "External data, auth, and env vars depend on the implementation", "Generated code can be kept; v0 prompting requires internet and plan limits apply"],
          ["Webflow", "No full app/source export; exports site HTML/CSS/JS/assets", "Yes on paid Workspace plans", "No native GitHub sync found in official docs", "Partially; exported static files can be hosted elsewhere", "CMS, User Accounts, Ecommerce, forms, search, localization, and password protection do not carry over as working features", "Exported static site can run without attribution or plan, but dynamic platform features do not"],
          ["Framer", "No; official help says HTML export/self-hosting is not supported", "No official HTML export", "Not clearly documented for full sites", "No official self-host export path", "CMS/forms/hosting optimizations depend on Framer infrastructure", "Hosted-site dependency remains for published Framer sites"],
          ["Wix Studio", "No official source-code export evidence found", "Not clearly documented", "No official evidence found", "No official evidence found", "Platform services and publishing flow are Wix-hosted", "Unknown; official publishing docs describe Wix-hosted free/premium URLs"],
          ["Squarespace", "No full code export", "No full static export; WordPress XML content export only", "No official evidence found", "No for full site migration", "Only certain content exports; many page types, styles, products, custom CSS, drafts, and more do not", "Active/published site required for export; expired content may require reactivation and may be deleted"]
        ]
      } },
      { heading: "How to choose", bullets: [
        "Choose Lovable or Bolt when you want an AI builder that can hand code to GitHub, but budget time to audit Supabase, secrets, auth, and deployment.",
        "Choose v0 when your workflow is already React/Next.js/Vercel-oriented and you want generated UI or app code in a normal repo.",
        "Choose Webflow when static export is enough for a marketing site handoff and you do not need Webflow CMS, forms, ecommerce, search, user accounts, or localization to travel with it.",
        "Avoid treating Framer, Wix Studio, or Squarespace as source-code ownership tools unless their official docs change or your exit plan is content recreation rather than code migration."
      ] },
      { heading: "Limitations and exceptions", paragraphs: [
        "This page is documentation-based, not a live export lab. It does not claim that we tested every export path in a paid account. Product UI, plans, and limits can change; always check the linked official docs before committing a client project.",
        "No affiliate links are used in this article. Future commercial links should be disclosed visibly before any recommendation block."
      ] },
      { heading: "Deeper comparisons", paragraphs: [
        "For AI coding builders, read [Lovable vs Bolt: Code Export, GitHub and Ownership Compared](/articles/lovable-vs-bolt-code-export). For hosted website platforms, read [Webflow vs Framer vs Wix vs Squarespace: Can You Export Your Website?](/articles/webflow-framer-wix-squarespace-code-export). If the phrase itself feels like a build-culture meme, the [vibe coding](/terms/vibe-coding) entry explains the workflow context."
      ] }
    ],
    faqs: [
      ["Which AI website builder has the best code export?", "For source-code ownership, Lovable and Bolt have the clearest official GitHub-oriented export stories among the tools compared here. The best choice depends on whether your project also uses portable data, auth, secrets, and deployment services."],
      ["Is GitHub sync the same as no lock-in?", "No. GitHub sync helps you keep source code, but a project can still depend on vendor hosting, managed databases, authentication, forms, environment variables, or proprietary CMS features."],
      ["Does Webflow code export mean I own the whole website?", "You can export HTML, CSS, JavaScript, and assets on paid Workspace plans, but Webflow documents that CMS, ecommerce, user accounts, forms, search, localization, and some functionality are not included as working exported features."],
      ["Can I cancel the builder after exporting?", "Sometimes, for the exported code or static files. But anything that relies on the builder's hosting, CMS, database, form handling, analytics, or account system may stop working or require replacement."]
    ],
    sources: [
      ["Lovable GitHub integration", "https://docs.lovable.dev/integrations/github"],
      ["Lovable FAQ", "https://docs.lovable.dev/introduction/faq"],
      ["Lovable code mode", "https://docs.lovable.dev/features/code-mode"],
      ["Bolt project files", "https://support.bolt.new/building/using-bolt/projects-files"],
      ["Bolt backups and export download", "https://support.bolt.new/building/using-bolt/rollback-backup"],
      ["Bolt GitHub integration", "https://support.bolt.new/integrations/git"],
      ["v0 FAQ", "https://v0.dev/docs/faqs"],
      ["Webflow code export", "https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code"],
      ["Framer HTML export FAQ", "https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/"],
      ["Wix Studio publishing docs", "https://support.wix.com/en/article/studio-editor-saving-previewing-and-publishing-your-site"],
      ["Squarespace exporting your site", "https://support.squarespace.com/hc/en-us/articles/206566687-Exporting-your-site"]
    ],
    related: ["Vibe Coding", "Tool Calling", "MCP", "Subagent"]
  },
  {
    file: "articles/lovable-vs-bolt-code-export.html",
    title: "Lovable vs Bolt: Code Export, GitHub and Ownership Compared",
    description: "Compare Lovable and Bolt on code export, GitHub sync, deployment, databases, authentication, environment variables, lock-in, and cancellation risk.",
    h1: "Lovable vs Bolt Code Export",
    lead: "Short answer: Lovable is clearer when your goal is to push a Lovable project into a GitHub repo and keep syncing on `main`; Bolt is clearer when you want a code-project workflow that can download files, open in StackBlitz, or connect to GitHub. In both cases, code ownership does not automatically migrate your database, auth, secrets, or deployment setup.",
    checkedDate: exportClusterCheckedDate,
    schemaDate: "2026-07-28",
    sections: [
      { heading: "What this comparison covers", paragraphs: [
        "This page compares Lovable and Bolt as AI builder tools for people who care about exit paths. It does not rank their prompting quality or design taste. It focuses on what official docs say you can keep, move, or continue without the original platform."
      ] },
      { heading: "Definitions", bullets: [
        "Export means obtaining project files or source code outside the AI builder.",
        "Ownership means you can keep editing and deploying the code without relying on the builder for every change.",
        "Portability means the surrounding services move too: database, auth, secrets, forms, storage, and deploy configuration.",
        "Lock-in means a feature only works while the project remains attached to the original platform or its managed services."
      ] },
      { heading: "Lovable vs Bolt matrix", table: {
        headers: ["Area", "Lovable", "Bolt"],
        rows: [
          ["Full source-code export", "Official FAQ says you can export all project code by transferring it to GitHub; code mode docs also mention full ZIP download on paid plans.", "Official help documents Export > Download for a zipped project and Export > Open in StackBlitz."],
          ["GitHub sync/export", "Connects a project to GitHub for backup, collaboration, local work, and deployment. Docs describe two-way sync on the default branch, usually `main`.", "GitHub integration can create a new private repo from a Bolt project, import an existing repo, create branches, and auto-commit working changes."],
          ["Independent deployment", "Docs say GitHub enables self-hosting or deployment to alternatives such as Vercel/Netlify; Lovable Cloud usage is separate if used.", "Docs say code in GitHub can be published with other services, not only Bolt hosting or Bolt/Netlify."],
          ["Database portability", "Not automatically guaranteed. Supabase or other backend data must be handled separately.", "Not automatically guaranteed. Bolt docs mention version history and database restores, but external database migration depends on the project."],
          ["Authentication portability", "Unknown unless the project uses portable auth you control. Lovable code export alone does not prove user accounts migrate.", "Unknown unless the app uses portable auth you control. GitHub/download does not prove account data migrates."],
          ["Environment variables/secrets", "Must be reviewed separately for each project and deployment target.", "Must be reviewed separately for each project and deployment target."],
          ["Forms and integrations", "Project-specific; integrations may require new credentials or replacement services outside Lovable.", "Project-specific; integrations may require new credentials or replacement services outside Bolt."],
          ["Free/paid limitations", "Code editing is documented as paid-plan only; GitHub docs do not remove the need to check current plan limits.", "Bolt is account/plan based; exact token, project, privacy, and hosting limits should be checked on current pricing/docs."],
          ["After disconnect/cancellation", "When GitHub disconnects, the repository stays on GitHub and Lovable keeps future changes inside Lovable. Cancellation details beyond exported code are not fully documented in the cited pages.", "Downloaded files or GitHub repos remain under your control; account/project behavior after cancellation is not fully documented in the cited pages."],
          ["Platform dependency", "Lower for source code once in GitHub; still possible for Lovable Cloud, Supabase setup, secrets, and platform-specific workflows.", "Lower for source code once downloaded or in GitHub; still possible for Bolt hosting, StackBlitz workflow, secrets, and project services."]
        ]
      } },
      { heading: "Practical recommendation", bullets: [
        "Pick Lovable if the official GitHub handoff and `main` branch sync match your team workflow, especially for client handoff into a repo.",
        "Pick Bolt if you want a StackBlitz-centered code workspace with documented download, GitHub creation/import, and branch workflows.",
        "For either tool, write an exit checklist before building: repo access, package manager, env vars, database export, auth provider, storage, forms, deployment target, domain, and logs."
      ] },
      { heading: "Limits and unknowns", paragraphs: [
        "This is an official-doc comparison, not a fresh paid-account export test. It does not claim that an identical prompt was run in both products. The unknowns are important: cancellation behavior, plan-specific limits, generated stack differences, and database/auth portability can change by project.",
        "For the broader buying matrix, see [Best AI Website Builders With Code Export](/articles/ai-website-builder-code-export). For hosted-site builders with very different export limits, see [Webflow vs Framer vs Wix vs Squarespace](/articles/webflow-framer-wix-squarespace-code-export). The cultural wrapper for this whole category is [vibe coding](/terms/vibe-coding), and indie builders may also want [AI Slang for Indie Hackers](/articles/ai-slang-for-indie-hackers)."
      ] }
    ],
    faqs: [
      ["Can Lovable export code?", "Yes. Lovable's FAQ says all project code can be exported by transferring it to GitHub, and its GitHub integration page explains sync and disconnect behavior."],
      ["Can Bolt export code?", "Yes. Bolt's help center documents downloading a zipped copy of project files and opening projects in StackBlitz, plus a GitHub integration for repositories."],
      ["Which is better for ownership, Lovable or Bolt?", "Both can support source-code ownership. Lovable's docs are especially explicit about GitHub transfer/sync from Lovable; Bolt's docs are strong around download, StackBlitz, and GitHub project workflows. Neither removes the need to migrate data, auth, secrets, and deployment."],
      ["Does either tool make Supabase or auth portable automatically?", "Not clearly documented as automatic. Treat database and authentication portability as a separate migration task."]
    ],
    sources: [
      ["Lovable GitHub integration", "https://docs.lovable.dev/integrations/github"],
      ["Lovable FAQ", "https://docs.lovable.dev/introduction/faq"],
      ["Lovable code mode", "https://docs.lovable.dev/features/code-mode"],
      ["Bolt project files", "https://support.bolt.new/building/using-bolt/projects-files"],
      ["Bolt backup/export download", "https://support.bolt.new/building/using-bolt/rollback-backup"],
      ["Bolt GitHub integration", "https://support.bolt.new/integrations/git"],
      ["Bolt GitHub concepts", "https://support.bolt.new/concepts/version-history-github"]
    ],
    related: ["Vibe Coding", "Grok Build", "Tool Calling", "Subagent"]
  },
  {
    file: "articles/webflow-framer-wix-squarespace-code-export.html",
    title: "Webflow vs Framer vs Wix vs Squarespace: Can You Export Your Website?",
    description: "Compare Webflow, Framer, Wix Studio, and Squarespace export limits for source code, static HTML, CMS data, forms, hosting, and lock-in.",
    h1: "Webflow vs Framer vs Wix vs Squarespace Code Export",
    lead: "Short answer: Webflow has the clearest official static code export, but it is not a full CMS/app migration. Framer says it does not support HTML export for self-hosting. Wix Studio has no clear official source-code export path in the checked docs. Squarespace exports only certain content as WordPress XML, not a full working website.",
    checkedDate: exportClusterCheckedDate,
    schemaDate: "2026-07-28",
    sections: [
      { heading: "Why this distinction matters", paragraphs: [
        "Classic website builders are often excellent hosted publishing systems. That does not mean they are portable source-code systems. Before choosing one for a client or long-lived brand site, separate visual design ownership from code, content, forms, ecommerce, accounts, search, and hosting ownership."
      ] },
      { heading: "Definitions", bullets: [
        "Export means the official path for taking files or content out of the builder.",
        "Ownership means the exported result can be edited, hosted, and maintained without the builder.",
        "Portability means CMS records, products, forms, users, redirects, assets, and configuration can move with acceptable loss.",
        "Lock-in means the site still depends on the builder's hosting, runtime, CMS, form handling, ecommerce, or optimization infrastructure."
      ] },
      { heading: "Export comparison", table: {
        headers: ["Platform", "Full source-code export", "Static HTML/CSS export", "CMS/data portability", "Forms/integrations", "Independent deployment", "Hosting dependency"],
        rows: [
          ["Webflow", "No full platform source export", "Yes: HTML, CSS, JavaScript, and assets on paid Workspace plans", "CMS, User Accounts, Ecommerce, and localized content are not included in exported code; collections can be backed up separately as CSV", "Forms, file upload, reCAPTCHA, and site search do not work on exported sites", "Yes for exported static files, with missing dynamic features", "Low for static pages; high for CMS, accounts, ecommerce, search, forms, password protection, and localization"],
          ["Framer", "No full site source export documented", "No. Official help says Framer does not offer HTML export for self-hosting", "Not clearly documented as a full portable export", "Hosted platform features and custom code snippets depend on Framer publishing behavior", "No official self-host export path", "High; Framer says published sites rely on platform-managed services"],
          ["Wix Studio", "No official source-code export evidence found", "Not clearly documented", "Unknown from checked docs", "Platform-specific; publishing docs describe Wix Studio hosted sites", "No official evidence found", "High/Unknown; docs describe free Wix Studio URLs or premium custom domains"],
          ["Squarespace", "No full code export", "No full static website export", "Partial WordPress XML export for certain content; many page types, styles, products, drafts, custom CSS, and more do not export", "Not a full migration of forms, ecommerce, or platform integrations", "No for a complete working site", "High for design, styles, products, advanced page types, and platform behavior"]
        ]
      } },
      { heading: "Platform notes", bullets: [
        "Webflow is the strongest of this group for static file export, but its own docs warn that dynamic Webflow features will be absent or nonfunctional after export.",
        "Framer is explicit that HTML export for self-hosting is not supported because published sites rely on Framer infrastructure.",
        "Wix Studio docs checked for this page describe saving, previewing, and publishing to Wix-hosted free or premium URLs; they do not establish source-code export.",
        "Squarespace content export is a WordPress XML path for certain content, not a code or design export."
      ] },
      { heading: "Who should use what", bullets: [
        "Use Webflow if you can accept static export limits or plan to stay on Webflow for CMS, forms, ecommerce, search, and memberships.",
        "Use Framer when hosted performance, visual editing, and Framer's publishing pipeline matter more than self-hosted ownership.",
        "Use Wix Studio or Squarespace when platform-managed publishing is acceptable and the exit plan is content migration or rebuild, not source-code transfer.",
        "Use an AI/code builder or conventional codebase if independent deployment and source ownership are primary requirements."
      ] },
      { heading: "Limits and related reading", paragraphs: [
        "This article uses official documentation available on July 28, 2026. It does not use third-party scrapers as proof that a platform supports export. If an official doc did not clearly confirm a capability, the capability is marked Unknown or Not clearly documented.",
        "For AI builder source-code options, see [Best AI Website Builders With Code Export](/articles/ai-website-builder-code-export). For the developer-tool version of the problem, see [Lovable vs Bolt](/articles/lovable-vs-bolt-code-export)."
      ] }
    ],
    faqs: [
      ["Can Webflow export code?", "Yes, Webflow documents HTML, CSS, JavaScript, and asset export on paid Workspace plans. It also documents important exclusions such as CMS, User Accounts, Ecommerce, forms, search, localization, password protection, and code components."],
      ["Can Framer export HTML for self-hosting?", "No. Framer's official help says it does not offer HTML export for self-hosting."],
      ["Can Wix Studio export source code?", "Not clearly documented in the official docs checked for this page. The checked Wix Studio publishing docs describe saving, previewing, and publishing hosted sites, not source-code export."],
      ["Can Squarespace export a whole website?", "No. Squarespace documents a WordPress XML export for certain content, with many exclusions. It is not a full code, style, product, or working-site export."]
    ],
    sources: [
      ["Webflow code export", "https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code"],
      ["Framer HTML export FAQ", "https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/"],
      ["Framer custom code help", "https://www.framer.com/help/articles/how-to-add-custom-code/"],
      ["Framer plugin CodeFileExport reference", "https://www.framer.com/developers/reference/plugins-code-file-export"],
      ["Wix Studio publishing docs", "https://support.wix.com/en/article/studio-editor-saving-previewing-and-publishing-your-site"],
      ["Squarespace exporting your site", "https://support.squarespace.com/hc/en-us/articles/206566687-Exporting-your-site"]
    ],
    related: ["Agent Sprawl", "Shadow AI", "Copilot", "Vibe Coding"]
  }
];

function renderArticleSection(section) {
  if (Array.isArray(section)) {
    const [heading, text] = section;
    return `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`;
  }
  const parts = [`<section><h2>${escapeHtml(section.heading)}</h2>`];
  if (section.paragraphs?.length) {
    parts.push(section.paragraphs.map((paragraph) => `<p>${renderInline(paragraph)}</p>`).join("\n"));
  }
  if (section.bullets?.length) {
    parts.push(`<ul>${section.bullets.map((bullet) => `<li>${renderInline(bullet)}</li>`).join("\n")}</ul>`);
  }
  if (section.table) {
    parts.push(`<div class="comparison-table-wrap" role="region" aria-label="${escapeHtml(section.heading)} table" tabindex="0">
            <table class="comparison-table">
              <thead><tr>${section.table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
              <tbody>
                ${section.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("\n")}
              </tbody>
            </table>
          </div>`);
  }
  parts.push("</section>");
  return parts.join("\n");
}

function articlePage(article) {
  const canonical = canonicalUrl(cleanPath(article.file));
  const jsonLdObjects = [{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.schemaDate || articleSchemaDate,
    dateModified: article.schemaDate || articleSchemaDate,
    author: { "@type": "Organization", name: "AI Slang Hub" },
    mainEntityOfPage: canonical
  }];
  if (article.faqs?.length) {
    jsonLdObjects.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    });
  }
  const faqSection = article.faqs?.length ? `<section>
          <h2>FAQ</h2>
          ${article.faqs.map(([question, answer]) => `<div class="faq-item"><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></div>`).join("\n")}
        </section>` : "";
  const sourcesSection = article.sources?.length ? `<section>
          <h2>Official sources</h2>
          <ul>
            ${article.sources.map(([label, url]) => `<li><a class="source-link" href="${escapeHtml(url)}" rel="noreferrer">${escapeHtml(label)}</a></li>`).join("\n")}
          </ul>
        </section>` : "";
  const relatedItems = article.related?.length ? article.related.map((word) => slangs.find((item) => item.word === word)).filter(Boolean) : slangs.slice(0, 12);
  return pageShell({
    title: article.title,
    description: article.description,
    canonical,
    jsonLd: jsonLdObjects.map((object) => `<script type="application/ld+json">${JSON.stringify(object)}</script>`).join(""),
    body: `<article class="seo-article">
        <p class="eyebrow">AI_SLANG_GUIDE</p>
        <h1>${escapeHtml(article.h1)}</h1>
        <p class="article-lead">${escapeHtml(article.lead)}</p>
        ${article.checkedDate ? `<p class="last-checked"><strong>Last checked:</strong> ${escapeHtml(article.checkedDate)}</p>` : ""}${article.sections.map(renderArticleSection).join("\n")}${faqSection}${sourcesSection}
        <section>
          <h2>Browse the dictionary</h2>
          <div class="related-grid">
            ${relatedItems.map((item) => `<a href="${termPath(item)}" data-slug="${slugify(item.word)}" data-analytics-placement="article_dictionary">${escapeHtml(item.word)}</a>`).join("\n")}
          </div>
        </section>
      </article>`
  });
}

const policyPages = [
  {
    file: "privacy.html",
    title: "Privacy Policy | AI Slang Hub",
    description: "Read the AI Slang Hub privacy policy, including how the Humanizer processes text and how privacy choices control optional analytics.",
    h1: "Privacy Policy",
    lead: "AI Slang Hub is built as a lightweight dictionary and editing tool. The MVP is static-first and intentionally avoids account tracking.",
    sections: [
      ["Information we process", "If you use the Humanizer, the text you submit may be sent to the configured AI provider only to generate the requested response. Do not paste secrets, passwords, private documents, or sensitive personal data."],
      ["Analytics and hosting", "AI Slang Hub uses Cloudflare hosting and optional Google Analytics 4 measurement for aggregate page visits, term navigation, outbound source clicks, and site improvements. GA4 loads only after you accept analytics where consent is required, and you can reject or withdraw that choice from the Privacy Choices link in the footer."],
      ["Analytics data boundaries", "We do not send term definitions, article body text, Humanizer text, names, email addresses, or other free-form personal data to GA4. Custom analytics events use low-cardinality values such as a term slug, placement, result state, or share method."],
      ["Advertising cookies", "AI Slang Hub does not currently load Google AdSense ads or a Google-certified advertising CMP. If advertising is added later, this policy and the consent controls will be updated before ad cookies or advertising consent are used."],
      ["Privacy choices", "Use the Privacy Choices link in the footer to accept, reject, or change optional analytics consent. Accepting analytics grants analytics storage only; ad storage, ad user data, and ad personalization remain denied."],
      ["Contact", "For privacy questions or deletion requests related to a message you sent, email hello@ai-slang.com."]
    ]
  },
  {
    file: "about.html",
    title: "About AI Slang Hub",
    description: "Learn about AI Slang Hub, its independent editorial purpose, sourcing and correction standards, and approach to explaining fast-moving AI language.",
    h1: "About AI Slang Hub",
    lead: "AI Slang Hub is an independent dictionary and writing tool for the fast-moving language around AI products, research, developer culture, and generated text.",
    sections: [
      ["What we publish", "We explain technical terms, product language, community slang, and common AI writing tells in plain English. Entries include source type and last-checked information so readers can distinguish stable terminology from newer editorial or community usage."],
      ["How corrections work", "Definitions are reviewed against primary product documentation, research papers, or clearly identified community evidence where available. Readers can send corrections with the page URL and a reliable source to hello@ai-slang.com."],
      ["Independent status", "AI Slang Hub is independently operated and is not affiliated with, endorsed by, or sponsored by OpenAI, Google, Anthropic, Microsoft, or other companies mentioned in its entries."]
    ]
  },
  {
    file: "contact.html",
    title: "Contact AI Slang Hub",
    description: "Contact AI Slang Hub with definition corrections, primary-source suggestions, privacy requests, accessibility reports, or general editorial feedback.",
    h1: "Contact AI Slang Hub",
    lead: "Email hello@ai-slang.com for definition corrections, primary-source suggestions, privacy requests, accessibility reports, or general feedback.",
    sections: [
      ["Correction requests", "Include the page URL, the exact wording that needs review, and a primary or otherwise reliable source. Explain whether the issue concerns the definition, origin, example, category, or last-checked date."],
      ["What we cannot provide", "AI Slang Hub does not provide legal, hiring, investment, academic, or security advice. We also cannot provide account support for companies or products mentioned in the dictionary."],
      ["Response expectations", "Clear factual corrections and privacy or accessibility requests receive priority. Sending a suggestion does not guarantee that a term or submitted wording will be published."]
    ]
  },
  {
    file: "terms-of-use.html",
    title: "Terms of Use | AI Slang Hub",
    description: "Read the AI Slang Hub terms of use for editorial definitions and Humanizer output, including accuracy limits, user responsibility, and acceptable-use rules.",
    h1: "Terms of Use",
    lead: "Use AI Slang Hub as an editorial reference and writing aid, not as legal, academic, hiring, or safety advice.",
    sections: [
      ["Editorial content", "Definitions are written in a sharp editorial style. They may summarize cultural usage and should not be treated as official definitions."],
      ["Humanizer output", "Humanizer output may be inaccurate, awkward, or incomplete. You are responsible for reviewing text before publishing it."],
      ["Analytics and ads", "Optional GA4 analytics may measure aggregate visits, term navigation, outbound source clicks, and site performance after analytics consent. The site does not currently load AdSense ads or a Google-certified advertising CMP."],
      ["Acceptable use", "Do not use the tool to impersonate others, hide misconduct, submit deceptive academic work, or process data you are not allowed to share."]
    ]
  },
  {
    file: "editorial-policy.html",
    title: "Editorial Policy",
    description: "See how AI Slang Hub writes, sources, reviews, corrects, and updates definitions while distinguishing technical, product, community, and editorial terms.",
    h1: "Editorial Policy",
    lead: "AI Slang Hub mixes culture-aware writing with source-aware editing. The voice can be spicy; the claims still need guardrails.",
    sections: [
      ["Review status", "Last reviewed July 27, 2026. Each entry labels its source type and last-checked date so readers can separate stable technical terms, product language, community slang, and editorial shorthand."],
      ["Source handling", "When a term has a stable reference, we link it. When a term is community slang with no clean origin, we say so instead of inventing certainty."],
      ["Verification labels", "Product-term and technical-term entries should point to primary documentation when available. Community entries may use credible reporting or research, but they must not turn a disputed origin into a confirmed fact. Editorial entries are interpretation, not historical claims."],
      ["Update policy", "AI slang changes fast. Entries should be revisited when usage shifts, a better source appears, or a definition starts sounding stale."],
      ["Corrections", "Corrections should prefer precise provenance over viral claims. A good correction explains what changed and why."]
    ]
  }
];

function policyPage(page) {
  const canonical = canonicalUrl(cleanPath(page.file));
  return pageShell({
    title: page.title,
    description: page.description,
    canonical,
    body: `<article class="seo-article">
        <p class="eyebrow">SITE_POLICY</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="article-lead">${renderText(page.lead)}</p>
        ${page.sections.map(([heading, text]) => `<section><h2>${escapeHtml(heading)}</h2><p>${renderText(text)}</p></section>`).join("\n")}
      </article>`
  });
}

mkdirSync("terms", { recursive: true });
mkdirSync("articles", { recursive: true });

for (const item of slangs) {
  writeFileSync(`terms/${slugify(item.word)}.html`, termPage(item));
}

for (const article of articlePages) {
  writeFileSync(article.file, articlePage(article));
}

for (const page of policyPages) {
  writeFileSync(page.file, policyPage(page));
}

const homepage = readFileSync("index.html", "utf8");
const homepageTermLinksPattern = /(?<=<!-- GENERATED_TERM_LINKS_START -->)[\s\S]*?(?=<!-- GENERATED_TERM_LINKS_END -->)/;
if (!homepageTermLinksPattern.test(homepage)) {
  throw new Error("Homepage term-link markers are missing");
}
const homepageTermLinks = slangs.map((item, index) => `                <a class="term-card" href="${termPath(item)}" data-word="${escapeHtml(item.word)}" data-slug="${slugify(item.word)}" data-analytics-placement="home_index">
                  <b>${String(index + 1).padStart(2, "0")}</b>
                  <span>${escapeHtml(item.word)}</span>
                  <small>${escapeHtml(item.trend)} / AI_GRADE ${item.aiGrade}</small>
                </a>`).join("\n");
const homepageWithTerms = homepage.replace(
  homepageTermLinksPattern,
  `\n${homepageTermLinks}\n              `
);

writeFileSync("index.html", homepageWithTerms);

const sitemapUrls = [
  `${siteUrl}/`,
  ...slangs.map((item) => canonicalUrl(termPath(item))),
  ...articlePages.map((article) => canonicalUrl(cleanPath(article.file))),
  ...policyPages.map((page) => canonicalUrl(cleanPath(page.file)))
];

writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${url}</loc><lastmod>${sitemapLastmodDate}</lastmod></url>`).join("\n")}
</urlset>
`);

writeFileSync("robots.txt", `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);

console.log(`Generated ${slangs.length} term pages, ${articlePages.length} articles, ${policyPages.length} policy pages, robots.txt, and sitemap.xml.`);
