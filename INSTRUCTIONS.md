# Project Execution State & Swarm Instructions
**Goal:** Develop this website about spanish bacculerate's both social ans scientific math curriculums. Buid it so it can be deployed in Vercel with node.js. Make it in Catalan, Spanish and English. Make sure that on each iteration the webpage is functional with vercel, and it doesn't break between pushes. It's supposed to be a leaening site with exercices snd theory and interactive elements.The current deployment is  here https://batxmatx-mk0oynnk9-holahola2224-2779s-projects.vercel.app
**Active Mode:** 💻 Software Engineering (Code)
**Last Updated:** 2026-10-24 11:22:42 (Cycle #98)
**Latest Operator Steering:** None provided

## Directory Layout
- `project/`: Primary application codebase, tests, documentation, and assets.
- `tools/`: External reference utilities and compilers.
- `skills/`: Reusable procedural knowledge manuals.

## Latest QA Status
```filepath:project/src/app/[locale]/scientific/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { scientificTopicsOrder } from "@/lib/dictionaries/scientific";
export default function ScientificPage() {
const { t } = useTranslation("scientific");
const [activeTopic, setActiveTopic] = useState<string | null>(null);
return (
<div className="min-h-screen bg-slate-50 text-slate-900">
<nav className="border-b border-slate-200 bg-white sticky top-0 z-20">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16">
<div className="flex items-center gap-2">
<span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
{t("track_badge")}
</span>
<h1 className="text-xl font-bold">{t("page_title")}</h1>
</div>
<div className="flex items-center gap-4">
<Link href="/" className="text-slate-600 hover:text-blue-600 transition">
{t("nav_home")}
</Link>
<Link href="/social" className="text-slate-600 hover:text-blue-600 transition">
{t("nav_social")}
</Link>
<Link href="/scientific" className="text-blue-600 font-medium">
{t("nav_scien
