"use client";

import Image from "next/image";
import { useEffect } from "react";

interface Dictionary {
  [key: string]: string;
}

async function loadDictionary(locale: string): Promise<Dictionary> {
  const dictionaries: Record<string, Dictionary> = {
    en: (await import("../lib/dictionaries/english.json")).default,
    ca: (await import("../lib/dictionaries/catalan.json")).default,
    es: (await import("../lib/dictionaries/spanish.json")).default,
  };
  return dictionaries[locale] || dictionaries.en;
}

export default async function LocalizedPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const dictionary = await loadDictionary(locale);
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {dictionary.hero_title}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {dictionary.hero_description}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <nav>
            <ul className="flex gap-4">
              <li>
                <a href={`/${locale}`} className="font-medium text-zinc-950 dark:text-zinc-50">
                  {dictionary.nav_home}
                </a>
              </li>
              <li>
                <a href={`/${locale}/social`} className="font-medium text-zinc-950 dark:text-zinc-50">
                  {dictionary.nav_social}
                </a>
              </li>
              <li>
                <a href={`/${locale}/scientific`} className="font-medium text-zinc-950 dark:text-zinc-50">
                  {dictionary.nav_scientific}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
