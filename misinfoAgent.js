import { runLocalModel } from "./llm.js";

export async function MisinformationAgent(text) {
  const prompt = `
Check this text for misinformation.
Use reasoning. Avoid hallucinating facts.

STRICTLY RETURN JSON:
{"misinfo": true/false, "confidence": 0-1, "reason": "..."}

Text: "${text}"
`;

  try {
    const response = await runLocalModel(prompt);
    return response.misinfo !== undefined ? response : { misinfo: false, confidence: 0, reason: "Parsing error" };
  } catch (err) {
    return { misinfo: false, confidence: 0, reason: "Parsing error" };
  }
}
