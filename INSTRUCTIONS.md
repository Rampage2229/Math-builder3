# Project Execution State & Swarm Instructions
**Goal:** evelop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx.vercel.app/en. 
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 15:29:08 (Cycle #7)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
All tests pass (47/47), TypeScript compiles cleanly, and ESLint shows only 1 minor warning. Let me fix that warning — `title` is an unnecessary dependency in the `chartData` useMemo.
```filepath:project/src/components/charts/IntegralVisualization.tsx
<<<<<<< SEARCH
return {
labels,
datasets: [
{
label: "f(x)",
data,
borderColor: color,
backgroundColor: color.replace("1)", "0.1)"),
borderWidth: 2,
pointRadius: 0,
fill: false,
tension: 0.1,
},
{
label: "Area under curve",
data: fillData,
borderColor: color,
backgroundColor: fillColor,
borderWidth: 0,
pointRadius: 0,
fill: false,
tension: 0.1,
},
],
integralValue,
};
}, [func, xMin, xMax, integralMin, integralMax, title, color, fillColor]);
=======
return {
labels,
datasets: [
{
label: "f(x)",
data,
borderColor: color,
backgroundColor: color.replace("1)", "0.1)"),
borderWidth: 2,
pointRadius: 0,
fill: false,
tension: 0.1,
},
{
label: "Area under curve",
data: fillData,
borderColor: color,
backgroundColor: fillColor,
borderWidth: 0,
pointRadius: 0,
fill: false,
tension: 0.1,
},
],
integralValue,
};
}, [func, xMin, xMax, integralMin, integralMax, color, fillColor]);
>>>>>>> REPLACE
```
