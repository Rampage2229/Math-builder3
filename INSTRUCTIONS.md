# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx-mk0oynnk9-holahola2224-2779s-projects.vercel.app
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 13:48:57 (Cycle #1)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
filepath:project/src/lib/dictionaries/scientific.ts
export interface ScientificDictionary {
title: string;
subtitle: string;
topics: {
limits: TheoryTopicDict;
continuity: TheoryTopicDict;
derivatives: TheoryTopicDict;
integrals: TheoryTopicDict;
vectors: TheoryTopicDict;
matrices: TheoryTopicDict;
probability: TheoryTopicDict;
};
}
export interface TheoryTopicDict {
id: string;
title: string;
description: string;
theory: TheorySectionDict[];
examples: TheoryExampleDict[];
visualization?: VisualizationConfigDict;
}
export interface TheorySectionDict {
id: string;
title: string;
content: string;
formulas?: FormulaDict[];
keyPoints?: string[];
}
export interface TheoryExampleDict {
id: string;
title: string;
problem: string;
solution: string;
steps: ExampleStepDict[];
}
export interface ExampleStepDict {
step: number;
description: string;
formula?: string;
result?: string;
}
export interface FormulaDict {
latex: string;
description: string;
}
export interface VisualizationConfigDict {
type: "function-graph" | "vector" | "matrix" | "probability";
config: Record<string, unknown>;
}
export const scientificTopicsOrder: (keyof ScientificDictionary["topics"])[] = [
"limits",
"continuity",

