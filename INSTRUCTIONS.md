# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 06:29:31 (Cycle #59)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
I found two issues to fix:
1. **TypeScript errors in LimitVisualization.tsx** - `{x, y}` objects pushed into `number[]` data arrays
2. **es.json missing keys** - 5 keys missing compared to en.json/ca.json causing test failure
Let me fix both:
```filepath:project/src/components/charts/LimitVisualization.tsx
<<<<<<< SEARCH
const datasets = [
{
label: title,
data,
borderColor: color,
backgroundColor: color.replace("1)", "0.1)"),
borderWidth: 2,
pointRadius: 0,
fill: false,
tension: 0.1,
},
];
// Add limit point marker if limitValue is provided
if (limitValue !== undefined && isFinite(limitValue)) {
datasets.push({
label: `Limit: ${limitValue.toFixed(4)}`,
data: [{ x: limitPoint, y: limitValue }],
borderColor: "rgba(239, 68, 68, 1)",
backgroundColor: "rgba(239, 68, 68, 1)",
pointRadius: 8,
pointStyle: "circle",
showLine: false,
});
}
// Add epsilon-delta bands if enabled
if (showEpsilonDelta && limitValue !== undefined) {
datasets.push({
label: "ε-band",
data: [
{ x: xMin, y: limitValue + epsilon },
{ x: xMax, y: limitValue + epsilon },
],
borderColor: "rgba(34, 197, 94, 0.5)",
borderWidth: 1,
borderDash: [5, 5],
pointRadius: 0,
fill: false,
showLine: true,
});
datasets.push({
label: "
