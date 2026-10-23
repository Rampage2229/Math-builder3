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

export default async function ScientificTrackPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const dictionary = await loadDictionary(locale);
  
  // Unit data translated per locale
  const units = {
    en: [
      { id: 1, title: "Calculus Fundamentals", duration: "4 weeks", level: "Introductory",
        description: "Limits, continuity, and differentiation for scientific applications." },
      { id: 2, title: "Linear Algebra", duration: "4 weeks", level: "Introductory",
        description: "Matrices, vectors, and linear transformations for physics and engineering." },
      { id: 3, title: "Differential Equations", duration: "5 weeks", level: "Intermediate",
        description: "First-order and second-order ODEs with scientific applications." },
      { id: 4, title: "Multivariable Calculus", duration: "5 weeks", level: "Intermediate",
        description: "Partial derivatives, multiple integrals, and vector calculus." },
      { id: 5, title: "Complex Analysis", duration: "3 weeks", level: "Advanced",
        description: "Complex numbers, contour integration, and residue theory." },
      { id: 6, title: "Numerical Methods", duration: "3 weeks", level: "Advanced",
        description: "Computational techniques for solving mathematical problems." },
    ],
    ca: [
      { id: 1, title: "Fundamentals de Càlcul", duration: "4 setmanes", level: "Introductori",
        description: "Limits, continuity, and differentiation for scientific applications." },
      { id: 2, title: "Àlgebra Lineal", duration: "4 setmanes", level: "Introductori",
        description: "Matrices, vectors, and linear transformations for physics and engineering." },
      { id: 3, title: "Equacions Diferencials", duration: "5 setmanes", level: "Intermig",
        description: "First-order and second-order ODEs with scientific applications." },
      { id: 4, title: "Càlcul Multivariant", duration: "5 setmanes", level: "Intermig",
        description: "Partial derivatives, multiple integrals, and vector calculus." },
      { id: 5, title: "Anàlisi Complexa", duration: "3 setmanes", level: "Avançat",
        description: "Complex numbers, contour integration, and residue theory." },
      { id: 6, title: "Mètodes Numèrics", duration: "3 setmanes", level: "Avançat",
        description: "Computational techniques for solving mathematical problems." },
    ],
    es: [
      { id: 1, title: "Fundamentos de Cálculo", duration: "4 semanas", level: "Introductoria",
        description: "Limits, continuity, and differentiation for scientific applications." },
      { id: 2, title: "Álgebra Lineal", duration: "4 semanas", level: "Introductoria",
        description: "Matrices, vectors, and linear transformations for physics and engineering." },
      { id: 3, title: "Ecuaciones Diferenciales", duration: "5 semanas", level: "Intermedia",
        description: "First-order and second-order ODEs with scientific applications." },
      { id: 4, title: "Cálculo Multivariable", duration: "5 semanas", level: "Intermedia",
        description: "Partial derivatives, multiple integrals, and vector calculus." },
      { id: 5, title: "Análisis Complejo", duration: "3 semanas", level: "Avanzado",
        description: "Complex numbers, contour integration, and residue theory." },
      { id: 6, title: "Métodos Numéricos", duration: "3 semanas", level: "Avanzado",
        description: "Computational techniques for solving mathematical problems." },
    ],
  };
  
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
