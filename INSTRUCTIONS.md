# Project Execution State & Swarm Instructions
**Goal:** evelop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx.vercel.app/en. 
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 15:50:39 (Cycle #9)
**Latest Operator Steering:** For now try to develop a nice UI

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
```filepath:project/src/components/charts/DerivativeVisualization.tsx
<<<<<<< SEARCH
265:18  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
277:26  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
=======
265:18  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
277:26  error    `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
>>>>>>> REPLACE
```
