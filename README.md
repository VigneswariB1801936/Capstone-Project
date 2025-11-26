# Capstone-Project
Cyberbullying

Introduction: Agent Safeguard is a modular, multi-agent safety system designed to analyze user-generated content for cyberbullying, misinformation, and AI-generated fake media. The system operates fully on-device, using Ollama to run LLaMA-based models locally, ensuring both privacy and speed.

Problem Statement: Moderating online content manually is time-consuming, emotionally taxing, and inconsistent. Platforms increasingly rely on human reviewers to identify cyberbullying, misinformation, and misleading AI-generated content—yet:

* Cyberbullying detection requires contextual understanding of tone, insults, and aggression.
* Misinformation requires fact-level reasoning and skepticism.
* Fake media identification requires recognizing claims of AI editing or fabrication.
* Human moderators cannot scale as content grows.
* Many moderation systems are black-box models with no explain ability.

As a result, harmful content often slips through, and users are left exposed to harassment, deception, and manipulated media. Online safety requires a fast, explainable, and reliable moderation pipeline — something traditional monolithic models cannot deliver.

Solution Statement: Agent Safeguard solves the moderation challenge using specialized AI agents, each responsible for a different safety domain. The system breaks down moderation into three distinct tasks:
- Toxicity Agent: identifies insults, harassment, hate speech, and aggressive tones.
- Misinformation Agent: checks for factual inconsistencies, unverified claims, and deceptive statements.
- Fake Media Agent: flags content that references AI-generated or manipulated media.

The output from all agents is merged by a central SafetyAgent, which produces the final classification:
SAFE or UNSAFE, with clear explanations.

Architecture: 
Below is a high-level overview of the data flow:
         ┌───────────────────┐
         │   User Content    │
         └─────────┬─────────┘
                   │
         ┌─────────┼─────────┐
         │         │         │
 ┌──────────┐ ┌──────────┐ ┌──────────────┐
 │ Toxicity │ │ Misinfor │ │ Fake Media   │
 │  Agent   │ │ mation   │ │   Agent      │
 └────┬─────┘ └────┬─────┘ └──────┬───────┘
      │            │              │
      └────────────┴──────┬───────┘
                           │
                 ┌─────────▼─────────┐
                 │    SafetyAgent    │
                 └─────────┬─────────┘
                           │
                 ┌─────────▼─────────┐
                 │  SAFE / UNSAFE    │
                 └────────────────────┘
Each agent runs locally using Ollama, communicating via structured JSON to ensure consistency and parse ability.

1. ToxicityAgent – Cyberbullying Specialist: The ToxicityAgent evaluates content for:
- Insults
- Harassment
- Hate speech
- Aggressive tone

It outputs a structured JSON object including:
- toxic: true/false
- severity: low / medium / high
- explanation

2. MisinformationAgent – Fact Consistency Analyzer: This agent focuses on:

- False claims
- Unverified statements
- Conspiracy-like narratives
- Predictions with no evidence

The output includes:
- misinfo: true/false
- confidence: 0–1
- reason

3. FakeMediaAgent – AI Manipulation Detector: Evaluates whether content refers to:
- Deepfakes
- AI-generated videos/images
- Misleading edits
- Claims of synthetic media

It outputs:
- fake_media: true/false
- probability
- explanation
This addresses the growing risk of AI-generated misinformation.

4. SafetyAgent – Coordinator and Final Decision Maker: The SafetyAgent is the orchestrator. It synthesizes the outputs from all three specialized agents and determines:
- SAFE
- UNSAFE (with reasons combined)

For example: Unsafe: Toxic Content, Misinformation

Key Tools and Components: Local LLM Execution (via Ollama)
                                              : JSON Validation & Parsing
Each agent enforces:
- Structured output
- Strict JSON format
- Fail-safe fallback in case of parsing errors

Each agent lives in its own file:
ToxicityAgent.js
MisinformationAgent.js
FakeMediaAgent.js
SafetyAgent.js
llm.js   → core runner for Ollama
index.js → orchestrator

Conclusion: Agent Safeguard demonstrates the power of modular multi-agent architecture for content safety. Instead of a single black-box model, the system uses a collaborative team of focused agents, producing reliable and explainable moderation decisions. Agent Safeguard proves how targeted AI agents can address complex online safety challenges using transparent and robust workflows.

Value Statement: Agent Safeguard significantly reduces the time and effort required for moderating digital content. Tasks that normally take moderators minutes or hours can now be processed instantly. The system helps:
- Reduce exposure to harmful content
- Increase fairness and consistency
- Improve user well-being
- Enable safer online communication spaces
