# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx.vercel.app/en. Also make a nice UI that feels responsive, that works on desktop and mobile, with light and dark mode, etc.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 18:24:46 (Cycle #26)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
Now I have a clear picture. Let me fix the TypeScript errors in the deliverable files.
**Issues found:**
1. `DerivativeVisualization.tsx`: `derivative` is optional but used without null checks (lines 74, 131, 286)
2. `progress.ts`: Missing standalone exports (`loadProgress`, `saveProgress`, `getOverallStats`, `formatTime`) needed by `ProgressProvider.tsx`
3. Jest tests: All 47 pass ✓
Let me fix `DerivativeVisualization.tsx` first:
```filepath:project/src/components/charts/DerivativeVisualization.tsx
<<<<<<< SEARCH
const x = xMin + i * step;
try {
const y = func(x);
const dy = derivative(x);
if (isFinite(y) && Math.abs(y) < 1e6) {
funcData.push({ x, y });
} else {
funcData.push({ x, y: null });
}
if (isFinite(dy) && Math.abs(dy) < 1e6) {
derivData.push({ x, y: dy });
} else {
derivData.push({ x, y: null });
}
} catch {
funcData.push({ x, y: null });
derivData.push({ x, y: null });
}
=======
const x = xMin + i * step;
try {
const y = func(x);
const dy = derivative?.(x);
if (isFinite(y) && Math.abs(y) < 1e6) {
funcData.push({ x, y });
} else {
funcData.push({ x, y: null });
}
if (dy !== undefined && isFinite(dy) && Math.abs(dy) < 1e6) {
derivData.push({ x, y: dy });
} else {
derivData
