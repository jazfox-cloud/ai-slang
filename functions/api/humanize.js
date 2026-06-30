const highRiskWords = [
  "delve",
  "tapestry",
  "testament",
  "furthermore",
  "moreover",
  "game-changer",
  "agentic",
  "vertical",
  "paradigm shift",
  "spearhead"
];

const systemPrompt = `You are a cynical, elite Silicon Valley tech editor and professional anti-AI content refiner.
Your job is to detect "GPT-ese" and rewrite it into sharp, organic, human-written hacker prose.

List of high-risk words to eliminate: delve, tapestry, testament, furthermore, moreover, game-changer, agentic, vertical, paradigm shift, spearhead.

EDGE CASES:
- If the input is empty, non-English, or contains no readable natural-language text, return score: 0 and explain why in humanized_text instead of guessing.
- If no buzzwords are detected, return score reflecting overall stiffness/naturalness and keep humanized_text close to the original.
- Never fabricate a score if uncertain; default to a conservative estimate.

Output ONLY raw JSON, no markdown code fences, no preamble:
{"score":85,"detected_words":["delve"],"humanized_text":"The rewritten clean text here..."}`;

export async function onRequestPost(context) {
  const { request, env } = context;
  let payload;

  try {
    payload = await request.json();
  } catch {
    return json({ score: 0, detected_words: [], humanized_text: "Invalid JSON request." }, 400);
  }

  const text = String(payload.text || "").slice(0, 6000);
  if (!env.DEEPSEEK_API_KEY) {
    return json(localHumanize(text));
  }

  try {
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ]
      })
    });

    if (!upstream.ok) {
      return json(localHumanize(text), 200, { "x-ai-slang-fallback": "deepseek_error" });
    }

    const data = await upstream.json();
    const raw = data.choices?.[0]?.message?.content || "";
    return json(parseHumanizerResponse(raw));
  } catch {
    return json(localHumanize(text), 200, { "x-ai-slang-fallback": "worker_error" });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders() });
}

function parseHumanizerResponse(rawText) {
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    return {
      score: Number.isFinite(parsed.score) ? parsed.score : null,
      detected_words: Array.isArray(parsed.detected_words) ? parsed.detected_words : [],
      humanized_text: String(parsed.humanized_text || rawText)
    };
  } catch {
    return { score: null, detected_words: [], humanized_text: rawText, error: "parse_failed" };
  }
}

function localHumanize(text) {
  const clean = text.trim();
  if (!clean) {
    return { score: 0, detected_words: [], humanized_text: "No readable input. Paste a real paragraph first." };
  }
  if (!/[a-zA-Z]{3,}/.test(clean)) {
    return { score: 0, detected_words: [], humanized_text: "This does not look like readable English prose, so I will not guess." };
  }

  const detected = highRiskWords.filter((word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(clean);
  });

  const rewritten = clean
    .replace(/\bFurthermore,\s*/gi, "")
    .replace(/\bMoreover,\s*/gi, "")
    .replace(/\bdelve into\b/gi, "look at")
    .replace(/\btapestry of\b/gi, "mix of")
    .replace(/\btestament to\b/gi, "proof of")
    .replace(/\bgame-changer\b/gi, "useful shift")
    .replace(/\bparadigm shift\b/gi, "real change")
    .replace(/\bspearhead\b/gi, "lead")
    .replace(/\s+/g, " ")
    .trim();

  return {
    score: Math.round(Math.min(95, 25 + detected.length * 12 + Math.max(0, clean.length - 500) / 18)),
    detected_words: detected,
    humanized_text: rewritten || clean
  };
}

function json(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...corsHeaders(),
      ...extraHeaders
    }
  });
}

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type"
  };
}
