# Project Roadmap & Execution History
**Master Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English
**Active Mode:** 💻 Software Engineering (Code)
**Initiated:** 2026-10-24 00:04:08

---

### Cycle #1 [2026-10-24 00:04:08]
**Subtasks Assigned:**
- **subtask_1**: Explore the current project structure and check for existing code, package.json, vercel config, and deployment issues
- **subtask_2**: Create the Next.js project structure with i18n support for Catalan, Spanish, and English
- **subtask_3**: Build the curriculum content pages for social and scientific math tracks
- **subtask_4**: Configure Vercel deployment and create deployment verification
**Deliverables & Modified Files:**
- `project/.gitignore`
- `project/AGENTS.md`
- `project/README.md`
- `project/assets/styles.css`
- `project/eslint.config.mjs`
- `project/index.html`
- `project/next.config.ts`
- `project/package-lock.json`
- `project/package.json`
- `project/public/file.svg`
- `project/public/globe.svg`
- `project/public/next.svg`
**QA Validation:**
Dependencies are not installed (all UNMET). No `test` script exists. Let me install dependencies first, then run verification.
All verification checks are complete. Here is the QA outcome:
**QA VERIFICATION RESULTS:**
1. **Test Suites:** No `test` script is defined in `package.json` (Next.js project without dedicated test files). `npm test` returns "Missing script: test" — this is expected, not a failure.
2. **Compilation / Parse Checks — ALL PASSED:**
- `npm install`: 379 packages installed, **

---

### Cycle #1 [2026-10-24 00:18:35]
**Subtasks Assigned:**
- **subtask_1**: Explore and document the current project structure: examine package.json, next.config.ts, src/app/layout.tsx, src/app/page.tsx, and the social-math HTML files to understand existing i18n setup, routing, and content structure. Create a detailed inventory in project/INVENTORY.md
- **subtask_2**: Implement full i18n routing structure for Catalan (ca), Spanish (es), and English (en): create src/app/[locale]/ layout and page structure, locale-specific dictionaries in src/lib/dictionaries/, middleware.ts for locale detection, and update next.config.ts with i18n configuration
- **subtask_3**: Build curriculum content pages for both tracks: create src/app/[locale]/matematiques-socials/ and src/app/[locale]/matematiques-cientifices/ (Catalan routes) with corresponding Spanish/English routes, populate with curriculum units, topics, and learning objectives from the social-math HTML files
- **subtask_4**: Configure Vercel deployment: create vercel.json with proper rewrites for i18n, add build scripts to package.json, create .env.example, verify build passes with 'npm run build', and document deployment steps in DEPLOYMENT.md
**Deliverables & Modified Files:**
- `project/INVENTORY.md`
- `project/next.config.ts`
- `project/src/app/[locale]/layout.tsx`
- `project/src/app/[locale]/page.tsx`
- `project/src/app/[locale]/scientific/page.tsx`
- `project/src/app/[locale]/social/page.tsx`
- `project/src/lib/dictionaries/catalan.json`
- `project/src/lib/dictionaries/english.json`
- `project/src/lib/dictionaries/spanish.json`
- `project/src/middleware.ts`
- `project/vercel.json`
**QA Validation:**
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
filepath:project/src

---

### Cycle #2 [2026-10-24 00:26:06]
**Subtasks Assigned:**
- **subtask_1**: Extract and structure detailed curriculum content from social-math HTML files into JSON data files for both social and scientific math tracks. Create src/lib/curriculum/social.json and src/lib/curriculum/scientific.json with units, topics, learning objectives, and assessment criteria for all three languages.
- **subtask_2**: Build reusable UI components: create src/components/Navigation.tsx with locale-aware language switcher, src/components/CurriculumCard.tsx for displaying units/topics, src/components/TrackSelector.tsx for switching between social/scientific tracks, and src/components/Footer.tsx. Update layout.tsx to use these components.
- **subtask_3**: Implement comprehensive test suite: create project/tests/ with unit tests for dictionary loading, middleware locale detection, curriculum data structure validation, and component rendering tests using Jest and React Testing Library. Add test script to package.json.
- **subtask_4**: Enhance curriculum pages with dynamic content rendering: update src/app/[locale]/social/page.tsx and src/app/[locale]/scientific/page.tsx to consume the new JSON curriculum data, add unit detail pages at src/app/[locale]/social/[unit]/page.tsx and src/app/[locale]/scientific/[unit]/page.tsx, and verify production build passes with 'npm run build'.
**Deliverables & Modified Files:**
- `project/jest.config.ts`
- `project/package-lock.json`
- `project/package.json`
- `project/tests/dictionary.test.ts`
- `project/tests/middleware.test.ts`
- `project/tests/mocks/next-image-mock.ts`
- `project/tests/setup.ts`
**QA Validation:**
filepath:project/package.json
<<<<<<< SEARCH
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "eslint"
},
=======
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "eslint",
"test": "jest"
},
>>>>>>> REPLACE
filepath:project/jest.config.ts
<<<<<<< SEARCH
setupFilesAfterEach: ["<rootDir>/tests/setup.ts"],
=======
setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
>>>>>>> REPLACE
filepath:project/tests/mocks/next-image-mock.ts

---
