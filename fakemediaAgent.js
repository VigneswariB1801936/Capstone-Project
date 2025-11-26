import { runLocalModel } from "./llm.js";

export async function FakeMediaAgent(text) {
  const prompt = `
Detect if the text claims something is AI-generated, a deepfake, or manipulated.

STRICTLY RETURN JSON:
{"fake_media": true/false, "probability": 0-1, "explanation": "..."}

Text: "${text}"
`;

  try {
    const response = await runLocalModel(prompt);
    return response.fake_media !== undefined ? response : { fake_media: false, probability: 0, explanation: "Parsing error" };
  } catch (err) {
    return { fake_media: false, probability: 0, explanation: "Parsing error" };
  }
}
