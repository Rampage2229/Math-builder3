# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.Lice here https://batxmatx-mk0oynnk9-holahola2224-2779s-projects.vercel.app/ca/ca.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 08:20:40 (Cycle #75)
**Latest Operator Steering:** https://batxmatx-mk0oynnk9-holahola2224-2779s-projects.vercel.app/ca/ca ut gives a 404 error

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
bash
cd project && npm test 2>&1
```
The test suite is failing because `tests/setup.ts` incorrectly imports Jest globals (`beforeAll`, `afterAll`, etc.) from the `"jest"` module — they are globals, not exports. Let me fix this.
```filepath:project/tests/setup.ts
<<<<<<< SEARCH
import {
beforeAll,
afterAll,
beforeEach,
afterEach,
describe,
it,
expect,
jest,
} from "jest";
declare global {
namespace jest {
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Matchers<R> extends jest.Matchers<R, unknown> {}
}
const describe: typeof import("jest").describe;
const it: typeof import("jest").it;
const expect: typeof import("jest").expect;
const jest: typeof import("jest").jest;
const beforeAll: typeof import("jest").beforeAll;
const afterAll: typeof import("jest").afterAll;
const beforeEach: typeof import("jest").beforeEach;
const afterEach: typeof import("jest").afterEach;
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
originalConsol
