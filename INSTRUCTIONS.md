# Project Execution State & Swarm Instructions
**Goal:** evelop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is here https://batxmatx.vercel.app/en. 
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 14:48:19 (Cycle #3)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
filepath:project/src/app/[locale]/scientific/page.tsx
<<<<<<< SEARCH
<aside className="lg:col-span-3 hidden lg:block">
<nav className="space-y-1">
{scientificTopicsOrder.map((topic) => (
<button
key={topic}
onClick={() => setActiveTopic(topic)}
className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
activeTopic === topic
? "bg-blue-100 text-blue-700 font-medium"
: "text-slate-600 hover:bg-slate-100"
}`}
>
{getTopicTitle(topic)}
</button>
))}
</nav>
</aside>
=======
<aside className="lg:col-span-3 hidden lg:block">
<nav className="space-y-1">
{scientificTopicsOrder.map((topic: string) => (
<button
key={topic}
onClick={() => setActiveTopic(topic)}
className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
activeTopic === topic
? "bg-blue-100 text-blue-700 font-medium"
: "text-slate-600 hover:bg-slate-100"
}`}
>
{getTopicTitle(topic)}
</button>
))}
</nav>
</aside>
>>>>>>> REPLACE
filepath:project/src/app/[locale]/scientific/page.tsx
<<<<<<< SEARCH
<section className="lg:col-span-9">
<div className="space-y-8">
{scientificTopicsOrder.map((topic) => (
<div
key={topic}
id={topic}
className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
>
<h3 clas
