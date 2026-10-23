# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 00:51:14 (Cycle #7)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
The failing tests reveal a bug in `proxy.ts`: the locale detection only matches `, ca` (with space) but the Accept-Language headers use `,ca` (no space). I'll fix the parsing to split by comma and check each language tag properly.
```filepath:project/src/proxy.ts
<<<<<<< SEARCH
// Detect locale from Accept-Language header
const acceptLanguage = request.headers.get('accept-language') || '';
let detectedLocale: string | null = null;
// Simple locale detection
if (acceptLanguage.startsWith('ca') || acceptLanguage.includes(', ca')) {
detectedLocale = 'ca';
} else if (acceptLanguage.startsWith('es') || acceptLanguage.includes(', es')) {
detectedLocale = 'es';
} else {
detectedLocale = 'en'; // default to English
}
=======
// Detect locale from Accept-Language header
const acceptLanguage = request.headers.get('accept-language') || '';
let detectedLocale: string | null = null;
// Parse Accept-Language header: split by comma, check each language tag
const languageTags = acceptLanguage.split(',').map(tag => tag.trim().split(';')[0].trim().toLowerCase());
for (const tag of languageTags) {
if (tag.startsWith('ca')) {
detectedLocale = 'ca';
break;
} else if (tag.startsWith('es')) {
detectedLoc
