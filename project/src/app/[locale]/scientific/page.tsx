"use client";

import { TheorySection, TheoryTopic } from "@/components/theory/TheorySection";
import { scientificDictionary } from "@/lib/dictionaries/scientific";

interface ScientificDictionary {
  page_title: string;
  page_subtitle: string;
  track_badge: string;
  limits_title: string;
  limits_desc: string;
  derivatives_title: string;
  derivatives_desc: string;
  integrals_title: string;
  integrals_desc: string;
  vectors_title: string;
  vectors_desc: string;
  matrices_title: string;
  matrices_desc: string;
  probability_title: string;
  probability_desc: string;
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
      id: "limits",
      title: "Limits and Continuity",
      content:
        "Study of limits, continuity, and asymptotic behavior of functions, including one-sided limits and infinite limits.",
      keyPoints: [
        "Limit definition",
        "One-sided limits",
        "Continuity",
        "Asymptotic behavior",
      ],
    },
    {
      id: "derivatives",
      title: "Derivatives",
      content:
        "Differentiation rules, applications of derivatives including rates of change, optimization, and curve sketching.",
      keyPoints: ["Power rule", "Product rule", "Chain rule", "Applications"],
    },
    {
      id: "integrals",
      title: "Integrals",
      content:
        "Integration techniques including definite and indefinite integrals, the Fundamental Theorem of Calculus, and applications.",
      keyPoints: [
        "Indefinite integrals",
        "Definite integrals",
        "Fundamental Theorem",
        "Applications",
      ],
    },
    {
      id: "vectors",
      title: "Vectors",
      content:
        "Vector operations in 2D and 3D space, including dot product, cross product, and vector geometry.",
      keyPoints: [
        "Vector operations",
        "Dot product",
        "Cross product",
        "Vector geometry",
      ],
    },
    {
      id: "matrices",
      title: "Matrices",
      content:
        "Matrix operations, determinants, inverse matrices, and systems of linear equations.",
      keyPoints: [
        "Matrix operations",
        "Determinants",
        "Inverse matrices",
        "Linear systems",
      ],
    },
    {
      id: "probability",
      title: "Probability",
      content:
        "Probability theory including conditional probability, independence, random variables, and probability distributions.",
      keyPoints: [
        "Conditional probability",
        "Independence",
        "Random variables",
        "Probability distributions",
      ],
    },
  ],
  ca: [
    {
      id: "limits",
      title: "Límits i Continuitat",
      content:
        "Estudi de límits, continuïtat i comportament assimptòtic de funcions, inclòs límits unilaterals i límits infinits.",
      keyPoints: [
        "Definició de límit",
        "Límits unilaterals",
        "Continuitat",
        "Comportament assimptòtic",
      ],
    },
    {
      id: "derivatives",
      title: "Derivades",
      content:
        "Regles de derivació i aplicacions de les derivades inclòs ritmes de canvi, optimització i esbossat de courbes.",
      keyPoints: [
        "Regla de potència",
        "Regla del producte",
        "Regla de la cadena",
        "Aplicacions",
      ],
    },
    {
      id: "integrals",
      title: "Integrals",
      content:
        "Tècniques d'integració inclòs integrals definides i indefinides, el Teorema Fondamental del Càlcul i aplicacions.",
      keyPoints: [
        "Integrals indefinides",
        "Integrals definides",
        "Teorema Fonamental",
        "Aplicacions",
      ],
    },
    {
      id: "vectors",
      title: "Vectors",
      content:
        "Operacions vectors en espai 2D i 3D, inclòs producte escalar, producte vectorial i geometria vectorial.",
      keyPoints: [
        "Operacions vectors",
        "Producte escalar",
        "Producte vectorial",
        "Geometria vectorial",
      ],
    },
    {
      id: "matrices",
      title: "Matrius",
      content:
        "Operacions de matrius, determinants, matrius inverses i sistemes d'equacions lineals.",
      keyPoints: [
        "Operacions de matrius",
        "Determinants",
        "Matrius inverses",
        "Sistemes lineals",
      ],
    },
    {
      id: "probability",
      title: "Probabilitat",
      content:
        "Teoria de la probabilitat inclòs probabilitat condicionada, independència, variables aleatòries i distribucions de probabilitat.",
      keyPoints: [
        "Probabilitat condicionada",
        "Independència",
        "Variables aleatòries",
        "Distribucions de probabilitat",
      ],
    },
  ],
  es: [
    {
      id: "limits",
      title: "Límites y Continuidad",
      content:
        "Estudio de límites, continuidad y comportamiento asintótico de funciones, incluyendo límites laterales e infinitos.",
      keyPoints: [
        "Definición de límite",
        "Límites laterales",
        "Continuidad",
        "Comportamiento asintótico",
      ],
    },
    {
      id: "derivatives",
      title: "Derivadas",
      content:
        "Reglas de derivación y aplicaciones de las derivadas incluyendo tasas de cambio, optimización y esbozo de curvas.",
      keyPoints: [
        "Regla de potencia",
        "Regla del producto",
        "Regla de la cadena",
        "Aplicaciones",
      ],
    },
    {
      id: "integrals",
      title: "Integrales",
      content:
        "Técnicas de integración incluyendo integrales definidas e indefinidas, el Teorema Fundamental del Cálculo y aplicaciones.",
      keyPoints: [
        "Integrales indefinidas",
        "Integrales definidas",
        "Teorema Fundamental",
        "Aplicaciones",
      ],
    },
    {
      id: "vectors",
      title: "Vectores",
      content:
        "Operaciones vectoriales en espacio 2D y 3D, incluyendo producto punto, producto cruz y geometría vectorial.",
      keyPoints: [
        "Operaciones vectoriales",
        "Producto punto",
        "Producto cruz",
        "Geometría vectorial",
      ],
    },
    {
      id: "matrices",
      title: "Matrices",
      content:
        "Operaciones de matrices, determinantes, matrices inversas y sistemas de ecuaciones lineales.",
      keyPoints: [
        "Operaciones de matrices",
        "Determinantes",
        "Matrices inversas",
        "Sistemas lineales",
      ],
    },
    {
      id: "probability",
      title: "Probabilidad",
      content:
        "Teoría de probabilidad incluyendo probabilidad condicionada, independencia, variables aleatorias y distribuciones de probabilidad.",
      keyPoints: [
        "Probabilidad condicionada",
        "Independencia",
        "Variables aleatorias",
        "Distribuciones de probabilidad",
      ],
    },
  ],
};

export default async function ScientificTrackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const dict =
    scientificDictionary[locale as keyof typeof scientificDictionary] ||
    scientificDictionary.en;
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
            title={dict.limits_title}
            description={dict.limits_desc}
            topics={pageTopics.filter((t) => t.id === "limits")}
          />
          <TheorySection
            title={dict.derivatives_title}
            description={dict.derivatives_desc}
            topics={pageTopics.filter((t) => t.id === "derivatives")}
          />
          <TheorySection
            title={dict.integrals_title}
            description={dict.integrals_desc}
            topics={pageTopics.filter((t) => t.id === "integrals")}
          />
          <TheorySection
            title={dict.vectors_title}
            description={dict.vectors_desc}
            topics={pageTopics.filter((t) => t.id === "vectors")}
          />
          <TheorySection
            title={dict.matrices_title}
            description={dict.matrices_desc}
            topics={pageTopics.filter((t) => t.id === "matrices")}
          />
          <TheorySection
            title={dict.probability_title}
            description={dict.probability_desc}
            topics={pageTopics.filter((t) => t.id === "probability")}
          />
        </section>
      </main>
    </div>
  );
}
