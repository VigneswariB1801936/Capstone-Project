import { ToxicityAgent } from "./agents/toxicityAgent.js";
import { MisinformationAgent } from "./agents/misinfoAgent.js";
import { FakeMediaAgent } from "./agents/fakemediaAgent.js";
import { SafetyAgent } from "./agents/safetyAgent.js";

async function analyze(text) {
  console.log("\n=== POST ===");
  console.log(text);

  const [tox, mis, fake] = await Promise.all([
    ToxicityAgent(text),
    MisinformationAgent(text),
    FakeMediaAgent(text)
  ]);

  console.log("\nToxicity:", tox);
  console.log("Misinformation:", mis);
  console.log("Fake Media:", fake);

  const decision = SafetyAgent(tox, mis, fake);
  console.log("\nFINAL DECISION:", decision);
}

(async () => {
  await analyze("You are literally the dumbest person alive.");
  await analyze("Breaking news: the Earth will explode tomorrow.");
  await analyze("This video is 100% AI-generated.");
})();
