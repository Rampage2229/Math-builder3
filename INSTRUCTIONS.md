# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 07:06:34 (Cycle #64)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
bash
filepath:project/tests/setup.ts
<<<<<<< SEARCH
import "@testing-library/jest-dom";
declare global {
namespace jest {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fn: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const spyOn: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mock: any;
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
originalConsoleError.apply(console, args);
};
console.warn = (...args: unknown[]) => {
if (
typeof args[0] === "string" &&
(args[0] as string).includes(
"Warning: ReactDOM.render is no longer supported",
)
) {
return;
}
originalConsoleWarn.apply(console, args);
};
});
afterAll(() => {
console.error = originalConsoleError;
console.warn = originalConsoleWarn;
});
declare global {
namespace jest {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fn: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const spyOn: any;
