# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 02:37:24 (Cycle #25)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
All 47 tests pass and TypeScript compiles cleanly. There's 1 ESLint error to fix: `any` type in the mock file. Let me fix it with proper typing.
```filepath:project/tests/mocks/next-image-mock.tsx
<<<<<<< SEARCH
export const Image = ({
src,
alt,
width,
height,
priority,
className,
...props
}: any): JSX.Element => {
=======
interface NextImageProps {
src: string;
alt?: string;
width?: number | string;
height?: number | string;
priority?: boolean;
className?: string;
[key: string]: unknown;
}
export const Image = ({
src,
alt,
width,
height,
priority,
className,
...props
}: NextImageProps): JSX.Element => {
>>>>>>> REPLACE
```
