# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 00:18:35 (Cycle #1)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
filepath:project/src/app/globals.css
/* Global styles for the Mathematics Curriculum project */
* {
box-sizing: border-box;
padding: 0;
margin: 0;
}
html,
body {
max-width: 100vw;
overflow-x: hidden;
}
body {
color: rgb(var(--foreground-rgb));
background: linear-gradient(
to bottom,
transparent,
rgb(var(--background-end-rgb))
)
rgb(var(--background-start-rgb));
}
a {
color: inherit;
text-decoration: none;
}
@media (prefers-color-scheme: dark) {
html {
color-scheme: dark;
}
}
filepath:project/src/app/[locale]/layout.tsx
<<<<<<< SEARCH
import type { Metadata } from "next";
import "./globals.css";
export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
const locale = params.locale;
// Set direction based on locale (RTL languages would go here)
const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
return (
<html
lang={locale}
dir={dir}
className="h-full antialiased"
>
<body className="min-h-full flex flex-col">{children}</body>
</html>
);
}
=======
import type { Metadata } from "next";
import "./globals.css";
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Pro
