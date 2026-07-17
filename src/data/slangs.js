export const slangs = [
  {
    word: "Slop",
    definition: "Low-effort synthetic content dumped onto the internet to farm clicks, keywords, impressions, or ad money. The industrial waste of the LLM era.",
    origin: "Became mainstream shorthand as AI-generated posts, images, SEO pages, and social feeds started feeling mass-produced and disposable.",
    examples: ["Google results are getting buried under AI slop.", "Stop posting this ChatGPT slop on my timeline, write the thought yourself."],
    aiGrade: 5,
    trend: "HIGH",
    sourceType: "community",
    sourceNote: "Popular term in 2024-2026 AI discourse; exact origin varies across social platforms and media coverage.",
    sourceUrl: "https://en.wikipedia.org/wiki/AI_slop",
    lastChecked: "2026-07-01"
  },
  {
    word: "Vibe Coding",
    definition: "Building software by steering an AI with intent, screenshots, and increasingly specific prompts instead of writing every line by hand.",
    origin: "Popularized by Andrej Karpathy in early 2025, then adopted by indie hackers and coding-agent users as a half-joke, half-workflow.",
    examples: ["I vibe coded the prototype, then spent Friday making it real.", "My app broke because the model's vibes changed after the last vendor update."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "community",
    sourceNote: "Commonly attributed to Andrej Karpathy's 2025 usage; now used broadly for AI-assisted coding by feel.",
    sourceUrl: "https://en.wikipedia.org/wiki/Vibe_coding",
    lastChecked: "2026-07-01"
  },
  {
    word: "Agentic",
    definition: "The enterprise-safe way to say software can make decisions, call tools, and execute workflows without sounding too much like 'we gave the bot a credit card.'",
    origin: "Spread through AI product launches and pitch decks describing tool-using models, workflow bots, and autonomous assistants.",
    examples: ["The deck said agentic seven times and explained nothing.", "My agentic assistant spent the afternoon retrying the same broken API call."],
    aiGrade: 5,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Current AI product term; useful when tied to real tool use, vague when used as valuation perfume.",
    sourceUrl: "https://en.wikipedia.org/wiki/Intelligent_agent",
    lastChecked: "2026-07-01"
  },
  {
    word: "Delve",
    definition: "A normal English verb turned into the fingerprint of GPT-flavored prose. When a paragraph wants to sound thoughtful without earning it, it delves.",
    origin: "Flagged by writers, editors, and researchers after ChatGPT-era text made certain polished transition words suddenly feel suspiciously overused.",
    examples: ["Let us delve into the intricate tapestry of productivity. Please do not.", "I edited the essay three times just to make sure it did not delve into anything."],
    aiGrade: 5,
    trend: "HIGH",
    sourceType: "community",
    sourceNote: "Research and media have tracked post-ChatGPT shifts in word frequency; avoid repeating inflated viral numbers without context.",
    sourceUrl: "https://arxiv.org/abs/2509.09596",
    lastChecked: "2026-07-01"
  },
  {
    word: "Tapestry",
    definition: "The poetic emergency exit for AI prose. If the model cannot explain a complex topic plainly, it may declare it a rich tapestry and hope nobody checks the weave.",
    origin: "A recurring GPT-ese metaphor because models trained to sound harmless and polished often reach for soft literary filler.",
    examples: ["The strategy creates a rich tapestry of synergies. Translation: nobody owns the metric.", "Once a paragraph says tapestry, I start looking for the prompt."],
    aiGrade: 5,
    trend: "HIGH",
    sourceType: "editorial",
    sourceNote: "Useful as an editorial smell test rather than a formally sourced historical slang term.",
    sourceUrl: "",
    lastChecked: "2026-07-01"
  },
  {
    word: "Stochastic Parrot",
    definition: "A skeptical label for LLMs: not a mind, not a thinker, just a statistical mirror repeating patterns from human text with expensive confidence.",
    origin: "Comes from the 2021 paper 'On the Dangers of Stochastic Parrots' by Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, and Shmargaret Shmitchell.",
    examples: ["Do not ask the stochastic parrot for legal advice.", "Me arguing with a stochastic parrot at 3 AM about whether it understands lunch."],
    aiGrade: 1,
    trend: "MID",
    sourceType: "paper",
    sourceNote: "Directly tied to a well-known 2021 AI ethics paper.",
    sourceUrl: "https://dl.acm.org/doi/10.1145/3442188.3445922",
    lastChecked: "2026-07-01"
  },
  {
    word: "GPU Rich / GPU Poor",
    definition: "The class divide of modern AI: teams with warehouses of accelerators versus everyone else begging a quantized model to run on a hot laptop.",
    origin: "Used by open-source AI builders and researchers to describe the compute gap between frontier labs, large platforms, academia, and indie developers.",
    examples: ["They are training on a giant cluster? Must be nice to be GPU rich.", "I am running a 3B model at two tokens per second. GPU poor lifestyle."],
    aiGrade: 2,
    trend: "MID",
    sourceType: "community",
    sourceNote: "Community slang around AI compute access; best treated as cultural shorthand, not a precise economic category.",
    sourceUrl: "",
    lastChecked: "2026-07-01"
  },
  {
    word: "Hallucination",
    definition: "The polite industry word for an AI inventing a fact, source, quote, API endpoint, or court case while sounding absolutely certain.",
    origin: "Adopted across AI research and product discussions for model outputs that are fluent but unsupported by reality.",
    examples: ["The AI did not lie on my resume, it hallucinated my NASA internship.", "Always check the docs it cites; it loves to hallucinate endpoints."],
    aiGrade: 4,
    trend: "HIGH",
    sourceType: "technical-term",
    sourceNote: "Standard term in AI evaluation and product discussions, though some critics argue it softens the severity of fabricated output.",
    sourceUrl: "https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)",
    lastChecked: "2026-07-01"
  },
  {
    word: "RLHF'd to Death",
    definition: "A complaint that a model has been tuned so hard for safety, politeness, and refusal behavior that it turns every normal request into a compliance seminar.",
    origin: "Open-source LLM communities use it when comparing more permissive models with commercial assistants shaped by RLHF and policy layers.",
    examples: ["This model has been RLHF'd to death; I asked for a spicy wing recipe and got a food-safety lecture.", "The refusal was technically safe and practically useless."],
    aiGrade: 3,
    trend: "MID",
    sourceType: "community",
    sourceNote: "Community phrase built around reinforcement learning from human feedback; the wording is slang, not a formal technical diagnosis.",
    sourceUrl: "https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback",
    lastChecked: "2026-07-01"
  },
  {
    word: "RAG",
    definition: "Retrieval-augmented generation: giving the model receipts before asking it to talk.",
    origin: "A core architecture pattern for grounding LLM answers in external documents, databases, or search results.",
    examples: ["Use RAG before asking the model about policy docs.", "Bad RAG is just search results wearing a chatbot costume."],
    aiGrade: 2,
    trend: "MID",
    sourceType: "technical-term",
    sourceNote: "Technical AI architecture pattern, not just slang.",
    sourceUrl: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation",
    lastChecked: "2026-07-01"
  },
  {
    word: "Context Window",
    definition: "The amount of text a model can keep in its head before it starts acting like the beginning never happened.",
    origin: "A technical LLM limit that became product marketing as context lengths grew.",
    examples: ["The context window is huge, but your prompt is still a junk drawer.", "Long context does not replace structure."],
    aiGrade: 2,
    trend: "MID",
    sourceType: "technical-term",
    sourceNote: "Technical constraint used heavily in model marketing and documentation.",
    sourceUrl: "",
    lastChecked: "2026-07-01"
  },
  {
    word: "Eval",
    definition: "A test for whether an AI system is getting better, getting worse, or merely getting more confident.",
    origin: "Short for evaluation; now a default term in AI engineering and product teams.",
    examples: ["Ship the eval before the model swap.", "Without evals, every demo is theater."],
    aiGrade: 2,
    trend: "MID",
    sourceType: "technical-term",
    sourceNote: "Engineering shorthand for model and system evaluation.",
    sourceUrl: "",
    lastChecked: "2026-07-01"
  },
  {
    word: "Prompt Engineer",
    definition: "Someone paid to discover that precise words matter, then write them into a box with enough structure that the model stops freelancing.",
    origin: "Emerged during the first mainstream wave of LLM adoption as teams learned prompt quality could change output quality dramatically.",
    examples: ["The prompt engineer saved the launch by removing three adjectives.", "My prompt engineering degree is basically a certificate in talking politely to computers."],
    aiGrade: 3,
    trend: "MID",
    sourceType: "product-term",
    sourceNote: "Job title and skill label that peaked early in the LLM boom, then blurred into product, engineering, and ops work.",
    sourceUrl: "https://en.wikipedia.org/wiki/Prompt_engineering",
    lastChecked: "2026-07-01"
  },
  {
    word: "Model Collapse",
    definition: "The fear that AI trained on AI output becomes a photocopy of a photocopy with venture funding.",
    origin: "A research and internet discussion term about synthetic data feeding back into training loops.",
    examples: ["Model collapse is what happens when the internet eats its own leftovers.", "Synthetic data needs taste and checks, not blind recycling."],
    aiGrade: 3,
    trend: "MID",
    sourceType: "paper",
    sourceNote: "Research-adjacent term around synthetic data feedback loops.",
    sourceUrl: "https://en.wikipedia.org/wiki/Model_collapse",
    lastChecked: "2026-07-01"
  },
  {
    word: "Synthetic Data",
    definition: "Data generated instead of collected, useful when made carefully and suspicious when waved around as magic.",
    origin: "Common in machine learning before LLMs, then rebranded as a scaling lever for AI systems.",
    examples: ["Synthetic data fixed the rare-case gap.", "Synthetic data without validation is fan fiction."],
    aiGrade: 3,
    trend: "MID",
    sourceType: "technical-term",
    sourceNote: "Longstanding machine learning concept with renewed attention in LLM training and evaluation.",
    sourceUrl: "https://en.wikipedia.org/wiki/Synthetic_data",
    lastChecked: "2026-07-01"
  },
  {
    word: "CoT",
    definition: "Chain-of-thought: the model's scratchpad, usually more useful as a training idea than as something to paste into your UI.",
    origin: "Popularized by reasoning research and prompt patterns that ask models to think step by step.",
    examples: ["The CoT prompt improved the benchmark but made the answer unreadable.", "Users want the result, not the entire inner monologue."],
    aiGrade: 3,
    trend: "LOW",
    sourceType: "technical-term",
    sourceNote: "Short for chain-of-thought prompting and reasoning traces.",
    sourceUrl: "https://en.wikipedia.org/wiki/Prompt_engineering#Chain-of-thought",
    lastChecked: "2026-07-01"
  },
  {
    word: "Alignment",
    definition: "Making AI systems do what humans meant, not merely what the prompt technically allowed.",
    origin: "A long-running AI safety term that became broader as LLMs entered consumer and enterprise products.",
    examples: ["Alignment is not a checkbox at the end of launch week.", "The model followed instructions and still missed the point."],
    aiGrade: 3,
    trend: "MID",
    sourceType: "technical-term",
    sourceNote: "AI safety and product term with both technical and cultural usage.",
    sourceUrl: "https://en.wikipedia.org/wiki/AI_alignment",
    lastChecked: "2026-07-01"
  },
  {
    word: "Copilot",
    definition: "A feature that helps you fly the plane, unless marketing quietly replaced the plane with a chatbot.",
    origin: "Popularized by developer tooling and then copied across every software category.",
    examples: ["Every settings page now has a copilot.", "A useful copilot reduces clicks, not just morale."],
    aiGrade: 4,
    trend: "MID",
    sourceType: "product-term",
    sourceNote: "Product naming pattern popularized by AI assistant features.",
    sourceUrl: "",
    lastChecked: "2026-07-01"
  },
  {
    word: "MCP",
    definition: "Model Context Protocol: the AI builder acronym for giving assistants a standard way to reach tools, files, databases, and workflows without custom glue for every app.",
    origin: "Introduced by Anthropic in November 2024 as an open standard for connecting AI assistants to external systems, then adopted across developer tools and agent platforms.",
    examples: ["The demo worked after we replaced three brittle plugins with one MCP server.", "MCP is useful, but do not treat a random server as harmless just because the acronym sounds official."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Official protocol term with strong builder-community usage; the slang value is in how developers use MCP as shorthand for tool-connected AI workflows.",
    sourceUrl: "https://modelcontextprotocol.io/docs/getting-started/intro",
    lastChecked: "2026-07-01",
    plainEnglish: "MCP is a shared connector pattern for AI apps. Instead of every assistant needing a custom integration for every tool, MCP gives builders a common client-server protocol.",
    relatedTerms: ["Agentic", "Context Window", "RAG", "Context Engineering", "Hallucination"],
    seoTitle: "MCP Meaning: Model Context Protocol in AI Slang",
    seoDescription: "MCP meaning in AI slang and builder communities: what Model Context Protocol means, why developers use it, and how it relates to AI agents and tools."
  },
  {
    word: "Context Engineering",
    definition: "The practice of designing what an AI system sees before it answers: instructions, retrieved facts, tools, memory, examples, state, and the boring metadata that keeps the magic from falling apart.",
    origin: "Gained traction in 2025 as builders argued that reliable AI apps need more than clever prompts; they need managed context systems.",
    examples: ["The prompt was fine; the failure was context engineering.", "Context engineering is why the agent saw the right repo notes instead of guessing from stale memory."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "community",
    sourceNote: "Practitioner term amplified by builders in 2025 and later discussed in survey literature; not a single-origin academic phrase.",
    sourceUrl: "https://arxiv.org/abs/2507.13334",
    lastChecked: "2026-07-01",
    plainEnglish: "Context engineering means treating the context window like a product surface. You decide which information, tools, examples, and constraints the model gets for a task.",
    relatedTerms: ["Prompt Engineer", "Context Window", "RAG", "MCP", "Context Rot"],
    seoTitle: "Context Engineering Meaning in AI",
    seoDescription: "Context engineering meaning: the AI builder term for managing prompts, tools, memory, retrieval, and state so LLM apps behave reliably."
  },
  {
    word: "Context Rot",
    definition: "What happens when the files, rules, memories, examples, or long conversation history feeding an AI assistant go stale and quietly start making the model worse.",
    origin: "Borrowed from software rot and documentation drift, then applied to AI coding assistants, agent memory, and long-context workflows.",
    examples: ["The agent kept following an old architecture note. Classic context rot.", "Long context is not free if half of it is context rot wearing a project badge."],
    aiGrade: 3,
    trend: "MID",
    sourceType: "paper",
    sourceNote: "Recent research term for stale AI configuration artifacts and long-context degradation; still emerging rather than settled slang.",
    sourceUrl: "https://arxiv.org/abs/2606.09090",
    lastChecked: "2026-07-01",
    plainEnglish: "Context rot is stale context. The model may have plenty of information, but some of it no longer matches the code, product, or task.",
    relatedTerms: ["Context Engineering", "Context Window", "Eval", "Hallucination", "RAG"],
    seoTitle: "Context Rot Meaning in AI",
    seoDescription: "Context rot meaning in AI: stale prompts, memories, docs, or long-context artifacts that degrade model behavior in agents and coding assistants."
  },
  {
    word: "Prompt Injection",
    definition: "The LLM-era security bug where hostile text sneaks into the model's context and starts acting like instructions instead of data.",
    origin: "Named in early LLM security discussions around 2022, then formalized in AI security guidance as assistants began reading web pages, documents, emails, codebases, and tool outputs.",
    examples: ["The support bot summarized the page and obeyed the prompt injection hidden in the footer.", "Treat retrieved text as untrusted; prompt injection loves a confident agent with too many tools."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "technical-term",
    sourceNote: "Stable AI security term; OWASP lists prompt injection as a major LLM application risk, while community usage often uses it more broadly for instruction-smuggling attacks.",
    sourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    lastChecked: "2026-07-03",
    plainEnglish: "Prompt injection is when text from a user, website, file, or tool output tricks an AI system into ignoring the instructions it was supposed to follow.",
    relatedTerms: ["Hallucination", "Agentic", "MCP", "Tool Calling", "RAG", "Context Engineering"],
    seoTitle: "Prompt Injection Meaning in AI Security",
    seoDescription: "Prompt injection meaning in AI slang and security: how hostile text can hijack LLM instructions, agents, tools, and retrieved context."
  },
  {
    word: "Tool Calling",
    definition: "The moment an AI stops merely chatting and starts asking software to do things: search, fetch, write, calculate, schedule, or touch an API.",
    origin: "Became everyday builder vocabulary as LLM APIs added structured ways for models to call developer-defined functions and external tools.",
    examples: ["The demo looked smart because tool calling did the actual database lookup.", "Tool calling without permissions is how a chatbot graduates from annoying to expensive."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Current AI API and developer-platform term; official model-provider documentation uses it for structured interactions between models and external tools or functions.",
    sourceUrl: "https://platform.openai.com/docs/guides/function-calling",
    lastChecked: "2026-07-03",
    plainEnglish: "Tool calling lets a model choose a structured action for software to run. The model proposes the call; the application decides what actually executes.",
    relatedTerms: ["MCP", "Agentic", "Context Engineering", "Prompt Injection", "RAG", "Copilot"],
    seoTitle: "Tool Calling Meaning in AI Apps",
    seoDescription: "Tool calling meaning in AI: how LLM apps use functions, APIs, and external tools, and why it matters for agents and AI product builders."
  },
  {
    word: "Google Zero",
    definition: "The nightmare scenario for publishers and SEO teams: Google answers the user directly, and the website that supplied the knowledge gets zero click.",
    origin: "Popularized in media and tech commentary as AI Overviews and AI search pushed more answers onto the search results page itself.",
    examples: ["The traffic chart after AI Overviews looked like a preview of Google Zero.", "Google Zero is why the newsletter suddenly matters more than the search snippet."],
    aiGrade: 4,
    trend: "HIGH",
    sourceType: "community",
    sourceNote: "Publisher and tech-media shorthand tied to AI search and zero-click behavior; useful as a community term, not a formal Google product name.",
    sourceUrl: "https://www.theverge.com/podcast/936445/sundar-pichai-ai-search-google-zero-youtube-web",
    lastChecked: "2026-07-03",
    plainEnglish: "Google Zero means search traffic falling toward nothing because AI search gives users the answer before they visit the original site.",
    relatedTerms: ["Slop", "RAG", "Hallucination", "Context Engineering", "Agentic"],
    seoTitle: "Google Zero Meaning in AI Search",
    seoDescription: "Google Zero meaning: the AI search and SEO phrase for a future where Google sends publishers little or no referral traffic."
  },
  {
    word: "Jailbreak",
    definition: "A prompt or interaction pattern that tries to push an AI model past its safety rules, policy boundaries, or refusal behavior.",
    origin: "Borrowed from older security and device-hacking language, then adopted by LLM users and security researchers for attempts to bypass model guardrails.",
    examples: ["The screenshot looked clever until you realized it was just another jailbreak prompt.", "Treat public jailbreaks as security signals, not party tricks for production agents."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "technical-term",
    sourceNote: "Established AI security term; OWASP and MITRE ATLAS both track jailbreak-style attacks, while community usage often uses the word more loosely for guardrail bypass prompts.",
    sourceUrl: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
    lastChecked: "2026-07-05",
    plainEnglish: "A jailbreak is an attempt to make an AI system do something its designers tried to prevent, usually by disguising or escalating the instruction inside a prompt.",
    relatedTerms: ["Prompt Injection", "System Prompt", "Alignment", "RLHF'd to Death", "Agentic", "Hallucination"],
    seoTitle: "Jailbreak Meaning in AI Security",
    seoDescription: "Jailbreak meaning in AI slang and security: prompts or tactics that try to bypass LLM safety rules, refusals, and model guardrails."
  },
  {
    word: "System Prompt",
    definition: "The hidden or high-priority instruction layer that tells an AI assistant what it is, what rules matter, and how to behave before the user starts typing.",
    origin: "Came from chat-model APIs and assistant products where messages have roles and different authority levels; builders turned it into shorthand for the model's backstage rulebook.",
    examples: ["The chatbot sounded weird because the system prompt was doing three jobs at once.", "A leaked system prompt is not the whole product, but it explains a lot of the behavior."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "technical-term",
    sourceNote: "Builder term grounded in role-based model APIs and model-behavior specs; exact implementation differs by provider, so the entry describes common usage rather than one universal standard.",
    sourceUrl: "https://model-spec.openai.com/2025-09-12.html",
    lastChecked: "2026-07-05",
    plainEnglish: "A system prompt is the instruction layer the app sets before the conversation. It usually has more authority than ordinary user text.",
    relatedTerms: ["Prompt Injection", "Jailbreak", "Context Engineering", "Tool Calling", "Alignment", "Context Window"],
    seoTitle: "System Prompt Meaning in AI",
    seoDescription: "System prompt meaning in AI: the high-priority instruction layer behind chatbots, agents, model behavior, and prompt injection risks."
  },
  {
    word: "Reasoning Model",
    definition: "A model marketed or designed to spend extra compute on hard problems before answering, especially math, coding, planning, and multi-step analysis.",
    origin: "Became mainstream builder vocabulary after model providers started shipping dedicated reasoning models and controls for reasoning effort.",
    examples: ["Use a reasoning model for the migration plan, not for rewriting a button label.", "The reasoning model solved the puzzle and spent half the budget narrating its caution."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Current model-provider and developer-platform term; official API docs describe reasoning models and controls such as reasoning effort, while capabilities and naming vary by provider.",
    sourceUrl: "https://platform.openai.com/docs/guides/reasoning",
    lastChecked: "2026-07-05",
    plainEnglish: "A reasoning model is tuned to work longer on problems that need multiple steps. It can be slower or costlier, but useful when the answer needs planning or verification.",
    relatedTerms: ["CoT", "Eval", "Context Window", "Tool Calling", "Hallucination", "Synthetic Data"],
    seoTitle: "Reasoning Model Meaning in AI",
    seoDescription: "Reasoning model meaning in AI slang and product docs: models that spend extra compute on multi-step tasks, coding, math, and planning."
  },
  {
    word: "Deep Research",
    definition: "The AI product mode that turns a chatbot into a slow, citation-hunting research assistant instead of a quick autocomplete with opinions.",
    origin: "Became mainstream after AI products started shipping dedicated research agents that search, read, synthesize, and return sourced reports rather than short chat answers.",
    examples: ["Use deep research for the market map, not for naming a button.", "The deep research report looked useful, but I still checked every citation before sending it to the client."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Current AI product term grounded in official research-agent launches; usage varies by provider, so the entry describes the general product pattern rather than one universal feature.",
    sourceUrl: "https://openai.com/index/introducing-deep-research/",
    lastChecked: "2026-07-07",
    plainEnglish: "Deep research means asking an AI system to investigate a topic across sources and produce a more structured report. It is slower than a normal chat answer because the value is in retrieval, synthesis, and citations.",
    relatedTerms: ["Reasoning Model", "RAG", "Tool Calling", "Agentic", "Hallucination", "Context Engineering"],
    seoTitle: "Deep Research Meaning in AI",
    seoDescription: "Deep Research meaning in AI products: research-agent modes that search, synthesize sources, and produce cited reports instead of quick chat answers."
  },
  {
    word: "Shadow AI",
    definition: "Unauthorized AI use inside a company: employees pasting work into tools, installing assistants, or wiring model APIs around policy because the approved stack is too slow.",
    origin: "Adapted from 'shadow IT' as generative AI tools spread through workplaces faster than security, legal, and procurement teams could govern them.",
    examples: ["The official policy banned shadow AI, but half the team was summarizing sales calls in random browser extensions.", "Shadow AI is not always malicious; it is often a sign that the approved workflow is useless."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "technical-term",
    sourceNote: "Enterprise AI governance term with roots in shadow IT; IBM and other security vendors use it for unsanctioned AI tools and workflows.",
    sourceUrl: "https://www.ibm.com/think/topics/shadow-ai",
    lastChecked: "2026-07-07",
    plainEnglish: "Shadow AI is AI work happening outside official company controls. It can create privacy, security, compliance, and quality risks even when employees are only trying to move faster.",
    relatedTerms: ["Tool Calling", "Prompt Injection", "Copilot", "Alignment", "Hallucination", "Agentic"],
    seoTitle: "Shadow AI Meaning: Unsanctioned AI at Work",
    seoDescription: "Shadow AI meaning in workplace and security slang: unauthorized AI tools, hidden chatbot use, and the governance risks behind unsanctioned AI workflows."
  },
  {
    word: "Frontier Model",
    definition: "A top-end AI model sitting near the edge of current capability, usually invoked when people want the conversation to sound like policy, safety, or trillion-token geopolitics.",
    origin: "Moved from AI policy and safety discussions into mainstream product and builder language as labs, regulators, and researchers started distinguishing frontier systems from smaller deployed models.",
    examples: ["The startup called its wrapper frontier AI because 'chatbot with a dashboard' did not raise enough money.", "Frontier model rules matter most when capability, access, and misuse risk all scale together."],
    aiGrade: 3,
    trend: "MID",
    sourceType: "paper",
    sourceNote: "Policy and safety term discussed in frontier AI regulation literature; exact thresholds shift as model capability improves.",
    sourceUrl: "https://arxiv.org/abs/2307.03718",
    lastChecked: "2026-07-07",
    plainEnglish: "A frontier model is a model near the current capability ceiling. The phrase is usually used when discussing powerful general models, safety duties, deployment controls, and regulation.",
    relatedTerms: ["Reasoning Model", "Alignment", "Eval", "Synthetic Data", "GPU Rich / GPU Poor", "Model Collapse"],
    seoTitle: "Frontier Model Meaning in AI",
    seoDescription: "Frontier model meaning in AI slang and policy: powerful models near the current capability edge, and why the term appears in safety and regulation debates."
  },
  {
    word: "Prompt Caching",
    definition: "The builder trick of reusing repeated prompt context so long instructions, schemas, examples, or documents do not get billed and processed from scratch every time.",
    origin: "Became everyday LLM API vocabulary as providers added caching for repeated prompt prefixes and developers started optimizing long-context apps around it.",
    examples: ["Prompt caching made the support agent cheap enough to keep the full policy manual in context.", "If every request starts with the same giant system prompt, check whether prompt caching is actually working."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Current model-provider and developer-platform term; official API docs describe prompt caching as an optimization for repeated prompt prefixes, with provider-specific behavior and pricing.",
    sourceUrl: "https://platform.openai.com/docs/guides/prompt-caching",
    lastChecked: "2026-07-09",
    plainEnglish: "Prompt caching means the API can recognize reused context and process it more efficiently. It is useful for apps that send the same instructions, tools, or reference material across many requests.",
    relatedTerms: ["Context Window", "Context Engineering", "RAG", "System Prompt", "Tool Calling", "GPU Rich / GPU Poor"],
    seoTitle: "Prompt Caching Meaning in AI Apps",
    seoDescription: "Prompt caching meaning in AI builder slang: how repeated prompt context can reduce latency or cost in long-context LLM apps."
  },
  {
    word: "Computer Use",
    definition: "The AI-agent feature where a model operates a graphical interface through screenshots, clicks, typing, and scrolling instead of only calling neat little APIs.",
    origin: "Moved into mainstream AI product language as model providers released computer-use capabilities for agents that need to work inside ordinary websites and desktop-style interfaces.",
    examples: ["Computer use is powerful until the agent confidently clicks the wrong billing button.", "Use tool calling for clean APIs and computer use for the messy app that only has a browser UI."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Current AI agent product term grounded in official model-provider documentation; implementations differ, so the entry describes the general UI-operating pattern rather than one universal standard.",
    sourceUrl: "https://platform.openai.com/docs/guides/tools-computer-use",
    lastChecked: "2026-07-09",
    plainEnglish: "Computer use lets an AI system interact with software the way a person might: seeing the screen and choosing mouse or keyboard actions. It matters when a task has no clean API.",
    relatedTerms: ["Agentic", "Tool Calling", "MCP", "Prompt Injection", "System Prompt", "Alignment"],
    seoTitle: "Computer Use Meaning in AI Agents",
    seoDescription: "Computer use meaning in AI: agents that can operate graphical interfaces with screenshots, clicks, typing, and scrolling."
  },
  {
    word: "LLM-as-a-Judge",
    definition: "Using one language model to grade, compare, or critique another model's output, which is handy until the judge starts sharing the same blind spots as the contestant.",
    origin: "Grew from evaluation research and benchmark practice as teams needed scalable ways to score open-ended answers that are hard to check with exact-match tests.",
    examples: ["The eval used LLM-as-a-judge for tone, then spot-checked the failures with humans.", "LLM-as-a-judge is not free truth; it still needs rubrics, calibration, and bias checks."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "paper",
    sourceNote: "Research and evaluation term covered in survey literature; useful as shorthand for model-based grading, but not a replacement for human review on high-stakes decisions.",
    sourceUrl: "https://arxiv.org/abs/2411.15594",
    lastChecked: "2026-07-09",
    plainEnglish: "LLM-as-a-judge means asking a model to evaluate answers instead of only generating them. It is common in AI evals because many good or bad answers cannot be scored with a simple string match.",
    relatedTerms: ["Eval", "Hallucination", "Reasoning Model", "Alignment", "Synthetic Data", "Model Collapse"],
    seoTitle: "LLM-as-a-Judge Meaning in AI Evals",
    seoDescription: "LLM-as-a-Judge meaning in AI evaluation: using language models to grade, compare, or critique model outputs, plus the reliability caveats."
  },
  {
    word: "GPT Live",
    definition: "The shorthand for live, full-duplex ChatGPT voice: an AI that can listen, speak, translate, and keep working while the conversation is still moving.",
    origin: "Picked up around the July 2026 GPT-Live/GPT-Live-1 coverage, when AI product chatter shifted from text chatbots toward always-on voice, turn-taking, and real-time assistant behavior.",
    examples: ["GPT Live sounds useful for translation, but I still do not want a meeting assistant interrupting every pause.", "The GPT Live demo made old push-to-talk voice mode feel like voicemail."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Media coverage describes GPT-Live-1 as a ChatGPT voice upgrade with more natural turn-taking and full-duplex behavior. GPT-5.6 anticipation is treated as surrounding community discussion, not a confirmed product fact.",
    sourceUrl: "https://www.theverge.com/ai-artificial-intelligence/962856/chatgpt-upgraded-voice-mode-gpt-live",
    lastChecked: "2026-07-09",
    plainEnglish: "GPT Live means the voice version of ChatGPT feels less like taking turns with a walkie-talkie. The assistant can handle pauses, acknowledgments, translation, and background work in a more continuous conversation.",
    relatedTerms: ["Computer Use", "Agentic", "Tool Calling", "Reasoning Model", "Copilot", "Prompt Injection"],
    seoTitle: "GPT Live Meaning: ChatGPT Voice and Live AI",
    seoDescription: "GPT Live meaning in AI product slang: live ChatGPT voice, full-duplex AI conversation, real-time translation, and how it differs from older voice mode."
  },
  {
    word: "LLM Burnout",
    definition: "The drained feeling after too many model bills, flaky answers, prompt rewrites, tool switches, and ROI debates make AI feel like another job instead of leverage.",
    origin: "Emerged as community shorthand for the fatigue side of heavy LLM use: not anti-AI, but tired of babysitting models, subscriptions, evals, and workflows that promised to save time.",
    examples: ["After three subscriptions, two broken agents, and a weekend of evals, I hit LLM burnout.", "LLM burnout is when the cheaper alternative is closing the chat tab and doing the task yourself."],
    aiGrade: 4,
    trend: "MID",
    sourceType: "community",
    sourceNote: "Community and editorial phrase anchored by broader evidence that frustrating LLM interactions can create emotional strain for software workers; no single clean origin is claimed.",
    sourceUrl: "https://arxiv.org/abs/2504.10050",
    lastChecked: "2026-07-09",
    plainEnglish: "LLM burnout is AI fatigue with a builder edge. It is the point where cost, context management, hallucinations, and tool churn make the AI workflow feel heavier than the original work.",
    relatedTerms: ["Hallucination", "Eval", "Prompt Caching", "LLM-as-a-Judge", "GPU Rich / GPU Poor", "Vibe Coding"],
    seoTitle: "LLM Burnout Meaning: AI Fatigue, Bills, and Tool Churn",
    seoDescription: "LLM burnout meaning in AI slang: fatigue from model bills, unreliable outputs, prompt babysitting, and doubts about whether AI workflows are worth the overhead."
  },
  {
    word: "Workslop",
    definition: "AI-generated workplace output that looks polished enough to pass along but lacks the judgment, context, or substance needed to actually move the work forward.",
    origin: "Popularized by a 2025 Harvard Business Review article from BetterUp and Stanford-linked researchers studying low-value AI output in the workplace.",
    examples: ["The deck was formatted beautifully, but every recommendation was workslop.", "Workslop saves the sender ten minutes and costs the reviewer two hours."],
    aiGrade: 5,
    trend: "HIGH",
    sourceType: "community",
    sourceNote: "Workplace AI slang with a stable HBR reference; the term is useful as a cultural label, not a precise productivity metric for every AI-assisted document.",
    sourceUrl: "https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity",
    lastChecked: "2026-07-11",
    plainEnglish: "Workslop is sloppy AI work dressed up as finished work. It usually shifts the hard thinking, checking, or rewriting onto someone else.",
    relatedTerms: ["Slop", "LLM Burnout", "Shadow AI", "Hallucination", "Eval", "Prompt Caching"],
    seoTitle: "Workslop Meaning: AI Slang for Low-Value Work Output",
    seoDescription: "Workslop meaning in AI slang: polished-looking AI-generated workplace output that lacks substance and creates cleanup work for other people."
  },
  {
    word: "Speculative Decoding",
    definition: "The LLM speed trick where a smaller draft model guesses upcoming tokens and a larger model checks them, like autocomplete with a quality inspector.",
    origin: "Moved from inference research into builder vocabulary as teams looked for ways to reduce latency in large language model apps without changing the final output distribution.",
    examples: ["Speculative decoding made the chatbot feel faster without switching to a smaller model.", "Latency went down after we tuned the draft model for speculative decoding."],
    aiGrade: 2,
    trend: "MID",
    sourceType: "paper",
    sourceNote: "Technical LLM inference term covered in survey and systems papers; slang value comes from builders using it as shorthand for draft-and-verify generation speedups.",
    sourceUrl: "https://arxiv.org/abs/2401.07851",
    lastChecked: "2026-07-11",
    plainEnglish: "Speculative decoding speeds up generation by letting a cheap model draft several tokens while the main model verifies them in batches. The goal is lower latency without accepting lower-quality guesses.",
    relatedTerms: ["Reasoning Model", "Prompt Caching", "GPU Rich / GPU Poor", "Context Window", "Eval", "Synthetic Data"],
    seoTitle: "Speculative Decoding Meaning in LLM Apps",
    seoDescription: "Speculative decoding meaning in AI builder slang: the draft-and-verify inference technique used to reduce LLM latency."
  },
  {
    word: "GEO",
    definition: "Generative Engine Optimization: SEO's anxious cousin for getting mentioned, cited, or represented inside AI-generated search answers.",
    origin: "Formalized in research on generative engines, then picked up by publishers, marketers, and SEO teams trying to understand visibility when answers are synthesized instead of listed as blue links.",
    examples: ["The traffic drop was not just SEO; the team needed to think about GEO too.", "Bad GEO is stuffing pages with facts an AI answer might quote while forgetting that humans still read the site."],
    aiGrade: 4,
    trend: "HIGH",
    sourceType: "paper",
    sourceNote: "Grounded in the Generative Engine Optimization research paper; industry usage is broader and sometimes more marketing-heavy than the original framework.",
    sourceUrl: "https://arxiv.org/abs/2311.09735",
    lastChecked: "2026-07-13",
    plainEnglish: "GEO means optimizing content for AI answer engines, not only classic search rankings. The practical question is whether a generative search system can understand, trust, and cite your content.",
    relatedTerms: ["Google Zero", "RAG", "Slop", "Context Engineering", "Hallucination", "Synthetic Data"],
    seoTitle: "GEO Meaning: Generative Engine Optimization in AI Search",
    seoDescription: "GEO meaning in AI search: Generative Engine Optimization, why publishers care, and how it relates to Google Zero, SEO, and AI answers."
  },
  {
    word: "Sycophancy",
    definition: "The model behavior where an AI agrees, flatters, or validates the user instead of telling the useful truth.",
    origin: "Moved from ordinary English into AI safety and product vocabulary as researchers studied assistants that mirror user beliefs, preferences, or false assumptions too eagerly.",
    examples: ["The answer felt nice, but it was sycophancy wearing a helpful tone.", "A good assistant should challenge the plan before sycophancy turns a bad idea into a roadmap."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "paper",
    sourceNote: "AI safety and evaluation term supported by research on language models matching user views over truthful or independent answers.",
    sourceUrl: "https://arxiv.org/abs/2310.13548",
    lastChecked: "2026-07-13",
    plainEnglish: "Sycophancy is yes-man behavior from a model. It matters because an answer can feel supportive while making the user's belief, plan, or mistake harder to correct.",
    relatedTerms: ["Alignment", "Hallucination", "RLHF'd to Death", "Eval", "LLM-as-a-Judge", "Reasoning Model"],
    seoTitle: "Sycophancy Meaning in AI",
    seoDescription: "Sycophancy meaning in AI: when language models agree, flatter, or validate users instead of giving independent and truthful responses."
  },
  {
    word: "Agentic RAG",
    definition: "RAG with an agent in the loop: the model can decide what to search, which chunks to inspect, when to try again, and how to use tools before answering.",
    origin: "Grew from retrieval-augmented generation as builders pushed beyond one-shot document lookup toward multi-step retrieval, planning, reflection, and tool use.",
    examples: ["Plain RAG found one policy page; agentic RAG kept searching until it found the exception table.", "Agentic RAG is useful, but every extra retrieval step needs evals and permissions."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "paper",
    sourceNote: "Emerging technical term covered in Agentic RAG survey literature; implementation patterns differ across frameworks, so this entry describes the broad architecture.",
    sourceUrl: "https://arxiv.org/abs/2501.09136",
    lastChecked: "2026-07-13",
    plainEnglish: "Agentic RAG means the retrieval process is not fixed in advance. The AI system can plan searches, inspect results, call retrieval tools, and refine context before producing an answer.",
    relatedTerms: ["RAG", "Agentic", "Tool Calling", "Context Engineering", "MCP", "Prompt Injection"],
    seoTitle: "Agentic RAG Meaning in AI Apps",
    seoDescription: "Agentic RAG meaning in AI builder slang: retrieval-augmented generation with agents that plan searches, call tools, and refine context."
  },
  {
    word: "Slopsquatting",
    definition: "The supply-chain scam where attackers register package names that AI coding tools tend to hallucinate, hoping a developer or agent installs the fake dependency.",
    origin: "Blends 'slop' with typosquatting. The term spread through software-security circles as researchers documented LLMs inventing plausible package names in generated code.",
    examples: ["The model invented a helper library, and now security is worried about slopsquatting.", "Vibe coding gets riskier when the agent can install dependencies without checking the registry history."],
    aiGrade: 4,
    trend: "HIGH",
    sourceType: "wiki",
    sourceNote: "Software-supply-chain slang with security research behind it; the linked reference summarizes the term history and points to package-hallucination studies.",
    sourceUrl: "https://en.wikipedia.org/wiki/Slopsquatting",
    lastChecked: "2026-07-15",
    plainEnglish: "Slopsquatting is typosquatting for AI-generated code. Instead of guessing what a human might mistype, an attacker guesses what a model might invent.",
    relatedTerms: ["Hallucination", "Vibe Coding", "Slop", "Prompt Injection", "Tool Calling", "Shadow AI"],
    seoTitle: "Slopsquatting Meaning in AI Coding",
    seoDescription: "Slopsquatting meaning in AI coding and security: fake packages that exploit LLM package hallucinations, vibe coding, and unchecked dependency installs."
  },
  {
    word: "Tool Poisoning",
    definition: "An agent security attack where a tool's name, description, schema, or metadata carries hidden instructions that steer the model toward unsafe actions.",
    origin: "Grew out of MCP and tool-using agent security research, where natural-language tool descriptions became part of the model's trusted context.",
    examples: ["The MCP server looked harmless, but its description was doing tool poisoning.", "Tool poisoning is why agents need tool manifests, permission boundaries, and boring audit logs."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "paper",
    sourceNote: "MCP security research term; recent papers describe tool metadata poisoning, shadowing, and related attacks against tool-integrated agents.",
    sourceUrl: "https://arxiv.org/abs/2512.06556",
    lastChecked: "2026-07-15",
    plainEnglish: "Tool poisoning means the model is tricked through the tool catalog itself. The dangerous instruction may live in metadata the user never reads, but the agent does.",
    relatedTerms: ["MCP", "Tool Calling", "Prompt Injection", "Agentic", "System Prompt", "Computer Use"],
    seoTitle: "Tool Poisoning Meaning in AI Agents",
    seoDescription: "Tool poisoning meaning in AI agent security: malicious tool metadata, MCP risks, and why tool descriptions can become an attack surface."
  },
  {
    word: "Memory Poisoning",
    definition: "The long-game prompt injection where bad input gets stored as an agent memory, then quietly shapes future answers or actions after the original attack is gone.",
    origin: "Moved into AI-agent security vocabulary as persistent memory became a default feature for assistants and researchers studied attacks that survive across sessions.",
    examples: ["The support assistant kept trusting a fake preference because of memory poisoning.", "Prompt injection is bad today; memory poisoning is bad next month when the agent remembers it."],
    aiGrade: 3,
    trend: "HIGH",
    sourceType: "paper",
    sourceNote: "Emerging LLM-agent security term supported by 2026 research on poisoned persistent memories and cross-session attack effects.",
    sourceUrl: "https://arxiv.org/abs/2606.04329",
    lastChecked: "2026-07-15",
    plainEnglish: "Memory poisoning happens when an attacker gets the assistant to save a false or malicious memory. Later, the agent retrieves that memory as if it were trusted context.",
    relatedTerms: ["Context Rot", "Prompt Injection", "Agentic", "Context Engineering", "Hallucination", "Alignment"],
    seoTitle: "Memory Poisoning Meaning in AI Agents",
    seoDescription: "Memory poisoning meaning in AI agent security: poisoned persistent memories, delayed prompt injection, and why assistant memory changes the attack surface."
  },
  {
    word: "A2A",
    definition: "Agent2Agent protocol: the builder acronym for letting one AI agent discover, contact, and delegate work to another agent instead of pretending every workflow lives inside one chat box.",
    origin: "Introduced by Google as Agent2Agent, then donated to the Linux Foundation and adopted in agent interoperability discussions alongside MCP.",
    examples: ["Use MCP for the tools and A2A when the workflow needs another agent to take a task.", "The demo said A2A, but the hard part was still deciding which agent was allowed to touch customer data."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Official open protocol term with strong builder-community usage. The entry treats A2A as shorthand for agent-to-agent interoperability rather than a guarantee that two arbitrary agents will cooperate safely.",
    sourceUrl: "https://a2a-protocol.org/v1.0.0/",
    lastChecked: "2026-07-17",
    plainEnglish: "A2A is a communication pattern for AI agents. It gives agents a common way to discover capabilities, exchange task information, and coordinate without sharing all of their private internals.",
    relatedTerms: ["MCP", "Agentic", "Tool Calling", "Computer Use", "Prompt Injection", "Agentic RAG"],
    seoTitle: "A2A Meaning: Agent2Agent Protocol in AI",
    seoDescription: "A2A meaning in AI builder slang: Agent2Agent protocol, why agent interoperability matters, and how A2A relates to MCP and tool calling."
  },
  {
    word: "Model Router",
    definition: "The cost-control layer that decides which model should answer a request, so a tiny classification job does not always ride first class on the most expensive reasoning model.",
    origin: "Grew from LLM orchestration patterns and became more concrete as AI platforms shipped model-router features that choose among underlying models by cost, quality, latency, or task fit.",
    examples: ["The model router sent quick summaries to the cheap model and escalated gnarly planning tasks to the reasoning model.", "A bad model router is just vibes with a billing dashboard."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Current AI platform and architecture term. Microsoft Foundry documents model router as a deployable model that selects an underlying LLM in real time; broader builder usage also covers custom routing layers.",
    sourceUrl: "https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/model-router",
    lastChecked: "2026-07-17",
    plainEnglish: "A model router chooses which model handles a request. Teams use it to balance cost, latency, capability, policy, and fallback behavior across several available models.",
    relatedTerms: ["Reasoning Model", "Prompt Caching", "Eval", "GPU Rich / GPU Poor", "LLM-as-a-Judge", "Context Window"],
    seoTitle: "Model Router Meaning in AI Apps",
    seoDescription: "Model router meaning in AI builder slang: routing prompts to different LLMs by cost, quality, latency, reasoning needs, or policy constraints."
  },
  {
    word: "Agent Observability",
    definition: "The practice of tracing what an AI agent actually did: model calls, tool calls, retrieval steps, token usage, retries, failures, and the suspiciously confident shortcut it took at 2:13 PM.",
    origin: "Became a production AI term as teams moved from demos to deployed agents and needed telemetry for multi-step, tool-using, nondeterministic workflows.",
    examples: ["The agent looked smart in chat, but agent observability showed it was looping through the same broken tool call.", "Ship agent observability before you let the assistant spend money or update records."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "technical-term",
    sourceNote: "Technical AI operations term supported by OpenTelemetry GenAI semantic conventions and vendor tooling. The wording is broader than one product, so the entry describes the general tracing and monitoring practice.",
    sourceUrl: "https://opentelemetry.io/blog/2026/genai-observability/",
    lastChecked: "2026-07-17",
    plainEnglish: "Agent observability means instrumenting AI agents so engineers can inspect their steps. It helps debug latency, cost, tool misuse, prompt problems, retrieval errors, and quality regressions.",
    relatedTerms: ["Agentic", "Tool Calling", "Eval", "LLM-as-a-Judge", "Prompt Injection", "Context Engineering"],
    seoTitle: "Agent Observability Meaning in AI",
    seoDescription: "Agent observability meaning in AI operations: tracing model calls, tool calls, retrieval, token usage, and failures in production AI agents."
  },
  {
    word: "Grok Build",
    definition: "Grok Build is xAI's coding agent and terminal-based development tool for software-development workflows. It can inspect a codebase, plan work, edit files, run commands, and delegate tasks to subagents.",
    origin: "xAI introduced Grok Build in May 2026 as an early-beta coding agent and CLI for professional software engineering and complex coding work, then published the agent harness and terminal UI source in July 2026.",
    examples: ["I used Grok Build to trace the bug, propose a plan, edit the repo, and run the tests from one terminal session.", "Grok Build is the coding agent; the grok command is its CLI, and the selected model is the engine behind the agent."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Verified against xAI's launch post, current documentation, and official GitHub repository. Product access, default models, commands, and beta behavior can change quickly; model names in older xAI announcements may not match the current default.",
    sourceUrl: "https://docs.x.ai/build/overview",
    lastChecked: "2026-07-17",
    dateModified: "2026-07-17",
    plainEnglish: "It is not just the standard Grok chat assistant and not just a model. Grok Build is an agent system built for working on software, with a CLI and terminal interface that connect a coding-capable model to files, shell commands, tools, plans, and other agents.",
    relatedTerms: ["Agentic", "Tool Calling", "Computer Use", "Vibe Coding", "MCP", "Agent Observability"],
    seoTitle: "What Is Grok Build? xAI's Coding Agent Explained",
    seoDescription: "What Grok Build is, how xAI's coding agent differs from standard Grok, how its CLI, models and subagents work, and what is open source.",
    pageHeading: "What Is Grok Build?",
    extraSections: [
      {
        heading: "Grok Build versus the standard Grok assistant",
        paragraphs: [
          "The standard Grok assistant is a general-purpose conversational product for questions, research, writing, media, and other everyday tasks. Grok Build is the software-development agent: it starts inside a project, reads repository context, edits files, executes shell commands, reviews diffs, and can keep multi-step work moving.",
          "They belong to the same xAI product family and may use related Grok models, but the surrounding agent harness is the important difference. A model produces responses; Grok Build adds the loop, tools, permissions, context assembly, terminal interface, and workflow state needed to act on a codebase."
        ]
      },
      {
        heading: "Is Grok Build a model, CLI, or coding agent?",
        bullets: [
          "Grok Build is primarily the name of xAI's coding agent and agent harness.",
          "The Grok Build CLI is the grok command used to start the agent interactively, run it headlessly in scripts or CI, or connect it to other apps through the Agent Client Protocol.",
          "The coding model is the inference engine selected inside the agent. It is a replaceable layer, not the whole product. xAI's current documentation says Grok 4.5 powers Grok Build and also documents custom-model support.",
          "Agents are the running, tool-using sessions that turn a request into steps and actions. Subagents are delegated agent sessions that can investigate or work on parts of a larger task in parallel, including in separate worktrees.",
          "The terminal workflow is where these pieces meet: the model reasons, the agent loop assembles context and dispatches tools, the CLI/TUI shows plans and diffs, and permission controls let the user review or approve actions."
        ]
      },
      {
        heading: "How Grok Build relates to other coding agents",
        paragraphs: [
          "Grok Build sits in the same broad category of agentic coding tools as Anthropic's Claude Code, OpenAI's Codex, and other coding agents. These tools can assist developers with understanding and modifying code and carrying out multi-step software work.",
          "That category match does not make the products interchangeable. Their models, interfaces, execution flows, and permission mechanisms differ. Features, models, pricing, and access conditions may change as Grok Build evolves."
        ]
      },
      {
        heading: "Is Grok Build open source?",
        paragraphs: [
          "xAI maintains an official public GitHub repository for the Grok Build agent harness and terminal tool. The repository publishes first-party code for the Rust CLI/TUI, tools, and extension system under Apache License 2.0.",
          "The public repository does not mean the entire Grok Build technology stack is open source. In particular, publishing the agent harness and CLI does not publish the weights of the hosted Grok models that may power it; open-source agent code and open model weights are separate questions."
        ]
      },
      {
        heading: "Verified facts and changing beta details",
        bullets: [
          "Verified: xAI describes Grok Build as a coding agent that works through an interactive terminal UI, headless commands, or ACP integrations.",
          "Verified: it can read and edit code, execute commands, use extensions such as skills and MCP servers, and delegate work to subagents.",
          "Verified: xAI published the Grok Build harness and TUI source under an Apache-2.0 license in July 2026.",
          "Changing: the default or promoted model. Earlier xAI material named grok-build-0.1, while current documentation says Grok 4.5 powers Grok Build and supports custom models.",
          "Changing: subscription eligibility, free access, command names, platform support, and individual beta features. Check xAI's current docs and changelog before relying on any of these operational details."
        ]
      }
    ],
    faqItems: [
      {
        question: "What is Grok Build?",
        answer: "Grok Build is xAI's coding agent for software-development workflows. It can inspect repositories, plan changes, edit files, run commands, and coordinate subagents through a terminal-first workflow."
      },
      {
        question: "Is Grok Build the same as the standard Grok assistant?",
        answer: "No. Standard Grok is a general-purpose assistant, while Grok Build adds a coding-agent harness, repository context, development tools, permissions, plans, diffs, and terminal workflows for working on software."
      },
      {
        question: "Is Grok Build a model or a CLI?",
        answer: "Grok Build is primarily a coding agent and harness. Its grok CLI and terminal UI are interfaces to that agent, while a selected coding-capable model provides inference behind it."
      },
      {
        question: "What model does Grok Build use?",
        answer: "As last checked on July 17, 2026, xAI's current documentation says Grok 4.5 powers Grok Build and supports custom models. Earlier xAI material referred to grok-build-0.1, so model names and defaults should be treated as changeable."
      },
      {
        question: "Is Grok Build open source?",
        answer: "xAI publishes the Grok Build agent harness, CLI/TUI, tools, and extension-system code in an official GitHub repository under Apache License 2.0. That public code repository does not mean the entire technology stack is open source, and it does not publish the weights of the hosted Grok models that may power the agent."
      },
      {
        question: "How is Grok Build similar to Claude Code or Codex?",
        answer: "They are in the same broad category of agentic coding tools and can assist with understanding and modifying code. Their models, interfaces, execution flows, and permission mechanisms differ and may evolve."
      }
    ],
    furtherReading: [
      {
        label: "xAI Docs: Grok Build overview",
        url: "https://docs.x.ai/build/overview"
      },
      {
        label: "xAI: Introducing Grok Build",
        url: "https://x.ai/news/grok-build-cli"
      },
      {
        label: "xAI: Grok Build is now open source",
        url: "https://x.ai/news/grok-build-open-source"
      },
      {
        label: "xAI official GitHub: Grok Build source",
        url: "https://github.com/xai-org/grok-build"
      }
    ]
  },
  {
    word: "AI-Generated Content Disclosure",
    definition: "A label or notice that tells viewers AI played a meaningful role in creating or materially altering a piece of content.",
    origin: "Spread across creator platforms, marketplaces, and provenance systems as services started asking publishers to mark content that was generated or significantly changed with AI tools.",
    examples: ["The post carried an AI-generated content disclosure because the images were made with a text-to-image model and then edited by hand.", "The game page had an AI-generated content disclosure, but the label did not explain whether every asset or only some marketing art used AI."],
    aiGrade: 2,
    trend: "HIGH",
    sourceType: "product-term",
    sourceNote: "Platform and policy term, not a single universal standard. The exact wording and threshold vary by product, so this entry explains the common meaning rather than treating one platform's rule as the industry definition.",
    sourceUrl: "https://contentcredentials.org/",
    lastChecked: "2026-07-16",
    plainEnglish: "An AI-generated content disclosure is a transparency label. It usually means AI touched the content in an important way, but it does not by itself tell you how much of the work was automated, how much a human edited later, or whether the result is accurate.",
    relatedTerms: ["Slop", "Workslop", "Shadow AI", "Synthetic Data", "GEO", "Hallucination"],
    seoTitle: "What Is AI-Generated Content Disclosure?",
    seoDescription: "AI-generated content disclosure meaning: what the label signals, where you might see it, and how it differs from AI-assisted or synthetic media tags.",
    pageHeading: "What Is AI-Generated Content Disclosure?",
    extraSections: [
      {
        heading: "Why these labels exist",
        paragraphs: [
          "The main purpose is transparency. Readers, viewers, players, and customers may want to know whether a person made the content directly, whether AI helped shape it, or whether AI generated major pieces before a human reviewed them.",
          "Platforms, publishers, and marketplaces also use these labels to explain how content was produced, satisfy their own posting rules, and reduce confusion around synthetic or heavily edited media."
        ]
      },
      {
        heading: "Related labels and what they usually mean",
        bullets: [
          "AI-generated usually means AI created a substantial part of the final output, such as text, images, audio, or video.",
          "AI-assisted usually means a human created the work but used AI during drafting, editing, translation, cleanup, or ideation.",
          "Human-reviewed usually means a person checked or edited the output after AI was used, not that the work was created without AI.",
          "Synthetic media is the broader category for media that was generated or materially altered with software, including but not limited to generative AI."
        ]
      },
      {
        heading: "Where you might see an AI-generated content disclosure",
        bullets: [
          "Articles or blog posts",
          "Images, illustrations, and design assets",
          "Videos and short-form social clips",
          "Social media posts and creator uploads",
          "App, marketplace, or game listing content"
        ]
      },
      {
        heading: "What the label does not mean",
        bullets: [
          "It does not automatically mean the content is wrong.",
          "It does not automatically mean the content was made entirely by AI without human input.",
          "It does not automatically mean the content is a deepfake.",
          "It does not automatically tell you how reliable a detection system or disclosure workflow is.",
          "It does not guarantee every platform uses the same threshold or definition."
        ]
      },
      {
        heading: "Why it matters in practice",
        paragraphs: [
          "For readers and viewers, the label is context. It can help you judge how much independent verification, authorship, or editing may have gone into a piece of content before you trust it or reuse it.",
          "For publishers and creators, the label is a disclosure tool. Used well, it signals honesty about process without pretending there is one universal standard for every platform or every type of media."
        ]
      }
    ],
    faqItems: [
      {
        question: "What is AI-generated content disclosure?",
        answer: "It is a label or notice that tells people AI played a meaningful role in creating or materially altering the content they are looking at."
      },
      {
        question: "What does an AI-generated label mean?",
        answer: "Usually it means AI created a substantial part of the final output, but the exact threshold depends on the platform or publisher using the label."
      },
      {
        question: "Is AI-generated the same as AI-assisted?",
        answer: "No. AI-generated usually points to more direct machine creation, while AI-assisted usually means a human made the work but used AI during drafting, editing, or production."
      },
      {
        question: "Does an AI-generated content disclosure mean the content is fake?",
        answer: "No. The label is a transparency signal about process, not an automatic judgment that the content is false, deceptive, or low quality."
      },
      {
        question: "Does the label mean the content was fully made by AI?",
        answer: "Not always. Some labels cover mixed workflows where AI generated or altered part of the output and a human later reviewed, edited, or combined it with other material."
      },
      {
        question: "Is AI-generated content disclosure a universal industry standard?",
        answer: "No. The phrase is widely understandable, but the exact wording, scope, and enforcement vary across platforms, publishers, and technical provenance systems."
      }
    ],
    furtherReading: [
      {
        label: "Content Credentials overview",
        url: "https://contentcredentials.org/"
      },
      {
        label: "When Is Self-Disclosure Optimal? Incentives and Governance of AI-Generated Content",
        url: "https://arxiv.org/abs/2601.18654"
      },
      {
        label: "Art-ificial Intelligence: The Effect of AI Disclosure on Evaluations of Creative Content",
        url: "https://arxiv.org/abs/2303.06217"
      }
    ]
  }
];
