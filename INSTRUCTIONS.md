# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 04:16:36 (Cycle #38)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
bash
cd project && npm test 2>&1
```
The test suite passes (47/47 tests), but TypeScript compilation fails due to merge conflict markers in `social/page.tsx`. I need to fix that file.
```filepath:project/src/app/[locale]/social/page.tsx
<<<<<<< SEARCH
=======
"use client";
import { TheorySection, TheoryTopic } from "@/components/theory/TheorySection";
import { socialDictionary } from "@/lib/dictionaries/social";
interface SocialDictionary {
page_title: string;
page_subtitle: string;
track_badge: string;
descriptive_statistics_title: string;
descriptive_statistics_desc: string;
probability_title: string;
probability_desc: string;
inferential_statistics_title: string;
inferential_statistics_desc: string;
correlation_regression_title: string;
correlation_regression_desc: string;
financial_math_title: string;
financial_math_desc: string;
linear_programming_title: string;
linear_programming_desc: string;
nav_home: string;
nav_social: string;
nav_scientific: string;
key_formulas: string;
examples: string;
key_points: string;
problem: string;
solution: string;
theory_link: string;
exercises_link: string;
}
const topics: Record<string, TheoryTopic[]> = {
en: [
{
id: "descriptive-statistics
