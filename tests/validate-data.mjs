import { slangs } from "../src/data/slangs.js";

const seen = new Set();

for (const item of slangs) {
  const required = ["word", "definition", "origin", "examples", "aiGrade", "trend", "sourceNote", "sourceUrl"];
  for (const key of required) {
    if (item[key] === undefined || (key !== "sourceUrl" && item[key] === "")) {
      throw new Error(`${item.word || "unknown"} is missing ${key}`);
    }
  }
  if (seen.has(item.word.toLowerCase())) {
    throw new Error(`Duplicate word: ${item.word}`);
  }
  seen.add(item.word.toLowerCase());
  if (!Array.isArray(item.examples) || item.examples.length < 2) {
    throw new Error(`${item.word} needs at least two examples`);
  }
  if (item.aiGrade < 1 || item.aiGrade > 5) {
    throw new Error(`${item.word} has invalid aiGrade`);
  }
}

console.log(`Validated ${slangs.length} slang entries.`);
