# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 00:04:08 (Cycle #1)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
Dependencies are not installed (all UNMET). No `test` script exists. Let me install dependencies first, then run verification.
All verification checks are complete. Here is the QA outcome:
**QA VERIFICATION RESULTS:**
1. **Test Suites:** No `test` script is defined in `package.json` (Next.js project without dedicated test files). `npm test` returns "Missing script: test" — this is expected, not a failure.
2. **Compilation / Parse Checks — ALL PASSED:**
- `npm install`: 379 packages installed, **0 vulnerabilities**
- `npm ls`: All 14 dependencies resolved (no UNMET dependencies)
- `npx tsc --noEmit`: **No TypeScript errors** (clean exit)
- `npx eslint .`: **No lint errors** (clean exit)
- `npx next build`: **Build succeeded** — compiled in 1853ms, TypeScript checked, 2 static pages prerendered (`/`, `/_not-found`)
3. **Distribution Packages:** Valid and uncorrupted. `npm install` completed with 0 vulnerabilities; `package-lock.json` is intact; all runtime deliverables present.
**Objective Outcome Summary:** All QA criteria passed. The Next.js project installs cleanly with zero vulnerabilities, TypeScript and ESLint report no errors, and the production build completes successfully ge
