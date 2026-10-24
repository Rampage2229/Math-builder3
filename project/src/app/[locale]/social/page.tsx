"use client";

import { TheorySection, TheoryTopic } from "@/components/theory/TheorySection";
import { socialDictionary } from "@/lib/dictionaries/social";
import { LinearProgrammingVisualization } from "@/components/charts/LinearProgrammingVisualization";

interface SocialDictionary {
  page_title: string;
  page_subtitle: string;
  track_badge: string;
  descriptive_statistics_title: string;
  descriptive_statistics_desc: string;
  probability_title: string;
  probability_desc: string;
  inferential_statistics_title: string;
  inferential_statistics_desc: string;
  correlation_regression_title: string;
  correlation_regression_desc: string;
  financial_math_title: string;
  financial_math_desc: string;
  linear_programming_title: string;
  linear_programming_desc: string;
  nav_home: string;
  nav_social: string;
  nav_scientific: string;
  key_formulas: string;
  examples: string;
  key_points: string;
  problem: string;
  solution: string;
  theory_link: string;
  exercises_link: string;
}

const topics: Record<string, TheoryTopic[]> = {
  en: [
    {
      id: "descriptive-statistics",
      title: "Descriptive Statistics",
      content:
        "Methods for summarizing, organizing, and visualizing data to understand patterns and characteristics in social science research.",
      keyPoints: [
        "Measures of central tendency",
        "Measures of dispersion",
        "Data visualization techniques",
      ],
    },
    {
      id: "probability",
      title: "Probability Foundations",
      content:
        "Theoretical and applied probability concepts including conditional probability, Bayes' theorem, and probability distributions.",
      keyPoints: [
        "Conditional probability",
        "Bayes' theorem",
        "Probability distributions",
      ],
    },
    {
      id: "inferential-statistics",
      title: "Inferential Statistics",
      content:
        "Statistical inference methods including hypothesis testing, confidence intervals, and sampling distributions.",
      keyPoints: [
        "Hypothesis testing",
        "Confidence intervals",
        "Sampling distributions",
      ],
    },
    {
      id: "correlation-regression",
      title: "Correlation & Regression",
      content:
        "Analysis of relationships between variables using correlation coefficients and linear regression models.",
      keyPoints: [
        "Correlation coefficients",
        "Linear regression",
        "Model interpretation",
      ],
    },
    {
      id: "financial-math",
      title: "Financial Mathematics",
      content:
        "Mathematical models for financial applications including simple and compound interest, annuities, loans, and investment analysis.",
      keyPoints: [
        "Simple and compound interest",
        "Annuities",
        "Investment analysis",
      ],
    },
    {
      id: "linear-programming",
      title: "Linear Programming",
      content:
        "Optimization techniques for maximizing or minimizing linear objective functions subject to linear constraints.",
      keyPoints: [
        "Objective functions",
        "Linear constraints",
        "Optimization techniques",
      ],
    },
  ],
  ca: [
    {
      id: "descriptive-statistics",
      title: "Estadística Descriptiva",
      content:
        "Mètodes per resumir, organitzar i visualitzar dades per entendre patrons i característiques en la recerca en ciències socials.",
      keyPoints: [
        "Mesures de tendència central",
        "Mesures de dispersió",
        "Tècniques de visualització de dades",
      ],
    },
    {
      id: "probability",
      title: "Fonaments de Probabilitat",
      content:
        "Conceptes teòrics i aplicats de probabilitat inclòs probabilitat condicionada, teorema de Bayes i distribucions de probabilitat.",
      keyPoints: [
        "Probabilitat condicionada",
        "Teorema de Bayes",
        "Distribucions de probabilitat",
      ],
    },
    {
      id: "inferential-statistics",
      title: "Estadística Inferencial",
      content:
        "Mètodes d'estadística inferencial inclòs proves d'hipòtesis, intervals de confiança i distribucions de mostreig.",
      keyPoints: [
        "Proves d'hipòtesis",
        "Intervals de confiança",
        "Distribucions de mostreig",
      ],
    },
    {
      id: "correlation-regression",
      title: "Correl·lació i Regressió",
      content:
        "Anàlisi de relacions entre variables utilitzant coeficients de correl·lació i models de regressió lineal.",
      keyPoints: [
        "Coeficients de correl·lació",
        "Regressió lineal",
        "Interpretació del model",
      ],
    },
    {
      id: "financial-math",
      title: "Matemàtiques Financeres",
      content:
        "Models matemàtics per a aplicacions financeres inclòs interès simple i compost, anualitats, préstecs i anàlisi d'inversions.",
      keyPoints: [
        "Interès simple i compost",
        "Anualitats",
        "Anàlisi d'inversions",
      ],
    },
    {
      id: "linear-programming",
      title: "Programació Lineal",
      content:
        "Tècniques d'optimització per maximitzar o minimitzar funcions objectiu lineals subjectes a restriccions lineals.",
      keyPoints: [
        "Funcions objectiu",
        "Restriccions lineals",
        "Tècniques d'optimització",
      ],
    },
  ],
  es: [
    {
      id: "descriptive-statistics",
      title: "Estadística Descriptiva",
      content:
        "Métodos para resumir, organizar y visualizar datos para entender patrones y características en la investigación en ciencias sociales.",
      keyPoints: [
        "Medidas de tendencia central",
        "Medidas de dispersión",
        "Técnicas de visualización de datos",
      ],
    },
    {
      id: "probability",
      title: "Fundamentos de Probabilidad",
      content:
        "Conceptos teóricos y aplicados de probabilidad incluyendo probabilidad condicionada, teorema de Bayes y distribuciones de probabilidad.",
      keyPoints: [
        "Probabilidad condicionada",
        "Teorema de Bayes",
        "Distribuciones de probabilidad",
      ],
    },
    {
      id: "inferential-statistics",
      title: "Estadística Inferencial",
      content:
        "Métodos de estadística inferencial incluyendo pruebas de hipótesis, intervalos de confianza y distribuciones de muestreo.",
      keyPoints: [
        "Pruebas de hipótesis",
        "Intervalos de confianza",
        "Distribuciones de muestreo",
      ],
    },
    {
      id: "correlation-regression",
      title: "Correlación y Regresión",
      content:
        "Análisis de relaciones entre variables utilizando coeficientes de correlación y modelos de regresión lineal.",
      keyPoints: [
        "Coeficientes de correlación",
        "Regresión lineal",
        "Interpretación del modelo",
      ],
    },
    {
      id: "financial-math",
      title: "Matemáticas Financieras",
      content:
        "Modelos matemáticos para aplicaciones financieras incluyendo interés simple y compuesto, anualidades, préstamos y análisis de inversiones.",
      keyPoints: [
        "Interés simple y compuesto",
        "Anualidades",
        "Análisis de inversiones",
      ],
    },
    {
      id: "linear-programming",
      title: "Programación Lineal",
      content:
        "Técnicas de optimización para maximizar o minimizar funciones objetivo lineales sujetas a restricciones lineales.",
      keyPoints: [
        "Funciones objetivo",
        "Restricciones lineals",
        "Técnicas de optimización",
      ],
    },
  ],
};

