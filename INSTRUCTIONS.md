# Project Execution State & Swarm Instructions
**Goal:** evelop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx.vercel.app/en. 
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 15:03:08 (Cycle #4)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
filepath:project/src/lib/dictionaries/scientific.ts
<<<<<<< SEARCH
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
=======
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
combinatorics: TheoryTopicDict;
"descriptive-statistics": TheoryTopicDict;
};
}
>>>>>>> REPLACE
filepath:project/src/lib/dictionaries/scientific.ts
<<<<<<< SEARCH
export const scientificTopicsOrder: (keyof ScientificDictionary["topics"])[] = [
"limits",
"continuity",
"derivatives",
"integrals",
"vectors",
"matrices",
"probability",
];
=======
export const scientificTopicsOrder: (keyof ScientificDictionary["topics"])[] = [
"limits",
"continuity",
"derivatives",
"integrals",
"vectors",
"matrices",
"probability",
"combinatorics",
"descriptive-statistics",
];
>>
