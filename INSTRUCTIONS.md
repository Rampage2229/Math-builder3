# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 01:06:31 (Cycle #10)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
bash
cd project && cat tests/page-rendering.test.tsx
filepath:project/tests/page-rendering.test.tsx
import { describe, it, expect } from "jest";
import * as fs from "fs";
import * as path from "path";
const dictionariesDir = path.join(__dirname, "..", "src", "lib", "dictionaries");
const supportedLocales = ["en", "ca", "es"] as const;
type Locale = (typeof supportedLocales)[number];
interface Dictionary {
[key: string]: string;
}
function loadDictionary(locale: string): Dictionary {
const filePath = path.join(dictionariesDir, `${locale}.json`);
if (!fs.existsSync(filePath)) {
return {};
}
return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
const mockDictionaries: Record<Locale, Dictionary> = {
en: loadDictionary("en"),
ca: loadDictionary("ca"),
es: loadDictionary("es"),
};
describe("Page Rendering - All Locales (Dictionary Content)", () => {
describe("Home Page content", () => {
it.each(supportedLocales)("has hero title in %s", (locale: Locale) => {
const dict = mockDictionaries[locale];
expect(dict.hero_title).toBeDefined();
expect(typeof dict.hero_title).toBe("string");
expect(dict.hero_title.length).toBeGreaterThan(0);
});
it.each(supportedLocales)("has hero description in 
