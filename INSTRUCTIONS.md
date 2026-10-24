# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 06:53:28 (Cycle #63)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
I'll start by exploring the workspace to understand the project structure and what deliverables exist.
bash
```
filepath:project/src/app/[locale]/progress/ProgressClient.tsx
<<<<<<< SEARCH
function TopicProgressBar({
label,
completed,
total,
percentage,
averageScore,
timeSpent,
}: {
label: string;
completed: number;
total: number;
percentage: number;
averageScore: number;
timeSpent: string;
}) {
return (
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium text-gray-900 dark:text-white">{label}</span>
<span className="text-gray-500 dark:text-gray-400">
{completed}/{total} ({percentage.toFixed(0)}%)
</span>
</div>
<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
<div
className="h-full bg-blue-500 rounded-full transition-all duration-300"
style={{ width: `${percentage}%` }}
/>
</div>
<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
<span>{dict.average_score}: {averageScore.toFixed(1)}%</span>
<span>{dict.time_spent}: {timeSpent}</span>
</div>
</div>
);
}
=======
function TopicProgressBar({
label,
completed,
total,
percentage,
averageScore,
timeSpent,
dict,
}: {
label: stri