export default async function SocialTrackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const dict =
    socialDictionary[locale as keyof typeof socialDictionary] ||
    socialDictionary.en;
  const pageTopics = topics[locale as keyof typeof topics] || topics.en;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {dict.page_title}
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href={`/${locale}`}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {dict.nav_home}
              </a>
              <a
                href={`/${locale}/social`}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {dict.nav_social}
              </a>
              <a
                href={`/${locale}/scientific`}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {dict.nav_scientific}
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-900/20 border border-blue-500/20 dark:border-blue-900/30 text-blue-400 dark:text-blue-300 text-sm font-medium mb-6">
              {dict.track_badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
              {dict.page_title}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {dict.page_subtitle}
            </p>
          </div>

          <TheorySection
            title={dict.descriptive_statistics_title}
            description={dict.descriptive_statistics_desc}
            topics={pageTopics.filter((t) => t.id === "descriptive-statistics")}
          />
          <TheorySection
            title={dict.probability_title}
            description={dict.probability_desc}
            topics={pageTopics.filter((t) => t.id === "probability")}
          />
          <TheorySection
            title={dict.inferential_statistics_title}
            description={dict.inferential_statistics_desc}
            topics={pageTopics.filter((t) => t.id === "inferential-statistics")}
          />
          <TheorySection
            title={dict.correlation_regression_title}
            description={dict.correlation_regression_desc}
            topics={pageTopics.filter((t) => t.id === "correlation-regression")}
          />
          <TheorySection
            title={dict.financial_math_title}
            description={dict.financial_math_desc}
            topics={pageTopics.filter((t) => t.id === "financial-math")}
          />
          <TheorySection
            title={dict.linear_programming_title}
            description={dict.linear_programming_desc}
            topics={pageTopics.filter((t) => t.id === "linear-programming")}
          />
          
          {/* Linear Programming Visualization */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
              {dict.linear_programming_title} - Interactive Visualization
            </h2>
            <LinearProgrammingVisualization
              constraints={[
                { id: "c1", label: "2x + y ≤ 20", a: 2, b: 1, c: 20, type: "<=" },
                { id: "c2", label: "x + 2y ≤ 20", a: 1, b: 2, c: 20, type: "<=" },
                { id: "c3", label: "x ≥ 0", a: 1, b: 0, c: 0, type: ">=" },
                { id: "c4", label: "y ≥ 0", a: 0, b: 1, c: 0, type: ">=" },
              ]}
              objective={{ label: "Maximize z = 3x + 4y", a: 3, b: 4, maximize: true }}
              title="Linear Programming: Feasible Region & Optimal Solution"
              xLabel="x"
              yLabel="y"
              xMax={15}
              yMax={15}
              simplexSteps={[
                {
                  step: 1,
                  description: "Convert inequalities to equations by adding slack variables s1, s2",
                  tableau: [
                    [2, 1, 1, 0, 20],
                    [1, 2, 0, 1, 20],
                    [-3, -4, 0, 0, 0],
                  ],
                  basicVariables: ["s1", "s2"],
                  enteringVariable: "y",
                  leavingVariable: "s2",
                  pivotElement: 2,
                },
                {
                  step: 2,
                  description: "Pivot on y in row 2, normalize and eliminate",
                  tableau: [
                    [1.5, 0, 1, -0.5, 10],
                    [0.5, 1, 0, 0.5, 10],
                    [-1, 0, 0, 2, 40],
                  ],
                  basicVariables: ["s1", "y"],
                  enteringVariable: "x",
                  leavingVariable: "s1",
                  pivotElement: 1.5,
                },
                {
                  step: 3,
                  description: "Pivot on x in row 1, optimal solution reached",
                  tableau: [
                    [1, 0, 2/3, -1/3, 20/3],
                    [0, 1, -1/3, 2/3, 20/3],
                    [0, 0, 2/3, 5/3, 160/3],
                  ],
                  basicVariables: ["x", "y"],
                  enteringVariable: "none",
                  leavingVariable: "none",
                  pivotElement: 0,
                },
              ]}
            />
          </section>
        </section>
      </main>
    </div>
  );
}
