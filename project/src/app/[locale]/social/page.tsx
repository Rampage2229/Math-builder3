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

export default async function SocialTrackPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const dictionary = await loadDictionary(locale);
  
  // Unit data translated per locale
  const units = {
    en: [
      { id: 1, title: "Descriptive Statistics", duration: "3 weeks", level: "Introductory", 
        description: "Measures of central tendency, dispersion, and data visualization for social science research." },
      { id: 2, title: "Probability Foundations", duration: "3 weeks", level: "Introductory",
        description: "Probability theory, conditional probability, and Bayes' theorem applied to social contexts." },
      { id: 3, title: "Inferential Statistics", duration: "4 weeks", level: "Intermediate",
        description: "Hypothesis testing, confidence intervals, and t-tests for drawing conclusions from samples." },
      { id: 4, title: "Correlation & Regression", duration: "4 weeks", level: "Intermediate",
        description: "Linear regression, correlation analysis, and interpreting relationships between variables." },
      { id: 5, title: "Survey Design & Sampling", duration: "3 weeks", level: "Intermediate",
        description: "Sampling methods, survey construction, and bias mitigation in social research." },
      { id: 6, title: "Data Ethics & Interpretation", duration: "2 weeks", level: "Advanced",
        description: "Ethical considerations in data collection, privacy, and responsible interpretation of results." },
    ],
    ca: [
      { id: 1, title: "Estadística Descriptiva", duration: "3 setmanes", level: "Introductoria", 
        description: "Mesures de tendència central, dispersió i visualització de dades per a recerca ciències socials." },
      { id: 2, title: "Fundamentals de Probabilitat", duration: "3 setmanes", level: "Introductoria",
        description: "Teoria de la probabilitat, probabilitat condicional i Teorema de Bayes aplicat a contextos socials." },
      { id: 3, title: "Estadística Inferencial", duration: "4 setmanes", level: "Intermig",
        description: "Proves d'hipòtesis, intervalos de confiança i t-tests per a conclusions a partir de mostres." },
      { id: 4, title: "Correlació i Regresió", duration: "4 setmanes", level: "Intermig",
        description: "Anàlisi de correlació i interpretació de relacions entre variables." },
      { id: 5, title: "Diseny d'Enquestes i Mostreig", duration: "3 setmanes", level: "Intermig",
        description: "Mètodes de mostreig, construcció d'enquestes i mitigació de vies en recerca social." },
      { id: 6, title: "Ètica de Dades i Interpretació", duration: "2 setmanes", level: "Avançat",
        description: "Consideracions Ètiques en la recollida de dades, privacitat i interpretació responsable de resultats." },
    ],
    es: [
      { id: 1, title: "Estadísticas Descriptivas", duration: "3 semanas", level: "Introductoria", 
        description: "Medidas de tendencia central, dispersión y visualización de datos para investigación social." },
      { id: 2, title: "Fundamentos de Probabilidad", duration: "3 semanas", level: "Introductoria",
        description: "Teoría de la probabilidad, probabilidad condicional y Teorema de Bayes aplicado a contextos sociales." },
      { id: 3, title: "Estadísticas Inferenciales", duration: "4 semanas", level: "Intermedia",
        description: "Pruebas de hipótesis, intervalos de confianza y t-tests para sacar conclusiones de muestras." },
      { id: 4, title: "Correlación y Regresión", duration: "4 semanas", level: "Intermedia",
        description: "Regresión lineal, análisis de correlación e interpretación de relaciones entre variables." },
      { id: 5, title: "Diseño de Encuestas y Muestreo", duration: "3 semanas", level: "Intermedia",
        description: "Métodos de muestreo, construcción de encuestas y mitigación de sesgos en investigación social." },
      { id: 6, title: "Ética de Datos e Interpretación", duration: "2 semanas", level: "Avanzado",
        description: "Consideraciones éticas en la recopilación de datos, privacidad e interpretación responsable de resultados." },
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
