# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.Lice here https://batxmatx-mk0oynnk9-holahola2224-2779s-projects.vercel.app/ca/ca.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 07:33:34 (Cycle #69)
**Latest Operator Steering:** https://batxmatx-mk0oynnk9-holahola2224-2779s-projects.vercel.app/ca/ca ut gives a 404 error

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
The test suites are all failing because `tests/setup.ts` uses `beforeAll`/`afterAll` without importing them from jest. Let me fix this and re-run.
```filepath:project/tests/setup.ts
<<<<<<< SEARCH
declare global {
namespace jest {
const fn: <T = unknown>(implementation?: (...args: unknown[]) => T) => T;
const spyOn: <T extends object, K extends keyof T>(
object: T,
method: K,
) => jest.SpyInstance<T[K], []>;
const mock: <T = unknown>(implementation?: (...args: unknown[]) => T) => T;
const describe: (name: string, fn: () => void) => void;
const it: (name: string, fn: () => void | Promise<void>) => void;
const expect: <T>(actual: T) => jest.Matchers<T>;
const beforeAll: (fn: () => void | Promise<void>) => void;
const afterAll: (fn: () => void | Promise<void>) => void;
const beforeEach: (fn: () => void | Promise<void>) => void;
const afterEach: (fn: () => void | Promise<void>) => void;
}
}
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
beforeAll(() => {
console.error = (...args: unknown[]) => {
if (
typeof args[0] === "string" &&
(args[0] as string).includes(
"Warning: ReactDOM.render is no longer supported",
)
) {
return;
}
originalConsoleError.
