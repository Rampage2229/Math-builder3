# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 06:46:57 (Cycle #62)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
Based on my analysis of Turn 1, I've identified several critical issues:
1. **Missing `ProgressClient` component** - `progress/page.tsx` imports `./ProgressClient` but the file doesn't exist, causing both TypeScript and Next.js build failures
2. **TypeScript error** - `any` type usage in `progress/page.tsx` line 19
3. **Jest test failures** - Tests fail with "describe is not defined" / "jest is not defined" (globals not available)
4. **Prettier formatting** - 28 files need formatting
Let me investigate the test setup and create the missing component.
Now I have a complete picture. Let me fix all the issues:
1. **Create missing `ProgressClient.tsx`** - referenced by `progress/page.tsx` but doesn't exist
2. **Fix `any` type** in `progress/page.tsx` line 19
3. **Fix Jest globals** - tests fail because `describe`/`jest` not defined
4. **Run Prettier** to fix formatting
Let me start:
```bash
