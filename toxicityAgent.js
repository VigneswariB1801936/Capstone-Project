import { runLocalModel } from "./llm.js";

export async function ToxicityAgent(text) {
  const prompt = `
You are a cyberbullying detection model.
Detect harassment, insults, hate, or aggression.

STRICTLY RETURN JSON:
{"toxic": true/false, "severity": "low/medium/high", "explanation": "..."}

Text: "${text}"
Only respond with JSON, no extra text.
`;

  try {
    const response = await runLocalModel(prompt);
    return response; // already object
  } catch {
    return { toxic: false, severity: "low", explanation: "Parsing error" };
  }
}
