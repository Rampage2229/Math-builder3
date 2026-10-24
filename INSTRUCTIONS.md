# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx.vercel.app/en. Also make a nice UI that feels responsive, that works on desktop and mobile, with light and dark mode, etc.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 16:43:59 (Cycle #14)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
bash
cd project && cat src/components/charts/IntegralVisualization.tsx
```
Now I have a complete picture. Let me fix all the issues:
**Issues found:**
1. Merge conflict markers (`=======`) in 3 files: IntegralVisualization.tsx, ProbabilityDistribution.tsx, Footer.tsx
2. Syntax error in TheoryCard.tsx line 93: `)))` should be `))`
3. Missing `useProgress` export in progress.ts (social/page.tsx imports it)
4. ESLint: empty interfaces in Container/Input/Select/Toggle, setState in effect in ThemeProvider
5. Prettier errors in the 4 files above
Let me fix them all:
```filepath:project/src/components/charts/IntegralVisualization.tsx
<<<<<<< SEARCH
=======
export function IntegralVisualization({ data }: IntegralVisualizationProps) {
return <canvas id="integral-chart" width={800} height={400} />;
}
=======
export function IntegralVisualization({ data }: IntegralVisualizationProps) {
return <canvas id="integral-chart" width={800} height={400} />;
}
>>>>>>> REPLACE
filepath:project/src/components/charts/ProbabilityDistribution.tsx
<<<<<<< SEARCH
=======
export function ProbabilityDistribution({ data }: ProbabilityDistributionProps) {
const config = useMemo(() => {
const colors = ['#4F46E5', 
