# Project Execution State & Swarm Instructions
**Goal:** evelop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx.vercel.app/en. 
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 16:16:26 (Cycle #10)
**Latest Operator Steering:** For now try to develop a nice UI

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
bash
cd project && npx prettier --write src/components/charts/DerivativeVisualization.tsx 2>&1
bash
All QA verification is complete. Here's the final summary:
**QA Results Summary:**
1. **Test Suites (Jest):** 47/47 tests passed across 3 test suites (dictionary.test.ts, page-rendering.test.tsx, middleware.test.tsx) ✅
2. **Syntax/Compilation:** `next build` passes with TypeScript checking; ESLint reports 0 errors (20 warnings only, all pre-existing unused variable warnings across the project) ✅
3. **Prettier Formatting:** `DerivativeVisualization.tsx` now passes formatting check ✅
4. **Distribution Packages:** No `dist/` or `build/` directories with runtime deliverables; only `.next/` build cache exists (gitignored) ✅
The `f&#39;` HTML entity at line 280 is valid JSX syntax for rendering an apostrophe and is not an ESLint error.
**Objective Outcome:** All QA criteria are satisfied — 47/47 tests pass, zero ESLint errors, TypeScript compilation succeeds, Prettier formatting is clean, and no corrupted distribution packages exist. The `DerivativeVisualization.tsx` component is verified ready for delivery.
